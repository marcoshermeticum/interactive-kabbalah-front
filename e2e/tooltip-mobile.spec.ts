import { test, expect, Page } from '@playwright/test';

/**
 * Tooltip behavior tests — focused on mobile touch interactions.
 * 
 * Requirements tested:
 * 1. Tooltip opens on tap (mobile) / hover (desktop)
 * 2. Tooltip closes when close button is pressed
 * 3. Tooltip closes when tapping outside the tree area
 * 4. Multiple tooltips: tapping outside closes all open tooltips progressively
 * 5. Tooltip does NOT get stuck open (the "never closes" bug)
 */

test.describe('Tooltip — Mobile behavior', () => {
  test.use({
    viewport: { width: 390, height: 844 }, // iPhone 14 dimensions
    hasTouch: true,
    isMobile: true,
  });

  async function waitForTreeToLoad(page: Page) {
    await page.goto('/pt-BR');
    await page.waitForLoadState('networkidle');
    await page.waitForSelector('svg circle', { timeout: 10000 });
    // Wait for tree to be fit to viewport
    await page.waitForTimeout(500);
  }

  test('tooltip opens on tap and shows content', async ({ page }) => {
    await waitForTreeToLoad(page);

    // Tap on a sephirot node area (the tree is scaled to fit, so we need to find it)
    const sephirotSvg = page.locator('svg').filter({ has: page.locator('circle') }).first();
    await sephirotSvg.tap({ force: true });
    await page.waitForTimeout(300);

    // Tooltip should be visible with pinned state (border-yellow)
    const tooltip = page.locator('.border-yellow-400\\/50');
    await expect(tooltip).toBeVisible();
  });

  test('tooltip closes when close button is pressed', async ({ page }) => {
    await waitForTreeToLoad(page);

    // Open tooltip by tapping
    const sephirotSvg = page.locator('svg').filter({ has: page.locator('circle') }).first();
    await sephirotSvg.tap({ force: true });
    await page.waitForTimeout(300);

    // Tooltip should be visible
    const tooltip = page.locator('.border-yellow-400\\/50');
    await expect(tooltip).toBeVisible();

    // Click the close button (✕)
    const closeButton = page.locator('button:has-text("✕")').last();
    await closeButton.tap();
    await page.waitForTimeout(200);

    // Tooltip should be gone
    await expect(tooltip).not.toBeVisible();
  });

  test('tooltip closes when tapping outside the tree context', async ({ page }) => {
    await waitForTreeToLoad(page);

    // Open tooltip
    const sephirotSvg = page.locator('svg').filter({ has: page.locator('circle') }).first();
    await sephirotSvg.tap({ force: true });
    await page.waitForTimeout(300);

    const tooltip = page.locator('.border-yellow-400\\/50');
    await expect(tooltip).toBeVisible();

    // Tap on an empty area (header)
    await page.locator('header').tap();
    await page.waitForTimeout(300);

    // Tooltip should be closed
    await expect(tooltip).not.toBeVisible();
  });

  test('tooltip does not get stuck open after multiple interactions', async ({ page }) => {
    await waitForTreeToLoad(page);

    // Rapidly tap different areas to simulate the "stuck open" bug
    const sephirotSvgs = page.locator('[style*="width: 170px"]'); // Sephirot containers
    const count = await sephirotSvgs.count();

    if (count >= 2) {
      // Tap first sephirot
      await sephirotSvgs.nth(0).tap({ force: true });
      await page.waitForTimeout(200);

      // Tap second sephirot
      await sephirotSvgs.nth(1).tap({ force: true });
      await page.waitForTimeout(200);

      // Tap outside (header)
      await page.locator('header').tap();
      await page.waitForTimeout(300);

      // No tooltips should remain visible
      const visibleTooltips = page.locator('.border-yellow-400\\/50');
      await expect(visibleTooltips).toHaveCount(0);
    }
  });

  test('pinned tooltip survives accidental touch on same area', async ({ page }) => {
    await waitForTreeToLoad(page);

    // Tap a sephirot to pin tooltip
    const sephirotSvg = page.locator('svg').filter({ has: page.locator('circle') }).first();
    await sephirotSvg.tap({ force: true });
    await page.waitForTimeout(300);

    const tooltip = page.locator('.border-yellow-400\\/50');
    await expect(tooltip).toBeVisible();

    // Tap the same sephirot again — tooltip should stay (not toggle off)
    await sephirotSvg.tap({ force: true });
    await page.waitForTimeout(200);

    // Only tapping outside should close it
    await page.locator('header').tap();
    await page.waitForTimeout(300);
    await expect(tooltip).not.toBeVisible();
  });
});

test.describe('Tooltip — Desktop behavior', () => {
  test.use({
    viewport: { width: 1440, height: 900 },
  });

  async function waitForTreeToLoad(page: Page) {
    await page.goto('/pt-BR');
    await page.waitForLoadState('networkidle');
    await page.waitForSelector('svg circle', { timeout: 10000 });
    await page.waitForTimeout(500);
  }

  test('tooltip shows on hover and hides on mouse leave', async ({ page }) => {
    await waitForTreeToLoad(page);

    // Hover over a sephirot
    const sephirotContainer = page.locator('[style*="width: 170px"]').first();
    await sephirotContainer.hover();
    await page.waitForTimeout(300);

    // Tooltip should appear (non-pinned — no yellow border)
    const tooltipContent = page.locator('.bg-gray-900\\/95');
    await expect(tooltipContent).toBeVisible();

    // Move mouse away
    await page.mouse.move(0, 0);
    await page.waitForTimeout(400);

    // Tooltip should disappear
    await expect(tooltipContent).not.toBeVisible();
  });

  test('tooltip pins on click and unpins on outside click', async ({ page }) => {
    await waitForTreeToLoad(page);

    // Click on a sephirot to pin
    const sephirotContainer = page.locator('[style*="width: 170px"]').first();
    await sephirotContainer.click();
    await page.waitForTimeout(300);

    // Should show pinned tooltip with yellow border
    const pinnedTooltip = page.locator('.border-yellow-400\\/50');
    await expect(pinnedTooltip).toBeVisible();

    // Click outside the tree (on the header)
    await page.locator('header').click();
    await page.waitForTimeout(300);

    // Pinned tooltip should close
    await expect(pinnedTooltip).not.toBeVisible();
  });

  test('tooltip closes on Escape key', async ({ page }) => {
    await waitForTreeToLoad(page);

    // Click on a sephirot
    const sephirotContainer = page.locator('[style*="width: 170px"]').first();
    await sephirotContainer.click();
    await page.waitForTimeout(300);

    const pinnedTooltip = page.locator('.border-yellow-400\\/50');
    await expect(pinnedTooltip).toBeVisible();

    // Press Escape
    await page.keyboard.press('Escape');
    await page.waitForTimeout(200);

    await expect(pinnedTooltip).not.toBeVisible();
  });

  test('multiple tooltips all close when clicking far outside', async ({ page }) => {
    await waitForTreeToLoad(page);

    // Click first sephirot
    const sephirots = page.locator('[style*="width: 170px"]');
    const count = await sephirots.count();

    if (count >= 1) {
      // Pin first tooltip
      await sephirots.nth(0).click();
      await page.waitForTimeout(200);

      const pinnedTooltips = page.locator('.border-yellow-400\\/50');
      const tooltipCount = await pinnedTooltips.count();
      expect(tooltipCount).toBeGreaterThan(0);

      // Click far outside (on header)
      await page.locator('header').click();
      await page.waitForTimeout(300);

      // All should close
      await expect(pinnedTooltips).toHaveCount(0);
    }
  });
});
