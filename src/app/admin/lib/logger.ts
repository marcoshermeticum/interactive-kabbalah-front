/**
 * Server-side logger para API routes do admin.
 * 
 * Os logs aparecem automaticamente no Netlify Functions Log
 * (Dashboard → Logs → Functions) sem precisar de serviço externo.
 * 
 * Apenas exceções e erros são logados por padrão.
 * Em dev, loga tudo no console normalmente.
 */

type LogLevel = 'error' | 'warn' | 'info' | 'debug';

interface LogContext {
  route?: string;
  method?: string;
  locale?: string;
  userId?: string;
  [key: string]: unknown;
}

function shouldLog(level: LogLevel): boolean {
  // Em produção: apenas error e warn
  if (process.env.NODE_ENV === 'production') {
    return level === 'error' || level === 'warn';
  }
  // Em dev: tudo
  return true;
}

function formatEntry(level: LogLevel, message: string, context?: LogContext, error?: unknown) {
  const entry: Record<string, unknown> = {
    level,
    message,
    timestamp: new Date().toISOString(),
    ...(context || {}),
  };

  if (error instanceof Error) {
    entry.error = {
      name: error.name,
      message: error.message,
      stack: error.stack,
    };
  } else if (error !== undefined) {
    entry.error = error;
  }

  return entry;
}

export const logger = {
  /**
   * Loga exceções capturadas nas API routes.
   * Sempre emitido (dev e prod).
   */
  error(message: string, context?: LogContext, error?: unknown) {
    if (!shouldLog('error')) return;
    const entry = formatEntry('error', message, context, error);
    console.error(JSON.stringify(entry));
  },

  /**
   * Loga situações suspeitas (auth falhou, payload inválido, etc.)
   * Emitido em dev e prod.
   */
  warn(message: string, context?: LogContext) {
    if (!shouldLog('warn')) return;
    const entry = formatEntry('warn', message, context);
    console.warn(JSON.stringify(entry));
  },

  /**
   * Informações operacionais (commits criados, reverts executados).
   * Apenas em dev.
   */
  info(message: string, context?: LogContext) {
    if (!shouldLog('info')) return;
    const entry = formatEntry('info', message, context);
    console.info(JSON.stringify(entry));
  },

  /**
   * Debug detalhado. Apenas em dev.
   */
  debug(message: string, context?: LogContext) {
    if (!shouldLog('debug')) return;
    const entry = formatEntry('debug', message, context);
    console.debug(JSON.stringify(entry));
  },
};
