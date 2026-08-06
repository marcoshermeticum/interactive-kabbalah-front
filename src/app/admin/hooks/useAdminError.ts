'use client';

import { useState, useCallback } from 'react';
import type { ErrorDetail } from '../components/DevErrorDialog';

/**
 * Hook para gerenciamento de erros no painel admin.
 * 
 * Centraliza a captura de erros de fetch/API e prepara os detalhes
 * para exibição no DevErrorDialog.
 * 
 * Uso:
 * ```tsx
 * const { error, dialogOpen, handleError, clearError } = useAdminError();
 * 
 * try {
 *   const res = await fetch('/api/admin/content');
 *   if (!res.ok) throw await handleFetchError(res, '/api/admin/content');
 * } catch (err) {
 *   handleError(err, '/api/admin/content');
 * }
 * 
 * <DevErrorDialog error={error} open={dialogOpen} onClose={clearError} />
 * ```
 */
export function useAdminError() {
  const [error, setError] = useState<ErrorDetail | null>(null);
  const [dialogOpen, setDialogOpen] = useState(false);

  const handleError = useCallback(
    (err: unknown, endpoint?: string) => {
      const detail: ErrorDetail = {
        message: err instanceof Error ? err.message : 'Erro desconhecido',
        stack: err instanceof Error ? err.stack : undefined,
        endpoint,
        timestamp: new Date().toISOString(),
      };

      // Se for um AdminFetchError, usa os campos extras
      if (err instanceof AdminFetchError) {
        detail.status = err.status;
        detail.raw = err.raw;
        detail.endpoint = err.endpoint || endpoint;
      }

      setError(detail);
      setDialogOpen(true);

      // Log detalhado em dev
      if (process.env.NODE_ENV === 'development') {
        console.group(`🔴 Admin Error: ${detail.endpoint || 'unknown'}`);
        console.error('Message:', detail.message);
        if (detail.status) console.info('Status:', detail.status);
        if (detail.raw) console.info('Raw response:', detail.raw);
        if (detail.stack) console.debug('Stack:', detail.stack);
        console.groupEnd();
      }
    },
    []
  );

  const clearError = useCallback(() => {
    setDialogOpen(false);
    // Mantém o erro em state para referência, limpa apenas o dialog
    setTimeout(() => setError(null), 300);
  }, []);

  return { error, dialogOpen, handleError, clearError };
}

/**
 * Classe de erro customizada para falhas de fetch.
 * Carrega status HTTP e corpo da resposta para exibição detalhada.
 */
export class AdminFetchError extends Error {
  status: number;
  endpoint: string;
  raw: unknown;

  constructor(message: string, status: number, endpoint: string, raw?: unknown) {
    super(message);
    this.name = 'AdminFetchError';
    this.status = status;
    this.endpoint = endpoint;
    this.raw = raw;
  }
}

/**
 * Utilitário para transformar uma Response com falha em AdminFetchError.
 * 
 * Uso:
 * ```ts
 * const res = await fetch(url);
 * if (!res.ok) throw await createFetchError(res, url);
 * ```
 */
export async function createFetchError(
  res: Response,
  endpoint: string
): Promise<AdminFetchError> {
  let raw: unknown;
  let message = `HTTP ${res.status}: ${res.statusText}`;

  try {
    const body = await res.json();
    raw = body;
    if (body.error) message = body.error;
  } catch {
    try {
      raw = await res.text();
    } catch {
      // Não conseguiu ler o body
    }
  }

  return new AdminFetchError(message, res.status, endpoint, raw);
}
