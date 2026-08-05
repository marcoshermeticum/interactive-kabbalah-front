'use client';

import { useState, useEffect, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import {
  Layout,
  Menu,
  Button,
  Spin,
  message,
  Typography,
  ConfigProvider,
  theme,
} from 'antd';
import {
  LogoutOutlined,
  GlobalOutlined,
  HistoryOutlined,
  EditOutlined,
} from '@ant-design/icons';
import ContentEditor from './components/ContentEditor';
import HistoryPanel from './components/HistoryPanel';

const { Header, Sider, Content } = Layout;
const { Title } = Typography;

type ActivePanel = 'editor' | 'history';

export default function AdminDashboard() {
  const [authenticated, setAuthenticated] = useState(false);
  const [checking, setChecking] = useState(true);
  const [locale, setLocale] = useState('pt-BR');
  const [activePanel, setActivePanel] = useState<ActivePanel>('editor');
  const router = useRouter();

  useEffect(() => {
    fetch('/api/admin/verify')
      .then((res) => {
        if (res.ok) {
          setAuthenticated(true);
        } else {
          router.replace('/admin/login');
        }
      })
      .catch(() => router.replace('/admin/login'))
      .finally(() => setChecking(false));
  }, [router]);

  const handleLogout = useCallback(async () => {
    await fetch('/api/admin/logout', { method: 'POST' });
    message.info('Sessão encerrada');
    router.replace('/admin/login');
  }, [router]);

  if (checking) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Spin size="large" />
      </div>
    );
  }

  if (!authenticated) return null;

  const locales = [
    { key: 'pt-BR', label: '🇧🇷 Português' },
    { key: 'en-US', label: '🇺🇸 English' },
    { key: 'ja', label: '🇯🇵 日本語' },
    { key: 'he', label: '🇮🇱 עברית' },
  ];

  return (
    <ConfigProvider
      theme={{
        algorithm: theme.darkAlgorithm,
        token: {
          colorPrimary: '#7c3aed',
          borderRadius: 8,
          fontFamily: 'Inter, sans-serif',
        },
      }}
    >
      <Layout style={{ minHeight: '100vh' }}>
        <Sider
          width={240}
          style={{ background: '#0f0f1a', borderRight: '1px solid rgba(139,92,246,0.15)' }}
        >
          <div className="p-4 text-center border-b border-purple-900/30">
            <Title level={5} style={{ color: '#c4b5fd', margin: 0, fontFamily: 'EB Garamond' }}>
              ✦ Admin Panel
            </Title>
          </div>

          <Menu
            mode="inline"
            selectedKeys={[activePanel]}
            onClick={({ key }) => setActivePanel(key as ActivePanel)}
            style={{ background: 'transparent', borderRight: 'none' }}
            items={[
              { key: 'editor', icon: <EditOutlined />, label: 'Editor de Conteúdo' },
              { key: 'history', icon: <HistoryOutlined />, label: 'Histórico' },
            ]}
          />

          <div className="px-4 mt-6">
            <p className="text-xs text-gray-500 mb-2 flex items-center gap-1">
              <GlobalOutlined /> Idioma
            </p>
            <Menu
              mode="inline"
              selectedKeys={[locale]}
              onClick={({ key }) => setLocale(key)}
              style={{ background: 'transparent', borderRight: 'none' }}
              items={locales.map((l) => ({ key: l.key, label: l.label }))}
            />
          </div>

          <div className="absolute bottom-16 left-0 right-0 px-4">
            <Button
              icon={<LogoutOutlined />}
              onClick={handleLogout}
              block
              style={{ borderColor: 'rgba(139,92,246,0.3)' }}
            >
              Sair
            </Button>
          </div>
        </Sider>

        <Layout>
          <Header
            style={{
              background: 'rgba(15,15,25,0.95)',
              borderBottom: '1px solid rgba(139,92,246,0.1)',
              padding: '0 24px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
            }}
          >
            <Title level={4} style={{ color: '#e9e9f0', margin: 0 }}>
              {activePanel === 'editor' ? 'Editor de Conteúdo' : 'Histórico de Alterações'}
            </Title>
            <span className="text-sm text-gray-400">
              {locales.find((l) => l.key === locale)?.label}
            </span>
          </Header>

          <Content style={{ padding: 24, background: '#0a0a14', overflow: 'auto', paddingBottom: 60 }}>
            {activePanel === 'editor' && <ContentEditor locale={locale} />}
            {activePanel === 'history' && <HistoryPanel locale={locale} />}
          </Content>
        </Layout>
      </Layout>
    </ConfigProvider>
  );
}
