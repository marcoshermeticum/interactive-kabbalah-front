/**
 * Inserts the "theFool" block (tmp/theFool-*.txt) into each locale messages
 * file, right after the existing "temperance" block inside "tarot".
 *
 * Text-based insertion (via Node, UTF-8 safe) so the hand-formatted JSON
 * style of the message files is preserved instead of re-serializing them.
 */
const fs = require('fs');

const pairs = [
  ['src/i18n/messages/pt-BR.json', 'tmp/theFool-pt.txt'],
  ['src/i18n/messages/en-US.json', 'tmp/theFool-en.txt'],
  ['src/i18n/messages/ja.json', 'tmp/theFool-ja.txt'],
  ['src/i18n/messages/he.json', 'tmp/theFool-he.txt'],
];

/** Index of the `}` that closes the object opened at startIdx. */
function findObjectClose(s, startIdx) {
  let depth = 0;
  for (let i = startIdx; i < s.length; i++) {
    const c = s[i];
    if (c === '"') {
      i++;
      while (i < s.length) {
        if (s[i] === '\\') i++; // skip escaped char
        else if (s[i] === '"') break;
        i++;
      }
      continue;
    }
    if (c === '{') depth++;
    else if (c === '}') {
      depth--;
      if (depth === 0) return i;
    }
  }
  return -1;
}

for (const [file, frag] of pairs) {
  const original = fs.readFileSync(file, 'utf8');
  const block = fs.readFileSync(frag, 'utf8').replace(/\r\n/g, '\n').trim();

  JSON.parse(original); // baseline must already be valid
  const fragmentObject = JSON.parse('{\n' + block + '\n}'); // block must be valid as an object member

  if (original.indexOf('"theFool"') >= 0) {
    throw new Error('"theFool" already present in ' + file);
  }
  const keyIdx = original.indexOf('"temperance"');
  if (keyIdx < 0) throw new Error('"temperance" not found in ' + file);
  const openIdx = original.indexOf('{', keyIdx);
  const closeIdx = findObjectClose(original, openIdx);
  if (closeIdx < 0) throw new Error('could not match braces in ' + file);

  const nl = original.includes('\r\n') ? '\r\n' : '\n';
  const updated =
    original.slice(0, closeIdx + 1) + ',' + nl + block + original.slice(closeIdx + 1);

  JSON.parse(updated); // result must still be valid
  fs.writeFileSync(file, updated, 'utf8');
  const regions = Object.keys(fragmentObject.theFool.regions).join(', ');
  console.log('OK ' + file + ' -> regions: ' + regions);
}
console.log('All locales merged.');
