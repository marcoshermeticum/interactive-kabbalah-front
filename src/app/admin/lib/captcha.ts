import crypto from 'crypto';

/**
 * Esoteric Captcha — Identify planetary/occult symbols
 * 
 * Instead of distorted text, we ask the user to identify which symbol
 * corresponds to a specific planet, element, or concept. This is:
 * - Thematic (occultism/kabbalah)
 * - Hard for generic AI vision models (esoteric symbols)
 * - Easy for humans familiar with the content
 * - Self-hosted (no external dependencies)
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

// Symbol/association challenges
const CHALLENGES = [
  {
    question: 'Qual é o planeta associado a Tiferet?',
    answer: 'sol',
    options: ['Sol', 'Lua', 'Marte', 'Vênus'],
  },
  {
    question: 'Qual Sephirah é associada a Vênus?',
    answer: 'netzach',
    options: ['Netzach', 'Hod', 'Yesod', 'Gevurah'],
  },
  {
    question: 'Qual é o símbolo de Malkuth?',
    answer: '⨁',
    options: ['⨁', '☉', '☽', '♄'],
  },
  {
    question: 'Quem é o Arcanjo de Tiferet?',
    answer: 'raphael',
    options: ['Raphael', 'Gabriel', 'Michael', 'Metatron'],
  },
  {
    question: 'Qual Arcano Maior está no caminho 13?',
    answer: 'sacerdotisa',
    options: ['A Sacerdotisa', 'O Mago', 'A Imperatriz', 'O Louco'],
  },
  {
    question: 'Qual planeta rege Binah?',
    answer: 'saturno',
    options: ['Saturno', 'Júpiter', 'Netuno', 'Urano'],
  },
  {
    question: 'Qual é o nome do pilar da esquerda?',
    answer: 'severidade',
    options: ['Severidade', 'Misericórdia', 'Equilíbrio', 'Força'],
  },
  {
    question: 'Qual Sephirah é chamada de "Fundação"?',
    answer: 'yesod',
    options: ['Yesod', 'Malkuth', 'Hod', 'Netzach'],
  },
  {
    question: 'Qual elemento é associado ao caminho 23 (O Enforcado)?',
    answer: 'agua',
    options: ['Água', 'Fogo', 'Ar', 'Terra'],
  },
  {
    question: 'Quem é o guardião do Véu do Abismo?',
    answer: 'choronzon',
    options: ['Choronzon', 'Raphael', 'Gabriel', 'Metatron'],
  },
  {
    question: 'Qual é o valor numérico de Chokmah?',
    answer: '2',
    options: ['2', '3', '1', '4'],
  },
  {
    question: 'Qual Qliphah é a sombra de Tiferet?',
    answer: 'tagimron',
    options: ['Tagimron', 'Golohab', 'Samael', 'Gamaliel'],
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

  // Shuffle options
  const shuffled = [...challenge.options].sort(() => Math.random() - 0.5);

  return {
    id,
    question: challenge.question,
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
