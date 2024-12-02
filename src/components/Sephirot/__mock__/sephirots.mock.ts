import { BiggerSephirot, SephirotProps } from '../Sephirot.types';

export const commonStyles = {
  fontColor: 'white',
  strokeColor: 'white',
};

export const kether = {
  className: 'sephirot',
  world: {
    title: '',
    aspect: 'Onipresença',
    backgroundColor: 'rgb(247 247 247)',
    startOffset: { title: '10%', aspect: '28%' },
  },
  regent: {
    title: 'Serafins - Metatron',
    backgroundColor: 'rgb(242 242 242)',
    name: 'EHEIEH',
    defect: '',
    fontColor: 'black',
    startOffset: { title: '15%' },
  },
  sephirot: {
    name: 'Kether',
    valor: 'Coroa',
    backgroundColor: 'rgb(247 247 247)',
    strokeColor: 'black',
    startOffset: { name: '10%', valor: '20%' },
  },
  planet: {
    number: 1,
    backgroundColor: 'rgb(247 247 247)',
    fontColor: 'black',
    strokeColor: 'black',
    icon: '♆',
  },
};

export const daath = {
  className: 'sephirot',
  world: {
    title: '',
    aspect: '',
    backgroundColor: 'rgb(240 240 242)',
  },
  regent: {
    title: '',
    name: '',
    defect: '',
    ...commonStyles,
    backgroundColor: 'rgb(178 179 183)',
  },
  sephirot: {
    name: 'Daath',
    valor: '',
    backgroundColor: 'rgb(240 240 242)',
    strokeColor: commonStyles.strokeColor,
  },
  planet: {
    icon: '♇',
    number: 11,
    strokeColor: commonStyles.strokeColor,
    fontColor: commonStyles.fontColor,
    backgroundColor: 'rgb(178 179 183)',
  },
};

export const chokma = {
  className: 'sephirot',
  world: {
    title: 'Atziluth (mundo arquétipo)',
    aspect: 'Onipotência',
    backgroundColor: 'rgb(240 240 242)',
    startOffset: { title: '10%', aspect: '28%' },
  },
  regent: {
    title: 'Querubins - Raziel',
    name: 'Yah',
    defect: 'Tirania',
    ...commonStyles,
    backgroundColor: 'rgb(178 179 183)',
    startOffset: { title: '15%' },
  },
  sephirot: {
    name: 'Chokmah',
    valor: 'Sabedoria',
    backgroundColor: 'rgb(240 240 242)',
    strokeColor: commonStyles.strokeColor,
    startOffset: { name: '2%', valor: '2%' },
  },
  planet: {
    icon: '♅',
    number: 2,
    strokeColor: commonStyles.strokeColor,
    fontColor: commonStyles.fontColor,
    backgroundColor: 'rgb(178 179 183)',
  },
};

export const binah = {
  className: 'sephirot',
  world: {
    title: 'Briah (Mundo Criativo)',
    aspect: 'Onisciência',
    backgroundColor: 'rgb(217, 217, 217)',
    startOffset: { title: '10%', aspect: '28%' },
  },
  regent: {
    title: 'Tronos - Tzafquiel',
    name: 'YHVH ELOHIM',
    defect: 'Avareza',
    fontColor: commonStyles.fontColor,
    startOffset: { title: '15%' },
  },
  sephirot: {
    name: 'Binah',
    valor: 'Entendimento',
    backgroundColor: 'rgb(217, 217, 217)',
    strokeColor: commonStyles.strokeColor,
    startOffset: { name: '13%' },
  },
  planet: {
    number: 3,
    icon: '♄',
    backgroundColor: 'rgb(73, 73, 73)',
  },
};

export const malkuth: BiggerSephirot = {
  className: 'sephirot',
  world: {
    title: 'Assiah (mundo material)',
    aspect: '',
    strokeColor: 'white',
    fontColor: 'white',
    backgroundColor: 'url(#malkuth-world)',
    startOffset: { title: '10%', aspect: '28%' },
  },
  regent: {
    title: 'Sandalfon',
    name: 'Adonalha Aretz',
    defect: '',
    ...commonStyles,
    strokeColor: 'white',
    backgroundColor: 'url(#malkuth-regent)',
    startOffset: { title: '50%' },
  },
  sephirot: {
    name: 'Malkuth',
    valor: 'Reino',
    backgroundColor: 'url(#malkuth-sephirot)',
    strokeColor: 'white',
    fontColor: 'white',
    startOffset: { name: '8%', valor: '8%' },
  },
  planet: {
    icon: '⨁',
    number: 10,
    strokeColor: 'white',
    fontColor: commonStyles.fontColor,
    backgroundColor: 'url(#malkuth-planet)',
    coordinates: {
      icon: {
        x: 210,
      },
      number: {
        x: 235,
      },
    },
  },
};

export const biggerSephirots: SephirotProps<'bigger'>[] = [
  kether,
  chokma,
  binah,
];

export const yesod = {
  className: 'sephirot',
  regent: {
    title: 'Anjos - Gabriel',
    name: 'Shaddai El Chai',
    defect: 'Preguiça',
    ...commonStyles,
    backgroundColor: 'rgb(138, 41, 135)',
    startOffset: { title: '25%' },
  },
  sephirot: {
    name: 'Yesod',
    valor: 'Fundação',
    backgroundColor: 'rgb(205, 172, 209)',
    strokeColor: commonStyles.strokeColor,
    startOffset: { name: '9%', valor: '9%' },
  },
  planet: {
    icon: '☽',
    number: 9,
    strokeColor: commonStyles.strokeColor,
    fontColor: commonStyles.fontColor,
    backgroundColor: 'rgb(138, 41, 135)',
  },
};

export const chesed = {
  className: 'sephirot',
  regent: {
    title: 'Arcanjo - Tzadkiel',
    name: 'El Elyon',
    defect: 'Tirania',
    ...commonStyles,
    backgroundColor: 'rgb(46 46 135)',
    startOffset: { title: '30%' },
  },
  sephirot: {
    name: 'Chesed',
    valor: 'Misericórdia',
    backgroundColor: 'rgb(166 161 210)',
    strokeColor: commonStyles.strokeColor,
    startOffset: { name: '4%', valor: '4%' },
  },
  planet: {
    icon: '♃',
    number: 4,
    strokeColor: commonStyles.strokeColor,
    fontColor: commonStyles.fontColor,
    backgroundColor: 'rgb(46 46 135)',
  },
};

export const gevurah = {
  className: 'sephirot',
  regent: {
    title: 'Arcanjo - Camael',
    name: 'Elohim Gibor',
    defect: 'Ira',
    ...commonStyles,
    backgroundColor: 'rgb(228 29 31)',
    startOffset: { title: '20%', defect: '20%' },
  },
  sephirot: {
    name: 'Gevurah',
    valor: 'Força',
    backgroundColor: 'rgb(245 179 156)',
    strokeColor: commonStyles.strokeColor,
    startOffset: { name: '0%', valor: '20%' },
  },
  planet: {
    icon: '♂',
    number: 5,
    strokeColor: commonStyles.strokeColor,
    fontColor: commonStyles.fontColor,
    backgroundColor: 'rgb(228 29 31)',
  },
};

export const tiferet = {
  className: 'sephirot',
  regent: {
    title: 'Arcanjo - Raphael',
    name: 'Tetragrammaton',
    defect: 'Hipocrisia',
    ...commonStyles,
    backgroundColor: 'rgb(254 239 2)',
    startOffset: { title: '40%' },
  },
  sephirot: {
    name: 'Tiferet',
    valor: 'Beleza',
    backgroundColor: 'rgb(254 248 183)',
    strokeColor: commonStyles.strokeColor,
    startOffset: { name: '6%', valor: '6%' },
  },
  planet: {
    icon: '☉',
    number: 6,
    strokeColor: commonStyles.strokeColor,
    fontColor: commonStyles.fontColor,
    backgroundColor: 'rgb(254 239 2)',
    coordinates: {
      icon: {
        x: 205,
      },
      number: {
        x: 242,
      },
    },
  },
};

export const netzach = {
  className: 'sephirot',
  regent: {
    title: 'Arcanjo - Haniel',
    name: 'Elohim Tzabaoth',
    defect: 'Hedonismo',
    ...commonStyles,
    backgroundColor: 'rgb(1 152 72)',
    startOffset: { title: '45%' },
  },
  sephirot: {
    name: 'Netzach',
    valor: 'Eternidade',
    backgroundColor: 'rgb(169 212 180)',
    strokeColor: commonStyles.strokeColor,
    startOffset: { name: '7%', valor: '7%' },
  },
  planet: {
    icon: '♀',
    number: 7,
    strokeColor: commonStyles.strokeColor,
    fontColor: commonStyles.fontColor,
    backgroundColor: 'rgb(1 152 72)',
    coordinates: {
      icon: {
        x: 215,
      },
      number: {
        x: 243,
      },
    },
  },
};

export const hod = {
  className: 'sephirot',
  regent: {
    title: 'Arcanjo - Michael',
    name: 'Elohim Tzabaoth',
    defect: 'Corrupção',
    ...commonStyles,
    backgroundColor: 'rgb(243 145 21)',
    startOffset: { title: '50%' },
  },
  sephirot: {
    name: 'Hod',
    valor: 'Glória',
    backgroundColor: 'rgb(254 212 169)',
    strokeColor: commonStyles.strokeColor,
    startOffset: { name: '8%', valor: '8%' },
  },
  planet: {
    icon: '☿',
    number: 8,
    strokeColor: commonStyles.strokeColor,
    fontColor: commonStyles.fontColor,
    backgroundColor: 'rgb(243 145 21)',
    coordinates: {
      number: {
        x: 242,
      },
    },
  },
};

export const sephirots: SephirotProps<'simple'>[] = [
  yesod,
  chesed,
  gevurah,
  tiferet,
  netzach,
  hod,
];
