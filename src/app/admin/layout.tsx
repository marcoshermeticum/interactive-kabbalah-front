import { ReactNode } from 'react';
import { AntdRegistry } from '@ant-design/nextjs-registry';
import LgpdFooter from './components/LgpdFooter';
import '../globals.css';

export const metadata = {
  title: 'Admin — Interactive Kabbalah',
  robots: 'noindex, nofollow',
};

export default function AdminLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="pt-BR">
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=EB+Garamond:wght@400;500;600;700&family=Inter:wght@300;400;500;600&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="bg-gray-950 text-white min-h-screen">
        <AntdRegistry>{children}</AntdRegistry>
        <LgpdFooter />
      </body>
    </html>
  );
}
