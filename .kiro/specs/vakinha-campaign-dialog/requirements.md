# Requirements Document

## Introduction

This document defines the requirements for the Vakinha Campaign Dialog feature — a full-screen modal dialog that promotes the Interactive Kabbalah crowdfunding campaign (Vakinha). The feature includes the dialog component itself with auto-show-on-first-visit logic, a notification bell entry for re-opening the dialog, and Umami analytics tracking for all user interactions. The dialog features a mystical kabbalah-themed visual design (amber/gold gradients, dark backdrop, glow effects) and supports four locales: pt-BR, en-US, he, ja.

## Glossary

- **Campaign_Dialog**: The full-screen modal component (`VakinhaCampaignDialog`) that displays campaign information, a Vakinha link, PIX key copy button, and dismiss controls
- **Campaign_Hook**: The custom React hook (`useVakinhaCampaign`) that manages auto-show logic, dialog open/close state, and localStorage persistence
- **Notification_System**: The existing notification infrastructure (`src/data/notifications.ts`, `useNotificationState`, `NotificationDialog`) that lists site updates in a bell-icon dropdown
- **Notification_Entry**: A data record in the notification list representing the Vakinha campaign, clickable to open the Campaign_Dialog
- **Umami_Tracker**: The globally-loaded Umami analytics script accessed via `window.umami?.track()`
- **localStorage_Service**: The browser localStorage API accessed via safe wrappers (`safeGetItem`, `safeSetItem`) that never throw
- **Clipboard_API**: The browser `navigator.clipboard.writeText()` API used for PIX key copy functionality
- **PIX_Key**: The constant string `"6257640@vakinha.com.br"` used as the donation payment identifier
- **Campaign_URL**: The constant URL `"https://www.vakinha.com.br/vaquinha/interactive-kabbalah-redesign-e-plataformizacao"`
- **Dismissal_Flag**: The localStorage key `"vakinha-campaign-dismissed"` with value `"true"` when the user has dismissed the dialog

## Requirements

### Requirement 1: Auto-Show on First Visit

**User Story:** As a first-time visitor, I want to see the campaign dialog automatically when I visit the site, so that I am aware of the crowdfunding campaign without needing to search for it.

#### Acceptance Criteria

1. WHEN a user visits the site and `safeGetItem("vakinha-campaign-dismissed")` returns any value other than `"true"` (null, empty string, or corrupted data), THE Campaign_Hook SHALL set the dialog to open state
2. WHEN a user visits the site and `safeGetItem("vakinha-campaign-dismissed")` returns the string `"true"`, THE Campaign_Hook SHALL keep the dialog in closed state
3. THE Campaign_Hook SHALL perform the localStorage check once during the initial client-side mount (via useEffect) and SHALL NOT re-check on SPA route navigations within the same session
4. THE Campaign_Dialog SHALL not be present in the server-rendered HTML output; it SHALL render only after client-side hydration is complete

### Requirement 2: Dialog Visual Presentation

**User Story:** As a user, I want to see a visually striking full-screen campaign dialog with a mystical kabbalah theme, so that the campaign feels premium and aligned with the application's identity.

#### Acceptance Criteria

1. WHILE the Campaign_Dialog is open, THE Campaign_Dialog SHALL render as a fixed full-screen overlay (fixed positioning, inset-0) at z-index 900 or above, with a backdrop of at least 60% opacity black and backdrop-blur applied, preventing interaction with content underneath
2. WHILE the Campaign_Dialog is open, THE Campaign_Dialog SHALL display amber/gold gradient styling using the project's amber-300 through amber-600 color tokens on a gray-900/950 background, and SHALL apply at least one visible glow effect (box-shadow or text-shadow) on the primary heading or container border
3. WHILE the Campaign_Dialog is open, THE Campaign_Dialog SHALL present a layout that occupies at least 95% viewport width on screens below 640px and a maximum width of 480px on screens 640px and above, centered both horizontally and vertically
4. WHILE the Campaign_Dialog is open, THE Campaign_Dialog SHALL display the following content in top-to-bottom order: (a) the campaign motivational message as the primary heading, (b) the Campaign_URL link button, (c) the PIX_Key display with an adjacent copy-to-clipboard button, and (d) a "Don't show again" checkbox at the bottom of the dialog
5. WHILE the Campaign_Dialog is open, THE Campaign_Dialog SHALL constrain its maximum height to 90vh and enable vertical scrolling of content if the dialog content exceeds the available height

### Requirement 3: Campaign Link Interaction

**User Story:** As a user, I want to click a button that opens the Vakinha campaign page in a new tab, so that I can visit the campaign without losing my place in the application.

#### Acceptance Criteria

1. WHEN a user clicks the campaign link button, THE Campaign_Dialog SHALL open the Campaign_URL in a new browser tab by rendering the link as an anchor element with href set to the Campaign_URL constant and attribute `target="_blank"`
2. THE Campaign_Dialog SHALL render the campaign link with `rel="noopener noreferrer"` attribute to prevent reverse tabnapping
3. WHEN a user clicks the campaign link button, THE Umami_Tracker SHALL dispatch the event `"vakinha-link-clicked"`
4. WHEN a user clicks the campaign link button, THE Campaign_Dialog SHALL remain open and visible (not auto-dismiss)

### Requirement 4: PIX Key Copy

**User Story:** As a user, I want to copy the PIX key to my clipboard with a single click, so that I can easily paste it into my banking app to make a donation.

#### Acceptance Criteria

1. WHEN a user clicks the copy PIX button, THE Campaign_Dialog SHALL write the PIX_Key value `"6257640@vakinha.com.br"` to the clipboard using the Clipboard_API
2. WHEN the clipboard write succeeds, THE Campaign_Dialog SHALL indicate success by changing the copy button to a confirmed visual state (e.g., green background with checkmark icon) for 2.5 seconds, after which the button SHALL revert to its default state
3. WHEN the clipboard write succeeds, THE Umami_Tracker SHALL dispatch the event `"vakinha-pix-copied"`
4. IF the Clipboard_API is not available in the browser (navigator.clipboard is undefined), THEN THE Campaign_Dialog SHALL display a read-only input field containing the PIX_Key instead of the copy button
5. IF the clipboard write promise rejects (e.g., permission denied), THEN THE Campaign_Dialog SHALL replace the copy button with a read-only input field containing the PIX_Key
6. WHEN a user clicks the fallback read-only input field, THE Campaign_Dialog SHALL select the full text content of the input field so the user can copy it manually

### Requirement 5: Dialog Dismissal and Persistence

**User Story:** As a user, I want to dismiss the campaign dialog and optionally prevent it from appearing again, so that I am not repeatedly interrupted after I have seen the campaign.

#### Acceptance Criteria

1. WHEN a user closes the Campaign_Dialog by any method (close button, backdrop click, or Escape key) without checking the "Don't show again" checkbox, THE Campaign_Hook SHALL call `safeSetItem` to set the Dismissal_Flag to "true" in localStorage
2. WHEN a user checks the "Don't show again" checkbox and then closes the Campaign_Dialog by any method (close button, backdrop click, or Escape key), THE Campaign_Hook SHALL call `safeSetItem` to set the Dismissal_Flag to "true" in localStorage
3. WHEN the Campaign_Dialog is dismissed, THE Umami_Tracker SHALL dispatch the event `"vakinha-dialog-dismissed"` before the dialog is removed from the DOM
4. WHEN the Campaign_Dialog is dismissed, THE Campaign_Dialog SHALL set `isOpen` to false and return null from render, removing itself from the DOM within a single React render cycle
5. IF `safeSetItem` fails to write the Dismissal_Flag (localStorage unavailable or quota exceeded), THEN THE Campaign_Hook SHALL still close the dialog without throwing an error, and the dialog will auto-show again on the next visit

### Requirement 6: Accessibility

**User Story:** As a user who relies on assistive technology, I want the campaign dialog to be fully accessible, so that I can interact with it using keyboard navigation and screen readers.

#### Acceptance Criteria

1. WHILE the Campaign_Dialog is open, THE Campaign_Dialog SHALL trap keyboard focus by cycling focus from the last focusable element back to the first focusable element on forward Tab, and from the first focusable element to the last focusable element on Shift+Tab
2. WHILE the Campaign_Dialog is open, WHEN the Escape key is pressed, THE Campaign_Dialog SHALL close
3. WHEN the Campaign_Dialog opens, THE Campaign_Dialog SHALL move focus to the first focusable element within the dialog within 100ms of rendering
4. WHEN the Campaign_Dialog closes, THE Campaign_Dialog SHALL restore focus to the element that was focused immediately before the dialog opened
5. WHILE the Campaign_Dialog is open, THE Campaign_Dialog SHALL have `role="dialog"`, `aria-modal="true"`, and `aria-labelledby` referencing the `id` attribute of the dialog's heading element
6. WHILE the Campaign_Dialog is open, THE Campaign_Dialog SHALL prevent body scroll by setting `document.body.style.overflow` to `hidden`
7. WHEN the Campaign_Dialog closes, THE Campaign_Dialog SHALL restore body scroll by resetting `document.body.style.overflow` to its previous value

### Requirement 7: Notification Bell Entry

**User Story:** As a returning user, I want to find the campaign in my notification list, so that I can re-open the campaign dialog even after dismissing it.

#### Acceptance Criteria

1. THE Notification_System SHALL include a Notification_Entry with id `"vakinha-campaign-v1"`, a publishedAt date in ISO 8601 format, titleKey `"notifications.vakinha_campaign.title"`, and descriptionKey `"notifications.vakinha_campaign.description"`
2. WHEN a user clicks the Vakinha campaign Notification_Entry, THE Notification_System SHALL mark the notification as read by persisting the id `"vakinha-campaign-v1"` to the read-ids list in localStorage
3. WHEN a user clicks the Vakinha campaign Notification_Entry, THE Notification_System SHALL close the Notification_Dialog
4. WHEN a user clicks the Vakinha campaign Notification_Entry, THE Campaign_Hook SHALL open the Campaign_Dialog regardless of whether the Dismissal_Flag is set to true or false
5. WHILE the Vakinha campaign Notification_Entry has been marked as read, THE Notification_System SHALL continue displaying the entry in the notification list with reduced visual emphasis

### Requirement 8: Umami Analytics Tracking

**User Story:** As the project maintainer, I want to track user interactions with the campaign dialog, so that I can measure campaign engagement and effectiveness.

#### Acceptance Criteria

1. WHEN the Campaign_Dialog opens via auto-show (first visit), THE Umami_Tracker SHALL dispatch the event `"vakinha-dialog-opened"` after the dialog becomes visible
2. WHEN the Campaign_Dialog opens via Notification_Entry click, THE Umami_Tracker SHALL dispatch the event `"vakinha-dialog-opened"` after the dialog becomes visible
3. WHEN a user clicks the campaign link button, THE Umami_Tracker SHALL dispatch the event `"vakinha-link-clicked"`
4. WHEN a user successfully copies the PIX_Key (clipboard write resolves), THE Umami_Tracker SHALL dispatch the event `"vakinha-pix-copied"`
5. WHEN the Campaign_Dialog is dismissed by any method (close button, backdrop click, or Escape key), THE Umami_Tracker SHALL dispatch the event `"vakinha-dialog-dismissed"`
6. IF the Umami script is not loaded or `window.umami` is undefined (ad blocker, network failure, script error), THEN THE Campaign_Dialog SHALL remain fully interactive with all tracking calls executing as silent no-ops (no uncaught exceptions, no UI disruption)
7. IF `window.umami.track()` throws an error at runtime, THEN THE Campaign_Dialog SHALL catch the error silently and continue normal operation without UI disruption

### Requirement 9: Internationalization

**User Story:** As a multilingual user, I want the campaign dialog content to be displayed in my language, so that I can understand the campaign message regardless of my locale preference.

#### Acceptance Criteria

1. THE Campaign_Dialog SHALL display all user-facing text using translation keys from the `vakinhaCampaign` namespace resolved by next-intl
2. THE locale files for each supported locale (pt-BR, en-US, he, ja) SHALL contain non-empty string values for all keys in the `vakinhaCampaign` namespace: title, subtitle, message, linkButton, pixLabel, pixCopied, dontShowAgain
3. THE locale files for each supported locale (pt-BR, en-US, he, ja) SHALL contain non-empty string values for `notifications.vakinha_campaign.title` and `notifications.vakinha_campaign.description` keys
4. THE Campaign_Dialog SHALL display the PIX_Key and Campaign_URL as untranslated constants regardless of active locale
5. WHILE the active locale is a right-to-left language (he), THE Campaign_Dialog SHALL render text content with right-to-left direction
6. IF a translation key in the `vakinhaCampaign` namespace fails to resolve at runtime, THEN THE Campaign_Dialog SHALL display the translation key name as visible text rather than rendering an empty or broken element

### Requirement 10: Graceful Degradation

**User Story:** As a user in a constrained browser environment, I want the campaign dialog to work even when certain browser APIs are unavailable, so that I can still interact with the campaign.

#### Acceptance Criteria

1. IF localStorage is unavailable (private browsing, quota exceeded, or disabled), THEN THE Campaign_Hook SHALL default to showing the dialog on every page load without throwing uncaught exceptions
2. IF localStorage is unavailable, THEN THE Campaign_Hook SHALL allow the user to open, close, and interact with the dialog (including copying the PIX_Key) without persisting dismissal state, such that dismissing the dialog does not prevent it from appearing on a subsequent page load
3. IF the Clipboard_API is unavailable (navigator.clipboard is undefined or writeText rejects), THEN THE Campaign_Dialog SHALL render a selectable read-only text input displaying the PIX_Key value, allowing the user to manually select and copy the text
4. IF the Umami script is not loaded (window.umami is undefined), THEN THE Campaign_Dialog SHALL remain fully interactive (open, close, and copy actions succeed) with tracking calls executing as no-ops that produce no uncaught exceptions and no console errors
5. IF any graceful degradation fallback is active, THEN THE Campaign_Dialog SHALL render within 1 second of the triggering user action and SHALL NOT display error messages to the user
