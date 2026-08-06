'use client';

import { useState, useEffect, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import {
  Layout,
  Menu,
  Button,
  Spin,
  App,
  Typography,
  ConfigProvider,
  theme,
  Flex,
  Drawer,
  Grid,
} from 'antd';
import {
  LogoutOutlined,
  GlobalOutlined,
  HistoryOutlined,
  EditOutlined,
  MenuOutlined,
} from '@ant-design/icons';
import ContentEditor from './components/ContentEditor';
import HistoryPanel from './components/HistoryPanel';
import AdminErrorBoundary from './components/AdminErrorBoundary';

const { Header, Sider, Content } = Layout;
const { Title } = Typography;
const { useBreakpoint } = Grid;

type ActivePanel = 'editor' | 'history';

function Dashboard() {
  const [authenticated, setAuthenticated] = useState(false);
  const [checking, setChecking] = useState(true);
  const [locale, setLocale] = useState('pt-BR');
  const [activePanel, setActivePanel] = useState<ActivePanel>('editor');
  const [drawerOpen, setDrawerOpen] = useState(false);
  const router = useRouter();
  const { message } = App.useApp();
  const screens = useBreakpoint();

  // Mobile: tela menor que md (768px)
  const isMobile = !screens.md;

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
  }, [router, message]);

  if (checking) {
    return (
      <Flex align="center" justify="center" style={{ minHeight: '100vh' }}>
        <Spin size="large" />
      </Flex>
    );
  }

  if (!authenticated) return null;

  const locales = [
    { key: 'pt-BR', label: '🇧🇷 Português' },
    { key: 'en-US', label: '🇺🇸 English' },
    { key: 'ja', label: '🇯🇵 日本語' },
    { key: 'he', label: '🇮🇱 עברית' },
  ];

  const sidebarContent = (
    <>
      <Flex justify="center" style={{ padding: 16, borderBottom: '1px solid rgba(88,28,135,0.3)' }}>
        <Title level={5} style={{ color: '#c4b5fd', margin: 0, fontFamily: 'EB Garamond' }}>
          ✦ Admin Panel
        </Title>
      </Flex>

      <Menu
        mode="inline"
        selectedKeys={[activePanel]}
        onClick={({ key }) => {
          setActivePanel(key as ActivePanel);
          if (isMobile) setDrawerOpen(false);
        }}
        style={{ background: 'transparent', borderRight: 'none' }}
        items={[
          { key: 'editor', icon: <EditOutlined />, label: 'Editor de Conteúdo' },
          { key: 'history', icon: <HistoryOutlined />, label: 'Histórico' },
        ]}
      />

      <div style={{ padding: '0 16px', marginTop: 24 }}>
        <Flex align="center" gap={4} style={{ marginBottom: 8 }}>
          <GlobalOutlined style={{ color: 'rgba(255,255,255,0.4)', fontSize: 12 }} />
          <span style={{ color: 'rgba(255,255,255,0.4)', fontSize: 12 }}>Idioma</span>
        </Flex>
        <Menu
          mode="inline"
          selectedKeys={[locale]}
          onClick={({ key }) => {
            setLocale(key);
            if (isMobile) setDrawerOpen(false);
          }}
          style={{ background: 'transparent', borderRight: 'none' }}
          items={locales.map((l) => ({ key: l.key, label: l.label }))}
        />
      </div>

      <div style={{ padding: '24px 16px' }}>
        <Button
          icon={<LogoutOutlined />}
          onClick={handleLogout}
          block
          style={{ borderColor: 'rgba(139,92,246,0.3)' }}
        >
          Sair
        </Button>
      </div>
    </>
  );

  return (
    <Layout style={{ minHeight: '100vh', height: '100vh' }}>
      {/* Desktop: Sider fixo */}
      {!isMobile && (
        <Sider
          width={240}
          style={{
            background: '#0f0f1a',
            borderRight: '1px solid rgba(139,92,246,0.15)',
            overflow: 'auto',
            height: '100vh',
            position: 'sticky',
            top: 0,
            left: 0,
          }}
        >
          {sidebarContent}
        </Sider>
      )}

      {/* Mobile: Drawer */}
      {isMobile && (
        <Drawer
          placement="left"
          open={drawerOpen}
          onClose={() => setDrawerOpen(false)}
          width={260}
          styles={{
            body: { padding: 0, background: '#0f0f1a' },
            header: { background: '#0f0f1a', borderBottom: '1px solid rgba(139,92,246,0.15)' },
          }}
          closable
        >
          {sidebarContent}
        </Drawer>
      )}

      <Layout style={{ height: '100vh', overflow: 'hidden' }}>
        <Header
          style={{
            background: 'rgba(15,15,25,0.95)',
            borderBottom: '1px solid rgba(139,92,246,0.1)',
            padding: isMobile ? '0 12px' : '0 24px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            flexShrink: 0,
          }}
        >
          <Flex align="center" gap={12}>
            {isMobile && (
              <Button
                type="text"
                icon={<MenuOutlined />}
                onClick={() => setDrawerOpen(true)}
                style={{ color: '#c4b5fd' }}
              />
            )}
            <Title level={isMobile ? 5 : 4} style={{ color: '#e9e9f0', margin: 0 }}>
              {activePanel === 'editor' ? 'Editor de Conteúdo' : 'Histórico'}
            </Title>
          </Flex>
          <span style={{ fontSize: isMobile ? 12 : 14, color: 'rgba(255,255,255,0.5)' }}>
            {locales.find((l) => l.key === locale)?.label}
          </span>
        </Header>

        <Content
          style={{
            padding: isMobile ? 12 : 24,
            paddingBottom: 80,
            background: '#0a0a14',
            overflow: 'auto',
            flex: 1,
          }}
        >
          <AdminErrorBoundary fallbackTitle="Erro no editor">
            {activePanel === 'editor' && <ContentEditor locale={locale} />}
            {activePanel === 'history' && <HistoryPanel locale={locale} />}
          </AdminErrorBoundary>
        </Content>
      </Layout>
    </Layout>
  );
}

export default function AdminDashboard() {
  return (
    <ConfigProvider
      theme={{
        algorithm: theme.darkAlgorithm,
        token: {
          colorPrimary: '#7c3aed',
          colorBgContainer: '#141420',
          colorBgElevated: '#1a1a2e',
          colorBorder: 'rgba(139, 92, 246, 0.2)',
          colorText: '#e2e2f0',
          borderRadius: 8,
          fontFamily: 'Inter, sans-serif',
        },
        components: {
          Menu: {
            itemBg: 'transparent',
            itemSelectedBg: 'rgba(124, 58, 237, 0.15)',
            itemSelectedColor: '#c4b5fd',
          },
          Layout: {
            siderBg: '#0f0f1a',
            headerBg: 'rgba(15,15,25,0.95)',
            bodyBg: '#0a0a14',
          },
        },
      }}
    >
      <App>
        <Dashboard />
      </App>
    </ConfigProvider>
  );
}
