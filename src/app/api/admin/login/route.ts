import { NextRequest, NextResponse } from 'next/server';
import { validateCredentials, createToken } from '@/app/admin/lib/auth';
import { verifyCaptcha } from '@/app/admin/lib/captcha';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { email, password, captchaAnswer, captchaSignature, captchaTimestamp } = body;

    // Validate captcha first
    if (!captchaAnswer || !captchaSignature || !captchaTimestamp) {
      return NextResponse.json(
        { error: 'Resolva o desafio para continuar.' },
        { status: 400 }
      );
    }

    const captchaValid = verifyCaptcha(captchaAnswer, captchaSignature, captchaTimestamp);
    if (!captchaValid) {
      return NextResponse.json(
        { error: 'Desafio incorreto ou expirado. Tente novamente.' },
        { status: 403 }
      );
    }

    // Validate credentials
    if (!email || !password) {
      return NextResponse.json(
        { error: 'Email e senha são obrigatórios.' },
        { status: 400 }
      );
    }

    const valid = validateCredentials(email, password);
    if (!valid) {
      return NextResponse.json(
        { error: 'Credenciais inválidas.' },
        { status: 401 }
      );
    }

    // Create JWT token
    const token = await createToken(email);

    // Set HTTP-only cookie
    const response = NextResponse.json({ success: true });
    response.cookies.set('admin_token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      maxAge: 8 * 60 * 60, // 8 hours
      path: '/admin',
    });

    return response;
  } catch {
    return NextResponse.json(
      { error: 'Erro interno do servidor.' },
      { status: 500 }
    );
  }
}
