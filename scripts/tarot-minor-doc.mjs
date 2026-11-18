// Generates docs/tarot-minor-arcana-regions.md from docs/tarot-content/*.json
// and the minor arcana catalog (correspondences). Run: npm run tarot:doc
import fs from 'node:fs';
import { minorArcana } from '../src/data/tarot/minorArcana.ts';

const SUIT_ORDER = ['wands', 'cups', 'swords', 'pentacles'];
const SUIT_PT = { wands: 'Paus', cups: 'Copas', swords: 'Espadas', pentacles: 'Ouros' };
const SUIT_EN = { wands: 'Wands', cups: 'Cups', swords: 'Swords', pentacles: 'Pentacles' };
const ELEMENT_PT = { fire: 'Fogo', water: 'Água', air: 'Ar', earth: 'Terra' };
const PLANET_PT = { sun: 'Sol', moon: 'Lua', mercury: 'Mercúrio', venus: 'Vênus', mars: 'Marte', jupiter: 'Júpiter', saturn: 'Saturno' };
const SIGN_PT = {
  aries: 'Áries', taurus: 'Touro', gemini: 'Gêmeos', cancer: 'Câncer', leo: 'Leão', virgo: 'Virgem',
  libra: 'Libra', scorpio: 'Escorpião', sagittarius: 'Sagitário', capricorn: 'Capricórnio', aquarius: 'Aquário', pisces: 'Peixes',
};
const SEPH = {
  kether: 'Kether', chokmah: 'Chokmah', binah: 'Binah', chesed: 'Chesed', gevurah: 'Gevurah',
  tiferet: 'Tiferet', netzach: 'Netzach', hod: 'Hod', yesod: 'Yesod', malkuth: 'Malkuth',
};
const RANK_LABEL = ['Ás', '2', '3', '4', '5', '6', '7', '8', '9', '10', 'Valete', 'Cavaleiro', 'Rainha', 'Rei'];

const esc = (text) => text.replace(/\|/g, '\\|');
const byslug = new Map(minorArcana.map((entry) => [entry.slug, entry]));
const content = new Map();
for (const file of fs.readdirSync('docs/tarot-content')) {
  if (!file.endsWith('.json')) continue;
  const json = JSON.parse(fs.readFileSync(`docs/tarot-content/${file}`, 'utf8'));
  if (json.arcana === 'minor') content.set(json.slug, json);
}
if (content.size !== 56) throw new Error(`expected 56 minor cards, found ${content.size}`);

function corrLine(entry) {
  const c = entry.correspondence;
  const parts = [`Elemento: ${ELEMENT_PT[c.element]}`];
  if (c.sephirah) parts.push(`Sephirah: ${SEPH[c.sephirah]}`);
  if (c.planet) parts.push(`Decã: ${PLANET_PT[c.planet]} em ${SIGN_PT[c.sign]}`);
  if (c.letter) parts.push(`Letra: ${c.letter} ${c.letterName}`, `Elemento da corte: ${ELEMENT_PT[c.courtElement]}`);
  return parts.join(' · ');
}

let md = `# Arcanos Menores — Catálogo de Regiões Interativas

> Complemento do guia [docs/interactive-tarot-cards.md](./interactive-tarot-cards.md) e do
> [catálogo dos arcanos maiores](./tarot-major-arcana-regions.md): este documento define **O QUE**
> é interativo em cada uma das 56 cartas dos arcanos menores do Rider-Waite. Os textos estão em
> **pt-BR**; as versões em en-US, ja e he ficam nos arquivos de conteúdo.
>
> **Fonte da verdade:** [\`docs/tarot-content/<slug>.json\`](./tarot-content/). Este arquivo é um
> espelho legível desses JSONs (gerado a partir deles). Para mudar um texto, edite o JSON e
> regenere este documento com \`npm run tarot:doc\`.
>
> **Como criar uma carta:** \`npm run tarot:new -- --card ace-of-wands\` (ou \`npm run tarot:new\` para
> o menu; \`--suit cups\` filtra por naipe). O comando gera o arquivo de dados com **caixas
> provisórias**, os textos nos 4 idiomas e o registro em \`minorArcana.ts\`. O posicionamento dos
> destaques é feito depois, no editor ("🎯 Posicionar destaques"). Veja
> [new-tarot-card-cli.md](./new-tarot-card-cli.md).

---

## Convenções

| Item | Regra |
|------|-------|
| \`slug\` | \`<posição>-of-<naipe>\`, em inglês e kebab-case: \`ace-of-wands\`, \`two-of-cups\`, \`page-of-swords\`, \`king-of-pentacles\`. É também o trecho da URL e o nome do arquivo da arte |
| \`id\` da carta / chave i18n | camelCase do slug (\`aceOfWands\`), igual ao bloco \`tarot.<id>\` |
| Posições (\`rank\`) | 1 Ás · 2 a 10 numeradas · 11 Valete (Page) · 12 Cavaleiro (Knight) · 13 Rainha (Queen) · 14 Rei (King) |
| Naipes (\`suit\`) | \`wands\` Paus (fogo) · \`cups\` Copas (água) · \`swords\` Espadas (ar) · \`pentacles\` Ouros (terra) |
| Arte | \`public/tarot/minor/<slug>.jpg\`, 1086×1810 px → viewBox \`{ width: 100, height: 166.7 }\` |
| Regiões por carta | **3 a 6** (cada uma destas tem 4). Menos símbolos que os arcanos maiores, que têm 5 a 8 |
| \`id\` da região | kebab-case, único dentro da carta |
| Ícone | emoji exibido no painel e na pílula, guardado em \`regions[].icon\` |
| Ordem das regiões | do fundo para a frente: **a última vence o clique** nas sobreposições |
| Textos | \`title\` e \`description\` obrigatórios nos 4 idiomas; \`intro\` é o resumo que aparece sob o título da carta |
| Posicionamento | **não feito**: o comando cria as caixas em grade e o editor ajusta |

### Correspondências (Golden Dawn)

As correspondências aparecem como chips na página da carta e ficam em \`src/data/tarot/minorArcana.ts\`.

- **Ases a Dez:** a sephirah do número (Ás = Kether … Dez = Malkuth).
- **Dois a Dez:** o decã (planeta + signo) do elemento do naipe, na ordem caldaica.
- **Corte** (Valete, Cavaleiro, Rainha, Rei): letra do Tetragrama e elemento dentro do elemento do naipe. Rei = Yod (fogo), Rainha = Heh (água), Cavaleiro = Vav (ar), Valete = Heh final (terra). É a leitura da Golden Dawn com os nomes de Waite: o "Cavaleiro" da Golden Dawn é o Rei, e o "Príncipe" é o Cavaleiro.

| Posição | Paus (fogo) | Copas (água) | Espadas (ar) | Ouros (terra) |
|---------|-------------|--------------|--------------|----------------|
`;

for (let rank = 1; rank <= 14; rank += 1) {
  const cells = SUIT_ORDER.map((suit) => {
    const entry = [...byslug.values()].find((e) => e.suit === suit && e.number === rank);
    const c = entry.correspondence;
    if (rank === 1) return `${SEPH[c.sephirah]}`;
    if (rank <= 10) return `${SEPH[c.sephirah]} · ${PLANET_PT[c.planet]} em ${SIGN_PT[c.sign]}`;
    return `${c.letter} ${c.letterName} · ${ELEMENT_PT[c.courtElement]}`;
  });
  md += `| ${RANK_LABEL[rank - 1]} | ${cells.join(' | ')} |\n`;
}

md += `
### Tabela-resumo

| Naipe | Cartas | Regiões |
|-------|:------:|:-------:|
`;
for (const suit of SUIT_ORDER) {
  const cards = [...content.values()].filter((c) => c.suit === suit);
  md += `| ${SUIT_PT[suit]} (${SUIT_EN[suit]}) | ${cards.length} | ${cards.reduce((n, c) => n + c.regions.length, 0)} |\n`;
}
const totalRegions = [...content.values()].reduce((n, c) => n + c.regions.length, 0);
md += `| **Total** | **56** | **${totalRegions}** |\n\n---\n`;

for (const suit of SUIT_ORDER) {
  md += `\n## ${SUIT_PT[suit]} (${SUIT_EN[suit]}) — ${ELEMENT_PT[{ wands: 'fire', cups: 'water', swords: 'air', pentacles: 'earth' }[suit]]}\n`;
  const cards = [...content.values()].filter((c) => c.suit === suit).sort((a, b) => a.rank - b.rank);
  for (const card of cards) {
    const pt = card.locales['pt-BR'];
    const entry = byslug.get(card.slug);
    md += `\n### ${pt.name} (\`${card.slug}\`)\n\n`;
    md += `- **Nome (EN):** ${card.locales['en-US'].name} · **Arte:** \`${card.image}\` · **Posição:** ${RANK_LABEL[card.rank - 1]}\n`;
    md += `- **Correspondências:** ${corrLine(entry)}\n`;
    md += `- **Resumo (\`intro\`):** ${pt.intro}\n\n`;
    md += '| `id` | Ícone | Título | Descrição |\n|------|:-----:|--------|-----------|\n';
    for (const region of card.regions) {
      const text = pt.regions[region.id];
      md += `| \`${region.id}\` | ${region.icon} | ${esc(text.title)} | ${esc(text.description)} |\n`;
    }
  }
}

fs.writeFileSync('docs/tarot-minor-arcana-regions.md', md, 'utf8');
console.log('written', md.length, 'chars,', totalRegions, 'regions');
