# Implementation Plan: Vakinha Donation Link

## Overview

Replace the legacy personal PIX donation (phone number 48991913318) with a Vakinha crowdfunding campaign link. This involves refactoring the DonationPanel component, updating all 4 locale translation files, updating the mobile sidebar donation button, and removing all references to the old PIX key. Implementation is in TypeScript (React/Next.js with next-intl).

## Tasks

- [x] 1. Update locale translation files with Vakinha content
  - [x] 1.1 Update pt-BR.json with new donation keys
    - Replace `donate` value with Vakinha motivational message
    - Replace `pixKey` value with "Chave PIX Vakinha:"
    - Add new keys: `vakinhaLink`, `vakinhaPurpose`, `donateThank`
    - Remove any reference to "telefone" or "48991913318"
    - _Requirements: 4.1, 4.3, 6.1, 6.2, 7.1, 7.5, 7.6_

  - [x] 1.2 Update en-US.json with new donation keys
    - Replace `donate` value with Vakinha motivational message in English
    - Replace `pixKey` value with "Vakinha PIX Key:"
    - Add new keys: `vakinhaLink`, `vakinhaPurpose`, `donateThank`
    - Remove any reference to "phone" or "48991913318"
    - _Requirements: 4.1, 4.3, 6.1, 6.2, 7.2, 7.5, 7.6_

  - [x] 1.3 Update he.json with new donation keys
    - Replace `donate` value with Vakinha motivational message in Hebrew
    - Replace `pixKey` value with "מפתח PIX של Vakinha:"
    - Add new keys: `vakinhaLink`, `vakinhaPurpose`, `donateThank`
    - Remove any reference to "טלפון" or "48991913318"
    - _Requirements: 4.1, 4.3, 6.1, 6.2, 7.3, 7.5, 7.6_

  - [x] 1.4 Update ja.json with new donation keys
    - Replace `donate` value with Vakinha motivational message in Japanese
    - Replace `pixKey` value with "Vakinha PIXキー："
    - Add new keys: `vakinhaLink`, `vakinhaPurpose`, `donateThank`
    - Remove any reference to "電話番号" or "48991913318"
    - _Requirements: 4.1, 4.3, 6.1, 6.2, 7.4, 7.5, 7.6_

- [x] 2. Refactor DonationPanel component
  - [x] 2.1 Rewrite DonationPanel with Vakinha campaign content
    - Define constants: `VAKINHA_URL` and `VAKINHA_PIX` ("6257640@vakinha.com.br")
    - Render motivational message from `ui('donate')` translation key
    - Add clickable link to Vakinha campaign with `target="_blank"` and `rel="noopener noreferrer"`
    - Display link text from `ui('vakinhaLink')` translation key
    - Display purpose text from `ui('vakinhaPurpose')` translation key
    - Replace panel title "Buy me a coffee ☕" with "Vakinha ☕" or similar Vakinha branding
    - Maintain close button functionality
    - Ensure accessible markup (aria-labels on link and copy button)
    - _Requirements: 1.1, 1.2, 1.3, 1.4, 1.5, 2.1, 2.2, 2.3, 2.4_

  - [x] 2.2 Implement PIX key copy with clipboard feedback
    - Display PIX key value "6257640@vakinha.com.br" with `ui('pixKey')` label
    - Implement `handleCopyPix` using `navigator.clipboard.writeText("6257640@vakinha.com.br")`
    - Add visual feedback state (copied indicator) shown for 2 seconds after successful copy
    - Implement fallback: if Clipboard API unavailable, display PIX key as selectable text
    - Handle clipboard write failure with same selectable text fallback
    - _Requirements: 3.1, 3.2, 3.3, 3.4, 6.3_

  - [ ]* 2.3 Write property test: Constant Values Across Locales
    - **Property 3: Constant Values Across Locales**
    - Verify that for any supported locale, the DonationPanel always contains the exact PIX_Key "6257640@vakinha.com.br" and Campaign_URL "https://www.vakinha.com.br/vaquinha/interactive-kabbalah-redesign-e-plataformizacao"
    - Use fast-check with `fc.constantFrom('pt-BR', 'en-US', 'he', 'ja')` to generate locale arbitraries
    - **Validates: Requirements 2.3, 4.4, 6.3**

- [x] 3. Update mobile sidebar donation button
  - [x] 3.1 Replace hardcoded text with Vakinha-branded i18n labels
    - Replace "Buy me a coffee ☕" with `ui('vakinhaLink')` translation key
    - Replace "PIX" subtitle with "Vakinha" text
    - Maintain existing onClick behavior (open DonationPanel, close sidebar)
    - _Requirements: 5.1, 5.2, 5.3_

- [x] 4. Checkpoint - Verify core implementation
  - Ensure all tests pass, ask the user if questions arise.

- [x] 5. Remove legacy PIX key references and add tests
  - [x] 5.1 Verify and remove all old PIX key references
    - Search entire codebase for "48991913318" in .ts, .tsx, .json, .env files
    - Remove or replace any remaining occurrences
    - Verify no locale file contains "telefone", "phone", "טלפון", or "電話番号" in pixKey-related values
    - _Requirements: 6.1, 6.2_

  - [ ]* 5.2 Write property test: Translation Completeness and Correctness
    - **Property 1: Translation Completeness and Correctness**
    - For any supported locale, verify all required donation keys (donate, pixKey, vakinhaLink, vakinhaPurpose, donateThank) exist and are non-empty
    - Verify the pixKey label contains the word "Vakinha"
    - Use fast-check with `fc.constantFrom('pt-BR', 'en-US', 'he', 'ja')` to generate locale arbitraries
    - **Validates: Requirements 1.1, 4.3, 6.2, 7.1, 7.2, 7.3, 7.4, 7.5**

  - [ ]* 5.3 Write property test: Render Stability Across Locales
    - **Property 2: Render Stability Across Locales**
    - For any supported locale, verify the DonationPanel renders without throwing errors
    - Use fast-check with `fc.constantFrom('pt-BR', 'en-US', 'he', 'ja')` to generate locale arbitraries
    - **Validates: Requirements 4.2**

  - [ ]* 5.4 Write unit tests for DonationPanel
    - Test that external link has correct `href`, `target="_blank"`, and `rel="noopener noreferrer"`
    - Test that PIX key copy button triggers clipboard write with "6257640@vakinha.com.br"
    - Test that close button invokes `onClose` callback
    - Test that no reference to "48991913318" exists in rendered output
    - _Requirements: 1.2, 2.1, 2.2, 3.1, 6.3_

- [x] 6. Final checkpoint - Ensure all tests pass
  - Ensure all tests pass, ask the user if questions arise.

## Notes

- Tasks marked with `*` are optional and can be skipped for faster MVP
- Each task references specific requirements for traceability
- Checkpoints ensure incremental validation
- Property tests validate universal correctness properties from the design document
- Unit tests validate specific examples and edge cases
- The project uses `vitest` for unit/property tests and `fast-check` for property-based testing (both already in devDependencies)
- Translation values are specified in the design document under "Data Models > Translation Keys"
- Constants `VAKINHA_URL` and `VAKINHA_PIX` must never be passed through translation

## Task Dependency Graph

```json
{
  "waves": [
    { "id": 0, "tasks": ["1.1", "1.2", "1.3", "1.4"] },
    { "id": 1, "tasks": ["2.1", "3.1"] },
    { "id": 2, "tasks": ["2.2", "5.1"] },
    { "id": 3, "tasks": ["2.3", "5.2", "5.3"] },
    { "id": 4, "tasks": ["5.4"] }
  ]
}
```
