# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: visual-tree.spec.ts >> Árvore da Vida — Visual Regression >> sephirot tooltip appears on hover
- Location: e2e\visual-tree.spec.ts:46:7

# Error details

```
TimeoutError: page.waitForSelector: Timeout 10000ms exceeded.
Call log:
  - waiting for locator('svg circle') to be visible

```

# Page snapshot

```yaml
- generic [ref=e2]: Internal Server Error
```

# Test source

```ts
  1  | import { test, expect } from '@playwright/test';
  2  | 
  3  | test.describe('Árvore da Vida — Visual Regression', () => {
  4  |   test('tree of life renders with armored design', async ({ page }) => {
  5  |     await page.goto('/pt-BR');
  6  |     await page.waitForLoadState('networkidle');
  7  |     
  8  |     // Wait for SVG sephirots to render
  9  |     await page.waitForSelector('svg circle', { timeout: 10000 });
  10 |     
  11 |     // Screenshot full page
  12 |     await expect(page).toHaveScreenshot('tree-of-life.png', {
  13 |       fullPage: false,
  14 |       maxDiffPixelRatio: 0.05,
  15 |     });
  16 |   });
  17 | 
  18 |   test('tree of death renders', async ({ page }) => {
  19 |     await page.goto('/pt-BR');
  20 |     await page.waitForLoadState('networkidle');
  21 |     
  22 |     // Switch to death view
  23 |     await page.getByText('💀').click();
  24 |     await page.waitForTimeout(500);
  25 |     
  26 |     await expect(page).toHaveScreenshot('tree-of-death.png', {
  27 |       fullPage: false,
  28 |       maxDiffPixelRatio: 0.05,
  29 |     });
  30 |   });
  31 | 
  32 |   test('combined view renders', async ({ page }) => {
  33 |     await page.goto('/pt-BR');
  34 |     await page.waitForLoadState('networkidle');
  35 |     
  36 |     // Switch to combined view
  37 |     await page.getByText('☯').click();
  38 |     await page.waitForTimeout(500);
  39 |     
  40 |     await expect(page).toHaveScreenshot('tree-combined.png', {
  41 |       fullPage: false,
  42 |       maxDiffPixelRatio: 0.05,
  43 |     });
  44 |   });
  45 | 
  46 |   test('sephirot tooltip appears on hover', async ({ page }) => {
  47 |     await page.goto('/pt-BR');
  48 |     await page.waitForLoadState('networkidle');
> 49 |     await page.waitForSelector('svg circle', { timeout: 10000 });
     |                ^ TimeoutError: page.waitForSelector: Timeout 10000ms exceeded.
  50 |     
  51 |     // Hover over Tiferet (center of the tree)
  52 |     const canvas = page.locator('[style*="cursor: grab"]');
  53 |     // Tiferet is at center — approximate position
  54 |     await canvas.hover({ position: { x: 400, y: 500 } });
  55 |     await page.waitForTimeout(300);
  56 |     
  57 |     await expect(page).toHaveScreenshot('tooltip-hover.png', {
  58 |       fullPage: false,
  59 |       maxDiffPixelRatio: 0.1,
  60 |     });
  61 |   });
  62 | 
  63 |   test('dark mode renders correctly', async ({ page }) => {
  64 |     await page.goto('/pt-BR');
  65 |     await page.waitForLoadState('networkidle');
  66 |     
  67 |     // Toggle dark mode
  68 |     await page.getByLabel('Toggle theme').click();
  69 |     await page.waitForTimeout(300);
  70 |     
  71 |     await expect(page).toHaveScreenshot('tree-dark-mode.png', {
  72 |       fullPage: false,
  73 |       maxDiffPixelRatio: 0.05,
  74 |     });
  75 |   });
  76 | });
  77 | 
```