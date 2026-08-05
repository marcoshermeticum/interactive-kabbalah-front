'use client';

import { useState } from 'react';
import { Modal, Typography } from 'antd';

const { Paragraph, Title } = Typography;

export default function LgpdFooter() {
  const [visible, setVisible] = useState(false);

  return (
    <>
      <footer className="fixed bottom-0 left-0 right-0 bg-gray-900/90 backdrop-blur border-t border-gray-800 px-4 py-2 text-center text-xs text-gray-500 z-50">
        Este painel utiliza cookies de sessão para autenticação. Nenhum dado pessoal é compartilhado com terceiros.{' '}
        <button
          onClick={() => setVisible(true)}
          className="underline hover:text-gray-300 cursor-pointer bg-transparent border-none text-gray-500 text-xs"
        >
          Política de Privacidade
        </button>
      </footer>

      <Modal
        title="Política de Privacidade — LGPD"
        open={visible}
        onCancel={() => setVisible(false)}
        footer={null}
        width={600}
      >
        <div style={{ color: 'rgba(255,255,255,0.8)' }}>
          <Title level={5} style={{ color: '#c4b5fd' }}>1. Dados Coletados</Title>
          <Paragraph style={{ color: 'rgba(255,255,255,0.7)' }}>
            Este painel administrativo coleta apenas o email utilizado para login, armazenado em forma de hash criptográfico (SHA-256). Nenhum dado pessoal identificável é armazenado em texto plano.
          </Paragraph>

          <Title level={5} style={{ color: '#c4b5fd' }}>2. Cookies</Title>
          <Paragraph style={{ color: 'rgba(255,255,255,0.7)' }}>
            Utilizamos um único cookie de sessão (HttpOnly, Secure) para manter a autenticação. Este cookie expira automaticamente em 8 horas e não é compartilhado com terceiros.
          </Paragraph>

          <Title level={5} style={{ color: '#c4b5fd' }}>3. Finalidade</Title>
          <Paragraph style={{ color: 'rgba(255,255,255,0.7)' }}>
            Os dados são utilizados exclusivamente para autenticação e autorização no painel administrativo. Não realizamos perfilamento, marketing, nem compartilhamento de dados.
          </Paragraph>

          <Title level={5} style={{ color: '#c4b5fd' }}>4. Base Legal</Title>
          <Paragraph style={{ color: 'rgba(255,255,255,0.7)' }}>
            O tratamento de dados é baseado no legítimo interesse (Art. 7°, IX da LGPD) para proteção de acesso administrativo ao sistema.
          </Paragraph>

          <Title level={5} style={{ color: '#c4b5fd' }}>5. Direitos do Titular</Title>
          <Paragraph style={{ color: 'rgba(255,255,255,0.7)' }}>
            Conforme a Lei 13.709/2018 (LGPD), você pode solicitar acesso, correção ou exclusão de seus dados a qualquer momento entrando em contato com o administrador do sistema.
          </Paragraph>

          <Title level={5} style={{ color: '#c4b5fd' }}>6. Retenção</Title>
          <Paragraph style={{ color: 'rgba(255,255,255,0.7)' }}>
            Dados de sessão são descartados após 8 horas. Histórico de alterações de conteúdo é mantido via commits no repositório Git, sendo parte do versionamento técnico do projeto.
          </Paragraph>
        </div>
      </Modal>
    </>
  );
}
