'use client';

import { useState, useEffect, useCallback } from 'react';
import { Button, Input, Card, Typography, Space, Radio, message, Spin } from 'antd';
import { LockOutlined, MailOutlined, EyeOutlined } from '@ant-design/icons';
import { useRouter } from 'next/navigation';

const { Title, Text } = Typography;

interface CaptchaData {
  id: string;
  question: string;
  options: { label: string; value: string }[];
  signature: string;
  timestamp: number;
}

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [captcha, setCaptcha] = useState<CaptchaData | null>(null);
  const [captchaAnswer, setCaptchaAnswer] = useState('');
  const [loading, setLoading] = useState(false);
  const [captchaLoading, setCaptchaLoading] = useState(true);
  const router = useRouter();

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
  }, []);

  useEffect(() => {
    loadCaptcha();
  }, [loadCaptcha]);

  // Check if already logged in
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
        loadCaptcha(); // Refresh captcha on failure
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
          background: 'rgba(15, 15, 25, 0.95)',
          border: '1px solid rgba(139, 92, 246, 0.3)',
          borderRadius: 16,
        }}
        styles={{ body: { padding: 32 } }}
      >
        <div className="text-center mb-6">
          <Title level={3} style={{ color: '#c4b5fd', marginBottom: 4, fontFamily: 'EB Garamond' }}>
            ✦ Portal do Administrador ✦
          </Title>
          <Text style={{ color: 'rgba(255,255,255,0.5)', fontSize: 13 }}>
            Interactive Kabbalah — Painel de Conteúdo
          </Text>
        </div>

        <Space direction="vertical" size="middle" style={{ width: '100%' }}>
          <Input
            prefix={<MailOutlined style={{ color: 'rgba(139,92,246,0.6)' }} />}
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            size="large"
            onPressEnter={handleLogin}
            style={{ background: 'rgba(30,30,50,0.8)', borderColor: 'rgba(139,92,246,0.2)' }}
          />

          <Input.Password
            prefix={<LockOutlined style={{ color: 'rgba(139,92,246,0.6)' }} />}
            placeholder="Senha"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            size="large"
            onPressEnter={handleLogin}
            iconRender={(visible) => (
              <EyeOutlined style={{ color: visible ? '#8b5cf6' : 'rgba(255,255,255,0.3)' }} />
            )}
            style={{ background: 'rgba(30,30,50,0.8)', borderColor: 'rgba(139,92,246,0.2)' }}
          />

          {/* Esoteric Captcha */}
          <div
            style={{
              background: 'rgba(20, 10, 40, 0.8)',
              border: '1px solid rgba(139, 92, 246, 0.2)',
              borderRadius: 12,
              padding: 16,
            }}
          >
            <div className="flex items-center gap-2 mb-3">
              <span style={{ color: '#a78bfa', fontSize: 14 }}>🔮 Desafio Esotérico</span>
              <Button
                type="link"
                size="small"
                onClick={loadCaptcha}
                style={{ color: 'rgba(255,255,255,0.4)', fontSize: 11 }}
              >
                ↻ outro
              </Button>
            </div>

            {captchaLoading ? (
              <div className="flex justify-center py-4">
                <Spin size="small" />
              </div>
            ) : captcha ? (
              <>
                <Text style={{ color: 'rgba(255,255,255,0.8)', display: 'block', marginBottom: 12 }}>
                  {captcha.question}
                </Text>
                <Radio.Group
                  value={captchaAnswer}
                  onChange={(e) => setCaptchaAnswer(e.target.value)}
                  style={{ width: '100%' }}
                >
                  <Space direction="vertical" style={{ width: '100%' }}>
                    {captcha.options.map((opt) => (
                      <Radio
                        key={opt.value}
                        value={opt.value}
                        style={{ color: 'rgba(255,255,255,0.7)' }}
                      >
                        {opt.label}
                      </Radio>
                    ))}
                  </Space>
                </Radio.Group>
              </>
            ) : (
              <Text style={{ color: 'rgba(255,0,0,0.6)' }}>Erro ao carregar desafio</Text>
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
            }}
          >
            Entrar no Portal ✦
          </Button>
        </Space>

        <div className="text-center mt-4">
          <Text style={{ color: 'rgba(255,255,255,0.3)', fontSize: 11 }}>
            Acesso restrito. Tentativas são registradas.
          </Text>
        </div>
      </Card>
    </div>
  );
}
