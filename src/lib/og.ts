// Build-time Open Graph card renderer (1200×630 PNG) for blog posts — the
// image Facebook/Telegram/Twitter show when a link is shared. Mirrors the
// blog's designed cover: dark brand panel, moon glow, La Yaung logo, eyebrow,
// Burmese title, purple divider, domain.
//
// Why the complexity: resvg's own <text> layout cannot shape Myanmar script
// (pre-base vowel reordering, stacked marks), so Burmese text turned to soup.
// Instead we shape every title/eyebrow run with real HarfBuzz (harfbuzzjs
// wasm) and emit the resulting GLYPH OUTLINES as SVG <path>s — resvg then only
// rasterizes vectors. Latin-only fixed strings (brand, domain) stay as <text>.
import { readFileSync } from 'node:fs';
import path from 'node:path';
import { Resvg } from '@resvg/resvg-js';
import { Blob as HbBlob, Face, Font, Buffer as HbBuffer, shape } from 'harfbuzzjs';

const root = process.cwd();

interface ShapedGlyph {
  gid: number;
  x: number; // pen x in font units
  y: number; // pen y offset in font units (y-up)
}

interface Shaper {
  font: Font;
  upem: number;
  pathCache: Map<number, string>;
}

function makeShaper(ttfPath: string): Shaper {
  const data = readFileSync(path.join(root, ttfPath));
  const face = new Face(new HbBlob(data.buffer.slice(data.byteOffset, data.byteOffset + data.byteLength)));
  const font = new Font(face);
  font.setScale(face.upem, face.upem); // keep positions in font units
  return { font, upem: face.upem, pathCache: new Map() };
}

// Full (non-subset) TTFs — the fontsource woff2 subsets are fine for CSS but
// these ship complete GSUB/GPOS tables, which HarfBuzz needs for Myanmar.
let shapers: { latin: Shaper; mm: Shaper } | null = null;
function getShapers() {
  shapers ??= {
    latin: makeShaper('node_modules/@expo-google-fonts/poppins/700Bold/Poppins_700Bold.ttf'),
    mm: makeShaper('node_modules/@expo-google-fonts/noto-sans-myanmar/700Bold/NotoSansMyanmar_700Bold.ttf'),
  };
  return shapers;
}

const MYANMAR = /[က-႟ꧠ-꧿ꩠ-ꩿ]/;

/** Split text into script runs so each gets shaped with the right font. */
function splitRuns(text: string): { text: string; mm: boolean }[] {
  const runs: { text: string; mm: boolean }[] = [];
  for (const ch of text) {
    const mm = MYANMAR.test(ch);
    const last = runs[runs.length - 1];
    // Neutral chars (spaces, punctuation, digits) join the current run.
    const neutral = !/[A-Za-z]/.test(ch) && !mm;
    if (last && (neutral || last.mm === mm)) last.text += ch;
    else if (!last && neutral) runs.push({ text: ch, mm: false });
    else runs.push({ text: ch, mm });
  }
  return runs;
}

/** Shape one run with HarfBuzz → glyphs (font units) + total advance. */
function shapeRun(shaper: Shaper, text: string, tracking = 0): { glyphs: ShapedGlyph[]; width: number } {
  const buf = new HbBuffer();
  buf.addText(text);
  buf.guessSegmentProperties();
  shape(shaper.font, buf);
  const out = buf.getGlyphInfosAndPositions();
  const glyphs: ShapedGlyph[] = [];
  let penX = 0;
  for (const g of out) {
    glyphs.push({ gid: g.codepoint, x: penX + (g.xOffset ?? 0), y: g.yOffset ?? 0 });
    penX += (g.xAdvance ?? 0) + tracking;
  }
  return { glyphs, width: penX };
}

/** Measure a mixed-script string at a font size, in px. */
function measure(text: string, fontSize: number, tracking = 0): number {
  const { latin, mm } = getShapers();
  let w = 0;
  for (const run of splitRuns(text)) {
    const s = run.mm ? mm : latin;
    w += (shapeRun(s, run.text, (tracking * s.upem) / fontSize).width * fontSize) / s.upem;
  }
  return w;
}

/** Render a mixed-script line as centered SVG glyph paths. */
function lineToPaths(text: string, fontSize: number, baselineY: number, fill: string, tracking = 0): string {
  const { latin, mm } = getShapers();
  const width = measure(text, fontSize, tracking);
  let penX = (1200 - width) / 2;
  const parts: string[] = [];
  for (const run of splitRuns(text)) {
    const s = run.mm ? mm : latin;
    const scale = fontSize / s.upem;
    const shaped = shapeRun(s, run.text, (tracking * s.upem) / fontSize);
    for (const g of shaped.glyphs) {
      let d = s.pathCache.get(g.gid);
      if (d === undefined) {
        d = s.font.glyphToPath(g.gid);
        s.pathCache.set(g.gid, d);
      }
      if (d) {
        const tx = penX + g.x * scale;
        const ty = baselineY - g.y * scale;
        parts.push(`<path d="${d}" fill="${fill}" transform="translate(${tx.toFixed(1)} ${ty.toFixed(1)}) scale(${scale.toFixed(5)} ${(-scale).toFixed(5)})"/>`);
      }
    }
    penX += shaped.width * scale;
  }
  return parts.join('\n  ');
}

/** Greedy word-wrap against real shaped widths. */
function wrap(text: string, fontSize: number, maxWidth: number): string[] {
  const lines: string[] = [];
  let line = '';
  for (const word of text.split(/\s+/)) {
    const candidate = line ? `${line} ${word}` : word;
    if (line && measure(candidate, fontSize) > maxWidth) {
      lines.push(line);
      line = word;
    } else {
      line = candidate;
    }
  }
  if (line) lines.push(line);
  return lines;
}

let logoDataUri: string | null = null;
function loadLogo(): string {
  logoDataUri ??= `data:image/png;base64,${readFileSync(path.join(root, 'public/assets/layaung-logo.png')).toString('base64')}`;
  return logoDataUri;
}

let latinFontBuffer: Buffer | null = null;

export interface OgInput {
  eyebrow: string;
  title: string;
}

export async function renderOgPng({ eyebrow, title }: OgInput): Promise<Buffer> {
  const W = 1200;
  const H = 630;
  const MAX_TEXT = 1000;

  // Fit the title: shrink when it needs a third line, then clamp at three.
  let fontSize = 58;
  let lines = wrap(title, fontSize, MAX_TEXT);
  if (lines.length > 2) {
    fontSize = 46;
    lines = wrap(title, fontSize, MAX_TEXT);
  }
  if (lines.length > 3) {
    lines = lines.slice(0, 3);
    lines[2] += ' …';
  }

  // Burmese stacks need generous line-height (matches the site's lh-140 guard).
  const lineHeight = Math.round(fontSize * 1.5);
  const blockCenter = 373;
  const firstBaseline = Math.round(blockCenter - ((lines.length - 1) * lineHeight) / 2);
  const dividerY = firstBaseline + (lines.length - 1) * lineHeight + Math.round(fontSize * 0.8);

  const titlePaths = lines.map((l, i) => lineToPaths(l, fontSize, firstBaseline + i * lineHeight, '#F5F3FE')).join('\n  ');
  const eyebrowPaths = lineToPaths(eyebrow.toUpperCase(), 22, 232, '#9F90F6', 7);

  const svg = `<svg width="${W}" height="${H}" viewBox="0 0 ${W} ${H}" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
  <defs>
    <linearGradient id="bg" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0" stop-color="#17122E"/>
      <stop offset="1" stop-color="#221B45"/>
    </linearGradient>
    <radialGradient id="glow" cx="0.5" cy="0.18" r="0.75">
      <stop offset="0" stop-color="#5F4BF1" stop-opacity="0.38"/>
      <stop offset="0.55" stop-color="#5F4BF1" stop-opacity="0.10"/>
      <stop offset="1" stop-color="#5F4BF1" stop-opacity="0"/>
    </radialGradient>
    <linearGradient id="divider" x1="0" y1="0" x2="1" y2="0">
      <stop offset="0" stop-color="#7C64F0"/>
      <stop offset="1" stop-color="#4B38C4"/>
    </linearGradient>
    <clipPath id="logoClip"><rect x="540" y="64" width="72" height="72" rx="18"/></clipPath>
  </defs>

  <rect width="${W}" height="${H}" fill="url(#bg)"/>
  <rect width="${W}" height="${H}" fill="url(#glow)"/>
  <rect x="8" y="8" width="${W - 16}" height="${H - 16}" rx="28" fill="none" stroke="#5F4BF1" stroke-opacity="0.35" stroke-width="2"/>

  <image href="${loadLogo()}" x="540" y="64" width="72" height="72" clip-path="url(#logoClip)"/>
  <text x="600" y="176" text-anchor="middle" font-family="Poppins" font-weight="700" font-size="30" fill="#F5F3FE">La Yaung <tspan fill="#B4A9F8" font-size="24">Hub</tspan></text>

  ${eyebrowPaths}

  ${titlePaths}

  <rect x="536" y="${dividerY}" width="128" height="4" rx="2" fill="url(#divider)"/>

  <text x="600" y="576" text-anchor="middle" font-family="Poppins" font-weight="700" font-size="24" letter-spacing="4" fill="#B4A9F8">layaunghub.com</text>
</svg>`;

  // Poppins is still needed for the two remaining Latin <text> elements.
  latinFontBuffer ??= readFileSync(path.join(root, 'node_modules/@expo-google-fonts/poppins/700Bold/Poppins_700Bold.ttf'));
  const resvg = new Resvg(svg, {
    font: { fontBuffers: [latinFontBuffer], defaultFontFamily: 'Poppins', loadSystemFonts: false },
  });
  return resvg.render().asPng();
}
