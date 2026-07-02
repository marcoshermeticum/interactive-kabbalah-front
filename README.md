# 🌳 Interactive Kabbalah — Árvore da Vida & Morte

Frontend interativo da Árvore da Vida e da Árvore da Morte (Qliphoth) cabalísticas. Todas as Sephirots, Qliphoth e os 22 Caminhos/Túneis são renderizados como SVG com textos curvados, tooltips educativos ricos, busca por correspondências e suporte bilíngue.

![Next.js](https://img.shields.io/badge/Next.js-15-black) ![React](https://img.shields.io/badge/React-19-blue) ![Tailwind](https://img.shields.io/badge/Tailwind-4-cyan) ![TypeScript](https://img.shields.io/badge/TypeScript-5.8-blue)

## Pré-requisitos

- **Node.js 22+** (LTS)
- **npm** ou **yarn**

## Início rápido

```bash
git clone https://github.com/mrviniciux/interactive-kabbalah-front.git
cd interactive-kabbalah-front

# Com npm
npm install
npm run dev

# Com yarn
yarn
yarn dev
```

A aplicação estará disponível em **http://localhost:3000**

## Scripts

| Comando | Descrição |
|---------|-----------|
| `npm run dev` / `yarn dev` | Dev server com Turbopack |
| `npm run build` / `yarn build` | Build de produção |
| `npm start` / `yarn start` | Serve build de produção |
| `npm run lint` / `yarn lint` | Linter |

## Stack

| Tecnologia | Função |
|-----------|--------|
| Next.js 15 | Framework (App Router, Turbopack) |
| React 19 | UI reativa |
| Tailwind CSS 4 | Estilização zero-runtime |
| next-intl 4 | Internacionalização (PT-BR, EN-US) |
| TypeScript 5.8 | Tipagem estática |

**Zero dependências pesadas** — sem MUI, styled-components ou bundlers extras.

## Funcionalidades

### 🌳 Árvore da Vida (Sephiroth)
- 10 Sephirots + Daath com SVG e textos curvados (`<textPath>`)
- 22 Caminhos como barras coloridas grossas com: número, letra hebraica, signo zodiacal e arcano do Tarot
- Gradientes radiais para efeito 3D nas esferas
- Cores fiéis à tradição Golden Dawn

### 💀 Árvore da Morte (Qliphoth)
- 10 Qliphoth + O Abismo (Choronzon)
- 22 Túneis de Set (Kenneth Grant) com nomes dos túneis
- Demônios goéticos como arquétipos psicológicos (Asmodeus, Lilith, Belphegor, etc.)
- Virtudes latentes e vícios/sombras de cada túnel
- Cores sombrias com paleta escura/vermelha

### ☯ Visão Combinada
- Árvore da Vida no topo → Árvore da Morte invertida embaixo
- Malkuth conecta a Nahemoth (Qliphoth 10 no topo)
- Thaumiel (Qliphoth 1) no fundo absoluto
- A Morte fica "de cabeça para baixo" — espelho sombrio da Vida

### 🔍 Busca por Correspondências
- Pesquise por palavras do cotidiano: "boi", "lua", "rubi", "coração"
- Motor de busca fuzzy em animais, pedras, partes do corpo e keywords
- Resultados mostram em qual Sephirot ou Caminho a palavra se encaixa
- Sugestões de termos relacionados para expandir a pesquisa
- Click no resultado navega ao elemento na árvore

### 📋 Tooltips Educativos
**Sephirots mostram:**
- Nome, número, significado
- Planeta (com símbolo e nome)
- Regente angelical (coro + anjo)
- Defeito associado
- Mundo cabalístico
- Arquétipos (ex: Tiferet = Jesus, Neo, Buda, Krishna, Oxalá)
- Arcanos menores correlacionados (4 cartas com descrição)
- 🐾 Animais correspondentes
- 💎 Pedras preciosas
- 🫀 Partes do corpo humano

**Caminhos mostram:**
- Número + letra hebraica (com nome)
- Signo zodiacal/elemental
- Arcano maior do Tarot (completo)
- Virtude e Vício do arcano
- Conexão (de → para)

**Qliphoth/Túneis mostram:**
- Nome do Qliphah + demônio goético principal
- Significado arquetípico da sombra
- Virtude latente (qualidade integrativa)
- Vício/sombra (expressão negativa)
- Nome do Túnel de Set

### 📌 Tooltips Fixáveis
- Hover mostra tooltip informativo
- Click fixa o tooltip (borda amarela)
- Conteúdo selecionável e copiável quando fixado
- Botão "📋 Copiar" com feedback visual ("✓ Copiado!")
- Fechar com click fora, botão ✕, ou Escape

### 🎨 Tema Light & Dark
- **Light** (padrão): fundo creme, visual clássico como a referência impressa
- **Dark**: fundo escuro para uso noturno
- Toggle ☀️/🌙 no header, persiste no localStorage

### 🌐 Internacionalização Completa
- Português (BR) e Inglês (US)
- Todos os textos traduzidos: títulos, labels, tooltips, arcanos, significados
- Troca de idioma instantânea

### 🖱️ Interação
- Pan & zoom com mouse (arrastar + scroll wheel)
- Pinch-to-zoom no mobile (2 dedos)
- Zoom com teclado: `+` / `-`
- Header fixo — nunca afetado pelo zoom
- Responsivo: desktop e mobile

## Estrutura do projeto

```
src/
├── app/
│   ├── globals.css                  # Tailwind + CSS variables (light/dark)
│   └── [locale]/
│       ├── layout.tsx               # Layout raiz com i18n
│       └── page.tsx                 # Página principal com toggle
├── components/
│   ├── CombinedTree/                # Visão combinada (Vida + Morte invertida)
│   ├── DraggableArea/               # Pan, zoom, pinch (mouse + touch + keyboard)
│   ├── KabbalahTree/
│   │   ├── KabbalahTree.tsx         # Composição da Árvore da Vida
│   │   └── TreePaths.tsx            # 22 caminhos (barras SVG + tooltip)
│   ├── QliphothTree/
│   │   ├── QliphothTree.tsx         # Composição da Árvore da Morte
│   │   └── QliphothPaths.tsx        # 22 túneis de Set
│   ├── Search/
│   │   └── Search.tsx               # Busca por correspondências
│   ├── Sephirot/
│   │   ├── Sephirot.tsx             # SVG com textPath curvado + tooltip
│   │   └── types.ts                 # Tipagem
│   ├── Tooltip/
│   │   └── Tooltip.tsx              # Tooltip fixável com copiar/fechar
│   ├── LanguageSelector.tsx         # Seletor PT/EN
│   └── ThemeToggle.tsx              # Toggle light/dark
├── data/
│   ├── sephirots.ts                 # Dados das 11 sephirots
│   ├── qliphoth.ts                  # Dados das 11 qliphoth
│   ├── qliphothPaths.ts             # 22 túneis de Set
│   └── correspondences.ts          # Animais, pedras, corpo, keywords
├── i18n/
│   ├── messages/
│   │   ├── pt-BR.json              # Traduções português (sephirots + caminhos + UI)
│   │   └── en-US.json              # Traduções inglês
│   ├── request.ts
│   └── routing.ts
└── middleware.ts
```

## Deploy

### Netlify (configurado)
O `netlify.toml` já está configurado:
```bash
git push origin main
```
O Netlify faz build automaticamente com `yarn build`.

### Vercel
```bash
npx vercel
```

### Docker / Node.js
```bash
npm run build
npm start
```

## Referências Cabalísticas

- **Liber 777** (Aleister Crowley) — tabelas de correspondências
- **The Golden Dawn** (Israel Regardie) — sistema de Qliphoth
- **Nightside of Eden** (Kenneth Grant) — Túneis de Set
- **A Cabala Mística** (Dion Fortune) — interpretação ocidental

## Autor

**@mrviniciux** — [GitHub](https://github.com/mrviniciux) · [LinkedIn](https://linkedin.com/in/mrviniciux) · [Instagram](https://instagram.com/mrviniciux)

## Licença

MIT
