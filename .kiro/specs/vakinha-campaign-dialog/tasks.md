# Implementation Plan: Vakinha Campaign Dialog

## Overview

Implement a full-screen modal dialog promoting the Interactive Kabbalah Vakinha crowdfunding campaign. The feature includes a visually striking campaign dialog with kabbalah-themed design (amber/gold), a custom hook for auto-show logic with localStorage persistence, a notification bell entry for re-opening, and Umami analytics tracking. Built with TypeScript/React following existing patterns from OrientationGuideDialog and NotificationDialog.

## Tasks

- [x] 1. Create useVakinhaCampaign hook and campaign constants
  - [x] 1.1 Create the useVakinhaCampaign custom hook at `src/hooks/useVakinhaCampaign.ts`
    - Define campaign constants: `VAKINHA_CAMPAIGN_URL`, `VAKINHA_PIX_KEY`, `STORAGE_KEY_DISMISSED`
    - Import `safeGetItem` and `safeSetItem` from `@/hooks/useNotificationState`
    - Implement `useVakinhaCampaign` hook with `isDialogOpen`, `openDialog`, `closeDialog` state management
    - useEffect on mount: check localStorage for dismissal flag, auto-show if not dismissed
    - `closeDialog()`: set `isDialogOpen = false`, call `safeSetItem` to persist dismissal
    - `openDialog()`: set `isDialogOpen = true` (bypasses localStorage check for notification re-open)
    - Export the `UseVakinhaCampaignReturn` interface
    - _Requirements: 1.1, 1.2, 1.3, 1.4, 5.1, 5.2, 5.5, 10.1, 10.2_

  - [ ]* 1.2 Write property test for useVakinhaCampaign auto-show logic
    - **Property 1: Dialog Visibility Determinism**
    - **Validates: Requirements 1.1, 1.2**
    - Use fast-check to generate arbitrary localStorage states (null, "true", empty string, corrupted)
    - Verify: dialog opens iff stored value !== "true"

  - [ ]* 1.3 Write property test for notification re-open regardless of dismissal
    - **Property 7: Notification Opens Dialog Regardless of Dismissal**
    - **Validates: Requirements 7.4**
    - Use fast-check to generate arbitrary dismissal states
    - Verify: `openDialog()` always results in `isDialogOpen === true`

- [x] 2. Add i18n translation keys for all 4 locales
  - [x] 2.1 Add `vakinhaCampaign` namespace translations to `src/i18n/messages/pt-BR.json`
    - Add keys: title, subtitle, message, linkButton, pixLabel, pixCopied
    - Add `notifications.vakinha_campaign.title` and `notifications.vakinha_campaign.description`
    - _Requirements: 9.1, 9.2, 9.3_

  - [x] 2.2 Add `vakinhaCampaign` namespace translations to `src/i18n/messages/en-US.json`
    - Same key structure as pt-BR with English translations
    - Add `notifications.vakinha_campaign.title` and `notifications.vakinha_campaign.description`
    - _Requirements: 9.1, 9.2, 9.3_

  - [x] 2.3 Add `vakinhaCampaign` namespace translations to `src/i18n/messages/he.json`
    - Same key structure with Hebrew translations (RTL language)
    - Add `notifications.vakinha_campaign.title` and `notifications.vakinha_campaign.description`
    - _Requirements: 9.1, 9.2, 9.3, 9.5_

  - [x] 2.4 Add `vakinhaCampaign` namespace translations to `src/i18n/messages/ja.json`
    - Same key structure with Japanese translations
    - Add `notifications.vakinha_campaign.title` and `notifications.vakinha_campaign.description`
    - _Requirements: 9.1, 9.2, 9.3_

  - [ ]* 2.5 Write property test for translation completeness
    - **Property 3: Translation Completeness**
    - **Validates: Requirements 9.2, 9.3**
    - Use fast-check to iterate over all locales and all required keys
    - Verify: every key exists and is a non-empty string in every locale file

- [ ] 3. Implement VakinhaCampaignDialog component
  - [x] 3.1 Create `src/components/Notifications/VakinhaCampaignDialog.tsx` with full-screen modal structure
    - 'use client' directive at top
    - Props interface: `{ isOpen: boolean; onClose: () => void }`
    - Fixed overlay with backdrop (bg-black/60, backdrop-blur-sm, z-[900])
    - Dialog panel: centered, max-w-[480px] on desktop, 95vw on mobile, max-h-[90vh] with overflow-y-auto
    - Amber/gold gradient styling: amber-300 through amber-600, gray-900/950 background, glow box-shadow on container border
    - Layout order: (a) decorative symbol + campaign heading, (b) subtitle + message, (c) campaign link CTA button, (d) PIX key section with copy button, (e) thank-you text
    - Close button in top-right corner
    - Subtle particle/glow animations matching the approved mockup design
    - _Requirements: 2.1, 2.2, 2.3, 2.4, 2.5_

  - [ ] 3.2 Implement accessibility features in VakinhaCampaignDialog
    - Add `role="dialog"`, `aria-modal="true"`, `aria-labelledby` referencing heading id
    - Focus trap: cycle Tab through focusable elements within dialog, Shift+Tab reverse
    - Escape key: close dialog
    - Backdrop click: close dialog
    - On open: store `document.activeElement`, move focus to first focusable element
    - On close: restore focus to previously focused element
    - Body scroll lock: set `document.body.style.overflow = 'hidden'` on open, restore on close
    - Follow patterns from OrientationGuideDialog.tsx
    - _Requirements: 6.1, 6.2, 6.3, 6.4, 6.5, 6.6, 6.7_

  - [ ] 3.3 Implement campaign link interaction
    - Render campaign URL as `<a>` with `href={VAKINHA_CAMPAIGN_URL}`, `target="_blank"`, `rel="noopener noreferrer"`
    - Style as prominent CTA button with amber gradient
    - On click: call `window.umami?.track('vakinha-link-clicked')`
    - Dialog remains open after link click (does not auto-dismiss)
    - _Requirements: 3.1, 3.2, 3.3, 3.4_

  - [ ] 3.4 Implement PIX key copy functionality
    - Display PIX key value with copy button
    - On copy click: `navigator.clipboard.writeText('6257640@vakinha.com.br')`
    - Success: show green confirmed state with checkmark for 2.5 seconds, track `'vakinha-pix-copied'`
    - Fallback: if clipboard unavailable or rejects, show read-only input with PIX key
    - Fallback input: `onClick` selects full text content for manual copy
    - _Requirements: 4.1, 4.2, 4.3, 4.4, 4.5, 4.6, 10.3_

  - [ ] 3.5 Implement dismiss logic (auto-persist on any close)
    - All close methods (close button, backdrop, Escape) trigger dismiss
    - On dismiss: call `window.umami?.track('vakinha-dialog-dismissed')` then call `onClose()`
    - No checkbox needed — closing always persists dismissal to localStorage via hook
    - _Requirements: 5.1, 5.2, 5.3, 5.4_

  - [x] 3.6 Implement Umami analytics tracking
    - On dialog open (isOpen transitions to true): `window.umami?.track('vakinha-dialog-opened')`
    - On link click: `window.umami?.track('vakinha-link-clicked')`
    - On PIX copy success: `window.umami?.track('vakinha-pix-copied')`
    - On dismiss: `window.umami?.track('vakinha-dialog-dismissed')`
    - All tracking uses optional chaining — never throws if Umami unavailable
    - Wrap any direct `.track()` calls in try-catch for runtime safety
    - _Requirements: 8.1, 8.2, 8.3, 8.4, 8.5, 8.6, 8.7, 10.4_

  - [ ]* 3.7 Write property test for Umami event coverage
    - **Property 2: Umami Event Coverage**
    - **Validates: Requirements 8.1, 8.2, 8.3, 8.4, 8.5**
    - Use fast-check to generate sequences of user actions (open, link-click, pix-copy, dismiss)
    - Verify: each action dispatches exactly one corresponding event, undefined umami never throws

  - [ ]* 3.8 Write unit tests for VakinhaCampaignDialog
    - Test: renders when isOpen=true, returns null when isOpen=false
    - Test: campaign link has correct href, target, rel attributes
    - Test: PIX copy calls clipboard API with exact key
    - Test: Escape key triggers onClose
    - Test: aria attributes present (role, aria-modal, aria-labelledby)
    - Test: clipboard fallback renders when clipboard unavailable
    - _Requirements: 2.1, 3.1, 3.2, 4.1, 6.2, 6.5, 10.3_

- [x] 4. Checkpoint - Ensure all tests pass
  - Ensure all tests pass, ask the user if questions arise.

- [x] 5. Add notification entry and wire notification click handler
  - [x] 5.1 Add Vakinha campaign notification entry to `src/data/notifications.ts`
    - Add entry: `{ id: 'vakinha-campaign-v1', publishedAt: '2025-01-15T00:00:00Z', titleKey: 'notifications.vakinha_campaign.title', descriptionKey: 'notifications.vakinha_campaign.description' }`
    - Place at beginning of array (most recent first)
    - _Requirements: 7.1, 7.5_

  - [x] 5.2 Wire notification click handler in Navbar to open VakinhaCampaignDialog
    - Import `useVakinhaCampaign` hook in Navbar
    - Import `VakinhaCampaignDialog` component
    - Add state and handler: when notification with id `'vakinha-campaign-v1'` is clicked, close notification dialog, call `openDialog()`
    - Add `onNotificationAction` prop to NotificationDialog or modify `onMarkRead` callback to detect vakinha click
    - Render `<VakinhaCampaignDialog isOpen={isDialogOpen} onClose={closeDialog} />` alongside other dialogs
    - _Requirements: 7.2, 7.3, 7.4_

  - [ ]* 5.3 Write unit tests for notification entry click opening campaign dialog
    - Test: clicking vakinha notification marks it as read
    - Test: clicking vakinha notification closes notification dialog
    - Test: clicking vakinha notification opens campaign dialog
    - Test: campaign dialog opens even when dismissal flag is set in localStorage
    - _Requirements: 7.2, 7.3, 7.4_

- [x] 6. Integrate auto-show logic in Navbar
  - [x] 6.1 Wire useVakinhaCampaign auto-show in Navbar component
    - The hook already manages auto-show via useEffect on mount
    - Ensure `VakinhaCampaignDialog` receives `isDialogOpen` from the hook
    - Ensure dialog renders after hydration only (hook's useEffect handles this)
    - Verify no SSR mismatch: initial state is always closed, opens only via client-side effect
    - _Requirements: 1.1, 1.2, 1.3, 1.4_

  - [ ]* 6.2 Write property test for all close methods persisting dismissal
    - **Property 8: All Close Methods Persist Dismissal**
    - **Validates: Requirements 5.1, 5.4**
    - Use fast-check to generate close methods from set {closeButton, backdrop, escape}
    - Verify: localStorage is set to "true" after any close method

- [x] 7. Final checkpoint - Ensure all tests pass
  - Ensure all tests pass, ask the user if questions arise.

## Notes

- Tasks marked with `*` are optional and can be skipped for faster MVP
- Each task references specific requirements for traceability
- Checkpoints ensure incremental validation
- Property tests validate universal correctness properties from the design document
- Unit tests validate specific examples and edge cases
- The design uses TypeScript/React (Next.js) — all implementations follow existing project patterns
- `safeGetItem`/`safeSetItem` are imported from existing `useNotificationState.ts` — no need to re-implement
- Umami is already loaded globally — only `window.umami?.track()` calls needed, no setup required
- Follow OrientationGuideDialog.tsx patterns for focus trap, Escape key, and aria-modal implementation

## Task Dependency Graph

```json
{
  "waves": [
    { "id": 0, "tasks": ["1.1", "2.1", "2.2", "2.3", "2.4"] },
    { "id": 1, "tasks": ["1.2", "1.3", "2.5", "3.1", "5.1"] },
    { "id": 2, "tasks": ["3.2", "3.3", "3.4", "3.5", "3.6"] },
    { "id": 3, "tasks": ["3.7", "3.8", "5.2"] },
    { "id": 4, "tasks": ["5.3", "6.1"] },
    { "id": 5, "tasks": ["6.2"] }
  ]
}
```
