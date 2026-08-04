# 🔔 Sistema de Notificações

Documentação do sistema de notificações in-app do Interactive Kabbalah.

## Visão Geral

O sistema de notificações permite comunicar novidades, atualizações e notas de release para os usuários dentro da própria aplicação, através do ícone de sininho no header.

**Características:**
- Traduzido automaticamente para o idioma ativo (pt-BR, en-US, ja, he)
- Estado de leitura persistido via localStorage
- Badge com contagem de não-lidas
- Zero dependência externa (sem backend, sem API)
- Tom humano e acessível — não é changelog técnico

---

## Arquitetura

```
src/
├── data/
│   └── notifications.ts              # Lista de notificações (IDs + chaves i18n)
├── hooks/
│   └── useNotificationState.ts       # Estado lidas/não-lidas (localStorage)
├── components/Notifications/
│   ├── NotificationButton.tsx        # Ícone de sininho com badge
│   ├── NotificationDialog.tsx        # Dialog modal com lista de notificações
│   └── OrientationGuideDialog.tsx    # Dialog do guia de orientações
└── i18n/messages/
    ├── pt-BR.json                    # Traduções PT (namespace "notifications")
    ├── en-US.json                    # Traduções EN
    ├── ja.json                       # Traduções JA
    └── he.json                       # Traduções HE
```

### Fluxo de dados

```
notifications.ts (IDs + chaves)
       │
       ▼
useNotificationState (hook)  ←→  localStorage (lidas)
       │
       ▼
NotificationDialog (UI)  ←  useTranslations('notifications')
       │                         │
       ▼                         ▼
NotificationButton          Texto no idioma do usuário
(badge com contagem)
```

---

## Como adicionar uma nova notificação

### Passo 1: Registrar a notificação

Edite `src/data/notifications.ts` e adicione uma entrada no array:

```ts
export const notifications: NotificationEntry[] = [
  // ... entradas existentes ...
  {
    id: 'v1.2.0-zoom',                          // ID único (nunca reutilizar)
    publishedAt: '2026-08-04T00:00:00Z',        // Data ISO (ordena a lista)
    titleKey: 'notifications.v1_2_0.title',     // Chave i18n do título
    descriptionKey: 'notifications.v1_2_0.description', // Chave i18n da descrição
  },
];
```

### Passo 2: Adicionar traduções

Adicione as chaves no namespace `"notifications"` de cada arquivo de idioma:

**`src/i18n/messages/pt-BR.json`**
```json
{
  "notifications": {
    "v1_2_0": {
      "title": "Zoom e navegação melhorados!",
      "description": "Agora você pode dar zoom com dois dedos no celular e scroll no desktop. Muito mais fluido."
    }
  }
}
```

**`src/i18n/messages/en-US.json`**
```json
{
  "notifications": {
    "v1_2_0": {
      "title": "Improved zoom & navigation!",
      "description": "Pinch-to-zoom on mobile and scroll-zoom on desktop. Much smoother experience."
    }
  }
}
```

**`src/i18n/messages/ja.json`**
```json
{
  "notifications": {
    "v1_2_0": {
      "title": "ズームとナビゲーションが改善されました！",
      "description": "モバイルでピンチズーム、デスクトップでスクロールズームが使えるようになりました。"
    }
  }
}
```

**`src/i18n/messages/he.json`**
```json
{
  "notifications": {
    "v1_2_0": {
      "title": "זום וניווט משופרים!",
      "description": "עכשיו אפשר לעשות זום בצביטה בנייד וזום בגלילה בדסקטופ."
    }
  }
}
```

### Passo 3: Pronto!

Ao fazer deploy, a notificação aparecerá automaticamente como não-lida para todos os usuários.

---

## Convenções de escrita

### Tom e linguagem

As notificações são para **usuários finais**, não desenvolvedores. Siga estas diretrizes:

| ✅ Faça | ❌ Evite |
|---------|----------|
| "Agora você pode dar zoom com dois dedos!" | "feat: implement pinch-to-zoom gesture handler" |
| "Corrigimos um problema nos tooltips no celular" | "fix: z-index stacking context on mobile viewport" |
| "Nova busca por correspondências" | "refactor: search index with fuzzy matching" |
| Frases curtas e diretas | Jargão técnico |
| Benefício para o usuário | Detalhe de implementação |

### Estrutura recomendada

- **Título** (max ~50 caracteres): O que mudou, em linguagem humana
- **Descrição** (max ~120 caracteres): Contexto adicional ou como usar

### Quando criar uma notificação

| Situação | Criar notificação? |
|----------|-------------------|
| Nova feature visível para o usuário | ✅ Sim |
| Melhoria significativa de UX | ✅ Sim |
| Bug fix que o usuário percebia | ✅ Sim |
| Refatoração interna | ❌ Não |
| Atualização de dependência | ❌ Não |
| Fix de typo | ❌ Não |

---

## Convenções de ID

Use o formato: `v{major}_{minor}_{patch}-{slug}`

Exemplos:
- `v1_2_0-zoom`
- `v1_3_0-search-improvements`
- `v2_0_0-redesign`

O ID é usado como chave no localStorage para marcar como lida. **Nunca reutilize um ID.**

---

## Convenções de chaves i18n

Formato: `notifications.v{major}_{minor}_{patch}.title` / `.description`

Use underscore (`_`) no lugar de pontos na versão para evitar conflitos no JSON.

---

## Limite

O sistema suporta até **50 notificações**. Ao atingir o limite, remova as mais antigas do array (as mais recentes ficam no topo da lista para o usuário).

---

## Componentes

### `NotificationButton`

Ícone de sininho com badge. Propriedades:
- `unreadCount: number` — quantidade de não-lidas
- `onClick: () => void` — abre o dialog

### `NotificationDialog`

Modal com lista de notificações ordenadas por data (mais recente primeiro).
- Marca como lida ao clicar
- Inclui item fixo "Guia de Orientações"
- Focus trap e fecha com Escape

### `useNotificationState`

Hook que gerencia o estado. Retorna:
- `readIds: Set<string>` — IDs já lidos
- `unreadCount: number` — contagem de não-lidas
- `markAsRead(id: string)` — marca uma como lida
- `isGuideRead: boolean` — se o guia foi lido
- `markGuideRead()` — marca o guia como lido

Persistência via `localStorage`:
- `kabbalah-notifications-read` — array de IDs lidos
- `kabbalah-guide-read` — flag do guia

---

## Relação com o Release-Please

O workflow de release (`release-please`) continua gerando o changelog técnico no GitHub Releases. Esse changelog serve como **referência para o desenvolvedor** escrever a notificação humanizada.

```
GitHub Release (técnico, automático)
  "feat: add pinch-to-zoom gesture handler"
       │
       ▼ (você traduz e humaniza)
       
Notificação in-app (humana, manual)
  "Agora você pode dar zoom com dois dedos!"
```

### Workflow sugerido ao fazer release

1. Faça merge do PR de release (release-please)
2. Leia o changelog gerado
3. Escreva a notificação nos arquivos de tradução
4. Commit: `feat: add v1.2.0 release notification`
5. Push → deploy → usuários veem a novidade

---

## Futuro (quando houver financiamento)

Quando o projeto tiver budget para API keys, é possível:
- Automatizar a tradução via IA (GPT/Claude) no CI
- Gerar drafts de notificação a partir do changelog
- Manter o workflow manual como fallback/revisão

A estrutura de dados (JSON de notificações + chaves i18n) **não muda** — só o processo de escrita se torna assistido.
