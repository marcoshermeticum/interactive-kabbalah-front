# Interactive Kabbalah - Tree of Life

Árvore da Vida interativa com SVGs customizados e suporte a múltiplos idiomas.

## Stack

- **Next.js 15** (App Router, Turbopack)
- **React 19**
- **Tailwind CSS 4** (zero runtime CSS)
- **next-intl** (i18n: PT-BR, EN-US)
- **TypeScript**

## Desenvolvimento

```bash
npm install
npm run dev
```

## Build & Deploy

### Vercel (recomendado - zero config)
```bash
# Push para GitHub e conecte ao Vercel
# Ou use a CLI:
npx vercel
```

### Docker
```bash
npm run build
# O output standalone está em .next/standalone
node .next/standalone/server.js
```

### Qualquer plataforma Node.js
```bash
npm run build
npm start
```

O `output: 'standalone'` no `next.config.ts` gera um build auto-contido (~30MB) que roda sem `node_modules`.

## Estrutura

```
src/
├── app/[locale]/       # Pages (layout + page)
├── components/
│   ├── Sephirot/       # SVG sephirot components (Simple + Bigger)
│   ├── Paths/          # SVG path connections
│   ├── KabbalahTree/   # Main tree composition
│   ├── DraggableArea/  # Pan & zoom container
│   └── LanguageSelector.tsx
├── data/               # Sephirot configuration data
└── i18n/               # Internationalization (messages + routing)
```

## SVGs

Os componentes SVG são inline React — cada sephirot é composto por:
- **SimpleSephirot**: 3 elipses concêntricas (regent, sephirot, planet) + textos curvos
- **BiggerSephirot**: 4 elipses (world, regent, sephirot, planet) + textos curvos via `<textPath>`
- **Paths**: Caminhos conectores (vertical, horizontal, diagonal) com letra hebraica, signo e arcano
