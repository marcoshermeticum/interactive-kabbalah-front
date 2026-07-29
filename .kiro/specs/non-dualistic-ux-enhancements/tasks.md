# Implementation Plan: Non-Dualistic UX Enhancements

## Overview

This plan implements five interconnected enhancements to the Interactive Kabbalah application: an orientation guide dialog, a unified notification system, non-dualistic qliphoth content, a complete daemon catalog with search integration and sigil images, and mobile compatibility adaptations. The implementation follows the existing architecture: React client-side components, static TypeScript data modules, next-intl for i18n, and Tailwind CSS for styling.

## Tasks

- [x] 1. Set up testing infrastructure and extend data types
  - [x] 1.1 Install fast-check and vitest as devDependencies and configure vitest
    - Add `fast-check` and `vitest` to devDependencies in `package.json`
    - Create `vitest.config.ts` with path aliases matching Next.js tsconfig
    - Add `"test:unit": "vitest --run"` script to package.json
    - _Requirements: Design Testing Strategy_

  - [x] 1.2 Extend `SephirotData` type with optional `integration` and `dailyLife` fields
    - Add `integration?: string` and `dailyLife?: string` to `src/components/Sephirot/types.ts`
    - _Requirements: 4.1_

  - [x] 1.3 Add `integration` and `dailyLife` content to all 11 qliphoth entries in `src/data/qliphoth.ts`
    - Write neutral, non-dualistic text for each of the 11 qliphoth (thaumiel, ghogiel, satariel, ghagsheblah, golohab, tagimron, gharab, samael, gamaliel, nahemoth, daath_qliphoth)
    - Each `integration` text must describe what is gained by recognizing and integrating the shadow aspect (min 10 chars)
    - Each `dailyLife` text must describe how the imbalance manifests in observable daily behaviors (min 10 chars)
    - Use descriptive, neutral language — no absolute value adjectives ("maligno", "sagrado", "terrível", "glorioso") or moral imperatives ("deve-se evitar", "é preciso combater")
    - _Requirements: 4.1, 4.2, 4.3_

  - [ ]* 1.4 Write property test: Qliphoth data completeness (Property 4)
    - **Property 4: Qliphoth data completeness**
    - Verify all 11 qliphoth entries have non-empty `integration` and `dailyLife` fields with min 10 chars
    - Verify `regent.defect` remains present
    - **Validates: Requirements 4.1, 4.2**

  - [ ]* 1.5 Write property test: Neutral language constraint (Property 5)
    - **Property 5: Neutral language constraint**
    - Verify no forbidden terms appear in `defect`, `integration`, `dailyLife` fields across all qliphoth entries
    - Forbidden terms: "maligno", "sagrado", "terrível", "glorioso", "deve-se evitar", "é preciso combater", "evil", "sacred", "terrible", "glorious", "must avoid", "must fight"
    - **Validates: Requirements 4.3, 4.5**

- [x] 2. Checkpoint - Ensure all tests pass
  - Ensure all tests pass, ask the user if questions arise.

- [x] 3. Create daemon catalog and notification data modules
  - [x] 3.1 Create `src/data/daemons.ts` with full daemon catalog
    - Define `DaemonEntry` and `DaemonAssociation` interfaces
    - Implement `normalizeDaemonName(name: string): string` utility (lowercase, remove diacritics, replace spaces with hyphens)
    - Create catalog with 11 qliphoth regents + 22 tunnel daemons (33+ entries)
    - Each entry: `id`, `canonicalName`, `aliases` (min 1), `sigilUrl` (generated from normalized name), `associations` array
    - Export `daemons` array
    - _Requirements: 5.1, 5.5, 5.6_

  - [ ]* 3.2 Write property test: Daemon catalog completeness (Property 7)
    - **Property 7: Daemon catalog completeness**
    - Verify every regent name in qliphoth data and every tunnel daemon in qliphothPaths has a corresponding daemon catalog entry
    - Verify each entry has at least 1 alias and a valid `sigilUrl`
    - **Validates: Requirements 5.1**

  - [ ]* 3.3 Write property test: Sigil URL normalization (Property 9)
    - **Property 9: Sigil URL normalization**
    - Use fast-check to generate arbitrary unicode strings with accents, spaces, special chars
    - Verify `normalizeDaemonName` output matches expected pattern: lowercase, no diacritics, spaces→hyphens
    - Verify generated URL matches `https://daemons.com.br/wp-content/uploads/selo-{normalized}.png`
    - **Validates: Requirements 5.5**

  - [x] 3.4 Create `src/data/notifications.ts` with notification entries
    - Define `NotificationEntry` interface
    - Create initial notifications array with orientation guide entry
    - Ensure `id`, `publishedAt` (ISO date), `titleKey`, `descriptionKey` are non-empty
    - Export `notifications` array (max 50 entries)
    - _Requirements: 3.5_

  - [ ]* 3.5 Write property test: Notification data validation (Property 3)
    - **Property 3: Notification data validation**
    - Verify notifications array length <= 50
    - Verify every entry has non-empty `id`, valid ISO date `publishedAt`, non-empty `titleKey` and `descriptionKey`
    - **Validates: Requirements 3.5**

- [x] 4. Integrate daemon catalog into search index
  - [x] 4.1 Extend `SearchableType` and `SearchResult` in `src/data/searchIndex.ts`
    - Add `'daemon'` to `SearchableType` union
    - Add optional `sigilUrl?: string` field to `SearchResult` interface
    - _Requirements: 5.2, 6.1_

  - [x] 4.2 Add daemon search logic to `searchAll()` function
    - Import `daemons` from `src/data/daemons.ts`
    - For each daemon entry, search canonicalName and aliases against query
    - Generate one `SearchResult` per association (type = association.type, position from tree layout)
    - Include `sigilUrl` in each result
    - Use existing scoring: 10 exact, 8 prefix, 5 partial
    - _Requirements: 5.2, 5.3, 5.4, 6.1_

  - [ ]* 4.3 Write property test: Daemon search integration (Property 8)
    - **Property 8: Daemon search integration**
    - For each daemon in catalog, verify searching by canonicalName returns N results matching N associations
    - Verify each result has correct `type` ('qliphah' or 'tunnel'), valid `position`, score in {5,8,10}, non-empty `sigilUrl`
    - Verify alias search also returns matching results
    - **Validates: Requirements 5.2, 5.3, 5.4, 6.1**

- [x] 5. Checkpoint - Ensure all tests pass
  - Ensure all tests pass, ask the user if questions arise.

- [x] 6. Create notification hook and components
  - [x] 6.1 Create `src/hooks/useNotificationState.ts` hook
    - Implement `safeGetItem(key)` and `safeSetItem(key, value)` wrapper functions with try/catch
    - Implement `useNotificationState(notifications: NotificationEntry[]): NotificationState`
    - Track `readIds: Set<string>`, compute `unreadCount`, expose `markAsRead(id)`, `isGuideRead`, `markGuideRead()`
    - Persist to LocalStorage keys: `kabbalah-notifications-read` (JSON array), `kabbalah-guide-read` (boolean string)
    - Fallback: if LocalStorage unavailable, return all-unread state without error
    - _Requirements: 2.1, 2.2, 2.5, 3.2, 3.4, 3.7_

  - [ ]* 6.2 Write property test: Notification state persistence and badge consistency (Property 1)
    - **Property 1: Notification state persistence and badge consistency**
    - Use fast-check to generate arbitrary notification arrays and random read sequences
    - Verify after markAsRead(id), unreadCount equals notifications.length minus readIds.size
    - Mock LocalStorage to verify persistence round-trip
    - **Validates: Requirements 2.2, 3.2, 3.4**

  - [x] 6.3 Create `src/components/Notifications/NotificationButton.tsx`
    - Props: `{ unreadCount: number; onClick: () => void }`
    - Render bell icon with circular badge (8-12px diameter) when unreadCount > 0
    - Badge positioned at top-right corner of icon
    - Touch target >= 44x44px on mobile
    - _Requirements: 2.1, 2.3, 3.1, 3.2_

  - [x] 6.4 Create `src/components/Notifications/NotificationDialog.tsx`
    - Props: `{ isOpen: boolean; onClose: () => void; notifications: NotificationEntry[]; readIds: Set<string>; onMarkRead: (id: string) => void; onOpenGuide: () => void }`
    - Accessible dialog: `role="dialog"`, `aria-modal="true"`, focus trap, Escape closes
    - List notifications sorted most recent first (descending `publishedAt`)
    - Read items rendered with reduced opacity
    - Permanent "Orientation Guide" item always visible
    - Mobile: max 95% width, 90% height viewport, positioned above bottom tab bar
    - _Requirements: 1.5, 3.3, 3.4, 3.6, 7.3, 7.4, 7.6_

  - [ ]* 6.5 Write property test: Notification ordering invariant (Property 2)
    - **Property 2: Notification ordering invariant**
    - Use fast-check to generate arrays of NotificationEntry with random dates
    - Verify rendered list is always sorted descending by `publishedAt`
    - **Validates: Requirements 3.3**

  - [x] 6.6 Create `src/components/Notifications/OrientationGuideDialog.tsx`
    - Props: `{ isOpen: boolean; onClose: () => void }`
    - Accessible dialog: `role="dialog"`, `aria-modal="true"`, focus trap, Escape closes, focus returns to trigger
    - Internalized content sections: purpose, non-dualistic interpretation, pruning metaphor, usage tips
    - Uses `useTranslations('guide')` for all content
    - Mobile: max 95% width, 90% height viewport, internal scroll
    - _Requirements: 1.1, 1.2, 1.3, 1.4, 7.3, 7.6_

- [x] 7. Integrate notifications into Navbar and create SigilImage component
  - [x] 7.1 Integrate `NotificationButton` and dialogs into `Navbar.tsx`
    - Import and wire `useNotificationState`, `NotificationButton`, `NotificationDialog`, `OrientationGuideDialog`
    - Place NotificationButton in desktop tools section (next to Settings)
    - Place NotificationButton in mobile sidebar
    - Manage open/close state for both dialogs
    - Mark guide as read when OrientationGuideDialog opens
    - _Requirements: 2.4, 3.1, 3.6, 7.1_

  - [x] 7.2 Create `src/components/Search/SigilImage.tsx`
    - Props: `{ url: string; alt: string; size: 28 | 32 }`
    - Render `<img>` with object-fit cover, rounded corners, alt text
    - On error: replace with 🔏 emoji placeholder `<div>` with same dimensions
    - Use React state `hasError` to toggle between img and fallback
    - _Requirements: 6.2, 6.3_

  - [x] 7.3 Extend `Search.tsx` to render daemon results with sigils
    - Add `'daemon'` to `typeIcons` map
    - When `result.sigilUrl` exists, render `SigilImage` (32px desktop, 28px mobile) instead of emoji icon
    - Reserve fixed 40px (desktop) / 36px (mobile) space for sigil column
    - Non-daemon results maintain current emoji layout without extra space
    - _Requirements: 6.1, 6.2, 6.4, 6.5_

- [x] 8. Extend Tooltip for qliphoth non-dualistic content
  - [x] 8.1 Update qliphoth tooltip rendering in `Sephirot.tsx` to display `integration` and `dailyLife`
    - When rendering tooltip content for a qliphah, show three labeled fields: defect (existing), integration (new), dailyLife (new)
    - Each field shows its translated label from `useTranslations('ui')` (`ui.integration`, `ui.dailyLife`)
    - Use try/catch with fallback to TypeScript data values if i18n key is missing
    - _Requirements: 4.4, 4.6_

- [x] 9. Internationalization
  - [x] 9.1 Add all new i18n keys to `src/i18n/messages/pt-BR.json`
    - Add `notifications.*` keys (buttonLabel, guide.title, guide.description)
    - Add `guide.*` keys (title, purpose, interpretation, pruning, tips) with full Portuguese content
    - Add `qliphoth.{id}.integration` and `qliphoth.{id}.dailyLife` for all 11 qliphoth
    - Add `ui.integration`, `ui.dailyLife`, `ui.notifications` labels
    - _Requirements: 1.1, 1.4, 4.6_

  - [x] 9.2 Add all new i18n keys to `src/i18n/messages/en-US.json`
    - Add `notifications.*` keys (buttonLabel, guide.title, guide.description)
    - Add `guide.*` keys (title, purpose, interpretation, pruning, tips) with full English content
    - Add `qliphoth.{id}.integration` and `qliphoth.{id}.dailyLife` for all 11 qliphoth
    - Add `ui.integration`, `ui.dailyLife`, `ui.notifications` labels
    - _Requirements: 1.1, 1.4, 4.6_

  - [x] 9.3 Add stub/fallback keys to `he.json` and `ja.json`
    - Add same key structure with empty strings or English fallbacks
    - System will fall back to TypeScript data values per error handling strategy
    - _Requirements: 4.6 (fallback behavior)_

  - [ ]* 9.4 Write property test: Qliphoth i18n completeness (Property 6)
    - **Property 6: Qliphoth i18n completeness**
    - Verify pt-BR and en-US message files contain `qliphoth.{id}.integration` and `qliphoth.{id}.dailyLife` for all 11 qliphoth IDs
    - Verify values are non-empty strings
    - **Validates: Requirements 4.6**

- [x] 10. Checkpoint - Ensure all tests pass
  - Ensure all tests pass, ask the user if questions arise.

- [x] 11. Review neutral language in existing i18n content
  - [x] 11.1 Review and update veil/pillar descriptions in all locale files for neutral language
    - Check `ornaments.veils` and `ornaments.pillars` text in pt-BR and en-US
    - Remove any demonizing or glorifying language about Qliphoth
    - Apply same neutrality criteria from Requirement 4.3/4.5
    - _Requirements: 4.5_

- [x] 12. Mobile compatibility and responsive adaptations
  - [x] 12.1 Ensure all new interactive elements have 44x44px touch targets on mobile
    - Verify NotificationButton, dialog close buttons, notification list items meet WCAG 2.5.5
    - Ensure no elements overlap with bottom tab bar (z-index management)
    - _Requirements: 7.4, 7.5_

  - [x] 12.2 Ensure dialogs are positioned above mobile bottom tab bar
    - NotificationDialog and OrientationGuideDialog must not be obscured by bottom tab bar
    - Use z-index above z-50 for overlay layers
    - Content and close button must be accessible without scrolling
    - _Requirements: 7.4, 7.6_

- [ ] 13. E2E tests with Playwright
  - [ ]* 13.1 Write E2E test: Notification system (first visit, badge, dialog, guide)
    - Test first visit shows badge on notification button
    - Test clicking opens notification dialog with guide item
    - Test opening guide marks it as read and removes badge
    - Test dialog accessibility (role, aria-modal, Escape close)
    - File: `e2e/notifications.spec.ts`
    - _Requirements: 2.1, 2.2, 2.4, 3.3_

  - [ ]* 13.2 Write E2E test: Daemon search with sigil images
    - Test searching daemon name shows result with sigil image (32x32)
    - Test sigil fallback when image fails to load (🔏 placeholder)
    - File: `e2e/search.spec.ts`
    - _Requirements: 6.1, 6.2, 6.3_

  - [ ]* 13.3 Write E2E test: Qliphoth tooltip shows all three fields
    - Test clicking a qliphah shows tooltip with defect, integration, and dailyLife fields
    - Verify labels are visible and translated
    - File: `e2e/desktop.spec.ts`
    - _Requirements: 4.4_

  - [ ]* 13.4 Write E2E test: Mobile responsiveness
    - Test notification button accessible in mobile sidebar at 375px viewport
    - Test dialog dimensions (max 95% width, 90% height)
    - Test touch targets >= 44x44px for new interactive elements
    - File: `e2e/mobile.spec.ts`
    - _Requirements: 7.1, 7.2, 7.3, 7.5_

- [x] 14. Final checkpoint - Ensure all tests pass
  - Ensure all tests pass, ask the user if questions arise.

## Notes

- Tasks marked with `*` are optional and can be skipped for faster MVP
- Each task references specific requirements for traceability
- Checkpoints ensure incremental validation
- Property tests validate universal correctness properties from the design document
- Unit tests validate specific examples and edge cases
- The project uses TypeScript throughout — all new code follows existing patterns (`'use client'`, next-intl, Tailwind CSS)
- fast-check + vitest are new devDependencies specifically for property-based testing
- Playwright E2E tests extend the existing test suite in the `e2e/` directory

## Task Dependency Graph

```json
{
  "waves": [
    { "id": 0, "tasks": ["1.1", "1.2"] },
    { "id": 1, "tasks": ["1.3", "3.4"] },
    { "id": 2, "tasks": ["1.4", "1.5", "3.1", "3.5"] },
    { "id": 3, "tasks": ["3.2", "3.3", "4.1"] },
    { "id": 4, "tasks": ["4.2", "6.1"] },
    { "id": 5, "tasks": ["4.3", "6.2", "6.3", "6.4", "6.6", "7.2"] },
    { "id": 6, "tasks": ["6.5", "7.1", "7.3", "8.1"] },
    { "id": 7, "tasks": ["9.1", "9.2", "9.3"] },
    { "id": 8, "tasks": ["9.4", "11.1"] },
    { "id": 9, "tasks": ["12.1", "12.2"] },
    { "id": 10, "tasks": ["13.1", "13.2", "13.3", "13.4"] }
  ]
}
```
