import type { SephirotData } from '@/components/Sephirot/types';

// Qliphoth — the shadow spheres of the Tree of Death
// Based on Golden Dawn, Crowley's Liber 777, and Kenneth Grant
export const qliphoth: Record<string, SephirotData> = {
  thaumiel: {
    name: 'Thaumiel',
    number: 1,
    icon: '⛧',
    planetName: 'Plutão/Primum Mobile',
    valor: 'Dois que se Opõem',
    regent: { title: 'Demônio', name: 'Satã & Moloch', defect: 'Dualidade egoísta' },
    world: { title: 'Anti-Atziluth', aspect: 'Divisão do Uno' },
    archetypes: ['O Rebelde Orgulhoso', 'Lúcifer Caído', 'O Ego Inflado'],
    minorArcana: [
      'Ás de Paus invertido (tirania)',
      'Ás de Copas invertido (vazio emocional)',
      'Ás de Espadas invertido (mente dividida)',
      'Ás de Ouros invertido (ganância)',
    ],
    colors: { outer: '#1a0a0a', middle: '#3d1010', inner: '#0d0d0d', text: '#ff4444', stroke: '#660000' },
    integration:
      'Ao reconhecer a dualidade interna, desenvolve-se a capacidade de sustentar paradoxos sem fragmentação, permitindo liderança autêntica e visão unificadora.',
    dailyLife:
      'Manifesta-se como necessidade constante de polarizar situações, criando divisões em grupos e relacionamentos por meio de posicionamentos rígidos do tipo "eu contra todos".',
  },
  ghogiel: {
    name: 'Ghogiel',
    number: 2,
    icon: '🝊',
    planetName: 'Netuno (sombra)',
    valor: 'Os Obstaculizadores',
    regent: { title: 'Demônio', name: 'Belzebu & Belial', defect: 'Falsa sabedoria' },
    world: { title: 'Anti-Atziluth', aspect: 'Bloqueio criativo' },
    archetypes: ['O Sabotador Interno', 'A Ganância Intelectual', 'O Medo Criativo'],
    minorArcana: [
      '2 de Paus invertido (indecisão)',
      '2 de Copas invertido (dependência)',
      '2 de Espadas invertido (autoengano)',
      '2 de Ouros invertido (instabilidade)',
    ],
    colors: { outer: '#0a0a1a', middle: '#1a1a3d', inner: '#0d0d20', text: '#8888ff', stroke: '#333366' },
    integration:
      'Ao enfrentar os bloqueios intelectuais, reconhece-se a diferença entre conhecimento acumulado e sabedoria vivida, liberando o fluxo criativo genuíno.',
    dailyLife:
      'Manifesta-se como procrastinação criativa, acúmulo de informações sem aplicação prática e tendência a desqualificar ideias próprias antes de experimentá-las.',
  },
  satariel: {
    name: 'Satariel',
    number: 3,
    icon: '🝆',
    planetName: 'Saturno (sombra)',
    valor: 'Os Ocultadores',
    regent: { title: 'Demônio', name: 'Lucifuge Rofocale', defect: 'Ignorância voluntária' },
    world: { title: 'Anti-Briah', aspect: 'Negação da verdade' },
    archetypes: ['O Véu da Ignorância', 'A Negação', 'O Medo de Ver'],
    minorArcana: [
      '3 de Paus invertido (atraso)',
      '3 de Copas invertido (excesso)',
      '3 de Espadas invertido (confusão)',
      '3 de Ouros invertido (mediocridade)',
    ],
    colors: { outer: '#0a0a0a', middle: '#2d2d2d', inner: '#1a1a1a', text: '#aaaaaa', stroke: '#444444' },
    integration:
      'Ao olhar para aquilo que se prefere não ver, desenvolve-se discernimento profundo e a habilidade de distinguir entre proteção saudável e negação paralisante.',
    dailyLife:
      'Manifesta-se como evitação sistemática de conversas difíceis, adiamento de exames médicos e preferência por explicações simplistas diante de situações complexas.',
  },
  ghagsheblah: {
    name: "Gha'agsheblah",
    number: 4,
    icon: '♇',
    planetName: 'Júpiter (sombra)',
    valor: 'Os Quebradores',
    regent: { title: 'Demônio', name: 'Ashtaroth', defect: 'Amor sufocante' },
    archetypes: ['A Amante Possessiva', 'Compaixão Doentia', 'Caridade que Aprisiona'],
    minorArcana: [
      '4 de Paus invertido (opressão festiva)',
      '4 de Copas invertido (apatia)',
      '4 de Espadas invertido (exaustão)',
      '4 de Ouros invertido (avareza)',
    ],
    colors: { outer: '#1a0a2a', middle: '#2d1a4d', inner: '#150a30', text: '#bb77ff', stroke: '#4a2a6a' },
    integration:
      'Ao reconhecer os padrões de generosidade condicionada, aprende-se a oferecer cuidado sem apego ao resultado, cultivando compaixão que respeita a autonomia alheia.',
    dailyLife:
      'Manifesta-se como dificuldade em respeitar limites alheios, oferta de ajuda não solicitada e ressentimento quando a gratidão esperada não é demonstrada.',
  },
  golohab: {
    name: 'Golohab',
    number: 5,
    icon: '🜃',
    planetName: 'Marte (sombra)',
    valor: 'Os Queimadores',
    regent: { title: 'Demônio', name: 'Asmodeus', defect: 'Violência cega' },
    archetypes: ['O Lobo Voraz', 'Raiva Incontrolável', 'Fanatismo Punitivo'],
    minorArcana: [
      '5 de Paus invertido (conflito destrutivo)',
      '5 de Copas invertido (luto patológico)',
      '5 de Espadas invertido (crueldade)',
      '5 de Ouros invertido (miséria)',
    ],
    colors: { outer: '#2a0a0a', middle: '#5d1010', inner: '#3d0505', text: '#ff6633', stroke: '#882200' },
    integration:
      'Ao acolher a raiva como sinal de limites violados, transforma-se a energia destrutiva em assertividade e capacidade de agir com determinação diante de injustiças.',
    dailyLife:
      'Manifesta-se como explosões de irritação desproporcional, impaciência crônica no trânsito ou filas, e tendência a resolver conflitos por intimidação em vez de diálogo.',
  },
  tagimron: {
    name: 'Tagimron',
    number: 6,
    icon: '☠',
    planetName: 'Sol (sombra)',
    valor: 'Os Disputadores',
    regent: { title: 'Demônio', name: 'Belphegor', defect: 'Vaidade espiritual' },
    archetypes: ['A Vaidade Invertida', 'Cegueira Espiritual', 'Loucura Egoica'],
    minorArcana: [
      '6 de Paus invertido (arrogância)',
      '6 de Copas invertido (nostalgia tóxica)',
      '6 de Espadas invertido (estagnação)',
      '6 de Ouros invertido (dívida kármica)',
    ],
    colors: { outer: '#2a2a00', middle: '#4d4d0a', inner: '#333300', text: '#ffcc00', stroke: '#666600' },
    integration:
      'Ao observar a necessidade de reconhecimento, desenvolve-se autoestima baseada em experiência interna em vez de validação externa, permitindo brilhar sem ofuscar os outros.',
    dailyLife:
      'Manifesta-se como busca excessiva por elogios, comparação constante com pares em redes sociais e dificuldade em celebrar conquistas alheias sem sentir diminuição pessoal.',
  },
  gharab: {
    name: "A'arab Zaraq",
    number: 7,
    icon: '🜁',
    planetName: 'Vênus (sombra)',
    valor: 'Os Corrosivos',
    regent: { title: 'Demônio', name: 'Baal', defect: 'Desejo destrutivo' },
    archetypes: ['O Conquistador Insaciável', 'Paixão que Devora', 'Inveja Corrosiva'],
    minorArcana: [
      '7 de Paus invertido (agressão)',
      '7 de Copas invertido (vício)',
      '7 de Espadas invertido (traição)',
      '7 de Ouros invertido (impaciência)',
    ],
    colors: { outer: '#0a1a0a', middle: '#1a3d1a', inner: '#0d2a0d', text: '#44ff44', stroke: '#226622' },
    integration:
      'Ao reconhecer o desejo como força motriz, aprende-se a direcionar a intensidade emocional para vínculos construtivos e expressão criativa em vez de consumo compulsivo.',
    dailyLife:
      'Manifesta-se como compras impulsivas, padrões de relacionamento baseados em idealização seguida de desinteresse rápido e dificuldade de contentamento com o que já se possui.',
  },
  samael: {
    name: 'Samael',
    number: 8,
    icon: '🜄',
    planetName: 'Mercúrio (sombra)',
    valor: 'Os Enganadores',
    regent: { title: 'Demônio', name: 'Adramalech', defect: 'Ilusão mental' },
    archetypes: ['O Manipulador Mental', 'Mente Enganosa', 'Charlatão Intelectual'],
    minorArcana: [
      '8 de Paus invertido (precipitação)',
      '8 de Copas invertido (fuga)',
      '8 de Espadas invertido (paranoia)',
      '8 de Ouros invertido (perfeccionismo tóxico)',
    ],
    colors: { outer: '#1a0a00', middle: '#3d2200', inner: '#2a1500', text: '#ffaa33', stroke: '#664400' },
    integration:
      'Ao perceber os próprios padrões de racionalização, desenvolve-se honestidade intelectual e comunicação transparente, usando a inteligência para esclarecer em vez de obscurecer.',
    dailyLife:
      'Manifesta-se como justificativas elaboradas para comportamentos contraditórios, uso de linguagem ambígua para evitar compromisso e tendência a manipular narrativas em benefício próprio.',
  },
  gamaliel: {
    name: 'Gamaliel',
    number: 9,
    icon: '☾',
    planetName: 'Lua (sombra)',
    valor: 'Os Obscenos',
    regent: { title: 'Demônio', name: 'Lilith', defect: 'Libido obsessiva' },
    archetypes: ['A Amante Selvagem', 'Erotismo Sombrio', 'Instinto Primal Descontrolado'],
    minorArcana: [
      '9 de Paus invertido (paranoia)',
      '9 de Copas invertido (glutonaria)',
      '9 de Espadas invertido (pesadelos)',
      '9 de Ouros invertido (solidão material)',
    ],
    colors: { outer: '#1a0a1a', middle: '#3d1a3d', inner: '#2a0d2a', text: '#ff55ff', stroke: '#662266' },
    integration:
      'Ao acolher os instintos sem julgamento, desenvolve-se uma relação consciente com o corpo e os ciclos emocionais, transformando compulsão em vitalidade direcionada.',
    dailyLife:
      'Manifesta-se como oscilações entre repressão e indulgência excessiva, dificuldade em manter rotinas de sono regulares e uso de estímulos sensoriais para evitar o contato com emoções subjacentes.',
  },
  nahemoth: {
    name: 'Nahemoth',
    number: 10,
    icon: '⊗',
    planetName: 'Terra (sombra)',
    valor: 'Rainha da Noite',
    regent: { title: 'Demônio', name: 'Nahema', defect: 'Sedução letal' },
    world: { title: 'Anti-Assiah', aspect: 'Caos final' },
    archetypes: ['A Tentadora Final', 'Todos os Males Condensados', 'A Sombra Coletiva'],
    minorArcana: [
      '10 de Paus invertido (fardo insuportável)',
      '10 de Copas invertido (família destruída)',
      '10 de Espadas invertido (fim total)',
      '10 de Ouros invertido (perda de tudo)',
    ],
    colors: { outer: '#1a0a05', middle: '#3d1a0a', inner: '#0a1a0a', text: '#ff8844', stroke: '#553311' },
    integration:
      'Ao reconhecer a atração pelo conforto material como necessidade de segurança, desenvolve-se presença corporal e a capacidade de habitar o mundo físico sem se perder nele.',
    dailyLife:
      'Manifesta-se como apego excessivo a posses e rotinas, dificuldade em aceitar mudanças no ambiente físico e busca de segurança exclusivamente em acumulação material.',
  },
  daath_qliphoth: {
    name: 'O Abismo',
    number: 0,
    icon: '∅',
    planetName: 'Choronzon',
    valor: 'A Travessia',
    regent: { title: 'Guardião', name: 'Choronzon (333)', defect: 'Dissolução do ego' },
    archetypes: ['O Abismo', 'Dispersão Total', 'Choronzon'],
    minorArcana: [],
    colors: { outer: '#050505', middle: '#1a1a1a', inner: '#000000', text: '#666666', stroke: '#333333' },
    integration:
      'Ao atravessar a dispersão sem resistir, reconstrói-se a identidade sobre bases mais amplas, integrando fragmentos antes inacessíveis da experiência pessoal.',
    dailyLife:
      'Manifesta-se como crises de identidade recorrentes, sensação persistente de falta de propósito e dificuldade em manter continuidade entre projetos ou fases da vida.',
  },
};
