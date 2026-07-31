# Design Document

## Overview

This feature introduces two complementary enhancements to the Qliphoth tooltip system:

1. **ExpandableSection** — a reusable collapsible component that hides verbose content (integration/dailyLife) behind a "See more" toggle, keeping tooltips compact by default.
2. **Daemon Sigil Display** — inline sigil images rendered beside regent names in Qliphoth tooltips by looking up daemon associations from the existing data layer.

Both integrate into the existing `Sephirot.tsx` component without modifying the Tooltip or SigilImage components themselves.

## Architecture

```
┌─────────────────────────────────────────────────────┐
│ Sephirot.tsx (tooltip content builder)              │
│                                                     │
│  ┌────────────────────────────────────────────────┐ │
│  │ Regent line: name + SigilImage(s) at size 28   │ │
│  └────────────────────────────────────────────────┘ │
│  ┌────────────────────────────────────────────────┐ │
│  │ ExpandableSection (collapsed by default)       │ │
│  │  └─ integration text                           │ │
│  │  └─ dailyLife text                             │ │
│  └────────────────────────────────────────────────┘ │
└─────────────────────────────────────────────────────┘
         │                         │
         ▼                         ▼
   SigilImage.tsx            ExpandableSection.tsx
   (existing, unchanged)     (new component)
         │
         ▼
   daemons.ts (data lookup)
```

## Components and Interfaces

### ExpandableSection

**File:** `src/components/ExpandableSection/ExpandableSection.tsx`

A client component using `useState` to toggle visibility of its children.

```tsx
'use client';

import { useState, useId } from 'react';
import { useTranslations } from 'next-intl';

interface ExpandableSectionProps {
  children: React.ReactNode;
  collapsedLabel?: string;
  expandedLabel?: string;
}

export function ExpandableSection({
  children,
  collapsedLabel,
  expandedLabel,
}: ExpandableSectionProps) {
  const [expanded, setExpanded] = useState(false);
  const ui = useTranslations('ui');
  const regionId = useId();

  const resolvedCollapsedLabel = collapsedLabel ?? ui('seeMore');
  const resolvedExpandedLabel = expandedLabel ?? ui('seeLess');

  return (
    <div>
      <button
        type="button"
        aria-expanded={expanded}
        aria-controls={regionId}
        onClick={() => setExpanded((prev) => !prev)}
        className="min-h-[44px] min-w-[44px] text-[11px] text-white/60 hover:text-white/90 transition-colors cursor-pointer underline underline-offset-2"
      >
        {expanded ? resolvedExpandedLabel : resolvedCollapsedLabel}
      </button>
      <div id={regionId} role="region" hidden={!expanded}>
        {expanded && children}
      </div>
    </div>
  );
}
```

**Key decisions:**
- Uses `useId()` for stable, SSR-safe id generation for `aria-controls`.
- Button element provides native keyboard support (Enter/Space) and focusability.
- `min-h-[44px] min-w-[44px]` ensures 44×44px touch target.
- Children are conditionally rendered (not just hidden) to avoid mounting complex content when collapsed.
- `hidden` attribute on the region ensures screen readers don't announce hidden content.

### Daemon Sigil Lookup Utility

**Location:** Inline in `Sephirot.tsx` (helper function)

```tsx
import { daemons, DaemonEntry } from '@/data/daemons';

function getDaemonsForQliphah(qliphahId: string): DaemonEntry[] {
  return daemons.filter((d) =>
    d.associations.some(
      (a) => a.type === 'qliphah' && a.refId === qliphahId
    )
  );
}
```

This pure function filters the `daemons` array by matching `refId` against the qliphah key. For example, `getDaemonsForQliphah('thaumiel')` returns the entries for Satan and Moloch.

### Modified Tooltip Content in Sephirot.tsx

The `tooltipContent` JSX in `Sephirot.tsx` is updated:

1. **Regent line** — after the regent name text, render `SigilImage` for each matched daemon:

```tsx
import { SigilImage } from '@/components/Search/SigilImage';

// Inside tooltipContent:
{regentTitle && regentName && (
  <p className="mt-1 inline-flex items-center gap-1">
    🔱 {regentTitle} — {regentName}
    {getDaemonsForQliphah(data.name.toLowerCase()).map((daemon) => (
      <SigilImage
        key={daemon.id}
        url={daemon.sigilUrl}
        alt={daemon.canonicalName}
        size={28}
      />
    ))}
  </p>
)}
```

2. **ExpandableSection wrapping** — integration/dailyLife content moves inside `ExpandableSection`:

```tsx
import { ExpandableSection } from '@/components/ExpandableSection/ExpandableSection';

// Replace direct integration/dailyLife rendering with:
{(integration || dailyLife) && (
  <ExpandableSection>
    {integration && (
      <p className="text-green-300">🌱 {integrationLabel}: {integration}</p>
    )}
    {dailyLife && (
      <p className="text-yellow-300">🔄 {dailyLifeLabel}: {dailyLife}</p>
    )}
  </ExpandableSection>
)}
```

**Note:** The sigil images remain outside the ExpandableSection, in the always-visible regent line.

## Data Models

### ExpandableSectionProps

```typescript
interface ExpandableSectionProps {
  children: React.ReactNode;
  collapsedLabel?: string;  // defaults to ui('seeMore')
  expandedLabel?: string;   // defaults to ui('seeLess')
}
```

### getDaemonsForQliphah Return Type

```typescript
// Input: qliphah id string (e.g., "thaumiel")
// Output: DaemonEntry[] — filtered subset of the daemons catalog
// Uses existing DaemonEntry and DaemonAssociation interfaces from src/data/daemons.ts
```

No new data models are introduced. The feature reuses the existing `DaemonEntry`, `DaemonAssociation`, and `SephirotData` types.

## Data Flow

```
User hovers/clicks qliphah sphere
        │
        ▼
Sephirot receives `data` prop (SephirotData with qliphah fields)
        │
        ├── data.name.toLowerCase() → qliphah key (e.g., "thaumiel")
        │
        ├── getDaemonsForQliphah(key) → DaemonEntry[]
        │   └── each entry.sigilUrl → SigilImage component
        │
        └── data.integration / data.dailyLife
            └── wrapped in ExpandableSection (collapsed by default)
```

## Internationalization

New keys added to all locale files under the `"ui"` namespace:

| Key | en-US | pt-BR | ja | he |
|-----|-------|-------|----|----|
| `ui.seeMore` | "See more" | "Ver mais" | "もっと見る" | "ראה עוד" |
| `ui.seeLess` | "See less" | "Ver menos" | "閉じる" | "ראה פחות" |

All 4 existing locale files (`en-US.json`, `pt-BR.json`, `ja.json`, `he.json`) will be updated.

## Error Handling

| Scenario | Handling |
|----------|----------|
| Sigil image fails to load | SigilImage's existing `onError` fallback renders 🔏 emoji with aria-label |
| No daemons found for a qliphah id | `getDaemonsForQliphah` returns empty array; no sigils rendered |
| No integration/dailyLife content | ExpandableSection not rendered (conditional check) |
| Missing i18n key | next-intl falls back to key name; non-breaking |

## Testing Strategy

### Unit Tests (vitest)
- ExpandableSection renders collapsed by default
- ExpandableSection toggle shows/hides children
- ExpandableSection uses i18n defaults when no label props provided
- ExpandableSection sets correct aria attributes
- `getDaemonsForQliphah` returns correct entries for known qliphah ids
- `getDaemonsForQliphah` returns empty array for unknown ids

### Property Tests (vitest + fast-check)
- Toggle round-trip (Property 1)
- Label reflects state (Property 2)
- aria-expanded correctness (Property 3)
- i18n locale completeness (Property 4)
- Daemon lookup correctness (Property 5)

### Integration Tests (Playwright)
- Qliphoth tooltip displays sigils beside regent names
- Qliphoth tooltip ExpandableSection expands/collapses on click
- Sigil fallback renders when image URL is invalid

## Correctness Properties

*A property is a characteristic or behavior that should hold true across all valid executions of a system — essentially, a formal statement about what the system should do. Properties serve as the bridge between human-readable specifications and machine-verifiable correctness guarantees.*

### Property 1: Toggle round-trip preserves state

*For any* ExpandableSection instance, toggling twice (expand then collapse) SHALL return the component to its original collapsed state with children hidden and the collapsed label displayed.

**Validates: Requirements 1.7, 1.8**

### Property 2: Toggle label reflects expanded state

*For any* ExpandableSection with given collapsedLabel and expandedLabel strings, the displayed label text SHALL equal the collapsedLabel when collapsed and the expandedLabel when expanded.

**Validates: Requirements 1.9, 1.10**

### Property 3: aria-expanded reflects toggle state

*For any* sequence of toggle activations on an ExpandableSection, the `aria-expanded` attribute on the button SHALL equal `"true"` when expanded and `"false"` when collapsed.

**Validates: Requirements 2.4**

### Property 4: All supported locales contain toggle i18n keys

*For any* supported locale file, the JSON object SHALL contain both `ui.seeMore` and `ui.seeLess` keys with non-empty string values.

**Validates: Requirements 3.3**

### Property 5: Daemon lookup returns correct regents for qliphah

*For any* qliphah id present in the qliphoth data, `getDaemonsForQliphah(id)` SHALL return exactly the daemon entries whose associations include `{ type: 'qliphah', refId: id }`, and no others.

**Validates: Requirements 4.4**

### Property 6: All regent sigils displayed for any qliphah

*For any* qliphah with N associated regent daemons (N ≥ 1), the tooltip SHALL render exactly N SigilImage components at size 28, one per daemon.

**Validates: Requirements 4.1, 4.3**

### Property 7: ExpandableSection wraps integration/dailyLife when present

*For any* qliphah that has a non-empty integration or dailyLife field, the tooltip content SHALL include an ExpandableSection containing those fields, and expanding it SHALL reveal the integration and dailyLife text with their labels and icons.

**Validates: Requirements 6.1, 6.3**
