# 🌳 Interactive Kabbalah — Árvore da Vida & Morte

Frontend interativo da Árvore da Vida e da Árvore da Morte (Qliphoth) cabalísticas. Todas as Sephirots, Qliphoth e os 22 Caminhos/Túneis são renderizados como SVG com textos curvados, tooltips educativos ricos, busca por correspondências e suporte bilíngue.

![Next.js](https://img.shields.io/badge/Next.js-15-black) ![React](https://img.shields.io/badge/React-19-blue) ![Tailwind](https://img.shields.io/badge/Tailwind-4-cyan) ![TypeScript](https://img.shields.io/badge/TypeScript-5.8-blue) ![Playwright](https://img.shields.io/badge/Playwright-visual_tests-green)

## Pré-requisitos

- **Node.js 22+** (LTS)
- **npm** ou **yarn**

## Início rápido

```bash
git clone https://github.com/mrviniciux/interactive-kabbalah-front.git
cd interactive-kabbalah-front
npm install
npm run dev
```

A aplicação estará disponível em **http://localhost:3000**

## Scripts

| Comando | Descrição |
|---------|-----------|
| `npm run dev` | Dev server com Turbopack |
| `npm run build` | Build de produção |
| `npm start` | Serve build de produção |
| `npm run lint` | Linter |
| `npm run test:visual` | Testes visuais (Playwright) |
| `npm run test:visual:update` | Atualizar snapshots de referência |
| `npm run test:visual:ui` | UI interativa do Playwright |

## Stack

| Tecnologia | Função |
|-----------|--------|
| Next.js 15 | Framework (App Router, Turbopack) |
| React 19 | UI reativa |
| Tailwind CSS 4 | Estilização zero-runtime |
| next-intl 4 | Internacionalização (PT-BR, EN-US) |
| TypeScript 5.8 | Tipagem estática |
| Playwright | Testes visuais de regressão |

**Zero dependências pesadas** — sem MUI, styled-components ou bundlers extras.

## Design System — "Aura Hermetica"

| Aspecto | Escolha |
|---------|---------|
| Fonte display | EB Garamond (serif clássica) |
| Fonte corpo | Inter (sans, legível) |
| Background | Parchment (#fff9eb) |
| Accent | Ouro acadêmico (#d4af37) |
| Cores sephirots | Golden Dawn (tradição) |
| Estilo visual | "Armadura de RPG de mesa" — bordas duplas, anéis concêntricos, moldura ornamental |

### Referência visual
O design segue a estética da HOD Studios (autorizado por e-mail):
- Colunas B (Boaz) e J (Jachin)
- Lemniscata (∞) acima de Kether
- Véus (Abismo, Parokhet, Nephesch) como linhas tracejadas
- Sephirots com 3 anéis concêntricos e bordas robustas
- Caminhos com bordas duplas e highlight interno
- Labels das almas (Jechidah, Neschamah, Chiah, Ruach, Nephesch)
- AIN / AIN SOPH / AIN SOPH AUR no topo

## Arquitetura — Preparação Mobile (Kotlin/Swift)

O projeto é estruturado para facilitar port futuro:

```
src/data/           ← Camada de dados PURA (exportável como JSON)
  ├── tree-layout.ts     ← Posições, dimensões, config de layout
  ├── sephirots.ts       ← Dados das sephirots
  ├── qliphoth.ts        ← Dados das qliphoth
  ├── qliphothPaths.ts   ← 22 túneis de Set
  └── correspondences.ts ← Correspondências (busca)
```

- **Dados separados da UI** — reutilizáveis em qualquer plataforma
- **Layout como config** — `tree-layout.ts` define todas as posições em formato portável
- **Componentes SVG puros** — sem dependência de DOM específico
- **API-ready** — dados estáticos hoje, API amanhã

## Funcionalidades

### 🌳 Árvore da Vida (Sephiroth)
- 10 Sephirots + Daath com SVG, textos curvados (`<textPath>`) e 3 anéis concêntricos
- 22 Caminhos com bordas duplas "armadura RPG": número, letra hebraica, signo, arcano
- Elementos ornamentais: colunas B/J, véus, Ain Soph, lemniscata, labels das almas
- Cores fiéis à tradição Golden Dawn

### 💀 Árvore da Morte (Qliphoth)
- 10 Qliphoth + O Abismo (Choronzon)
- 22 Túneis de Set (Kenneth Grant)
- Demônios goéticos como arquétipos psicológicos
- Virtudes latentes e vícios de cada túnel

### ☯ Visão Combinada
- Árvore da Vida no topo → Árvore da Morte invertida embaixo
- Malkuth conecta a Nahemoth

### 🔍 Busca por Correspondências
- Pesquise: "boi", "lua", "rubi", "coração"
- Motor fuzzy em animais, pedras, partes do corpo e keywords
- Resultados com sugestões de termos relacionados

### � Tooltips Educativos Fixáveis
- Hover mostra, click fixa (borda amarela)
- Conteúdo copiável com feedback visual
- Fechar com Escape, click fora ou botão ✕

### 🎨 Tema Light & Dark
- Light: fundo pergaminho, visual clássico
- Dark: fundo escuro para uso noturno
- Persistência em localStorage

### 🌐 Internacionalização
- Português (BR) e Inglês (US)
- Troca instantânea

### 🖱️ Interação
- Pan & zoom (arrastar + scroll)
- Pinch-to-zoom no mobile
- Zoom com teclado: `+` / `-`

## Testes Visuais

O projeto usa Playwright para regressão visual. Isso garante que mudanças no CSS/SVG não quebrem a experiência:

```bash
# Primeira vez — gerar snapshots de referência
npm run test:visual:update

# Depois de mudanças — comparar com referência
npm run test:visual

# UI interativa para debug
npm run test:visual:ui
```

## Estrutura do projeto

```
src/
├── app/
│   ├── globals.css                  # Tailwind + CSS variables (light/dark)
│   └── [locale]/
│       ├── layout.tsx               # Layout raiz com i18n
│       └── page.tsx                 # Página principal
├── components/
│   ├── CombinedTree/                # Visão combinada
│   ├── DraggableArea/               # Pan, zoom, pinch
│   ├── KabbalahTree/
│   │   ├── KabbalahTree.tsx         # Árvore da Vida + ornamentos
│   │   └── TreePaths.tsx            # 22 caminhos (estilo armadura)
│   ├── QliphothTree/
│   │   ├── QliphothTree.tsx         # Árvore da Morte
│   │   └── QliphothPaths.tsx        # 22 túneis (estilo armadura)
│   ├── Search/                      # Busca por correspondências
│   ├── Sephirot/
│   │   ├── Sephirot.tsx             # SVG com 3 anéis + textPath + tooltip
│   │   └── types.ts                 # Tipagem
│   ├── Tooltip/                     # Tooltip fixável
│   ├── LanguageSelector.tsx
│   └── ThemeToggle.tsx
├── data/
│   ├── tree-layout.ts              # ⭐ Config de layout (portável)
│   ├── sephirots.ts
│   ├── qliphoth.ts
│   ├── qliphothPaths.ts
│   └── correspondences.ts
├── i18n/
│   ├── messages/{pt-BR,en-US}.json
│   ├── request.ts
│   └── routing.ts
└── middleware.ts
e2e/
└── visual-tree.spec.ts             # Testes visuais Playwright
.kiro/steering/
└── project-vision.md               # Visão estratégica do projeto
```

## Deploy

### Netlify (configurado)
```bash
git push origin main
```

### Vercel
```bash
npx vercel
```

## Roadmap

- [ ] PWA (Service Worker, manifest, offline)
- [ ] Monetização (doação + freemium)
- [ ] Backend API (dados servidos via REST/GraphQL)
- [ ] Área de aprendizado / conteúdo informativo
- [ ] Outros gráficos cabalísticos
- [ ] App nativo (Kotlin / Swift — dados compartilhados)
- [ ] Acessibilidade (ARIA, keyboard nav, alto contraste)
- [ ] Design responsivo: desktop detalhista / mobile minimalista

## Referências Cabalísticas

- **Liber 777** (Aleister Crowley) — tabelas de correspondências
- **The Golden Dawn** (Israel Regardie) — sistema de Qliphoth
- **Nightside of Eden** (Kenneth Grant) — Túneis de Set
- **A Cabala Mística** (Dion Fortune) — interpretação ocidental
- **HOD Studios** — referência visual (autorizado)

## Autor

**@mrviniciux** — [GitHub](https://github.com/mrviniciux) · [LinkedIn](https://linkedin.com/in/mrviniciux) · [Instagram](https://instagram.com/mrviniciux)

## Licença

MIT
