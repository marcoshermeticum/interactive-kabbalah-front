import type { MetadataRoute } from 'next';
import { SITE_NAME } from '@/lib/seo';

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: `${SITE_NAME} — Kabbalah, tarot e alquimia`,
    short_name: 'Kabbalah',
    description:
      'Árvore da Vida, tarot Rider-Waite e símbolos alquímicos em mapas interativos.',
    start_url: '/',
    display: 'standalone',
    background_color: '#fff9eb',
    theme_color: '#1c1917',
    lang: 'pt-BR',
    icons: [
      {
        src: '/favicon-32.png',
        sizes: '32x32',
        type: 'image/png',
      },
      {
        src: '/favicon-192.png',
        sizes: '192x192',
        type: 'image/png',
      },
    ],
  };
}
