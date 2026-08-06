'use client';

import { useState } from 'react';
import { Modal, Typography, Button, Tag, Collapse } from 'antd';
import { BugOutlined, CopyOutlined, CheckOutlined } from '@ant-design/icons';

const { Text, Paragraph } = Typography;

export interface ErrorDetail {
  message: string;
  status?: number;
  endpoint?: string;
  stack?: string;
  timestamp: string;
  raw?: unknown;
}

interface DevErrorDialogProps {
  error: ErrorDetail | null;
  open: boolean;
  onClose: () => void;
}

/**
 * Dialog de erro detalhado para ambiente de desenvolvimento.
 * Mostra stack trace, status HTTP, endpoint e payload raw.
 * Em produção, exibe apenas uma mensagem genérica.
 */
export default function DevErrorDialog({ error, open, onClose }: DevErrorDialogProps) {
  const [copied, setCopied] = useState(false);
  const isDev = process.env.NODE_ENV === 'development';

  if (!error) return null;

  const handleCopy = () => {
    const text = JSON.stringify(error, null, 2);
    navigator.clipboard.writeText(text).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  };

  // Produção: modal discreto sem detalhes técnicos
  if (!isDev) {
    return (
      <Modal
        open={open}
        onCancel={onClose}
        title="Algo deu errado"
        footer={[
          <Button key="ok" type="primary" onClick={onClose}>
            Entendi
          </Button>,
        ]}
      >
        <Paragraph style={{ color: 'rgba(255,255,255,0.7)' }}>
          Ocorreu um erro inesperado. Tente novamente ou entre em contato com o suporte
          se o problema persistir.
        </Paragraph>
        <Text style={{ color: 'rgba(255,255,255,0.4)', fontSize: 12 }}>
          Referência: {error.timestamp}
        </Text>
      </Modal>
    );
  }

  // Desenvolvimento: dialog completo com detalhes expandíveis
  return (
    <Modal
      open={open}
      onCancel={onClose}
      title={
        <span>
          <BugOutlined style={{ color: '#ef4444', marginRight: 8 }} />
          Erro de Desenvolvimento
        </span>
      }
      width={680}
      footer={[
        <Button
          key="copy"
          icon={copied ? <CheckOutlined /> : <CopyOutlined />}
          onClick={handleCopy}
        >
          {copied ? 'Copiado!' : 'Copiar detalhes'}
        </Button>,
        <Button key="close" type="primary" onClick={onClose}>
          Fechar
        </Button>,
      ]}
    >
      <div style={{ marginBottom: 16 }}>
        <Text strong style={{ color: '#ef4444', fontSize: 15 }}>
          {error.message}
        </Text>
      </div>

      <div style={{ display: 'flex', gap: 8, marginBottom: 16, flexWrap: 'wrap' }}>
        {error.status && (
          <Tag color={error.status >= 500 ? 'red' : 'orange'}>
            HTTP {error.status}
          </Tag>
        )}
        {error.endpoint && (
          <Tag color="blue">{error.endpoint}</Tag>
        )}
        <Tag color="default">{error.timestamp}</Tag>
      </div>

      <Collapse
        items={[
          ...(error.stack
            ? [{
                key: 'stack',
                label: '📋 Stack Trace',
                children: (
                  <pre
                    style={{
                      background: '#0a0a14',
                      padding: 12,
                      borderRadius: 6,
                      fontSize: 11,
                      overflow: 'auto',
                      maxHeight: 200,
                      color: '#f87171',
                      whiteSpace: 'pre-wrap',
                      wordBreak: 'break-all',
                    }}
                  >
                    {error.stack}
                  </pre>
                ),
              }]
            : []),
          ...(error.raw
            ? [{
                key: 'raw',
                label: '📦 Resposta Raw',
                children: (
                  <pre
                    style={{
                      background: '#0a0a14',
                      padding: 12,
                      borderRadius: 6,
                      fontSize: 11,
                      overflow: 'auto',
                      maxHeight: 200,
                      color: '#a78bfa',
                      whiteSpace: 'pre-wrap',
                      wordBreak: 'break-all',
                    }}
                  >
                    {JSON.stringify(error.raw, null, 2)}
                  </pre>
                ),
              }]
            : []),
        ]}
        style={{ background: 'rgba(15,15,30,0.5)' }}
      />

      <div
        style={{
          marginTop: 16,
          padding: '8px 12px',
          background: 'rgba(251,191,36,0.1)',
          border: '1px solid rgba(251,191,36,0.2)',
          borderRadius: 6,
        }}
      >
        <Text style={{ color: '#fbbf24', fontSize: 12 }}>
          💡 Dica: Verifique se as variáveis de ambiente estão configuradas no .env.local
          (GITHUB_TOKEN, GITHUB_OWNER, GITHUB_REPO)
        </Text>
      </div>
    </Modal>
  );
}
