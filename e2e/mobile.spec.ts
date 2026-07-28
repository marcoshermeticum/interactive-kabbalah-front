import { test, expect } from '@playwright/test';

/**
 * Mobile integration tests (iPhone 14 viewport + touch).
 * Consolidated flows to minimize page loads.
 */

test.describe('Mobile', () => {
  test.use({
    viewport: { width: 390, height: 844 },
    hasTouch: true,
    isMobile: true,
  });

  test('tooltips: tap open, close button, outside close, no stuck', async ({ page }) => {
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    await page.goto('/pt-BR');
    await page.waitForSelector('[data-sephirot-id]', { timeout: 10000 });

    // ── Sephirot tap → tooltip opens ──
    const sephirot = page.locator('[data-sephirot-id]').first();
    await sephirot.tap({ force: true });
    await page.waitForTimeout(200);
    const tooltip = page.locator('.border-yellow-400\\/50');
    await expect(tooltip).toBeVisible();

    // ── Close via button ──
    await page.locator('button:has-text("✕")').last().tap();
    await expect(tooltip).not.toBeVisible();

    // ── Tap again → close via outside (header) ──
    await sephirot.tap({ force: true });
    await page.waitForTimeout(200);
    await expect(tooltip).toBeVisible();
    await page.locator('header').tap();
    await page.waitForTimeout(200);
    await expect(tooltip).not.toBeVisible();

    // ── Ain tooltip tap — no crash (regression test) ──
    const ainArea = page.locator('[data-ornament-id="ain"]');
    await ainArea.tap({ force: true });
    await page.waitForTimeout(200);
    expect(errors).toHaveLength(0);
    await expect(tooltip).toBeVisible();

    // Close ain tooltip
    await page.locator('header').tap();
    await page.waitForTimeout(200);

    // ── Veil tooltip tap ──
    const veilArea = page.locator('[data-ornament-id="veil-abyss"]');
    await veilArea.tap({ force: true });
    await page.waitForTimeout(200);
    await expect(page.locator('.border-yellow-400\\/50:has-text("Véu")')).toBeVisible();

    expect(errors).toHaveLength(0);
  });

  test('navbar: bottom tabs switch views, sidebar opens', async ({ page }) => {
    await page.goto('/pt-BR');
    await page.waitForSelector('[data-sephirot-id]', { timeout: 10000 });

    // ── Death tab ──
    await page.locator('nav.fixed button:has-text("💀")').tap();
    await page.waitForSelector('[data-sephirot-id="thaumiel"]');
    await expect(page.locator('[data-sephirot-id="thaumiel"]')).toBeVisible();

    // ── Life tab ──
    await page.locator('nav.fixed button:has-text("🌳")').tap();
    await page.waitForSelector('[data-sephirot-id="tiferet"]');
    await expect(page.locator('[data-sephirot-id="tiferet"]')).toBeVisible();

    // ── Sidebar opens ──
    await page.locator('button[aria-label="Menu"]').tap();
    await expect(page.locator('text=Configurações')).toBeVisible();

    // Toggle veils off
    const veilToggle = page.locator('label:has-text("Exibir Véus") button[role="switch"]');
    await veilToggle.tap();
    await page.waitForTimeout(100);

    // Close sidebar via backdrop
    await page.locator('.bg-black\\/50').tap();
    await page.waitForTimeout(200);

    // Veils gone
    await expect(page.locator('[data-ornament-id="veil-abyss"]')).not.toBeVisible();
  });

  test('search: open, query, tap result', async ({ page }) => {
    await page.goto('/pt-BR');
    await page.waitForSelector('[data-sephirot-id]', { timeout: 10000 });

    // Open search
    await page.locator('button[aria-label="Search"]').tap();
    const input = page.locator('input[placeholder*="Buscar"]');
    await expect(input).toBeVisible();

    // Search
    await input.fill('lua');
    await expect(page.locator('button:has-text("corresponde a")')).toBeVisible();

    // Tap result
    await page.locator('button:has-text("corresponde a")').first().tap();
    await page.waitForTimeout(500);
    await expect(input).not.toBeVisible();
  });
});
