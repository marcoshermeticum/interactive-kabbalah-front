import { NextResponse } from 'next/server';
import { generateChallenge } from '@/app/admin/lib/captcha';

export async function GET() {
  const challenge = generateChallenge();

  // Send challenge to client (signature is sent too, but answer isn't derivable from it)
  return NextResponse.json({
    id: challenge.id,
    question: challenge.question,
    options: challenge.options,
    signature: challenge.signature,
    timestamp: challenge.timestamp,
  });
}
