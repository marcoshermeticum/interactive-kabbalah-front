import { NextRequest, NextResponse } from 'next/server';
import { verifyToken } from '@/app/admin/lib/auth';
import { getFileContent, updateFileContent } from '@/app/admin/lib/github';

const CONTENT_FILES: Record<string, string> = {
  'pt-BR': 'src/i18n/messages/pt-BR.json',
  'en-US': 'src/i18n/messages/en-US.json',
  'ja': 'src/i18n/messages/ja.json',
  'he': 'src/i18n/messages/he.json',
};

async function authenticate(request: NextRequest): Promise<boolean> {
  const token = request.cookies.get('admin_token')?.value;
  if (!token) return false;
  const result = await verifyToken(token);
  return result.valid;
}

/**
 * GET /api/admin/content?locale=pt-BR
 * Returns the content JSON for a specific locale
 */
export async function GET(request: NextRequest) {
  if (!(await authenticate(request))) {
    return NextResponse.json({ error: 'Não autorizado' }, { status: 401 });
  }

  const locale = request.nextUrl.searchParams.get('locale') || 'pt-BR';
  const filePath = CONTENT_FILES[locale];

  if (!filePath) {
    return NextResponse.json({ error: 'Locale inválido' }, { status: 400 });
  }

  try {
    const { content, sha } = await getFileContent(filePath);
    return NextResponse.json({ content: JSON.parse(content), sha, locale });
  } catch (error) {
    return NextResponse.json(
      { error: `Erro ao ler conteúdo: ${error instanceof Error ? error.message : 'desconhecido'}` },
      { status: 500 }
    );
  }
}

/**
 * PUT /api/admin/content
 * Updates content for a specific locale
 * Body: { locale, content, sha, message? }
 */
export async function PUT(request: NextRequest) {
  if (!(await authenticate(request))) {
    return NextResponse.json({ error: 'Não autorizado' }, { status: 401 });
  }

  try {
    const body = await request.json();
    const { locale, content, sha, message } = body;

    const filePath = CONTENT_FILES[locale];
    if (!filePath) {
      return NextResponse.json({ error: 'Locale inválido' }, { status: 400 });
    }

    if (!content || !sha) {
      return NextResponse.json({ error: 'Conteúdo e SHA são obrigatórios' }, { status: 400 });
    }

    const commitMessage = message || `[admin] Atualiza conteúdo ${locale}`;
    const formatted = JSON.stringify(content, null, 2) + '\n';

    const result = await updateFileContent(filePath, formatted, commitMessage, sha);

    return NextResponse.json({
      success: true,
      commitSha: result.commitSha,
      commitUrl: result.commitUrl,
    });
  } catch (error) {
    return NextResponse.json(
      { error: `Erro ao salvar: ${error instanceof Error ? error.message : 'desconhecido'}` },
      { status: 500 }
    );
  }
}
