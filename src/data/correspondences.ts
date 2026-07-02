/**
 * Extended correspondences for search functionality.
 * Based on Liber 777, Golden Dawn tables, and traditional Kabbalah.
 */

export interface Correspondences {
  animals: string[];
  stones: string[];
  bodyParts: string[];
  keywords: string[];  // Additional search terms
}

// Sephirot correspondences
export const sephirotCorrespondences: Record<string, Correspondences> = {
  kether: {
    animals: ['cisne', 'pomba', 'falcão'],
    stones: ['diamante', 'cristal de rocha'],
    bodyParts: ['crânio', 'topo da cabeça', 'glândula pineal'],
    keywords: ['unidade', 'coroa', 'deus', 'espírito', 'consciência pura', 'nada', 'ain soph', 'primeiro motor', 'big bang', 'ponto primordial'],
  },
  chokmah: {
    animals: ['falo', 'lince', 'condor'],
    stones: ['turquesa', 'estrela rubi'],
    bodyParts: ['lado esquerdo do rosto', 'hemisfério direito do cérebro'],
    keywords: ['sabedoria', 'pai', 'força vital', 'zodíaco', 'sêmen', 'inspiração', 'gênio', 'intuição repentina', 'big picture'],
  },
  binah: {
    animals: ['abelha', 'mulher', 'coruja'],
    stones: ['pérola', 'safira', 'ônix estrela'],
    bodyParts: ['lado direito do rosto', 'hemisfério esquerdo do cérebro', 'útero'],
    keywords: ['entendimento', 'mãe', 'forma', 'tempo', 'saturno', 'silêncio', 'mar', 'tristeza profunda', 'limitação', 'gestação', 'útero cósmico'],
  },
  chesed: {
    animals: ['unicórnio', 'cavalo', 'águia'],
    stones: ['safira', 'ametista', 'lápis-lazúli'],
    bodyParts: ['braço esquerdo', 'ombro esquerdo'],
    keywords: ['misericórdia', 'expansão', 'abundância', 'rei', 'trono', 'poder benévolo', 'generosidade', 'graça', 'construção', 'arquitetura', 'ordem social'],
  },
  gevurah: {
    animals: ['basilisco', 'lobo', 'cavalo de guerra', 'escorpião'],
    stones: ['rubi', 'granada', 'pedra de sangue'],
    bodyParts: ['braço direito', 'ombro direito'],
    keywords: ['força', 'severidade', 'justiça', 'guerra', 'cirurgia', 'fogo', 'destruição', 'disciplina', 'marte', 'corte', 'espada', 'lei marcial', 'raiva justa'],
  },
  tiferet: {
    animals: ['leão', 'fênix', 'aranha', 'pelicano'],
    stones: ['topázio', 'diamante amarelo', 'olho de tigre'],
    bodyParts: ['coração', 'peito', 'plexo solar'],
    keywords: ['beleza', 'harmonia', 'sol', 'ouro', 'cristo', 'sacrifício', 'equilíbrio', 'centro', 'eu superior', 'rei do mundo', 'rosa', 'cruz'],
  },
  netzach: {
    animals: ['pomba', 'lince', 'pardal', 'cisne'],
    stones: ['esmeralda', 'turmalina verde', 'quartzo rosa'],
    bodyParts: ['quadril direito', 'rim direito', 'órgãos reprodutores'],
    keywords: ['eternidade', 'vitória', 'vênus', 'amor', 'natureza', 'arte', 'música', 'dança', 'emoção', 'desejo', 'beleza', 'paixão', 'rosa', 'prazer'],
  },
  hod: {
    animals: ['macaco', 'íbis', 'raposa', 'serpente com asas'],
    stones: ['opala', 'ágata', 'pedra da lua'],
    bodyParts: ['quadril esquerdo', 'rim esquerdo', 'pernas'],
    keywords: ['glória', 'mercúrio', 'intelecto', 'comunicação', 'magia', 'ciência', 'linguagem', 'escrita', 'comércio', 'velocidade', 'livros', 'estudo'],
  },
  yesod: {
    animals: ['elefante', 'lebre', 'sapo', 'golfinho'],
    stones: ['quartzo', 'selenita', 'pedra da lua'],
    bodyParts: ['genitais', 'sistema reprodutor', 'bexiga'],
    keywords: ['fundação', 'lua', 'sonhos', 'inconsciente', 'astral', 'imaginação', 'memória', 'reflexo', 'maré', 'fertilidade', 'noite', 'espelho'],
  },
  malkuth: {
    animals: ['boi', 'esfinge', 'vaca', 'touro'],
    stones: ['cristal de rocha', 'ônix', 'sal marinho'],
    bodyParts: ['pés', 'ânus', 'corpo inteiro'],
    keywords: ['reino', 'terra', 'matéria', 'corpo', 'natureza', 'realidade', 'manifestação', 'mundo', 'dinheiro', 'alimento', 'estabilidade', 'plantação'],
  },
  daath: {
    animals: ['serpente', 'dragão', 'camaleão'],
    stones: ['moldavita', 'labradorita', 'obsidiana'],
    bodyParts: ['garganta', 'nuca', 'pescoço'],
    keywords: ['conhecimento', 'abismo', 'vazio', 'travessia', 'gnose', 'segredo', 'portal', 'dissolução', 'ego death', 'plutão'],
  },
};

// Path correspondences (by path number)
export const pathCorrespondences: Record<number, Correspondences> = {
  11: { animals: ['águia', 'condor', 'borboleta'], stones: ['topázio', 'calcedônia'], bodyParts: ['sistema respiratório'], keywords: ['ar', 'espírito', 'liberdade', 'vento', 'loucura', 'salto de fé', 'vazio'] },
  12: { animals: ['macaco', 'andorinha', 'íbis'], stones: ['opala', 'ágata'], bodyParts: ['sistema nervoso', 'mãos'], keywords: ['mercúrio', 'comunicação', 'magia', 'habilidade', 'truque', 'rapidez', 'ladrão'] },
  13: { animals: ['cachorro', 'camelo'], stones: ['pedra da lua', 'cristal'], bodyParts: ['útero', 'estômago'], keywords: ['lua', 'intuição', 'mistério', 'véu', 'subconsciente', 'sacerdotisa', 'silêncio', 'água'] },
  14: { animals: ['pomba', 'pardal', 'cisne', 'vaca'], stones: ['esmeralda', 'turquesa'], bodyParts: ['garganta', 'rins'], keywords: ['vênus', 'amor', 'natureza', 'fertilidade', 'mãe terra', 'jardim', 'colheita', 'vaca', 'boi', 'abundância'] },
  15: { animals: ['carneiro', 'coruja'], stones: ['rubi', 'granada'], bodyParts: ['cabeça', 'rosto'], keywords: ['áries', 'autoridade', 'pai', 'estrutura', 'lei', 'trono', 'carneiro', 'líder', 'comando', 'pioneiro'] },
  16: { animals: ['boi', 'touro', 'vaca', 'elefante'], stones: ['topázio', 'ágata'], bodyParts: ['pescoço', 'garganta', 'orelha'], keywords: ['touro', 'tradição', 'terra', 'hierofante', 'mestre', 'religião', 'boi', 'vaca', 'estabilidade', 'resistência', 'persistência'] },
  17: { animals: ['pássaro', 'borboleta', 'pega'], stones: ['alexandrita', 'turmalina'], bodyParts: ['ombros', 'braços', 'pulmões'], keywords: ['gêmeos', 'dualidade', 'escolha', 'comunicação', 'irmãos', 'casal', 'espelho', 'oposto'] },
  18: { animals: ['caranguejo', 'tartaruga', 'baleia'], stones: ['pérola', 'selenita', 'calcita'], bodyParts: ['peito', 'estômago', 'seios'], keywords: ['câncer', 'lar', 'família', 'proteção', 'mãe', 'emoção', 'nostalgia', 'água', 'casa', 'alimento'] },
  19: { animals: ['leão', 'gato', 'serpente'], stones: ['olho de gato', 'crisoberilo'], bodyParts: ['coração', 'costas', 'coluna'], keywords: ['leão', 'coragem', 'força', 'domínio', 'autocontrole', 'poder', 'realeza', 'orgulho', 'fogo'] },
  20: { animals: ['pomba virgem', 'lobo solitário'], stones: ['peridoto', 'cornalina'], bodyParts: ['intestino', 'abdômen'], keywords: ['virgem', 'serviço', 'solidão', 'sabedoria', 'lanterna', 'ermitão', 'análise', 'pureza', 'colheita'] },
  21: { animals: ['águia', 'golfinho', 'roda'], stones: ['safira', 'lápis-lazúli', 'ametista'], bodyParts: ['sistema digestivo'], keywords: ['júpiter', 'sorte', 'destino', 'ciclo', 'roda', 'mudança', 'fortuna', 'expansão', 'oportunidade'] },
  22: { animals: ['elefante', 'aranha'], stones: ['esmeralda', 'jade'], bodyParts: ['rins', 'parte inferior das costas'], keywords: ['libra', 'equilíbrio', 'justiça', 'balança', 'lei', 'verdade', 'ajuste', 'karma', 'decisão'] },
  23: { animals: ['peixe', 'golfinho', 'serpente marinha', 'águia'], stones: ['berilo', 'água-marinha'], bodyParts: ['sistema circulatório', 'sangue'], keywords: ['água', 'sacrifício', 'suspensão', 'meditação', 'entrega', 'enforcado', 'perspectiva', 'desapego'] },
  24: { animals: ['escorpião', 'serpente', 'águia', 'lobo'], stones: ['coral', 'turmalina negra'], bodyParts: ['órgãos reprodutores', 'nariz'], keywords: ['escorpião', 'transformação', 'morte', 'renascimento', 'ciclo', 'fim', 'início', 'transmutação', 'destruição criativa'] },
  25: { animals: ['cavalo', 'centauro', 'cão'], stones: ['jacinto', 'topázio'], bodyParts: ['coxas', 'quadris'], keywords: ['sagitário', 'viagem', 'temperança', 'equilíbrio', 'alquimia', 'mistura', 'arco', 'flecha', 'meta', 'aventura'] },
  26: { animals: ['bode', 'cabra', 'burro', 'crocodilo'], stones: ['ônix negro', 'obsidiana'], bodyParts: ['joelhos', 'esqueleto'], keywords: ['capricórnio', 'materialismo', 'tentação', 'sombra', 'humor negro', 'diabo', 'terra', 'ambição', 'bode', 'cabra', 'estrutura'] },
  27: { animals: ['cavalo de guerra', 'urso', 'lobo'], stones: ['rubi', 'granada', 'hematita'], bodyParts: ['cabeça', 'músculos'], keywords: ['marte', 'destruição', 'torre', 'choque', 'despertar', 'raio', 'colapso', 'reconstrução', 'revolução', 'guerra'] },
  28: { animals: ['homem/águia', 'pavão', 'borboleta'], stones: ['vidro artificial', 'quartzo azul'], bodyParts: ['panturrilhas', 'tornozelos'], keywords: ['aquário', 'esperança', 'estrela', 'futuro', 'inovação', 'grupo', 'humanidade', 'tecnologia', 'rebeldia'] },
  29: { animals: ['peixe', 'golfinho', 'cavalo-marinho', 'caranguejo'], stones: ['pérola', 'coral', 'água-marinha'], bodyParts: ['pés', 'sistema linfático'], keywords: ['peixes', 'ilusão', 'sonho', 'medo', 'sombra', 'lua', 'noite', 'inconsciente', 'oceano', 'profundidade'] },
  30: { animals: ['leão', 'falcão', 'galo', 'fênix'], stones: ['crisoberilo', 'olho de tigre'], bodyParts: ['coração', 'coluna vertebral'], keywords: ['sol', 'alegria', 'vitalidade', 'criança', 'sucesso', 'clareza', 'ouro', 'verão', 'dia', 'consciência'] },
  31: { animals: ['leão', 'serpente de fogo', 'salamandra'], stones: ['opala de fogo', 'granada'], bodyParts: ['sistema imunológico', 'sangue'], keywords: ['fogo', 'julgamento', 'renascimento', 'chamado', 'despertar', 'absolvição', 'karma', 'anjo', 'trombeta'] },
  32: { animals: ['crocodilo', 'boi', 'vaca', 'touro'], stones: ['ônix', 'obsidiana', 'sal'], bodyParts: ['esqueleto', 'pele', 'corpo inteiro'], keywords: ['saturno', 'mundo', 'integração', 'conclusão', 'dança', 'celebração', 'completude', 'terra', 'materialização', 'boi', 'vaca'] },
};
