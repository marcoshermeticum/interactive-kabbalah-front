/**
 * Color-class map for any image, 1 unit per char on a 100x167 grid.
 * Usage: node tmp/any-map.mjs <image> [y0] [y1]
 */
import sharp from 'sharp';

const [img, y0 = 0, y1 = 167] = process.argv.slice(2);
const W = 100;
const H = 167;

const meta = await sharp(img).metadata();
console.log(`# ${img} ${meta.width}x${meta.height} format=${meta.format}`);

const { data } = await sharp(img)
  .resize(W, H, { fit: 'fill' })
  .raw()
  .toBuffer({ resolveWithObject: true });

function classify(r, g, b) {
  const max = Math.max(r, g, b);
  const min = Math.min(r, g, b);
  const sat = max - min;
  if (min > 190) return 'W';
  if (max < 60) return 'K';
  if (r > 130 && g < r * 0.62 && b < r * 0.62) return 'R';
  if (r > 160 && g > 125 && b < 108 && r - b > 65 && g - b > 30) return 'Y';
  if (r > 140 && b >= 100 && b < 190 && r - b > 45 && g > r * 0.42 && g < r * 0.85) return 'S';
  if (g > 75 && g >= r + 12 && g >= b + 12) return 'G';
  if (b > 85 && b >= r + 10 && b >= g + 8) return 'B';
  if (max < 110) return 'k';
  if (min > 160 && r - b >= 12 && r - b <= 70) return 'C';
  if (min > 150 && sat < 40) return 'w';
  return '.';
}

let ruler = '     ';
for (let x = 0; x < W; x++) ruler += x % 10 === 0 ? '|' : x % 5 === 0 ? '+' : ' ';
console.log(ruler);
for (let y = Number(y0); y <= Number(y1); y++) {
  let row = String(y).padStart(3, '0') + ' ';
  for (let x = 0; x < W; x++) {
    const i = (y * W + x) * 3;
    row += classify(data[i], data[i + 1], data[i + 2]);
  }
  console.log(row);
}
