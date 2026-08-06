'use client';

import { useState, useEffect, useCallback } from 'react';
import { Button, Input, Card, Typography, Radio, App, Spin, ConfigProvider, theme, Flex } from 'antd';
import { LockOutlined, MailOutlined, EyeOutlined, EyeInvisibleOutlined } from '@ant-design/icons';
import { useRouter } from 'next/navigation';

const { Title, Text } = Typography;

interface CaptchaData {
  id: string;
  question: string;
  options: { label: string; value: string }[];
  signature: string;
  timestamp: number;
}

function LoginForm() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [captcha, setCaptcha] = useState<CaptchaData | null>(null);
  const [captchaAnswer, setCaptchaAnswer] = useState('');
  const [loading, setLoading] = useState(false);
  const [captchaLoading, setCaptchaLoading] = useState(true);
  const router = useRouter();
  const { message } = App.useApp();

  const loadCaptcha = useCallback(async () => {
    setCaptchaLoading(true);
    setCaptchaAnswer('');
    try {
      const res = await fetch('/api/admin/captcha');
      const data = await res.json();
      setCaptcha(data);
    } catch {
      message.error('Erro ao carregar desafio');
    } finally {
      setCaptchaLoading(false);
    }
  }, [message]);

  useEffect(() => {
    loadCaptcha();
  }, [loadCaptcha]);

  useEffect(() => {
    fetch('/api/admin/verify')
      .then((res) => {
        if (res.ok) router.replace('/admin');
      })
      .catch(() => {});
  }, [router]);

  const handleLogin = async () => {
    if (!email || !password) {
      message.warning('Preencha email e senha.');
      return;
    }
    if (!captchaAnswer) {
      message.warning('Resolva o desafio esotérico.');
      return;
    }

    setLoading(true);
    try {
      const res = await fetch('/api/admin/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email,
          password,
          captchaAnswer,
          captchaSignature: captcha?.signature,
          captchaTimestamp: captcha?.timestamp,
        }),
      });

      const data = await res.json();
      if (res.ok) {
        message.success('Acesso concedido ✦');
        router.push('/admin');
      } else {
        message.error(data.error || 'Erro ao autenticar');
        loadCaptcha();
      }
    } catch {
      message.error('Erro de conexão');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4" style={{ paddingBottom: '60px' }}>
      <Card
        style={{
          width: 420,
          border: '1px solid rgba(139, 92, 246, 0.3)',
          borderRadius: 16,
          boxShadow: '0 25px 50px rgba(0, 0, 0, 0.5), 0 0 80px rgba(124, 58, 237, 0.08)',
        }}
        styles={{ body: { padding: 32 } }}
      >
        <Flex vertical align="center" style={{ marginBottom: 24 }}>
          <Title level={3} style={{ color: '#c4b5fd', marginBottom: 4, fontFamily: 'EB Garamond' }}>
            ✦ Portal do Administrador ✦
          </Title>
          <Text style={{ color: 'rgba(255,255,255,0.5)', fontSize: 13 }}>
            Interactive Kabbalah — Painel de Conteúdo
          </Text>
        </Flex>

        <Flex vertical gap="middle">
          <Input
            prefix={<MailOutlined style={{ color: 'rgba(139,92,246,0.6)' }} />}
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            size="large"
            onPressEnter={handleLogin}
            autoComplete="email"
          />

          <Input.Password
            prefix={<LockOutlined style={{ color: 'rgba(139,92,246,0.6)' }} />}
            placeholder="Senha"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            size="large"
            onPressEnter={handleLogin}
            autoComplete="current-password"
            iconRender={(visible) =>
              visible
                ? <EyeOutlined style={{ color: '#8b5cf6' }} />
                : <EyeInvisibleOutlined style={{ color: 'rgba(255,255,255,0.3)' }} />
            }
          />

          {/* Esoteric Captcha */}
          <div
            style={{
              background: 'rgba(20, 10, 40, 0.6)',
              border: '1px solid rgba(139, 92, 246, 0.15)',
              borderRadius: 12,
              padding: 16,
            }}
          >
            <Flex align="center" gap="small" style={{ marginBottom: 12 }}>
              <span style={{ color: '#a78bfa', fontSize: 14 }}>🔮 Desafio Esotérico</span>
              <Button
                type="link"
                size="small"
                onClick={loadCaptcha}
                style={{ color: 'rgba(255,255,255,0.4)', fontSize: 11, padding: '0 4px' }}
              >
                ↻ outro
              </Button>
            </Flex>

            {captchaLoading ? (
              <Flex justify="center" style={{ padding: '16px 0' }}>
                <Spin size="small" />
              </Flex>
            ) : captcha ? (
              <Flex vertical gap="small">
                <Text
                  style={{
                    color: '#d4b8ff',
                    fontSize: 14,
                    fontFamily: 'monospace',
                    letterSpacing: '0.5px',
                  }}
                >
                  {captcha.question}
                </Text>
                <Radio.Group
                  value={captchaAnswer}
                  onChange={(e) => setCaptchaAnswer(e.target.value)}
                  style={{ width: '100%' }}
                >
                  <Flex vertical gap={4}>
                    {captcha.options.map((opt) => (
                      <Radio key={opt.value} value={opt.value}>
                        {opt.label}
                      </Radio>
                    ))}
                  </Flex>
                </Radio.Group>
              </Flex>
            ) : (
              <Text style={{ color: 'rgba(255,80,80,0.8)' }}>Erro ao carregar desafio</Text>
            )}
          </div>

          <Button
            type="primary"
            size="large"
            block
            loading={loading}
            onClick={handleLogin}
            style={{
              background: 'linear-gradient(135deg, #7c3aed, #4c1d95)',
              borderColor: '#7c3aed',
              height: 48,
              fontSize: 16,
              fontFamily: 'EB Garamond',
              boxShadow: '0 4px 20px rgba(124, 58, 237, 0.3)',
            }}
          >
            Entrar no Portal ✦
          </Button>
        </Flex>

        <Flex justify="center" style={{ marginTop: 16 }}>
          <Text style={{ color: 'rgba(255,255,255,0.25)', fontSize: 11 }}>
            Acesso restrito. Tentativas são registradas.
          </Text>
        </Flex>
      </Card>
    </div>
  );
}

export default function LoginPage() {
  return (
    <ConfigProvider
      theme={{
        algorithm: theme.darkAlgorithm,
        token: {
          colorPrimary: '#7c3aed',
          colorBgContainer: '#1a1a2e',
          colorBgElevated: '#16162a',
          colorBorder: 'rgba(139, 92, 246, 0.25)',
          colorText: '#e2e2f0',
          colorTextPlaceholder: 'rgba(255, 255, 255, 0.35)',
          borderRadius: 10,
          fontFamily: 'Inter, sans-serif',
        },
        components: {
          Input: {
            colorBgContainer: '#1e1e3a',
            activeBorderColor: '#8b5cf6',
            hoverBorderColor: '#7c3aed',
          },
          Radio: {
            colorText: 'rgba(255, 255, 255, 0.8)',
            colorBgContainer: 'transparent',
          },
          Button: {
            colorPrimaryHover: '#9333ea',
          },
          Card: {
            colorBgContainer: 'rgba(15, 15, 25, 0.95)',
          },
        },
      }}
    >
      <App>
        <LoginForm />
      </App>
    </ConfigProvider>
  );
}
