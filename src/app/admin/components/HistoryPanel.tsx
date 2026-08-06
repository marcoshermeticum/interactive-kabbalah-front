'use client';

import { useState, useEffect, useCallback } from 'react';
import {
  Timeline,
  Button,
  Spin,
  message,
  Typography,
  Modal,
  Tag,
  Empty,
} from 'antd';
import {
  HistoryOutlined,
  RollbackOutlined,
  ExclamationCircleOutlined,
  LinkOutlined,
} from '@ant-design/icons';
import DevErrorDialog from './DevErrorDialog';
import { useAdminError, createFetchError } from '../hooks/useAdminError';

const { Text, Paragraph } = Typography;

interface Commit {
  sha: string;
  message: string;
  author: string;
  date: string;
  url: string;
}

interface HistoryPanelProps {
  locale: string;
}

export default function HistoryPanel({ locale }: HistoryPanelProps) {
  const [commits, setCommits] = useState<Commit[]>([]);
  const [loading, setLoading] = useState(true);
  const [reverting, setReverting] = useState<string | null>(null);
  const { error, dialogOpen, handleError, clearError } = useAdminError();

  const loadHistory = useCallback(async () => {
    setLoading(true);
    try {
      const endpoint = `/api/admin/history?locale=${locale}`;
      const res = await fetch(endpoint);
      if (!res.ok) throw await createFetchError(res, endpoint);
      const data = await res.json();
      setCommits(data.commits || []);
    } catch (err) {
      handleError(err, `/api/admin/history?locale=${locale}`);
    } finally {
      setLoading(false);
    }
  }, [locale, handleError]);

  useEffect(() => {
    loadHistory();
  }, [loadHistory]);

  const handleRevert = (commit: Commit) => {
    Modal.confirm({
      title: 'Reverter para esta versão?',
      icon: <ExclamationCircleOutlined />,
      content: (
        <div>
          <Paragraph style={{ color: 'rgba(255,255,255,0.7)' }}>
            Isso criará um novo commit revertendo o conteúdo para a versão de:
          </Paragraph>
          <Tag color="purple">{commit.sha.slice(0, 7)}</Tag>
          <Text style={{ color: 'rgba(255,255,255,0.5)' }}>
            {' '}— {commit.message}
          </Text>
          <Paragraph style={{ color: 'rgba(255,255,255,0.5)', marginTop: 8 }}>
            {new Date(commit.date).toLocaleString('pt-BR')}
          </Paragraph>
        </div>
      ),
      okText: 'Reverter',
      cancelText: 'Cancelar',
      okButtonProps: { danger: true },
      onOk: async () => {
        setReverting(commit.sha);
        try {
          const endpoint = '/api/admin/history';
          const res = await fetch(endpoint, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ locale, commitSha: commit.sha }),
          });

          if (!res.ok) throw await createFetchError(res, endpoint);

          message.success('Revertido com sucesso! O site será atualizado em ~1-2 min.');
          await loadHistory();
        } catch (err) {
          handleError(err, '/api/admin/history');
        } finally {
          setReverting(null);
        }
      },
    });
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center py-20">
        <Spin size="large" />
        <DevErrorDialog error={error} open={dialogOpen} onClose={clearError} />
      </div>
    );
  }

  if (commits.length === 0) {
    return (
      <>
        <Empty
          description="Nenhum histórico encontrado"
          image={Empty.PRESENTED_IMAGE_SIMPLE}
        />
        <DevErrorDialog error={error} open={dialogOpen} onClose={clearError} />
      </>
    );
  }

  return (
    <div style={{ maxWidth: 800 }}>
      <DevErrorDialog error={error} open={dialogOpen} onClose={clearError} />
      <div className="mb-4 flex items-center justify-between">
        <Text style={{ color: 'rgba(255,255,255,0.5)' }}>
          <HistoryOutlined /> Últimas {commits.length} alterações em{' '}
          <Tag color="blue">{locale}</Tag>
        </Text>
        <Button size="small" onClick={loadHistory} icon={<HistoryOutlined />}>
          Atualizar
        </Button>
      </div>

      <Timeline
        items={commits.map((commit, index) => ({
          color: index === 0 ? 'green' : 'gray',
          children: (
            <div className="flex items-start justify-between gap-4 py-1">
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 flex-wrap">
                  <Tag color={index === 0 ? 'green' : 'default'} style={{ fontSize: 11 }}>
                    {commit.sha.slice(0, 7)}
                  </Tag>
                  <Text
                    style={{
                      color: 'rgba(255,255,255,0.8)',
                      fontSize: 13,
                    }}
                    ellipsis
                  >
                    {commit.message}
                  </Text>
                </div>
                <div className="mt-1">
                  <Text style={{ color: 'rgba(255,255,255,0.4)', fontSize: 11 }}>
                    {commit.author} • {new Date(commit.date).toLocaleString('pt-BR')}
                  </Text>
                  {commit.url && (
                    <a
                      href={commit.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="ml-2 text-purple-400 hover:text-purple-300"
                      style={{ fontSize: 11 }}
                    >
                      <LinkOutlined /> ver no GitHub
                    </a>
                  )}
                </div>
              </div>

              {index > 0 && (
                <Button
                  size="small"
                  icon={<RollbackOutlined />}
                  loading={reverting === commit.sha}
                  onClick={() => handleRevert(commit)}
                  danger
                >
                  Reverter
                </Button>
              )}
            </div>
          ),
        }))}
      />
    </div>
  );
}
