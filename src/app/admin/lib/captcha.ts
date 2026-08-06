import crypto from 'crypto';

/**
 * Esoteric Captcha — Identify planetary/occult symbols
 * 
 * Uses leet-speak obfuscation on key terms to hinder automated scraping.
 * A bot reading the HTML won't trivially match "T1fΣrΣt" to "Tiferet"
 * in any knowledge base. Not unbreakable (OCR/AI can decode), but adds
 * meaningful friction against basic automated attacks.
 */

export interface CaptchaChallenge {
  id: string;
  question: string;
  options: { label: string; value: string }[];
  /** HMAC signature of the correct answer — never sent to client */
  signature: string;
  /** Timestamp for expiration */
  timestamp: number;
}

const CAPTCHA_SECRET = process.env.CAPTCHA_SECRET || 'tiferet-netzach-hod-yesod-malkuth';
const CAPTCHA_TTL = 5 * 60 * 1000; // 5 minutes

/**
 * Leet-speak substitution map for obfuscation.
 * Each letter can have multiple variants; one is chosen randomly.
 */
const LEET_MAP: Record<string, string[]> = {
  a: ['α', '4', '@', 'ά'],
  e: ['Σ', '3', 'ε', 'ξ'],
  i: ['1', 'ι', '!', 'ί'],
  o: ['0', 'θ', 'ø', 'ο'],
  s: ['$', '5', 'ş', 'ζ'],
  t: ['†', '7', 'τ'],
  h: ['η', '#', 'ħ'],
  n: ['π', 'η', 'ñ'],
  u: ['μ', 'ü', 'ύ'],
  r: ['я', 'ρ', 'г'],
  l: ['ℓ', '|', 'λ'],
  m: ['м', 'μ'],
  k: ['κ', 'к'],
  b: ['β', '6', 'ь'],
  d: ['δ', 'ð'],
  g: ['ğ', '9'],
  c: ['ç', '¢'],
  f: ['ƒ', 'φ'],
  p: ['ρ', 'þ'],
  v: ['ν', 'υ'],
  w: ['ω', 'ψ'],
  y: ['ψ', 'γ'],
  z: ['ζ', '2'],
};

/**
 * Obfuscate a word using leet-speak substitutions.
 * Randomly replaces 40-60% of applicable letters.
 */
function obfuscate(word: string): string {
  return word
    .split('')
    .map((char) => {
      const lower = char.toLowerCase();
      const variants = LEET_MAP[lower];
      if (variants && Math.random() > 0.45) {
        const replacement = variants[Math.floor(Math.random() * variants.length)];
        // Preserve case feel — if original was uppercase, keep the leet char as-is
        return replacement;
      }
      return char;
    })
    .join('');
}

// Challenge definitions with obfuscatable terms
interface ChallengeDefinition {
  questionTemplate: string;
  obfuscateWord: string;
  answer: string;
  options: string[];
}

const CHALLENGES: ChallengeDefinition[] = [
  {
    questionTemplate: 'Qual é o planeta associado a {word}?',
    obfuscateWord: 'Tiferet',
    answer: 'sol',
    options: ['Sol', 'Lua', 'Marte', 'Vênus'],
  },
  {
    questionTemplate: 'Qual Sephirah é associada a {word}?',
    obfuscateWord: 'Vênus',
    answer: 'netzach',
    options: ['Netzach', 'Hod', 'Yesod', 'Gevurah'],
  },
  {
    questionTemplate: 'Qual é o símbolo de {word}?',
    obfuscateWord: 'Malkuth',
    answer: '⨁',
    options: ['⨁', '☉', '☽', '♄'],
  },
  {
    questionTemplate: 'Quem é o Arcanjo de {word}?',
    obfuscateWord: 'Tiferet',
    answer: 'raphael',
    options: ['Raphael', 'Gabriel', 'Michael', 'Metatron'],
  },
  {
    questionTemplate: 'Qual Arcano Maior está no caminho {word}?',
    obfuscateWord: '13',
    answer: 'sacerdotisa',
    options: ['A Sacerdotisa', 'O Mago', 'A Imperatriz', 'O Louco'],
  },
  {
    questionTemplate: 'Qual planeta rege {word}?',
    obfuscateWord: 'Binah',
    answer: 'saturno',
    options: ['Saturno', 'Júpiter', 'Netuno', 'Urano'],
  },
  {
    questionTemplate: 'Qual é o nome do pilar da {word}?',
    obfuscateWord: 'esquerda',
    answer: 'severidade',
    options: ['Severidade', 'Misericórdia', 'Equilíbrio', 'Força'],
  },
  {
    questionTemplate: 'Qual Sephirah é chamada de "{word}"?',
    obfuscateWord: 'Fundação',
    answer: 'yesod',
    options: ['Yesod', 'Malkuth', 'Hod', 'Netzach'],
  },
  {
    questionTemplate: 'Qual elemento associa-se ao caminho {word} (O Enforcado)?',
    obfuscateWord: '23',
    answer: 'agua',
    options: ['Água', 'Fogo', 'Ar', 'Terra'],
  },
  {
    questionTemplate: 'Quem é o guardião do Véu do {word}?',
    obfuscateWord: 'Abismo',
    answer: 'choronzon',
    options: ['Choronzon', 'Raphael', 'Gabriel', 'Metatron'],
  },
  {
    questionTemplate: 'Qual é o valor numérico de {word}?',
    obfuscateWord: 'Chokmah',
    answer: '2',
    options: ['2', '3', '1', '4'],
  },
  {
    questionTemplate: 'Qual Qliphah é a sombra de {word}?',
    obfuscateWord: 'Tiferet',
    answer: 'tagimron',
    options: ['Tagimron', 'Golohab', 'Samael', 'Gamaliel'],
  },
  {
    questionTemplate: 'Qual metal é associado ao {word}?',
    obfuscateWord: 'Sol',
    answer: 'ouro',
    options: ['Ouro', 'Prata', 'Ferro', 'Cobre'],
  },
  {
    questionTemplate: 'Quantos caminhos conectam as Sephiroth na {word}?',
    obfuscateWord: 'Árvore da Vida',
    answer: '22',
    options: ['22', '10', '32', '11'],
  },
  {
    questionTemplate: 'Qual é a Sephirah central no pilar do {word}?',
    obfuscateWord: 'Equilíbrio',
    answer: 'tiferet',
    options: ['Tiferet', 'Kether', 'Yesod', 'Daath'],
  },
  {
    questionTemplate: 'Que demônio é associado a {word}?',
    obfuscateWord: 'Gamaliel',
    answer: 'lilith',
    options: ['Lilith', 'Asmodeus', 'Baal', 'Lucifuge'],
  },
];

function signAnswer(answer: string, timestamp: number): string {
  return crypto
    .createHmac('sha256', CAPTCHA_SECRET)
    .update(`${answer}:${timestamp}`)
    .digest('hex');
}

export function generateChallenge(): CaptchaChallenge {
  const challenge = CHALLENGES[Math.floor(Math.random() * CHALLENGES.length)];
  const timestamp = Date.now();
  const id = crypto.randomBytes(16).toString('hex');

  // Obfuscate the key word in the question
  const obfuscated = obfuscate(challenge.obfuscateWord);
  const question = challenge.questionTemplate.replace('{word}', obfuscated);

  // Shuffle options
  const shuffled = [...challenge.options].sort(() => Math.random() - 0.5);

  return {
    id,
    question,
    options: shuffled.map((label) => ({
      label,
      value: label.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, ''),
    })),
    signature: signAnswer(challenge.answer, timestamp),
    timestamp,
  };
}

export function verifyCaptcha(answer: string, signature: string, timestamp: number): boolean {
  // Check expiration
  if (Date.now() - timestamp > CAPTCHA_TTL) {
    return false;
  }

  // Normalize answer
  const normalized = answer.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '');
  const expectedSignature = signAnswer(normalized, timestamp);

  // Timing-safe comparison
  try {
    return crypto.timingSafeEqual(
      Buffer.from(signature, 'hex'),
      Buffer.from(expectedSignature, 'hex')
    );
  } catch {
    return false;
  }
}
