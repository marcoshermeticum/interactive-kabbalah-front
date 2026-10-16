const unicodeNames = [
  'QUINTESSENCE',
  'AIR',
  'FIRE',
  'EARTH',
  'WATER',
  'AQUAFORTIS',
  'AQUA REGIA',
  'AQUA REGIA-2',
  'AQUA VITAE',
  'AQUA VITAE-2',
  'VINEGAR',
  'VINEGAR-2',
  'VINEGAR-3',
  'SULFUR',
  'PHILOSOPHERS SULFUR',
  'BLACK SULFUR',
  'MERCURY SUBLIMATE',
  'MERCURY SUBLIMATE-2',
  'MERCURY SUBLIMATE-3',
  'CINNABAR',
  'SALT',
  'NITRE',
  'VITRIOL',
  'VITRIOL-2',
  'ROCK SALT',
  'ROCK SALT-2',
  'GOLD',
  'SILVER',
  'IRON ORE',
  'IRON ORE-2',
  'CROCUS OF IRON',
  'REGULUS OF IRON',
  'COPPER ORE',
  'IRON-COPPER ORE',
  'SUBLIMATE OF COPPER',
  'CROCUS OF COPPER',
  'CROCUS OF COPPER-2',
  'COPPER ANTIMONIATE',
  'SALT OF COPPER ANTIMONIATE',
  'SUBLIMATE OF SALT OF COPPER',
  'VERDIGRIS',
  'TIN ORE',
  'LEAD ORE',
  'ANTIMONY ORE',
  'SUBLIMATE OF ANTIMONY',
  'SALT OF ANTIMONY',
  'SUBLIMATE OF SALT OF ANTIMONY',
  'VINEGAR OF ANTIMONY',
  'REGULUS OF ANTIMONY',
  'REGULUS OF ANTIMONY-2',
  'REGULUS',
  'REGULUS-2',
  'REGULUS-3',
  'REGULUS-4',
  'ALKALI',
  'ALKALI-2',
  'MARCASITE',
  'SAL-AMMONIAC',
  'ARSENIC',
  'REALGAR',
  'REALGAR-2',
  'AURIPIGMENT',
  'BISMUTH ORE',
  'TARTAR',
  'TARTAR-2',
  'QUICK LIME',
  'BORAX',
  'BORAX-2',
  'BORAX-3',
  'ALUM',
  'OIL',
  'SPIRIT',
  'TINCTURE',
  'GUM',
  'WAX',
  'POWDER',
  'CALX',
  'TUTTY',
  'CAPUT MORTUUM',
  'SCEPTER OF JOVE',
  'CADUCEUS',
  'TRIDENT',
  'STARRED TRIDENT',
  'LODESTONE',
  'SOAP',
  'URINE',
  'HORSE DUNG',
  'ASHES',
  'POT ASHES',
  'BRICK',
  'POWDERED BRICK',
  'AMALGAM',
  'STRATUM SUPER STRATUM',
  'STRATUM SUPER STRATUM-2',
  'SUBLIMATION',
  'PRECIPITATE',
  'DISTILL',
  'DISSOLVE',
  'DISSOLVE-2',
  'PURIFY',
  'PUTREFACTION',
  'CRUCIBLE',
  'CRUCIBLE-2',
  'CRUCIBLE-3',
  'CRUCIBLE-4',
  'CRUCIBLE-5',
  'ALEMBIC',
  'BATH OF MARY',
  'BATH OF VAPOURS',
  'RETORT',
  'HOUR',
  'NIGHT',
  'DAY-NIGHT',
  'MONTH',
  'HALF DRAM',
  'HALF OUNCE',
] as const;

export type AlchemicalDescriptionKey =
  | 'elements'
  | 'materials'
  | 'processes'
  | 'equipment'
  | 'timeAndMeasures';

export type AlchemicalSymbol = {
  codePoint: number;
  character: string;
  name: string;
  translationIndex: number;
  descriptionKey: AlchemicalDescriptionKey;
};

function getDescriptionKey(codePoint: number): AlchemicalDescriptionKey {
  if (codePoint <= 0x1f704) return 'elements';
  if (codePoint <= 0x1f75d) return 'materials';
  if (codePoint <= 0x1f764) return 'processes';
  if (codePoint <= 0x1f76d) return 'equipment';
  return 'timeAndMeasures';
}

export const alchemicalSymbols: AlchemicalSymbol[] = unicodeNames.map((name, index) => {
  const codePoint = 0x1f700 + index;

  return {
    codePoint,
    character: String.fromCodePoint(codePoint),
    name: `ALCHEMICAL SYMBOL FOR ${name}`,
    translationIndex: index,
    descriptionKey: getDescriptionKey(codePoint),
  };
});
