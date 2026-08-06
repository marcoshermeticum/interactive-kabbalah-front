'use client';

import { Component, ReactNode } from 'react';
import { Button, Result, Typography, Collapse, Tag } from 'antd';
import { ReloadOutlined, BugOutlined, CopyOutlined } from '@ant-design/icons';

const { Text } = Typography;

interface Props {
  children: ReactNode;
  fallbackTitle?: string;
}

interface State {
  hasError: boolean;
  error: Error | null;
  errorInfo: string | null;
}

/**
 * Error Boundary para o painel admin.
 * 
 * - Em dev: mostra stack trace completo com opção de copiar.
 * - Em prod: mostra mensagem genérica com botão de reload.
 */
export default class AdminErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false, error: null, errorInfo: null };
  }

  static getDerivedStateFromError(error: Error): Partial<State> {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: { componentStack?: string | null }) {
    this.setState({ errorInfo: errorInfo.componentStack || null });
    // Em dev, loga no console para facilitar debug
    if (process.env.NODE_ENV === 'development') {
      console.group('🔴 AdminErrorBoundary caught an error');
      console.error(error);
      console.info('Component Stack:', errorInfo.componentStack);
      console.groupEnd();
    }
  }

  handleReload = () => {
    this.setState({ hasError: false, error: null, errorInfo: null });
  };

  handleCopy = () => {
    const { error, errorInfo } = this.state;
    const text = [
      `Error: ${error?.message}`,
      `Stack: ${error?.stack}`,
      `Component: ${errorInfo}`,
    ].join('\n\n');
    navigator.clipboard.writeText(text);
  };

  render() {
    if (!this.state.hasError) {
      return this.props.children;
    }

    const { error, errorInfo } = this.state;
    const isDev = process.env.NODE_ENV === 'development';

    return (
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          minHeight: '60vh',
          padding: 24,
        }}
      >
        <Result
          status="error"
          title={this.props.fallbackTitle || 'Erro no painel'}
          subTitle={
            isDev
              ? error?.message || 'Erro desconhecido'
              : 'Ocorreu um erro inesperado. Tente recarregar o painel.'
          }
          extra={[
            <Button
              key="reload"
              type="primary"
              icon={<ReloadOutlined />}
              onClick={this.handleReload}
            >
              Tentar novamente
            </Button>,
            ...(isDev
              ? [
                  <Button
                    key="copy"
                    icon={<CopyOutlined />}
                    onClick={this.handleCopy}
                  >
                    Copiar erro
                  </Button>,
                ]
              : []),
          ]}
        >
          {isDev && (
            <div style={{ maxWidth: 600, margin: '0 auto', textAlign: 'left' }}>
              <div style={{ marginBottom: 12, display: 'flex', gap: 8 }}>
                <Tag color="red" icon={<BugOutlined />}>
                  DEV MODE
                </Tag>
                <Tag color="default">
                  {new Date().toLocaleTimeString('pt-BR')}
                </Tag>
              </div>

              <Collapse
                defaultActiveKey={['stack']}
                items={[
                  {
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
                          maxHeight: 250,
                          color: '#f87171',
                          whiteSpace: 'pre-wrap',
                          wordBreak: 'break-all',
                        }}
                      >
                        {error?.stack || 'No stack trace'}
                      </pre>
                    ),
                  },
                  ...(errorInfo
                    ? [{
                        key: 'component',
                        label: '🧩 Component Stack',
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
                            {errorInfo}
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
                  💡 Esse detalhe aparece apenas em desenvolvimento. Em produção, o usuário
                  verá uma mensagem genérica.
                </Text>
              </div>
            </div>
          )}
        </Result>
      </div>
    );
  }
}
