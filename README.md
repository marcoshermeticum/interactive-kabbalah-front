# 🌳 Interactive Kabbalah — Árvore da Vida

<img width="572" height="855" alt="image" src="https://github.com/user-attachments/assets/95152462-4299-4818-91d6-99559730e91d" />

Frontend interativo da Árvore da Vida cabalística. Todas as 10 Sephirots + Daath e os 22 Caminhos são renderizados como SVG com informações detalhadas, tooltips educativos e suporte a múltiplos idiomas.

![Next.js](https://img.shields.io/badge/Next.js-15-black) ![React](https://img.shields.io/badge/React-19-blue) ![Tailwind](https://img.shields.io/badge/Tailwind-4-cyan) ![TypeScript](https://img.shields.io/badge/TypeScript-5.8-blue)

<img width="593" height="450" alt="image" src="https://github.com/user-attachments/assets/ab87e948-1ff6-4e20-be84-76fa1d91c597" />


## Pré-requisitos

- **Node.js 20+** (recomendado: 22 LTS)
- **npm** (incluído com Node.js)

## Início rápido

```bash
# Clonar o repositório
git clone <url-do-repo>
cd interactive-kabbalah-front

# Instalar dependências
npm install

# Rodar em modo desenvolvimento (Turbopack)
npm run dev
```

A aplicação estará disponível em **http://localhost:3000**

## Scripts disponíveis

| Comando | Descrição |
|---------|-----------|
| `npm run dev` | Inicia servidor de dev com Turbopack (hot reload) |
| `npm run build` | Gera build de produção otimizado |
| `npm start` | Serve o build de produção |
| `npm run lint` | Executa o linter |

## Stack

| Tecnologia | Função |
|-----------|--------|
| Next.js 15 | Framework fullstack (App Router, Turbopack) |
| React 19 | UI reativa |
| Tailwind CSS 4 | Estilização zero-runtime |
| next-intl 4 | Internacionalização (PT-BR, EN-US) |
| TypeScript 5.8 | Tipagem estática |

**Zero dependências pesadas** — sem MUI, styled-components, Storybook ou bundlers extras.

## Estrutura do projeto

```
src/
├── app/
│   ├── globals.css              # Tailwind + reset
│   └── [locale]/
│       ├── layout.tsx           # Layout raiz com i18n provider
│       └── page.tsx             # Página principal
├── components/
│   ├── DraggableArea/           # Container pan & zoom (mouse + touch)
│   ├── KabbalahTree/
│   │   ├── KabbalahTree.tsx     # Composição da árvore (posições + nós)
│   │   └── TreePaths.tsx        # 22 caminhos (barras SVG + tooltips)
│   ├── Sephirot/
│   │   ├── Sephirot.tsx         # Componente SVG com textPath curvado
│   │   └── types.ts             # Tipagem
│   ├── Tooltip/
│   │   └── Tooltip.tsx          # Tooltip fixável com copiar/fechar
│   └── LanguageSelector.tsx     # Seletor PT/EN
├── data/
│   └── sephirots.ts             # Dados das 11 sephirots (cores, arquétipos, arcanos)
├── i18n/
│   ├── messages/
│   │   ├── pt-BR.json           # Traduções português
│   │   └── en-US.json           # Traduções inglês
│   ├── request.ts               # Config next-intl server
│   └── routing.ts               # Rotas de locale
└── middleware.ts                 # Middleware i18n
```

## Funcionalidades

### Árvore da Vida
- 10 Sephirots + Daath com SVG e textos curvados (textPath)
- 22 Caminhos como barras coloridas com: número, letra hebraica, signo e arcano
- Gradientes radiais em cada sephirot para efeito 3D
- Pan & zoom (arrastar + scroll/pinch)

### Tooltips educativos
- **Sephirots**: nome, significado, planeta (com símbolo), regente angelical, defeito, mundo, arquétipos (ex: Tiferet = Jesus, Neo, Buda), arcanos menores correlacionados
- **Caminhos**: letra hebraica (com nome), signo/elemento, arcano maior do Tarot, virtude e vício
- Tooltips **fixáveis com click** — conteúdo selecionável e copiável
- Botão "Copiar" com feedback visual
- Fechar com click fora, botão ✕, ou Escape

### Internacionalização
- Português (BR) e Inglês (US)
- Troca de idioma reflete em tooltips, nomes, arcanos e labels

## Deploy

### Vercel (recomendado)
```bash
npx vercel
```

### Docker / qualquer plataforma Node
```bash
npm run build
node .next/standalone/server.js
```

O `output: 'standalone'` no `next.config.ts` gera build auto-contido (~30MB).

### Variáveis de ambiente

Nenhuma variável de ambiente é necessária para rodar o projeto.

## Licença

MIT
