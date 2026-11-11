/**
 * Tarot artwork color-class mapper.
 *
 * Downscales a card image to the overlay viewBox grid and classifies every
 * cell by dominant color, printing an ASCII map. This lets you (or an AI)
 * locate the exact bounds of each symbol in viewBox coordinates before
 * drawing interactive region polygons.
 *
 * Requires `sharp` (install once: `npm i -D sharp`).
 *
 * Usage:
 *   node scripts/tarot-color-map.mjs <imagePath> <vbWidth> <vbHeight> [mode] [args...]
 *
 * Modes:
 *   full   (default)  Print the whole grid as an ASCII map.
 *   zoom   x0 y0 x1 y1   Print a sub-region at 2x resolution.
 *   runs   CLASSES y0 y1 minLen   Print contiguous color runs per row.
 *
 * Examples:
 *   node scripts/tarot-color-map.mjs public/tarot/the-fool.jpg 100 166.7
 *   node scripts/tarot-color-map.mjs public/tarot/the-fool.jpg 100 166.7 zoom 60 2 96 40
 *   node scripts/tarot-color-map.mjs public/tarot/the-fool.jpg 100 166.7 runs R,B,S 2 90 3
 *
 * Legend:
 *   W bright-white | w pale | C warm cream | K/k dark/near-black
 *   R red | Y yellow | S skin/orange | G green | B blue | . mixed/other
 */
import sharp from 'sharp';

const [imagePath, vbWStr, vbHStr, mode = 'full', ...rest] = process.argv.slice(2);

if (!imagePath || !vbWStr || !vbHStr) {
  console.error('Usage: node scripts/tarot-color-map.mjs <imagePath> <vbWidth> <vbHeight> [full|zoom|runs] [args...]');
  process.exit(1);
}

const VBW = Math.round(Number(vbWStr));
const VBH = Math.round(Number(vbHStr));

/**
 * Classify a pixel into a coarse color class. Thresholds are tuned for the
 * Rider-Waite palette (saturated reds/greens/blues, cream sky, dark ink).
 * Adjust if a particular deck prints differently.
 */
function classify(r, g, b) {
  const max = Math.max(r, g, b);
  const min = Math.min(r, g, b);
  const sat = max - min;
  if (min > 190) return 'W';                                   // bright white
  if (max < 60) return 'K';                                    // near-black
  if (r > 130 && g < r * 0.62 && b < r * 0.62) return 'R';     // strong red
  if (r > 160 && g > 125 && b < 108 && r - b > 65 && g - b > 30) return 'Y'; // yellow
  if (r > 140 && b >= 100 && b < 190 && r - b > 45 && g > r * 0.42 && g < r * 0.85) return 'S'; // skin/orange
  if (g > 75 && g >= r + 12 && g >= b + 12) return 'G';        // green
  if (b > 85 && b >= r + 10 && b >= g + 8) return 'B';         // blue
  if (max < 110) return 'k';                                   // dark
  if (min > 160 && r - b >= 12 && r - b <= 70) return 'C';     // warm cream
  if (min > 150 && sat < 40) return 'w';                       // pale
  return '.';
}

async function grid(scale) {
  const W = Math.round(VBW * scale);
  const H = Math.round(VBH * scale);
  const { data } = await sharp(imagePath).resize(W, H, { fit: 'fill' }).raw().toBuffer({ resolveWithObject: true });
  return { data, W, H };
}

const LEGEND = 'legend: W white | w pale | C cream | K/k dark | R red | Y yellow | S skin | G green | B blue | . other';

if (mode === 'full') {
  const { data, W, H } = await grid(1);
  let ruler = '    ';
  for (let x = 0; x < W; x++) ruler += x % 10 === 0 ? '|' : x % 5 === 0 ? '+' : ' ';
  console.log(ruler);
  for (let y = 0; y < H; y++) {
    let row = String(y).padStart(3, '0') + ' ';
    for (let x = 0; x < W; x++) {
      const i = (y * W + x) * 3;
      row += classify(data[i], data[i + 1], data[i + 2]);
    }
    console.log(row);
  }
  console.log(LEGEND);
} else if (mode === 'zoom') {
  const SCALE = 2;
  const { data, W, H } = await grid(SCALE);
  const [x0u, y0u, x1u, y1u] = rest.map(Number);
  const px0 = Math.max(0, Math.round(x0u * SCALE));
  const px1 = Math.min(W - 1, Math.round(x1u * SCALE));
  const py0 = Math.max(0, Math.round(y0u * SCALE));
  const py1 = Math.min(H - 1, Math.round(y1u * SCALE));
  let ruler = '      ';
  for (let px = px0; px <= px1; px++) {
    const u = px / SCALE;
    ruler += Math.abs(u - Math.round(u)) < 0.01 ? (Math.round(u) % 10 === 0 ? '|' : '+') : ' ';
  }
  console.log(ruler);
  for (let py = py0; py <= py1; py++) {
    let row = (py / SCALE).toFixed(1).padStart(5, ' ') + ' ';
    for (let px = px0; px <= px1; px++) {
      const i = (py * W + px) * 3;
      row += classify(data[i], data[i + 1], data[i + 2]);
    }
    console.log(row);
  }
  console.log(LEGEND);
} else if (mode === 'runs') {
  const { data, W, H } = await grid(1);
  const classes = (rest[0] ?? 'R,S,G,B,C,W').split(',');
  const from = Number(rest[1] ?? 0);
  const to = Number(rest[2] ?? H - 1);
  const minLen = Number(rest[3] ?? 2);
  for (let y = from; y <= to && y < H; y++) {
    const runs = [];
    let x = 0;
    while (x < W) {
      const i = (y * W + x) * 3;
      const c = classify(data[i], data[i + 1], data[i + 2]);
      let x2 = x;
      while (x2 + 1 < W) {
        const j = (y * W + (x2 + 1)) * 3;
        if (classify(data[j], data[j + 1], data[j + 2]) !== c) break;
        x2++;
      }
      if (classes.includes(c) && x2 - x + 1 >= minLen) runs.push(`x${x}${x2 > x ? '-' + x2 : ''}:${c}`);
      x = x2 + 1;
    }
    if (runs.length) console.log(`y=${String(y).padStart(3, '0')} ${runs.join(' ')}`);
  }
} else {
  console.error(`Unknown mode: ${mode}. Use full | zoom | runs.`);
  process.exit(1);
}
