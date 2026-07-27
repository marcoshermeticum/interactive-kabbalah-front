import { test, expect } from '@playwright/test';

test.describe('Árvore da Vida — Visual Regression', () => {
  test('tree of life renders with armored design', async ({ page }) => {
    await page.goto('/pt-BR');
    await page.waitForLoadState('networkidle');
    
    // Wait for SVG sephirots to render
    await page.waitForSelector('svg circle', { timeout: 10000 });
    
    // Screenshot full page
    await expect(page).toHaveScreenshot('tree-of-life.png', {
      fullPage: false,
      maxDiffPixelRatio: 0.05,
    });
  });

  test('tree of death renders', async ({ page }) => {
    await page.goto('/pt-BR');
    await page.waitForLoadState('networkidle');
    
    // Switch to death view
    await page.getByText('💀').click();
    await page.waitForTimeout(500);
    
    await expect(page).toHaveScreenshot('tree-of-death.png', {
      fullPage: false,
      maxDiffPixelRatio: 0.05,
    });
  });

  test('combined view renders', async ({ page }) => {
    await page.goto('/pt-BR');
    await page.waitForLoadState('networkidle');
    
    // Switch to combined view
    await page.getByText('☯').click();
    await page.waitForTimeout(500);
    
    await expect(page).toHaveScreenshot('tree-combined.png', {
      fullPage: false,
      maxDiffPixelRatio: 0.05,
    });
  });

  test('sephirot tooltip appears on hover', async ({ page }) => {
    await page.goto('/pt-BR');
    await page.waitForLoadState('networkidle');
    await page.waitForSelector('svg circle', { timeout: 10000 });
    
    // Hover over Tiferet (center of the tree)
    const canvas = page.locator('[style*="cursor: grab"]');
    // Tiferet is at center — approximate position
    await canvas.hover({ position: { x: 400, y: 500 } });
    await page.waitForTimeout(300);
    
    await expect(page).toHaveScreenshot('tooltip-hover.png', {
      fullPage: false,
      maxDiffPixelRatio: 0.1,
    });
  });

  test('dark mode renders correctly', async ({ page }) => {
    await page.goto('/pt-BR');
    await page.waitForLoadState('networkidle');
    
    // Toggle dark mode
    await page.getByLabel('Toggle theme').click();
    await page.waitForTimeout(300);
    
    await expect(page).toHaveScreenshot('tree-dark-mode.png', {
      fullPage: false,
      maxDiffPixelRatio: 0.05,
    });
  });
});
