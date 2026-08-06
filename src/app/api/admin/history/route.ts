import { NextRequest, NextResponse } from 'next/server';
import { verifyToken } from '@/app/admin/lib/auth';
import { getFileHistory, getFileAtCommit, revertToCommit } from '@/app/admin/lib/github';
import { logger } from '@/app/admin/lib/logger';

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
 * GET /api/admin/history?locale=pt-BR
 * Returns commit history for a content file
 */
export async function GET(request: NextRequest) {
  if (!(await authenticate(request))) {
    return NextResponse.json({ error: 'Não autorizado' }, { status: 401 });
  }

  const locale = request.nextUrl.searchParams.get('locale') || 'pt-BR';
  const commitSha = request.nextUrl.searchParams.get('commit');
  const filePath = CONTENT_FILES[locale];

  if (!filePath) {
    return NextResponse.json({ error: 'Locale inválido' }, { status: 400 });
  }

  try {
    // If a specific commit is requested, return that version's content
    if (commitSha) {
      const content = await getFileAtCommit(filePath, commitSha);
      return NextResponse.json({ content: JSON.parse(content), commitSha });
    }

    // Otherwise return the commit list
    const commits = await getFileHistory(filePath);
    return NextResponse.json({
      commits: commits.map((c) => ({
        sha: c.sha,
        message: c.commit.message,
        author: c.commit.author.name,
        date: c.commit.author.date,
        url: c.html_url,
      })),
    });
  } catch (error) {
    logger.error('Falha ao buscar histórico do GitHub', { route: '/api/admin/history', method: 'GET', locale }, error);
    return NextResponse.json(
      { error: `Erro ao buscar histórico: ${error instanceof Error ? error.message : 'desconhecido'}` },
      { status: 500 }
    );
  }
}

/**
 * POST /api/admin/history
 * Revert to a specific commit
 * Body: { locale, commitSha }
 */
export async function POST(request: NextRequest) {
  if (!(await authenticate(request))) {
    return NextResponse.json({ error: 'Não autorizado' }, { status: 401 });
  }

  try {
    const body = await request.json();
    const { locale, commitSha } = body;

    const filePath = CONTENT_FILES[locale];
    if (!filePath) {
      return NextResponse.json({ error: 'Locale inválido' }, { status: 400 });
    }

    if (!commitSha) {
      return NextResponse.json({ error: 'SHA do commit é obrigatório' }, { status: 400 });
    }

    const result = await revertToCommit(filePath, commitSha);
    logger.info('Revert executado com sucesso', { route: '/api/admin/history', method: 'POST', locale, commitSha: result.commitSha });
    return NextResponse.json({
      success: true,
      commitSha: result.commitSha,
      commitUrl: result.commitUrl,
    });
  } catch (error) {
    logger.error('Falha ao reverter commit', { route: '/api/admin/history', method: 'POST' }, error);
    return NextResponse.json(
      { error: `Erro ao reverter: ${error instanceof Error ? error.message : 'desconhecido'}` },
      { status: 500 }
    );
  }
}
