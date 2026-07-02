// 22 Tunnels of Set — the shadow paths connecting Qliphoth
// Based on Kenneth Grant's "Nightside of Eden" and Golden Dawn zodiacal princes
export interface QliphothPathDef {
  from: string;
  to: string;
  number: number;
  letter: string;
  letterName: string;
  sign: string;
  tunnel: string;
  meaning: string;
  color: string;
  virtue: string;
  vice: string;
}

export const qliphothPaths: QliphothPathDef[] = [
  { from: 'thaumiel', to: 'ghogiel', number: 11, letter: 'א', letterName: 'Aleph', sign: '🜁', tunnel: "Amprodias", meaning: 'Ar corrompido', color: '#660033', virtue: 'Confrontar o vazio', vice: 'Loucura dispersiva' },
  { from: 'thaumiel', to: 'satariel', number: 12, letter: 'ב', letterName: 'Beth', sign: '☿', tunnel: "Baratchial", meaning: 'Mercúrio sombrio', color: '#660033', virtue: 'Verdade oculta', vice: 'Manipulação total' },
  { from: 'thaumiel', to: 'tagimron', number: 13, letter: 'ג', letterName: 'Gimel', sign: '☽', tunnel: "Gargophias", meaning: 'Lua negra', color: '#1a1a4d', virtue: 'Intuição das profundezas', vice: 'Pesadelos incessantes' },
  { from: 'ghogiel', to: 'satariel', number: 14, letter: 'ד', letterName: 'Daleth', sign: '♀', tunnel: "Dagdagiel", meaning: 'Vênus invertida', color: '#003300', virtue: 'Amor sem ilusão', vice: 'Luxúria sem fim' },
  { from: 'ghogiel', to: 'tagimron', number: 15, letter: 'ה', letterName: 'Heh', sign: '♈', tunnel: "Hemethterith", meaning: 'Ba\'airiron (Áries)', color: '#4d0000', virtue: 'Ação sem medo', vice: 'Violência gratuita' },
  { from: 'ghogiel', to: 'ghagsheblah', number: 16, letter: 'ו', letterName: 'Vav', sign: '♉', tunnel: "Uriens", meaning: 'Adimiron (Touro)', color: '#4d3300', virtue: 'Persistência sagrada', vice: 'Teimosia mortal' },
  { from: 'satariel', to: 'tagimron', number: 17, letter: 'ז', letterName: 'Zayin', sign: '♊', tunnel: "Zamradiel", meaning: 'Tzaladimiron (Gêmeos)', color: '#4d3300', virtue: 'Dualidade aceita', vice: 'Esquizofrenia espiritual' },
  { from: 'satariel', to: 'golohab', number: 18, letter: 'ח', letterName: 'Cheth', sign: '♋', tunnel: "Characith", meaning: 'Shichiriron (Câncer)', color: '#4d3300', virtue: 'Proteção da sombra', vice: 'Paranoia defensiva' },
  { from: 'golohab', to: 'ghagsheblah', number: 19, letter: 'ט', letterName: 'Teth', sign: '♌', tunnel: "Temphioth", meaning: 'Shelhabiron (Leão)', color: '#664400', virtue: 'Força selvagem', vice: 'Orgulho destrutivo' },
  { from: 'ghagsheblah', to: 'tagimron', number: 20, letter: 'י', letterName: 'Yod', sign: '♍', tunnel: "Yamatu", meaning: 'Tzaphiriron (Virgem)', color: '#003300', virtue: 'Serviço na escuridão', vice: 'Obsessão por controle' },
  { from: 'ghagsheblah', to: 'gharab', number: 21, letter: 'כ', letterName: 'Kaph', sign: '♃', tunnel: "Kurgasiax", meaning: 'Roda invertida', color: '#330033', virtue: 'Aceitar os ciclos sombrios', vice: 'Desespero cíclico' },
  { from: 'golohab', to: 'tagimron', number: 22, letter: 'ל', letterName: 'Lamed', sign: '♎', tunnel: "Lafcursiax", meaning: "A'abiriron (Libra)", color: '#003300', virtue: 'Justiça implacável', vice: 'Vingança sem misericórdia' },
  { from: 'golohab', to: 'samael', number: 23, letter: 'מ', letterName: 'Mem', sign: '🜄', tunnel: "Malkunofat", meaning: 'Água estagnada', color: '#003366', virtue: 'Mergulho no inconsciente', vice: 'Afogamento emocional' },
  { from: 'tagimron', to: 'gharab', number: 24, letter: 'נ', letterName: 'Nun', sign: '♏', tunnel: "Niantiel", meaning: 'Necheshthiron (Escorpião)', color: '#003311', virtue: 'Morte do ego', vice: 'Autodestruição' },
  { from: 'tagimron', to: 'gamaliel', number: 25, letter: 'ס', letterName: 'Samekh', sign: '♐', tunnel: "Saksaksalim", meaning: 'Necheshiron (Sagitário)', color: '#003366', virtue: 'Busca além do véu', vice: 'Fanatismo cego' },
  { from: 'tagimron', to: 'samael', number: 26, letter: 'ע', letterName: 'Ayin', sign: '♑', tunnel: "A'ano'nin", meaning: 'Dagdagiron (Capricórnio)', color: '#330033', virtue: 'Estrutura na sombra', vice: 'Materialismo absoluto' },
  { from: 'samael', to: 'gharab', number: 27, letter: 'פ', letterName: 'Peh', sign: '♂', tunnel: "Parfaxitas", meaning: 'Marte invertido', color: '#4d0000', virtue: 'Destruição criativa', vice: 'Caos sem propósito' },
  { from: 'gharab', to: 'gamaliel', number: 28, letter: 'צ', letterName: 'Tzaddi', sign: '♒', tunnel: "Tzuflifu", meaning: 'Bahimiron (Aquário)', color: '#330033', virtue: 'Rebelião consciente', vice: 'Anarquia total' },
  { from: 'gharab', to: 'nahemoth', number: 29, letter: 'ק', letterName: 'Qoph', sign: '♓', tunnel: "Qulielfi", meaning: 'Nashimiron (Peixes)', color: '#4d3300', virtue: 'Visão noturna', vice: 'Ilusão perpétua' },
  { from: 'samael', to: 'gamaliel', number: 30, letter: 'ר', letterName: 'Resh', sign: '☉', tunnel: "Raflifu", meaning: 'Sol negro', color: '#4d3300', virtue: 'Iluminação pela sombra', vice: 'Cegueira espiritual' },
  { from: 'samael', to: 'nahemoth', number: 31, letter: 'ש', letterName: 'Shin', sign: '🜂', tunnel: "Shalicu", meaning: 'Fogo devorador', color: '#4d0000', virtue: 'Purificação pelo fogo', vice: 'Destruição total' },
  { from: 'gamaliel', to: 'nahemoth', number: 32, letter: 'ת', letterName: 'Tav', sign: '♄', tunnel: "Thantifaxath", meaning: 'Saturno abismal', color: '#003366', virtue: 'Completude sombria', vice: 'Aprisionamento eterno' },
];
