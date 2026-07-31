# Design Document: Non-Dualistic UX Enhancements

## Overview

Este design descreve a implementação de cinco melhorias interconectadas na aplicação Kabbalah Interativa:

1. **Guia de Orientações** — Dialog acessível com conteúdo internacionalizado sobre interpretação não-dualística da Árvore da Vida
2. **Sistema de Notificações** — Componente unificado na topbar com badge, persistência em LocalStorage e suporte a atualizações
3. **Conteúdo Não-Dualístico** — Campos `integration` e `dailyLife` na estrutura de dados Qliphoth com renderização no tooltip
4. **Catálogo de Daemons** — Módulo TypeScript independente com indexação no SearchIndex para busca por nome/alias
5. **Imagens de Sigilos** — Exibição de sigilos nos resultados de busca do tipo daemon com fallback graceful
6. **Compatibilidade Mobile** — Adaptações responsivas para todas as funcionalidades acima

A arquitetura segue o padrão existente: componentes React client-side (`'use client'`), dados estáticos em módulos TypeScript, internacionalização via `next-intl`, e estilização com Tailwind CSS.

## Architecture

```mermaid
graph TD
    subgraph "Camada de Dados"
        D1[src/data/qliphoth.ts] -->|SephirotData + integration/dailyLife| D2[searchIndex.ts]
        D3[src/data/daemons.ts] -->|DaemonEntry[]| D2
        D4[src/data/notifications.ts] -->|NotificationEntry[]| N1
    end

    subgraph "Camada de Componentes"
        N1[NotificationButton] -->|abre| N2[NotificationDialog]
        N2 -->|link| G1[OrientationGuideDialog]
        S1[Search] -->|renderiza| S2[SearchResultItem]
        S2 -->|daemon| S3[SigilImage]
        T1[Tooltip] -->|qliphah| T2[QliphothTooltipContent]
    end

    subgraph "Camada de Persistência"
        LS[LocalStorage]
        N1 -->|lê/escreve| LS
    end

    subgraph "i18n"
        I1[pt-BR.json]
        I2[en-US.json]
        I3[he.json]
        I4[ja.json]
    end

    subgraph "Layout"
        NB[Navbar.tsx] --> N1
        NB --> S1
        MB[Mobile Sidebar] --> N1
    end
```

### Decisões Arquiteturais

1. **Notificações como dados estáticos** — As notificações são definidas em um array TypeScript (`notifications.ts`) em vez de vir de um backend. Isto porque a aplicação é estática (Next.js SSG/ISR) e não possui API de backend. Novas notificações são adicionadas por deploy.

2. **LocalStorage com fallback graceful** — O hook `useNotificationState` encapsula toda interação com LocalStorage, tratando indisponibilidade (SSR, modo privado) retornando estado "todas não lidas" sem erro.

3. **Daemon catalog como módulo separado** — O `daemons.ts` é independente para manter separação de concerns e facilitar manutenção do catálogo extenso (33+ entradas).

4. **Extensão do tipo `SephirotData`** — Campos `integration` e `dailyLife` são opcionais no tipo para manter retrocompatibilidade com sephirots que não os utilizam.

## Components and Interfaces

### Novos Componentes

#### `NotificationButton`
- **Localização**: `src/components/Notifications/NotificationButton.tsx`
- **Responsabilidade**: Botão na topbar com badge indicador
- **Props**: `{ unreadCount: number; onClick: () => void }`
- **Renderiza**: Ícone de sino + badge circular (8-12px) quando `unreadCount > 0`

#### `NotificationDialog`
- **Localização**: `src/components/Notifications/NotificationDialog.tsx`
- **Responsabilidade**: Dialog acessível listando notificações
- **Props**: `{ isOpen: boolean; onClose: () => void; onOpenGuide: () => void }`
- **Acessibilidade**: `role="dialog"`, `aria-modal="true"`, focus trap, Escape fecha
- **Layout**: Lista ordenada recente→antiga, lidas com opacidade reduzida, item permanente "Guia de Orientações"

#### `OrientationGuideDialog`
- **Localização**: `src/components/Notifications/OrientationGuideDialog.tsx`
- **Responsabilidade**: Dialog com conteúdo do guia de orientações
- **Props**: `{ isOpen: boolean; onClose: () => void }`
- **Conteúdo**: Seções internacionalizadas (propósito, interpretação não-dualística, metáfora da poda, dicas)
- **Acessibilidade**: `role="dialog"`, `aria-modal="true"`, focus trap, Escape fecha, foco retorna ao trigger

#### `SigilImage`
- **Localização**: `src/components/Search/SigilImage.tsx`
- **Responsabilidade**: Imagem do sigilo com fallback
- **Props**: `{ url: string; alt: string; size: 28 | 32 }`
- **Fallback**: Emoji 🔏 com mesmas dimensões em caso de erro de carregamento

### Componentes Modificados

#### `Navbar.tsx`
- Adiciona `NotificationButton` ao lado direito (desktop e mobile sidebar)
- Gerencia estado de abertura dos dialogs

#### `Search.tsx`
- Estende renderização de resultados para incluir `SigilImage` quando `result.type === 'daemon'` (via campo `sigilUrl`)
- Reserva espaço fixo (40px desktop, 36px mobile) à esquerda para sigilo

#### `Sephirot.tsx`
- Renderiza campos `integration` e `dailyLife` no tooltip quando presentes (qliphoth)

### Hooks

#### `useNotificationState`
- **Localização**: `src/hooks/useNotificationState.ts`
- **API**:
  ```typescript
  interface NotificationState {
    readIds: Set<string>;
    unreadCount: number;
    markAsRead: (id: string) => void;
    isGuideRead: boolean;
    markGuideRead: () => void;
  }
  function useNotificationState(notifications: NotificationEntry[]): NotificationState
  ```
- **Persistência**: Chaves LocalStorage `kabbalah-notifications-read` (JSON array de IDs) e `kabbalah-guide-read` (boolean)

### Interfaces TypeScript

```typescript
// src/data/daemons.ts
export interface DaemonEntry {
  id: string;               // identificador único (slug)
  canonicalName: string;     // nome canônico (ex: "Lucifuge Rofocale")
  aliases: string[];         // aliases (min 1)
  sigilUrl: string;          // URL do sigilo
  associations: DaemonAssociation[];
}

export interface DaemonAssociation {
  type: 'qliphah' | 'tunnel';
  refId: string;             // id da qliphah ou número do túnel
}

// src/data/notifications.ts
export interface NotificationEntry {
  id: string;                // identificador único
  publishedAt: string;       // ISO date
  titleKey: string;          // chave i18n para título
  descriptionKey: string;    // chave i18n para descrição
}

// Extensão de SearchResult (searchIndex.ts)
export interface SearchResult {
  // ... campos existentes ...
  sigilUrl?: string;         // URL do sigilo (apenas para daemons)
}
```

## Data Models

### Extensão de `SephirotData`

```typescript
// src/components/Sephirot/types.ts
export type SephirotData = {
  // ... campos existentes ...
  integration?: string;   // aspecto de integração/lição (min 10 chars)
  dailyLife?: string;     // manifestação no cotidiano (min 10 chars)
};
```

### Estrutura do Catálogo de Daemons (`src/data/daemons.ts`)

O catálogo contém 33+ entradas cobrindo:
- 11 daemons regentes das Qliphoth (Satã & Moloch, Belzebu & Belial, Lucifuge Rofocale, Ashtaroth, Asmodeus, Belphegor, Baal, Adramalech, Lilith, Nahema, Choronzon)
- 22 daemons dos Túneis de Set (Amprodias, Baratchial, Gargophias, Dagdagiel, Hemethterith, Uriens, Zamradiel, Characith, Temphioth, Yamatu, Kurgasiax, Lafcursiax, Malkunofat, Niantiel, Saksaksalim, A'ano'nin, Parfaxitas, Tzuflifu, Qulielfi, Raflifu, Shalicu, Thantifaxath)

Cada entrada segue o padrão de URL: `https://daemons.com.br/wp-content/uploads/selo-{nome-normalizado}.png`

### Estrutura de Notificações (`src/data/notifications.ts`)

```typescript
export const notifications: NotificationEntry[] = [
  {
    id: 'orientation-guide-v1',
    publishedAt: '2024-01-01T00:00:00Z',
    titleKey: 'notifications.guide.title',
    descriptionKey: 'notifications.guide.description',
  },
  // máximo 50 entradas
];
```

### Chaves i18n adicionais

Novas chaves em cada locale:
- `notifications.guide.title` / `notifications.guide.description`
- `notifications.buttonLabel`
- `guide.title`, `guide.purpose`, `guide.interpretation`, `guide.pruning`, `guide.tips`
- `qliphoth.{id}.integration`, `qliphoth.{id}.dailyLife` (para cada uma das 11 qliphoth)
- `ui.integration`, `ui.dailyLife` (labels dos campos)

### LocalStorage Schema

| Chave | Tipo | Descrição |
|-------|------|-----------|
| `kabbalah-guide-read` | `"true"` \| ausente | Se o guia foi lido |
| `kabbalah-notifications-read` | `string[]` (JSON) | Array de IDs de notificações lidas |



## Correctness Properties

*A property is a characteristic or behavior that should hold true across all valid executions of a system — essentially, a formal statement about what the system should do. Properties serve as the bridge between human-readable specifications and machine-verifiable correctness guarantees.*

### Property 1: Notification state persistence and badge consistency

*For any* sequence of notification read/unread actions (including guide read), after marking a notification as read via `markAsRead(id)` or `markGuideRead()`, re-reading the state from LocalStorage should reflect that notification as read, and the badge (unread count) should equal the number of notifications not yet in the read set.

**Validates: Requirements 2.2, 3.2, 3.4**

### Property 2: Notification ordering invariant

*For any* array of `NotificationEntry` items with distinct `publishedAt` dates, the rendered list in the notification dialog should always be sorted in descending order by `publishedAt` (most recent first).

**Validates: Requirements 3.3**

### Property 3: Notification data validation

*For any* valid `notifications` array, its length must be <= 50, and every entry must have a non-empty `id`, a valid ISO date `publishedAt`, and non-empty `titleKey` and `descriptionKey` strings.

**Validates: Requirements 3.5**

### Property 4: Qliphoth data completeness

*For any* of the 11 qliphoth entries in the dataset (thaumiel, ghogiel, satariel, ghagsheblah, golohab, tagimron, gharab, samael, gamaliel, nahemoth, daath_qliphoth), the fields `integration` and `dailyLife` must exist as non-empty strings with a minimum length of 10 characters, while the existing `regent.defect` field remains present.

**Validates: Requirements 4.1, 4.2**

### Property 5: Neutral language constraint

*For any* text content in the qliphoth fields (`defect`, `integration`, `dailyLife`) and in the ornaments texts (veils, pillars) across all locales, none of the forbidden terms shall appear: "maligno", "sagrado", "terrível", "glorioso", "deve-se evitar", "é preciso combater", "evil", "sacred", "terrible", "glorious", "must avoid", "must fight".

**Validates: Requirements 4.3, 4.5**

### Property 6: Qliphoth i18n completeness

*For any* of the 11 qliphoth identifiers, the i18n message files for pt-BR and en-US must contain keys for `qliphoth.{id}.integration` and `qliphoth.{id}.dailyLife` with non-empty string values.

**Validates: Requirements 4.6**

### Property 7: Daemon catalog completeness

*For any* regent name referenced in the 11 qliphoth data entries and *for any* tunnel daemon name referenced in the 22 qliphoth paths, there must exist a corresponding entry in the daemon catalog with a matching `canonicalName` or alias, at least one alias, and a valid `sigilUrl`.

**Validates: Requirements 5.1**

### Property 8: Daemon search integration

*For any* daemon entry in the catalog with N associations, searching by its canonical name (>= 2 characters) should return exactly N results, each with: a `type` of either `'qliphah'` or `'tunnel'`, a valid `position` (numeric x and y), a `score` in {5, 8, 10}, and a non-empty `sigilUrl` string. Searching by any of its aliases should also return matching results.

**Validates: Requirements 5.2, 5.3, 5.4, 6.1**

### Property 9: Sigil URL normalization

*For any* daemon canonical name string, the generated `sigilUrl` must equal `https://daemons.com.br/wp-content/uploads/selo-{normalized}.png` where `{normalized}` is the canonical name transformed by: converting to lowercase, removing diacritical marks, and replacing spaces with hyphens.

**Validates: Requirements 5.5**

## Error Handling

### LocalStorage Indisponível

- **Cenário**: Modo privado do navegador, Storage quota excedida, ou permissões bloqueadas
- **Comportamento**: O hook `useNotificationState` captura exceções em um try/catch e retorna estado padrão (todas não lidas, guide não lido). Nenhum erro é propagado ao usuário.
- **Implementação**: Wrapper functions `safeGetItem(key)` e `safeSetItem(key, value)` que retornam `null` / `void` silenciosamente em caso de erro.

### Imagem de Sigilo com Falha de Carregamento

- **Cenário**: URL do sigilo retorna 404, timeout, ou CORS block
- **Comportamento**: O componente `SigilImage` utiliza `onError` do elemento `<img>` para trocar o `src` por um estado de fallback (emoji 🔏 renderizado como texto em um `<div>` com mesmas dimensões).
- **Implementação**: Estado React `hasError` que condiciona a renderização entre `<img>` e `<div>` placeholder.

### Chave i18n Ausente

- **Cenário**: Um locale (he, ja) não possui tradução para `integration` ou `dailyLife`
- **Comportamento**: O componente lê primeiro da tradução via `useTranslations`; em caso de ausência (fallback chain do next-intl ou try/catch no `.raw()`), utiliza o valor do arquivo de dados TypeScript (`qliphoth.ts`).
- **Implementação**: Pattern existente no `Sephirot.tsx` com try/catch ao redor de `sephT.raw()`.

### Notificação com ID Desconhecido no LocalStorage

- **Cenário**: Usuário tem IDs em LocalStorage que não existem mais no array de notificações (notificação removida após deploy)
- **Comportamento**: IDs órfãos são ignorados no cálculo de `unreadCount`. Nenhuma limpeza automática é feita (para evitar complexidade).

## Testing Strategy

### Abordagem Dual

A estratégia combina testes baseados em exemplos (E2E com Playwright) e testes baseados em propriedades (unit com fast-check) para cobertura abrangente:

**Property-Based Tests (fast-check)**:
- Biblioteca: `fast-check` (TypeScript, compatível com o ecossistema existente)
- Configuração: mínimo 100 iterações por propriedade
- Escopo: lógica pura de dados — validação, busca, normalização, estado de notificações
- Tag format: `Feature: non-dualistic-ux-enhancements, Property {N}: {description}`

**Example-Based Tests (Playwright E2E)**:
- Framework existente no projeto (`@playwright/test`)
- Escopo: interação UI, acessibilidade, responsividade, renderização visual
- Cobre critérios classificados como EXAMPLE e EDGE_CASE

### Property Tests

| Propriedade | Módulo sob Teste | Generators |
|-------------|-----------------|------------|
| 1: Notification state persistence | `useNotificationState` | Arbitrary notification arrays + random read sequences |
| 2: Notification ordering | Render/sort logic | Arbitrary arrays of NotificationEntry with random dates |
| 3: Notification data validation | `notifications.ts` validator | Arbitrary objects conforming/violating schema |
| 4: Qliphoth data completeness | `qliphoth.ts` | Enumerate all 11 entries (exhaustive) |
| 5: Neutral language | All content fields | Enumerate all text content across locales |
| 6: Qliphoth i18n completeness | i18n message files | Enumerate all 11 qliphoth × 2 locales |
| 7: Daemon catalog completeness | `daemons.ts` vs `qliphoth.ts` + `qliphothPaths.ts` | Enumerate all expected daemon names |
| 8: Daemon search integration | `searchAll()` | Arbitrary daemon entries from catalog |
| 9: Sigil URL normalization | `normalizeDaemonName()` | Arbitrary unicode strings with accents, spaces, special chars |

### Example-Based E2E Tests

| Cenário | Arquivo | Verificação |
|---------|---------|-------------|
| Primeira visita mostra badge | `e2e/notifications.spec.ts` | Badge visível, dialog abre com guia |
| Dialog do guia é acessível | `e2e/notifications.spec.ts` | role, aria-modal, focus trap, Escape |
| Tooltip da qliphah mostra 3 campos | `e2e/desktop.spec.ts` | defect + integration + dailyLife visíveis |
| Busca de daemon mostra sigilo | `e2e/search.spec.ts` | Imagem 32x32 ao lado do resultado |
| Fallback de sigilo funciona | `e2e/search.spec.ts` | Placeholder 🔏 quando imagem falha |
| Mobile: notificações na sidebar | `e2e/mobile.spec.ts` | Botão e dialog funcionais em 375px |
| Mobile: dialog < 95%/90% viewport | `e2e/mobile.spec.ts` | Dimensões max do dialog |
| Mobile: touch targets >= 44x44 | `e2e/mobile.spec.ts` | Todos novos botões >= 44×44 |

### Dependências de Teste Adicionais

Para habilitar property-based testing:
- `fast-check` (devDependency) — biblioteca PBT para TypeScript
- `vitest` (devDependency) — test runner para unit tests (lightweight, compatível com Next.js)

