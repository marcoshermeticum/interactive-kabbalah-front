# Requirements Document

## Introduction

Este documento define os requisitos para a substituição do mecanismo de doação via PIX pessoal (telefone 48991913318) por um link de crowdfunding da plataforma Vakinha no Interactive Kabbalah. A feature centraliza doações para a plataformização da aplicação, oferecendo um link direto para a vaquinha oficial, chave PIX exclusiva Vakinha, e mensagens contextualizadas em todos os idiomas suportados.

## Glossary

- **DonationPanel**: Componente React que exibe as informações de doação (mensagem motivacional, link da campanha, chave PIX) como um painel overlay no Navbar.
- **Vakinha_Campaign**: Campanha de crowdfunding hospedada na plataforma vakinha.com.br para financiar a plataformização do Interactive Kabbalah.
- **PIX_Key**: Chave de pagamento PIX associada à campanha Vakinha (6257640@vakinha.com.br).
- **Campaign_URL**: URL da página da campanha Vakinha (https://www.vakinha.com.br/vaquinha/interactive-kabbalah-redesign-e-plataformizacao).
- **Locale_File**: Arquivo JSON de tradução para um idioma suportado (pt-BR, en-US, he, ja).
- **Mobile_Sidebar**: Menu lateral de navegação exibido em viewports mobile.
- **Clipboard_API**: API do navegador para copiar texto para a área de transferência do usuário.

## Requirements

### Requirement 1: Display Campaign Information

**User Story:** As a user, I want to see the Vakinha crowdfunding campaign information when I open the donation panel, so that I can understand the purpose of the campaign and how to contribute.

#### Acceptance Criteria

1. WHEN a user opens the DonationPanel, THE DonationPanel SHALL display the motivational message retrieved from the "donate" key of the current locale translation file
2. WHEN a user opens the DonationPanel, THE DonationPanel SHALL display a clickable link to the Campaign_URL with link text retrieved from the current locale translation
3. WHEN a user opens the DonationPanel, THE DonationPanel SHALL display the PIX_Key value "6257640@vakinha.com.br" as visible text alongside a copy button labeled with the "clickToCopy" locale translation key
4. WHEN a user opens the DonationPanel, THE DonationPanel SHALL display a close button that hides the panel from view when activated
5. WHEN a user opens the DonationPanel, THE DonationPanel SHALL display all elements (motivational message, campaign link, PIX key with copy button, and close button) simultaneously without requiring scrolling on viewports 320px wide or larger

### Requirement 2: Navigate to Vakinha Campaign

**User Story:** As a user, I want to click a link that takes me to the Vakinha campaign page, so that I can view campaign details and donate directly on the platform.

#### Acceptance Criteria

1. WHEN a user clicks the Vakinha campaign link, THE DonationPanel SHALL open the Campaign_URL in a new browser tab by rendering the link as an anchor element with the attribute target="_blank"
2. THE DonationPanel campaign link SHALL include the attribute rel="noopener noreferrer" to prevent reverse tabnapping
3. THE DonationPanel campaign link SHALL use the constant Campaign_URL value without deriving it from user input or application state
4. THE DonationPanel campaign link SHALL render with a visible, descriptive text label retrieved from the current locale translation and an accessible name that conveys the link destination to assistive technologies

### Requirement 3: Copy PIX Key to Clipboard

**User Story:** As a user, I want to copy the Vakinha PIX key to my clipboard, so that I can paste it into my banking app to make a donation.

#### Acceptance Criteria

1. WHEN a user clicks the PIX key copy button, THE DonationPanel SHALL write the value "6257640@vakinha.com.br" to the user clipboard using the Clipboard_API
2. WHEN the PIX key is successfully copied, THE DonationPanel SHALL display a success indication on the copy button for between 1.5 and 3 seconds, after which the button SHALL return to its default state ready for re-use
3. IF the Clipboard_API is unavailable, THEN THE DonationPanel SHALL display the PIX_Key as selectable text that users can manually copy
4. IF the Clipboard_API write operation fails, THEN THE DonationPanel SHALL fall back to displaying the PIX_Key as selectable text that users can manually copy

### Requirement 4: Internationalization Support

**User Story:** As a user viewing the application in any supported language, I want the donation content to be displayed in my language, so that I can understand the campaign message and instructions.

#### Acceptance Criteria

1. THE DonationPanel SHALL retrieve the motivational message, PIX key label, campaign link label, campaign purpose description, and thank-you message from the current locale translation keys
2. WHEN the application locale is set to any supported language (pt-BR, en-US, he, ja), THE DonationPanel SHALL render all text elements visibly with no missing-key fallback text and no runtime exceptions
3. THE Locale_File for each supported language SHALL contain non-empty string values for the keys: donate, pixKey, vakinhaLink, vakinhaPurpose, and donateThank
4. THE DonationPanel SHALL display the PIX_Key value and Campaign_URL identically across all supported locales, without passing them through translation
5. IF a required translation key is missing or empty in the active locale, THEN THE DonationPanel SHALL display the next-intl default fallback text for that key without crashing or hiding other translated elements

### Requirement 5: Mobile Sidebar Donation Access

**User Story:** As a mobile user, I want to access the Vakinha donation information from the mobile sidebar menu, so that I can contribute from any device.

#### Acceptance Criteria

1. WHEN a mobile user taps the donation button in the Mobile_Sidebar, THE Mobile_Sidebar SHALL close and THE DonationPanel SHALL become visible without requiring further user interaction
2. THE Mobile_Sidebar donation button SHALL display the label retrieved from the locale translation key "support" and the subtitle retrieved from the locale translation key "vakinhaLink", replacing the hardcoded "Buy me a coffee" text
3. THE DonationPanel on mobile viewports (width below 640px) SHALL present the same data elements as the desktop version: the motivational message from the "donate" translation key, the clickable Campaign_URL link, and the PIX_Key with copy functionality
4. WHEN the DonationPanel is displayed on mobile viewports, THE DonationPanel SHALL be fully visible and scrollable within the viewport without content being clipped or hidden behind other UI elements
5. IF the mobile user taps the DonationPanel close button, THEN THE DonationPanel SHALL be dismissed and the user SHALL be returned to the main application view

### Requirement 6: Remove Legacy PIX Key

**User Story:** As a project maintainer, I want all references to the old personal PIX key removed from the codebase, so that users are directed only to the Vakinha campaign.

#### Acceptance Criteria

1. THE application source files (.ts, .tsx), locale translation files (.json), and environment/configuration files (.env, .env.example, .env.local) SHALL contain no occurrences of the string "48991913318" in code literals, displayed text, or comments
2. THE Locale_File translations for all supported locales (pt-BR, en-US, he, ja) SHALL use "Vakinha" in the "pixKey" translation value and SHALL NOT contain the substrings "telefone", "phone", "טלפון", or "電話番号"
3. WHEN the DonationPanel renders, THE DonationPanel SHALL display the text "6257640@vakinha.com.br" as the PIX key and SHALL write the value "6257640@vakinha.com.br" to the clipboard when the copy button is activated

### Requirement 7: Translation Content Consistency

**User Story:** As a project maintainer, I want all locale files to have consistent translation keys for the donation feature, so that no language is missing required content.

#### Acceptance Criteria

1. THE Locale_File for pt-BR SHALL contain a non-empty value (at least 1 non-whitespace character) for the "donate" key under the "ui" namespace
2. THE Locale_File for en-US SHALL contain a non-empty value (at least 1 non-whitespace character) for the "donate" key under the "ui" namespace
3. THE Locale_File for he SHALL contain a non-empty value (at least 1 non-whitespace character) for the "donate" key under the "ui" namespace
4. THE Locale_File for ja SHALL contain a non-empty value (at least 1 non-whitespace character) for the "donate" key under the "ui" namespace
5. THE Locale_File for each supported language (pt-BR, en-US, he, ja) SHALL contain a "pixKey" value that includes the word "Vakinha" instead of "telefone" or "phone"
6. THE Locale_File for each supported language (pt-BR, en-US, he, ja) SHALL contain non-empty values for the keys: donate, pixKey, vakinhaLink, vakinhaPurpose, and donateThank
