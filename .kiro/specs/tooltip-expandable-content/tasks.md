# Implementation Plan: Tooltip Expandable Content

## Overview

Implement a reusable `ExpandableSection` component and integrate it into Qliphoth tooltips alongside inline daemon sigil images. The approach is incremental: first build the new component with i18n support, then wire sigil display into the tooltip, and finally wrap integration/dailyLife fields in the expandable section.

## Tasks

- [ ] 1. Create ExpandableSection component and add i18n keys
  - [ ] 1.1 Create `src/components/ExpandableSection/ExpandableSection.tsx`
    - Implement the client component with `useState` toggle, `useId` for aria-controls
    - Render a `<button>` with `aria-expanded`, min 44×44px touch target
    - Conditionally render children inside a `<div role="region">` with `hidden` attribute
    - Use `useTranslations('ui')` for default labels (`seeMore` / `seeLess`)
    - Accept optional `collapsedLabel` and `expandedLabel` props
    - _Requirements: 1.1, 1.2, 1.3, 1.4, 1.5, 1.6, 1.7, 1.8, 1.9, 1.10, 2.1, 2.2, 2.3, 2.4, 2.5_

  - [ ] 1.2 Add i18n keys to all locale files
    - Add `"seeMore"` and `"seeLess"` keys under the `"ui"` namespace in all locale JSON files
    - Locales: en-US, pt-BR, ja, he (and any others present)
    - _Requirements: 3.1, 3.2, 3.3_

  - [ ]* 1.3 Write unit tests for ExpandableSection
    - Test renders collapsed by default with children hidden
    - Test toggle shows children and updates label
    - Test toggle back hides children and restores collapsed label
    - Test aria-expanded reflects state
    - Test aria-controls links button to region
    - Test custom label props override defaults
    - _Requirements: 1.6, 1.7, 1.8, 1.9, 1.10, 2.4, 2.5_

  - [ ]* 1.4 Write property test: Toggle round-trip (Property 1)
    - **Property 1: Toggle round-trip preserves state**
    - For any ExpandableSection, toggling twice returns to collapsed state
    - **Validates: Requirements 1.7, 1.8**

  - [ ]* 1.5 Write property test: Label reflects state (Property 2)
    - **Property 2: Toggle label reflects expanded state**
    - For any collapsedLabel/expandedLabel pair, displayed text matches the current state
    - **Validates: Requirements 1.9, 1.10**

  - [ ]* 1.6 Write property test: aria-expanded correctness (Property 3)
    - **Property 3: aria-expanded reflects toggle state**
    - For any sequence of toggles, aria-expanded is "true" when expanded, "false" when collapsed
    - **Validates: Requirements 2.4**

  - [ ]* 1.7 Write property test: i18n locale completeness (Property 4)
    - **Property 4: All supported locales contain toggle i18n keys**
    - For any supported locale file, `ui.seeMore` and `ui.seeLess` exist as non-empty strings
    - **Validates: Requirements 3.3**

- [ ] 2. Checkpoint - Verify ExpandableSection
  - Ensure all tests pass, ask the user if questions arise.

- [ ] 3. Integrate daemon sigils into Qliphoth tooltips
  - [ ] 3.1 Implement `getDaemonsForQliphah` helper in `Sephirot.tsx`
    - Import `daemons` from `@/data/daemons`
    - Create function that filters daemons by association `{ type: 'qliphah', refId: id }`
    - _Requirements: 4.4_

  - [ ] 3.2 Render SigilImage components in the regent line of Qliphoth tooltips
    - Import `SigilImage` from `@/components/Search/SigilImage`
    - Call `getDaemonsForQliphah(data.name.toLowerCase())` for qliphoth spheres
    - Map results to `<SigilImage>` at size 28 beside the regent name
    - Use `inline-flex items-center gap-1` for layout on the regent line
    - _Requirements: 4.1, 4.2, 4.3, 5.1, 5.2, 5.3, 5.4_

  - [ ]* 3.3 Write property test: Daemon lookup correctness (Property 5)
    - **Property 5: Daemon lookup returns correct regents for qliphah**
    - For any qliphah id in the data, result matches entries with matching association
    - **Validates: Requirements 4.4**

  - [ ]* 3.4 Write property test: All regent sigils displayed (Property 6)
    - **Property 6: All regent sigils displayed for any qliphah**
    - For any qliphah with N associated daemons, N SigilImage elements rendered at size 28
    - **Validates: Requirements 4.1, 4.3**

- [ ] 4. Wrap integration/dailyLife in ExpandableSection
  - [ ] 4.1 Update Sephirot.tsx tooltip content for Qliphoth spheres
    - Import `ExpandableSection`
    - Wrap integration and dailyLife fields inside `<ExpandableSection>`
    - Only render ExpandableSection when at least one field is present
    - Keep sigils outside the ExpandableSection (in the always-visible regent line)
    - _Requirements: 6.1, 6.2, 6.3, 6.4, 5.4_

  - [ ]* 4.2 Write property test: ExpandableSection wraps integration/dailyLife (Property 7)
    - **Property 7: ExpandableSection wraps integration/dailyLife when present**
    - For any qliphah with non-empty integration or dailyLife, content is inside ExpandableSection
    - **Validates: Requirements 6.1, 6.3**

- [ ] 5. Final checkpoint - Ensure all tests pass
  - Ensure all tests pass, ask the user if questions arise.

## Notes

- Tasks marked with `*` are optional and can be skipped for faster MVP
- Each task references specific requirements for traceability
- Checkpoints ensure incremental validation
- Property tests validate universal correctness properties from the design
- Unit tests validate specific examples and edge cases
- The project already has `vitest` and `fast-check` configured as dev dependencies
- All code uses TypeScript with Next.js App Router conventions (`'use client'` directive)

## Task Dependency Graph

```json
{
  "waves": [
    { "id": 0, "tasks": ["1.1", "1.2"] },
    { "id": 1, "tasks": ["1.3", "1.4", "1.5", "1.6", "1.7", "3.1"] },
    { "id": 2, "tasks": ["3.2", "3.3"] },
    { "id": 3, "tasks": ["3.4", "4.1"] },
    { "id": 4, "tasks": ["4.2"] }
  ]
}
```
