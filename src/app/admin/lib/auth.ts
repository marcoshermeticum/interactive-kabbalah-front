import { SignJWT, jwtVerify } from 'jose';
import crypto from 'crypto';

// SHA-256 hashes of allowed emails — never store plaintext
const ALLOWED_EMAIL_HASHES = [
  '248caecb44b9d58aa268e8f09bcc5f04a12ac311e4d28b3e8aab363fb7fffbba', // admin
  '0d0364e84c89b1204db23395e4f9bd5b0669ceb39d26975394acba2498758bed', // alterar
];

// Password hash is stored as env var ADMIN_PASSWORD_HASH
// Fallback for local dev only
const PASSWORD_HASH_FALLBACK = 'f47c3991bcbd4425bf6bf11fa740da4fccc92f0e31e77e16cb1413dac69f789a';

const JWT_SECRET_KEY = process.env.ADMIN_JWT_SECRET || 'keter-chokmah-binah-default-secret-change-me';

function getSecretKey() {
  return new TextEncoder().encode(JWT_SECRET_KEY);
}

export function hashEmail(email: string): string {
  return crypto.createHash('sha256').update(email.toLowerCase().trim()).digest('hex');
}

export function hashPassword(password: string): string {
  return crypto.createHash('sha256').update(password).digest('hex');
}

export function validateCredentials(email: string, password: string): boolean {
  const emailHash = hashEmail(email);
  const passwordHash = hashPassword(password);
  const expectedPasswordHash = process.env.ADMIN_PASSWORD_HASH || PASSWORD_HASH_FALLBACK;

  const emailValid = ALLOWED_EMAIL_HASHES.includes(emailHash);
  const passwordValid = crypto.timingSafeEqual(
    Buffer.from(passwordHash, 'hex'),
    Buffer.from(expectedPasswordHash, 'hex')
  );

  return emailValid && passwordValid;
}

export async function createToken(email: string): Promise<string> {
  const token = await new SignJWT({ email: hashEmail(email), role: 'admin' })
    .setProtectedHeader({ alg: 'HS256' })
    .setIssuedAt()
    .setExpirationTime('8h')
    .sign(getSecretKey());

  return token;
}

export async function verifyToken(token: string): Promise<{ valid: boolean; payload?: Record<string, unknown> }> {
  try {
    const { payload } = await jwtVerify(token, getSecretKey());
    return { valid: true, payload: payload as Record<string, unknown> };
  } catch {
    return { valid: false };
  }
}
