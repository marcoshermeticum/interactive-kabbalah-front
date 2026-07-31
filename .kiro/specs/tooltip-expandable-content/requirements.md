# Requirements Document

## Introduction

This feature adds two capabilities to the Interactive Kabbalah tooltip system: (1) a generic, reusable `ExpandableSection` component that provides a collapsible "See more" / "See less" toggle for any tooltip content, and (2) inline daemon sigil images displayed beside regent names in Qliphoth tooltips. Together these enhancements allow tooltips to surface richer occult data without overwhelming the initial view.

## Glossary

- **ExpandableSection**: A standalone React component that wraps arbitrary children in a collapsible container with a togglable label.
- **Tooltip**: The existing `Tooltip` component (`src/components/Tooltip/Tooltip.tsx`) that renders hover/pinned content for Sephirot and Qliphoth spheres.
- **SigilImage**: The existing component (`src/components/Search/SigilImage.tsx`) that renders a daemon sigil image with fallback.
- **DaemonEntry**: A data record in `src/data/daemons.ts` representing a daemon, its canonical name, aliases, sigil URL, and qliphah/tunnel associations.
- **QliphothTooltip**: The tooltip content rendered when a user interacts with a Qliphoth sphere in the tree.
- **Regent**: The daemon(s) governing a specific qliphah, as defined in `qliphoth.ts` regent field.
- **Toggle_Label**: The clickable text element ("Ver mais"/"See more" or "Ver menos"/"See less") that controls the expanded/collapsed state of the ExpandableSection.

## Requirements

### Requirement 1: ExpandableSection Component

**User Story:** As a developer, I want a generic collapsible section component, so that any tooltip can include optional expandable content without duplicating toggle logic.

#### Acceptance Criteria

1. THE ExpandableSection SHALL render a Toggle_Label and a collapsible children container.
2. THE ExpandableSection SHALL accept a `label` prop (string) displayed as the Toggle_Label text when collapsed.
3. THE ExpandableSection SHALL accept an optional `collapsedLabel` prop, defaulting to the i18n key `ui.seeMore`.
4. THE ExpandableSection SHALL accept an optional `expandedLabel` prop, defaulting to the i18n key `ui.seeLess`.
5. THE ExpandableSection SHALL accept a `children` prop (ReactNode) rendered inside the collapsible container.
6. WHEN the ExpandableSection mounts, THE ExpandableSection SHALL render in the collapsed state with children hidden.
7. WHEN the user activates the Toggle_Label, THE ExpandableSection SHALL transition to the expanded state and display the children.
8. WHEN the user activates the Toggle_Label while expanded, THE ExpandableSection SHALL transition to the collapsed state and hide the children.
9. WHILE the ExpandableSection is collapsed, THE Toggle_Label SHALL display the collapsedLabel text.
10. WHILE the ExpandableSection is expanded, THE Toggle_Label SHALL display the expandedLabel text.

### Requirement 2: Touch and Accessibility

**User Story:** As a mobile user, I want the expandable toggle to be easy to tap and accessible via keyboard, so that I can use it on any device.

#### Acceptance Criteria

1. THE Toggle_Label SHALL have a minimum touch target size of 44x44 CSS pixels.
2. THE Toggle_Label SHALL be a focusable interactive element (button).
3. WHEN a keyboard user presses Enter or Space on the focused Toggle_Label, THE ExpandableSection SHALL toggle its expanded state.
4. THE ExpandableSection SHALL set `aria-expanded` on the Toggle_Label to reflect the current expanded state.
5. THE ExpandableSection SHALL associate the Toggle_Label with the collapsible container using `aria-controls`.

### Requirement 3: Internationalization of Toggle Labels

**User Story:** As a multilingual user, I want the toggle labels to appear in my selected locale, so that the interface remains consistent.

#### Acceptance Criteria

1. THE ExpandableSection SHALL resolve the collapsed label from the i18n key `ui.seeMore` when no explicit `collapsedLabel` prop is provided.
2. THE ExpandableSection SHALL resolve the expanded label from the i18n key `ui.seeLess` when no explicit `expandedLabel` prop is provided.
3. THE i18n system SHALL include translations for keys `ui.seeMore` and `ui.seeLess` in all supported locales (pt, en, es, fr, de, it, ja, zh, ko, he, ar).

### Requirement 4: Daemon Sigil Display in Qliphoth Tooltips

**User Story:** As a student of Qliphothic Kabbalah, I want to see the sigil(s) of each qliphah's regent(s) inline in the tooltip, so that I can visually identify the associated daemon(s).

#### Acceptance Criteria

1. WHEN a QliphothTooltip renders regent information, THE QliphothTooltip SHALL display the sigil image(s) of the associated regent daemon(s) inline beside the regent name.
2. THE QliphothTooltip SHALL render sigil images using the existing SigilImage component at size 28.
3. WHEN a qliphah has multiple regents (e.g., Thaumiel with Satan and Moloch, Ghogiel with Beelzebub and Belial), THE QliphothTooltip SHALL display all associated sigils side by side in a horizontal row.
4. THE QliphothTooltip SHALL resolve daemon sigil URLs by matching the qliphah id against DaemonEntry associations where `type` equals `qliphah`.
5. IF a sigil image fails to load, THEN THE SigilImage component SHALL display the existing fallback placeholder (emoji icon with aria-label).

### Requirement 5: Sigil Placement and Layout

**User Story:** As a user, I want sigils to appear naturally alongside the regent text, so that the tooltip remains readable and compact.

#### Acceptance Criteria

1. THE QliphothTooltip SHALL render sigil images on the same line as the regent name text, using inline-flex alignment.
2. THE sigil images SHALL be vertically centered relative to the regent name text.
3. WHEN multiple sigils are displayed, THE QliphothTooltip SHALL separate them with 4px horizontal spacing.
4. THE sigil images SHALL NOT appear inside the ExpandableSection; they SHALL remain in the main visible tooltip body.

### Requirement 6: ExpandableSection Integration in Qliphoth Tooltips

**User Story:** As a user exploring the Qliphoth, I want the integration and dailyLife fields wrapped in an expandable section, so that the tooltip is compact by default but I can expand to read deeper content.

#### Acceptance Criteria

1. WHEN a QliphothTooltip contains integration or dailyLife content, THE QliphothTooltip SHALL wrap that content inside an ExpandableSection.
2. WHILE the ExpandableSection is collapsed, THE QliphothTooltip SHALL NOT display integration or dailyLife text.
3. WHEN the ExpandableSection is expanded, THE QliphothTooltip SHALL display the integration and dailyLife text fields with their respective labels and icons.
4. IF a qliphah has neither integration nor dailyLife content, THEN THE QliphothTooltip SHALL NOT render the ExpandableSection.
