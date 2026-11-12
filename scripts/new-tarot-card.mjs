#!/usr/bin/env node

import { existsSync, readFileSync, writeFileSync } from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import readline from 'node:readline/promises';

const SCRIPT_DIR = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(SCRIPT_DIR, '..');
const TAROT_DIR = path.join(ROOT, 'src/data/tarot');
const MESSAGES_DIR = path.join(ROOT, 'src/i18n/messages');
const CATALOG_FILE = path.join(TAROT_DIR, 'majorArcana.ts');
const LOCALES = ['pt-BR', 'en-US', 'ja', 'he'];
const ROMAN = [
  '0', 'I', 'II', 'III', 'IV', 'V', 'VI', 'VII', 'VIII', 'IX', 'X',
  'XI', 'XII', 'XIII', 'XIV', 'XV', 'XVI', 'XVII', 'XVIII', 'XIX', 'XX', 'XXI',
];
const MIN_REGIONS = 5;
const MAX_REGIONS = 8;
const MAX_REGIONS_HARD = 12;
const KEBAB = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;

main().catch((error) => {
  console.error(`\n✖ ${error.message}`);
  process.exit(1);
});

async function main() {
  const args = parseArgs(process.argv.slice(2));
  if (args.help) {
    printHelp();
    return;
  }

  let rawConfig;
  if (args.config) {
    rawConfig = readJson(args.config);
  } else {
    if (!process.stdin.isTTY) {
      throw new Error('O modo interativo precisa de um terminal. Use --config <arquivo> para automação.');
    }
    rawConfig = await promptConfig();
    if (!rawConfig) {
      console.log('Cancelado.');
      return;
    }
  }

  const plan = buildPlan(rawConfig);
  applyPlan(plan, args.dryRun);
}

// ─── CLI args ────────────────────────────────────────────────────────────────

function parseArgs(argv) {
  const args = { help: false, dryRun: false, config: null };

  for (let i = 0; i < argv.length; i += 1) {
    const arg = argv[i];
    if (arg === '--help' || arg === '-h') args.help = true;
    else if (arg === '--dry-run' || arg === '-n') args.dryRun = true;
    else if (arg === '--config') {
      args.config = argv[i + 1];
      if (!args.config) throw new Error('--config exige o caminho de um arquivo JSON.');
      i += 1;
    } else {
      throw new Error(`Argumento desconhecido: ${arg}`);
    }
  }

  return args;
}

function printHelp() {
  console.log(`
Cria o esqueleto de uma carta de Tarot interativa.

Uso:
  npm run tarot:new
  npm run tarot:new -- --config caminho.json
  npm run tarot:new -- --dry-run

Flags:
  --config <arquivo>  Cria a carta a partir de um JSON, sem prompts.
  --dry-run, -n       Valida e mostra o que seria criado, sem gravar.
  --help, -h          Mostra esta ajuda.

O comando gera:
  • src/data/tarot/<slug>.ts com as regiões em caixas provisórias
  • bloco tarot.<camel> nos 4 arquivos de idioma
  • import e entrada em cardData (majorArcana.ts)
  • entrada no mosaico, se a carta ainda não estiver no catálogo

Ele NÃO posiciona as regiões. Depois de criar, abra a single e use
"🎯 Posicionar destaques" para ajustar e copiar o JSON.

Documentação: docs/new-tarot-card-cli.md
`);
}

// ─── Interactive mode ────────────────────────────────────────────────────────

async function promptConfig() {
  const rl = readline.createInterface({ input: process.stdin, output: process.stdout });
  rl.on('SIGINT', () => {
    rl.close();
    process.exit(130);
  });

  try {
    const entries = parseCatalog(readFileSync(CATALOG_FILE, 'utf8'));
    let slug;
    let entry;

    while (true) {
      slug = (await rl.question('Slug da carta (kebab-case, ex.: the-star): ')).trim();
      try {
        assertSlugFormat(slug);
        assertSlugAvailable(slug);
        entry = entries.find((item) => item.slug === slug);
        break;
      } catch (error) {
        console.log(`✖ ${error.message}`);
      }
    }

    const camel = toCamel(slug);
    const names = readLocaleNames(camel);
    const name = await askDefault(rl, 'Nome em inglês', names['en-US'] || titleCase(slug));
    const number = await askNumber(rl, 'Número do arcano (0–21)', entry?.number ?? 0);

    let imageInput;
    while (true) {
      imageInput = await askDefault(
        rl,
        'Imagem (JPG/PNG)',
        entry?.image || `/tarot/${slug}.jpg`
      );
      try {
        resolveImage(imageInput);
        break;
      } catch (error) {
        console.log(`✖ ${error.message}`);
      }
    }

    console.log('\nRegiões — os textos abaixo são o conteúdo do painel em pt-BR.');
    const regions = [];

    while (true) {
      const suffix = regions.length ? ' (Enter para concluir)' : '';
      const id = (await rl.question(`Região ${regions.length + 1} — id kebab-case${suffix}: `)).trim();

      if (!id) {
        if (!regions.length) {
          console.log('✖ Informe pelo menos uma região.');
          continue;
        }
        break;
      }

      try {
        assertRegionIdFormat(id);
        if (regions.some((region) => region.id === id)) {
          throw new Error(`Região duplicada: ${id}.`);
        }
      } catch (error) {
        console.log(`✖ ${error.message}`);
        continue;
      }

      const icon = (await rl.question('Ícone (emoji, opcional): ')).trim();
      const title = await askRequired(rl, 'Título (pt-BR)');
      const description = await askRequired(rl, 'Descrição (pt-BR)');

      regions.push({ id, icon: icon || undefined, title, description });

      if (regions.length >= MAX_REGIONS_HARD) {
        console.log(`Limite de ${MAX_REGIONS_HARD} regiões atingido.`);
        break;
      }
    }

    if (regions.length < MIN_REGIONS || regions.length > MAX_REGIONS) {
      console.log(
        `⚠ O guia recomenda de ${MIN_REGIONS} a ${MAX_REGIONS} regiões; esta carta terá ${regions.length}.`
      );
    }

    const ptName = await askDefault(rl, 'Nome em pt-BR', names['pt-BR'] || name);
    const ptIntro = await askRequired(rl, 'Intro em pt-BR');

    const locales = {
      'pt-BR': {
        name: ptName,
        intro: ptIntro,
        regions: Object.fromEntries(
          regions.map((region) => [
            region.id,
            {
              ...(region.icon ? { icon: region.icon } : {}),
              title: region.title,
              description: region.description,
            },
          ])
        ),
      },
    };

    const fillTranslations = await askYesNo(
      rl,
      'Preencher en-US, ja e he agora? (senão usará pt-BR como placeholder)',
      false
    );

    for (const locale of LOCALES.slice(1)) {
      if (!fillTranslations) {
        locales[locale] = {
          name: locale === 'en-US' ? name : names[locale] || name,
          intro: ptIntro,
          regions: cloneRegions(locales['pt-BR'].regions, false),
        };
        continue;
      }

      console.log(`\n[${locale}]`);
      const localeName = await askDefault(rl, 'Nome', names[locale] || name);
      const localeIntro = await askRequired(rl, 'Intro');
      const localeRegions = {};

      for (const region of regions) {
        console.log(`— ${region.id}`);
        localeRegions[region.id] = {
          title: await askRequired(rl, '  Título'),
          description: await askRequired(rl, '  Descrição'),
        };
      }

      locales[locale] = { name: localeName, intro: localeIntro, regions: localeRegions };
    }

    const placeholders = !fillTranslations;
    console.log('\nResumo:');
    console.log(`  ${ptName} (${name}) — ${ROMAN[number]} (${number})`);
    console.log(`  slug: ${slug} · id i18n: ${camel}`);
    console.log(`  imagem: ${imageInput}`);
    console.log(`  regiões: ${regions.map((region) => region.id).join(', ')}`);

    const confirmed = await askYesNo(rl, 'Criar a carta com esses dados?', true);
    if (!confirmed) return null;

    return {
      slug,
      name,
      number,
      image: imageInput,
      locales,
      meta: { placeholders },
    };
  } finally {
    rl.close();
  }
}

function askDefault(rl, label, defaultValue) {
  return rl.question(`${label} [${defaultValue}]: `).then((answer) => answer.trim() || defaultValue);
}

async function askRequired(rl, label) {
  while (true) {
    const answer = (await rl.question(`${label}: `)).trim();
    if (answer) return answer;
    console.log('✖ Este campo é obrigatório.');
  }
}

async function askNumber(rl, label, defaultValue) {
  while (true) {
    const answer = (await rl.question(`${label} [${defaultValue}]: `)).trim();
    const value = answer ? Number(answer) : defaultValue;
    if (Number.isInteger(value) && value >= 0 && value <= 21) return value;
    console.log('✖ Informe um inteiro entre 0 e 21.');
  }
}

async function askYesNo(rl, label, defaultYes) {
  const suffix = defaultYes ? '[S/n]' : '[s/N]';
  const answer = (await rl.question(`${label} ${suffix}: `)).trim().toLowerCase();
  if (!answer) return defaultYes;
  return ['s', 'sim', 'y', 'yes'].includes(answer);
}

function cloneRegions(regions, withIcons) {
  return Object.fromEntries(
    Object.entries(regions).map(([id, region]) => [
      id,
      {
        ...(withIcons && region.icon ? { icon: region.icon } : {}),
        title: region.title,
        description: region.description,
      },
    ])
  );
}

// ─── Validation / planning ───────────────────────────────────────────────────

function buildPlan(raw) {
  if (!raw || typeof raw !== 'object' || Array.isArray(raw)) {
    throw new Error('A configuração precisa ser um objeto JSON.');
  }

  const slug = requireString(raw.slug, 'slug');
  assertSlugFormat(slug);
  const camel = toCamel(slug);

  const name = requireString(raw.name, 'name');
  const number = requireInteger(raw.number, 'number', 0, 21);
  const image = resolveImage(requireString(raw.image, 'image'));
  const size = imageSize(image.abs);
  const viewBox = {
    width: 100,
    height: Math.round(((100 * size.height) / size.width) * 10) / 10,
  };

  if (!raw.locales || typeof raw.locales !== 'object' || Array.isArray(raw.locales)) {
    throw new Error('A configuração precisa do objeto "locales".');
  }

  for (const locale of LOCALES) {
    const data = raw.locales[locale];
    if (!data) throw new Error(`Falta locales["${locale}"].`);
    requireString(data.name, `locales["${locale}"].name`);
    requireString(data.intro, `locales["${locale}"].intro`);
    if (!data.regions || typeof data.regions !== 'object' || Array.isArray(data.regions)) {
      throw new Error(`locales["${locale}"].regions precisa ser um objeto.`);
    }
  }

  const regionIds = Object.keys(raw.locales['pt-BR'].regions);
  if (!regionIds.length) {
    throw new Error('A carta precisa de pelo menos uma região em locales["pt-BR"].regions.');
  }
  if (regionIds.length > MAX_REGIONS_HARD) {
    throw new Error(`Máximo de ${MAX_REGIONS_HARD} regiões por carta.`);
  }

  for (const id of regionIds) {
    assertRegionIdFormat(id);
    for (const locale of LOCALES) {
      const region = raw.locales[locale].regions[id];
      if (!region) throw new Error(`Falta a região "${id}" em locales["${locale}"].regions.`);
      requireString(region.title, `locales["${locale}"].regions["${id}"].title`);
      requireString(region.description, `locales["${locale}"].regions["${id}"].description`);
      if (region.icon !== undefined && typeof region.icon !== 'string') {
        throw new Error(`locales["${locale}"].regions["${id}"].icon precisa ser texto.`);
      }
    }
  }

  for (const locale of LOCALES) {
    const extra = Object.keys(raw.locales[locale].regions).filter((id) => !regionIds.includes(id));
    if (extra.length) {
      throw new Error(`Regiões extras em locales["${locale}"]: ${extra.join(', ')}.`);
    }
  }

  assertSlugAvailable(slug);

  for (const locale of LOCALES) {
    const json = JSON.parse(readFileSync(localePath(locale), 'utf8'));
    if (json.tarot?.[camel]) {
      throw new Error(`Já existe o bloco tarot.${camel} em ${locale}.json.`);
    }
  }

  const catalogRaw = readFileSync(CATALOG_FILE, 'utf8');
  const entries = parseCatalog(catalogRaw);
  const catalogEntry = entries.find((entry) => entry.slug === slug);

  if (catalogEntry) {
    if (catalogEntry.i18nKey !== camel) {
      throw new Error(
        `O catálogo usa i18nKey "${catalogEntry.i18nKey}" para "${slug}", mas o esperado é "${camel}".`
      );
    }
    if (catalogEntry.number !== number) {
      throw new Error(
        `O catálogo associa "${slug}" ao número ${catalogEntry.number}, mas você informou ${number}.`
      );
    }
  } else {
    const sameNumber = entries.find((entry) => entry.number === number);
    if (sameNumber) {
      throw new Error(`O número ${number} já pertence a "${sameNumber.slug}" no catálogo.`);
    }
  }

  const regions = regionIds.map((id) => ({
    id,
    icon: raw.locales['pt-BR'].regions[id].icon || undefined,
    i18nKey: `${camel}.regions.${toCamel(id)}`,
  }));

  const warnings = [];
  if (regions.length < MIN_REGIONS || regions.length > MAX_REGIONS) {
    warnings.push(
      `O guia recomenda de ${MIN_REGIONS} a ${MAX_REGIONS} regiões; esta carta terá ${regions.length}.`
    );
  }
  if (raw.meta?.placeholders) {
    warnings.push(
      'en-US, ja e he estão com o texto de pt-BR como placeholder. Revise as traduções depois.'
    );
  }
  if (catalogEntry && catalogEntry.image !== image.publicPath) {
    warnings.push(
      `O catálogo já apontava para "${catalogEntry.image}"; a imagem será atualizada para "${image.publicPath}".`
    );
  }

  return {
    slug,
    camel,
    name,
    number,
    roman: ROMAN[number],
    image,
    size,
    viewBox,
    regions,
    locales: raw.locales,
    catalogEntry,
    warnings,
  };
}

function assertSlugFormat(slug) {
  if (!slug) throw new Error('O slug é obrigatório.');
  if (!KEBAB.test(slug)) {
    throw new Error(`Slug inválido: "${slug}". Use kebab-case (letras minúsculas, números e hífens).`);
  }
}

function assertRegionIdFormat(id) {
  if (!KEBAB.test(id)) {
    throw new Error(`Id de região inválido: "${id}". Use kebab-case.`);
  }
}

function assertSlugAvailable(slug) {
  const dataFile = path.join(TAROT_DIR, `${slug}.ts`);
  if (existsSync(dataFile)) {
    throw new Error(`O arquivo ${relative(dataFile)} já existe.`);
  }

  const catalog = readFileSync(CATALOG_FILE, 'utf8');
  const cardDataKey = new RegExp(`['"]${escapeRegExp(slug)}['"]\\s*:`);
  if (cardDataKey.test(catalog)) {
    throw new Error(`A carta "${slug}" já está registrada em cardData.`);
  }
}

function requireString(value, field) {
  if (typeof value !== 'string' || !value.trim()) {
    throw new Error(`"${field}" precisa ser um texto não vazio.`);
  }
  return value.trim();
}

function requireInteger(value, field, min, max) {
  if (!Number.isInteger(value) || value < min || value > max) {
    throw new Error(`"${field}" precisa ser um inteiro entre ${min} e ${max}.`);
  }
  return value;
}

// ─── Image ───────────────────────────────────────────────────────────────────

function resolveImage(input) {
  let relativePath = input.trim();

  if (relativePath.startsWith('/')) relativePath = relativePath.slice(1);
  if (relativePath.startsWith('public/')) relativePath = relativePath.slice('public/'.length);

  const abs = path.resolve(ROOT, 'public', relativePath);
  const publicPath = `/${path.relative(path.join(ROOT, 'public'), abs).split(path.sep).join('/')}`;

  if (!existsSync(abs)) {
    throw new Error(`Imagem não encontrada: ${publicPath} (procurada em ${abs}).`);
  }

  return { abs, publicPath };
}

function imageSize(file) {
  const buffer = readFileSync(file);

  if (buffer.length > 24 && buffer.toString('ascii', 1, 4) === 'PNG') {
    return { width: buffer.readUInt32BE(16), height: buffer.readUInt32BE(20) };
  }

  if (buffer[0] === 0xff && buffer[1] === 0xd8) {
    let offset = 2;
    while (offset < buffer.length) {
      if (buffer[offset] !== 0xff) {
        offset += 1;
        continue;
      }

      const marker = buffer[offset + 1];
      if (marker === 0xd8 || marker === 0x01 || (marker >= 0xd0 && marker <= 0xd7)) {
        offset += 2;
        continue;
      }
      if (marker === 0xd9 || marker === 0xda) break;
      if (offset + 3 >= buffer.length) break;

      const length = buffer.readUInt16BE(offset + 2);
      const isStartOfFrame =
        marker >= 0xc0 && marker <= 0xcf && marker !== 0xc4 && marker !== 0xc8 && marker !== 0xcc;

      if (isStartOfFrame) {
        return {
          height: buffer.readUInt16BE(offset + 5),
          width: buffer.readUInt16BE(offset + 7),
        };
      }

      offset += 2 + length;
    }
  }

  throw new Error('Formato de imagem não suportado. Use JPG ou PNG.');
}

// ─── Generation ──────────────────────────────────────────────────────────────

function applyPlan(plan, dryRun) {
  const dataPath = path.join(TAROT_DIR, `${plan.slug}.ts`);
  const dataFile = buildDataFile(plan);

  const localeFiles = LOCALES.map((locale) => {
    const file = localePath(locale);
    const raw = readFileSync(file, 'utf8');
    const content = insertLocaleBlock(raw, localeBlock(plan, locale));
    JSON.parse(content);
    return { file, content };
  });

  const catalogFile = CATALOG_FILE;
  const catalogContent = updateCatalog(readFileSync(catalogFile, 'utf8'), plan);
  assertCatalogUpdate(catalogContent, plan);

  printSummary(plan);

  if (dryRun) {
    console.log('\n(dry-run) Nada foi gravado. Arquivos que seriam alterados:');
    console.log(`  + ${relative(dataPath)}`);
    for (const { file } of localeFiles) console.log(`  ~ ${relative(file)}`);
    console.log(`  ~ ${relative(catalogFile)}`);
    console.log('\n--- src/data/tarot/<slug>.ts ---');
    console.log(dataFile);
    return;
  }

  writeFileSync(dataPath, dataFile, 'utf8');
  for (const { file, content } of localeFiles) writeFileSync(file, content, 'utf8');
  writeFileSync(catalogFile, catalogContent, 'utf8');

  console.log('\n✓ Carta criada:');
  console.log(`  + ${relative(dataPath)}`);
  console.log(`  ~ ${LOCALES.map((locale) => `src/i18n/messages/${locale}.json`).join(', ')}`);
  console.log(`  ~ ${relative(catalogFile)} (import + cardData)`);
  if (!plan.catalogEntry) console.log(`  ~ ${relative(catalogFile)} (nova entrada no mosaico)`);

  for (const warning of plan.warnings) console.log(`\n⚠ ${warning}`);

  console.log(`
Próximos passos:
  1. npm run dev
  2. abra http://localhost:3000/pt-BR/tarot/${plan.slug}
  3. clique em "🎯 Posicionar destaques" e ajuste as caixas
  4. "Copiar JSON" e substitua o array regions em ${relative(dataPath)}
  5. npx tsc --noEmit && npm run build
`);
}

function printSummary(plan) {
  const ptName = plan.locales['pt-BR'].name;
  console.log('\nResumo da carta:');
  console.log(`  ${ptName} (${plan.name}) — ${plan.roman} (${plan.number})`);
  console.log(`  slug: ${plan.slug} · id i18n: ${plan.camel}`);
  console.log(
    `  imagem: ${plan.image.publicPath} (${plan.size.width}×${plan.size.height} → viewBox 100×${plan.viewBox.height})`
  );
  console.log(`  regiões (${plan.regions.length}): ${plan.regions.map((region) => region.id).join(', ')}`);
}

function buildDataFile(plan) {
  const regionBlocks = plan.regions.map((region, index) => {
    const box = placeholderBox(index, plan.regions.length);
    const lines = [
      '    {',
      `      id: ${quote(region.id)},`,
    ];
    if (region.icon) lines.push(`      icon: ${quote(region.icon)},`);
    lines.push(
      '      // TODO: position — placeholder box, replace with the editor output.',
      `      shape: { type: 'rect', x: ${box.x}, y: ${box.y}, width: ${box.width}, height: ${box.height} },`,
      `      i18nKey: ${quote(region.i18nKey)},`,
      '    },'
    );
    return lines.join('\n');
  });

  return `import type { TarotCard } from './types';

/**
 * ${plan.name} (${plan.roman}) — Rider-Waite major arcana.
 *
 * viewBox ${plan.viewBox.width} x ${plan.viewBox.height} to match the
 * ${plan.size.width}×${plan.size.height} artwork aspect ratio.
 * Region boxes are placeholders laid out in a grid; use the region editor
 * ("Posicionar destaques") to position them and paste the exported JSON back.
 */
export const ${plan.camel}: TarotCard = {
  id: ${quote(plan.camel)},
  number: ${plan.number},
  name: ${quote(plan.name)},
  image: ${quote(plan.image.publicPath)},
  viewBox: { width: ${plan.viewBox.width}, height: ${plan.viewBox.height} },
  regions: [
${regionBlocks.join('\n')}
  ],
};
`;
}

function placeholderBox(index, total) {
  const width = 14;
  const height = 10;
  const columns = Math.min(5, total);
  return {
    x: 6 + (index % columns) * (width + 3),
    y: 8 + Math.floor(index / columns) * (height + 3),
    width,
    height,
  };
}

function localeBlock(plan, locale) {
  const data = plan.locales[locale];
  const lines = [
    `    ${JSON.stringify(plan.camel)}: {`,
    `      "name": ${JSON.stringify(data.name)},`,
    `      "intro": ${JSON.stringify(data.intro)},`,
    '      "regions": {',
  ];

  plan.regions.forEach((region, index) => {
    const content = data.regions[region.id];
    const comma = index === plan.regions.length - 1 ? '' : ',';
    lines.push(
      `        ${JSON.stringify(toCamel(region.id))}: {`,
      `          "title": ${JSON.stringify(content.title)},`,
      `          "description": ${JSON.stringify(content.description)}`,
      `        }${comma}`
    );
  });

  lines.push('      }', '    }');
  return lines.join('\n');
}

function insertLocaleBlock(raw, block) {
  const eol = raw.includes('\r\n') ? '\r\n' : '\n';
  const marker = '  "tarotWaite": {';
  const markerIndex = raw.indexOf(marker);
  if (markerIndex === -1) throw new Error('Não encontrei o namespace "tarotWaite" no arquivo de idioma.');

  const closeIndex = raw.lastIndexOf(`${eol}  },${eol}`, markerIndex);
  if (closeIndex === -1) throw new Error('Não encontrei o fechamento do namespace "tarot".');

  const before = raw.slice(0, closeIndex).trimEnd();
  const comma = before.endsWith(',') ? '' : ',';
  const withEol = block.replace(/\n/g, eol);

  return `${raw.slice(0, closeIndex)}${comma}${eol}${withEol}${raw.slice(closeIndex)}`;
}

function updateCatalog(raw, plan) {
  const eol = raw.includes('\r\n') ? '\r\n' : '\n';
  let next = raw;

  if (plan.catalogEntry) {
    const entryLine = new RegExp(
      `^(\\s*\\{ slug: '${escapeRegExp(plan.slug)}'[^\\r\\n]*?image: ')[^']*('.*)$`,
      'm'
    );
    if (entryLine.test(next)) {
      next = next.replace(entryLine, `$1${plan.image.publicPath}$2`);
    }
  } else {
    const arrayStart = next.indexOf('export const majorArcana: MajorArcanaEntry[] = [');
    if (arrayStart === -1) throw new Error('Array majorArcana não encontrado.');
    const arrayClose = next.indexOf(`${eol}];`, arrayStart);
    if (arrayClose === -1) throw new Error('Fechamento do array majorArcana não encontrado.');

    const entryLine = `  { slug: '${plan.slug}', i18nKey: '${plan.camel}', number: ${plan.number}, roman: '${plan.roman}', image: '${plan.image.publicPath}' },`;
    next = `${next.slice(0, arrayClose)}${eol}${entryLine}${next.slice(arrayClose)}`;
  }

  if (!next.includes(`from './${plan.slug}'`)) {
    const importPattern = /^import [^\r\n]+ from '\.\/[^']+';/gm;
    let match;
    let insertAt = -1;
    while ((match = importPattern.exec(next))) insertAt = match.index + match[0].length;
    if (insertAt === -1) throw new Error('Não encontrei os imports de cartas em majorArcana.ts.');

    next = `${next.slice(0, insertAt)}${eol}import { ${plan.camel} } from './${plan.slug}';${next.slice(insertAt)}`;
  }

  const cardDataKey = new RegExp(`['"]${escapeRegExp(plan.slug)}['"]\\s*:`);
  if (!cardDataKey.test(next)) {
    const cardDataStart = next.indexOf('const cardData: Record<string, TarotCard> = {');
    if (cardDataStart === -1) throw new Error('Objeto cardData não encontrado.');
    const cardDataClose = next.indexOf(`${eol}};`, cardDataStart);
    if (cardDataClose === -1) throw new Error('Fechamento do cardData não encontrado.');

    next = `${next.slice(0, cardDataClose)}${eol}  '${plan.slug}': ${plan.camel},${next.slice(cardDataClose)}`;
  }

  return next;
}

function assertCatalogUpdate(content, plan) {
  if (!content.includes(`from './${plan.slug}'`)) {
    throw new Error('Falha ao adicionar o import em majorArcana.ts.');
  }
  if (!content.includes(`'${plan.slug}': ${plan.camel}`)) {
    throw new Error('Falha ao adicionar a entrada em cardData.');
  }
  if (!new RegExp(`slug: '${escapeRegExp(plan.slug)}'`).test(content)) {
    throw new Error('Falha ao garantir a entrada no array majorArcana.');
  }
}

// ─── Helpers ─────────────────────────────────────────────────────────────────

function parseCatalog(raw) {
  const pattern =
    /\{\s*slug:\s*'([^']+)',\s*i18nKey:\s*'([^']+)',\s*number:\s*(\d+),\s*roman:\s*'([^']+)',\s*image:\s*'([^']+)'\s*\}/g;
  const entries = [];

  let match;
  while ((match = pattern.exec(raw))) {
    entries.push({
      slug: match[1],
      i18nKey: match[2],
      number: Number(match[3]),
      roman: match[4],
      image: match[5],
    });
  }

  return entries;
}

function readLocaleNames(camel) {
  const names = {};

  for (const locale of LOCALES) {
    try {
      const json = JSON.parse(readFileSync(localePath(locale), 'utf8'));
      const name = json.tarotWaite?.cards?.[camel]?.name;
      if (typeof name === 'string' && name.trim()) names[locale] = name.trim();
    } catch {
      // A locale ausente só significa que o nome não vem preenchido.
    }
  }

  return names;
}

function readJson(file) {
  const abs = path.resolve(process.cwd(), file);
  if (!existsSync(abs)) throw new Error(`Configuração não encontrada: ${file}.`);

  try {
    return JSON.parse(readFileSync(abs, 'utf8'));
  } catch (error) {
    throw new Error(`JSON inválido em ${file}: ${error.message}`);
  }
}

function localePath(locale) {
  return path.join(MESSAGES_DIR, `${locale}.json`);
}

function toCamel(value) {
  return value
    .split('-')
    .filter(Boolean)
    .map((part, index) => (index === 0 ? part : part[0].toUpperCase() + part.slice(1)))
    .join('');
}

function titleCase(value) {
  return value
    .split('-')
    .filter(Boolean)
    .map((part) => part[0].toUpperCase() + part.slice(1))
    .join(' ');
}

function quote(value) {
  return `'${String(value).replace(/\\/g, '\\\\').replace(/'/g, "\\'").replace(/\r?\n/g, '\\n')}'`;
}

function escapeRegExp(value) {
  return value.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

function relative(file) {
  return path.relative(ROOT, file).split(path.sep).join('/');
}
