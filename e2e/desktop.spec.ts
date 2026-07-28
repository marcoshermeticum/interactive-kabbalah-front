import { test, expect } from '@playwright/test';

/**
 * Desktop integration tests.
 * Single page load per test block — tests chained for speed.
 * Covers: hydration, tooltips (sephirot, paths, ornaments), search, navbar.
 */

test.describe('Desktop', () => {
  test.use({ viewport: { width: 1440, height: 900 } });

  test('Life view: hydration, ornament tooltips, and sephirot tooltips', async ({ page }) => {
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));
    page.on('console', (msg) => {
      if (msg.type() === 'error' && msg.text().includes('hydrat')) errors.push(msg.text());
    });

    await page.goto('/pt-BR');
    await page.waitForSelector('[data-sephirot-id="tiferet"]', { timeout: 10000 });

    // ── Hydration check ──
    expect(errors).toHaveLength(0);

    // ── Ain tooltips (the bug regression) ──
    const ainArea = page.locator('[data-ornament-id="ain"]');
    await ainArea.hover({ force: true });
    await expect(page.locator('.bg-gray-900\\/95:has-text("Nada")')).toBeVisible();

    // Ain Soph
    const ainSophArea = page.locator('[data-ornament-id="ain-soph"]');
    await ainSophArea.hover({ force: true });
    await expect(page.locator('.bg-gray-900\\/95:has-text("Ilimitado")')).toBeVisible();

    // Ain Soph Aur — pin it
    const ainSophAurArea = page.locator('[data-ornament-id="ain-soph-aur"]');
    await ainSophAurArea.click({ force: true });
    const pinnedAin = page.locator('.border-yellow-400\\/50:has-text("Ain Soph Aur")');
    await expect(pinnedAin).toBeVisible();
    await expect(pinnedAin).toContainText('Golden Dawn');

    // Close via button
    await pinnedAin.locator('button:has-text("Fechar")').click();
    await expect(pinnedAin).not.toBeVisible();

    // No errors after ain interactions
    expect(errors).toHaveLength(0);

    // ── Veil tooltip ──
    const veilArea = page.locator('[data-ornament-id="veil-abyss"]');
    await veilArea.hover({ force: true });
    await expect(page.locator('.bg-gray-900\\/95:has-text("Véu do Abismo")')).toBeVisible();

    // Pin veil and close via outside click
    await veilArea.click({ force: true });
    const pinnedVeil = page.locator('.border-yellow-400\\/50:has-text("Véu do Abismo")');
    await expect(pinnedVeil).toBeVisible();
    await page.locator('header').click();
    await expect(pinnedVeil).not.toBeVisible();

    // ── Pillar tooltip ──
    const pillarArea = page.locator('[data-ornament-id="pillar-jachin"]');
    await pillarArea.hover({ force: true });
    await expect(page.locator('.bg-gray-900\\/95:has-text("Pilar da Misericórdia")')).toBeVisible();

    // ── Sephirot tooltip: hover, pin, escape, close ──
    const tiferet = page.locator('[data-sephirot-id="tiferet"]');
    await tiferet.hover();
    await expect(page.locator('.bg-gray-900\\/95:has-text("Tiferet")')).toBeVisible();

    await page.mouse.move(0, 0);
    await page.waitForTimeout(250);

    await tiferet.click();
    const sephTooltip = page.locator('.border-yellow-400\\/50');
    await expect(sephTooltip).toBeVisible();

    await page.keyboard.press('Escape');
    await expect(sephTooltip).not.toBeVisible();
  });

  test('Life view: path tooltips — pin, copy, close, multi-pin', async ({ page }) => {
    await page.goto('/pt-BR');
    await page.waitForSelector('[data-path-number="25"]', { timeout: 10000 });

    // Hover path
    const path25 = page.locator('[data-path-number="25"]');
    await path25.hover({ force: true });
    await expect(page.locator('.bg-gray-900\\/95:has-text("25")')).toBeVisible();

    // Pin path 25
    await path25.click({ force: true });
    const pinned25 = page.locator('.border-yellow-400\\/50:has-text("25")');
    await expect(pinned25).toBeVisible();
    await expect(pinned25).toContainText('✦');

    // Copy button
    await pinned25.locator('button:has-text("📋")').click();
    await expect(pinned25.locator('button:has-text("✓")')).toBeVisible();

    // Pin another path simultaneously
    const path32 = page.locator('[data-path-number="32"]');
    await path32.click({ force: true });
    const allPinned = page.locator('[data-pinned-tooltip]');
    expect(await allPinned.count()).toBeGreaterThanOrEqual(2);

    // Close one via button
    await pinned25.locator('button:has-text("✕")').click();
    await expect(pinned25).not.toBeVisible();
  });

  test('Death view: hydration, tunnel tooltips', async ({ page }) => {
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    await page.goto('/pt-BR');
    await page.waitForSelector('svg circle', { timeout: 10000 });

    // Switch to death
    await page.locator('nav button:has-text("💀")').click();
    await page.waitForSelector('[data-sephirot-id="thaumiel"]');
    expect(errors).toHaveLength(0);

    // Tunnel tooltip
    const tunnel = page.locator('[data-path-number="tunnel-32"]');
    await tunnel.hover({ force: true });
    await expect(page.locator('.bg-black\\/95:has-text("32")')).toBeVisible();

    // Pin tunnel
    await tunnel.click({ force: true });
    const pinnedTunnel = page.locator('.border-red-500\\/50:has-text("Thantifaxath")');
    await expect(pinnedTunnel).toBeVisible();

    // Close
    await pinnedTunnel.locator('button:has-text("✕")').click();
    await expect(pinnedTunnel).not.toBeVisible();
  });

  test('Navbar: view switching and settings toggles', async ({ page }) => {
    await page.goto('/pt-BR');
    await page.waitForSelector('[data-sephirot-id="tiferet"]', { timeout: 10000 });

    // Life active by default
    const lifeTab = page.locator('nav button:has-text("🌳")');
    await expect(lifeTab).toHaveClass(/bg-white/);

    // Switch to death
    const deathTab = page.locator('nav button:has-text("💀")');
    await deathTab.click();
    await page.waitForSelector('[data-sephirot-id="thaumiel"]');
    await expect(deathTab).toHaveClass(/bg-red-900/);

    // Switch to both
    const bothTab = page.locator('nav button:has-text("☯")');
    await bothTab.click();
    await page.waitForSelector('[data-sephirot-id="kether"]');
    await expect(bothTab).toHaveClass(/bg-purple-900/);

    // Switch back to life for settings test
    await lifeTab.click();
    await page.waitForSelector('[data-ornament-id="veil-abyss"]');

    // Toggle veils off
    await page.locator('button[aria-label="Settings"]').click();
    await page.locator('label:has-text("Exibir Véus") input').uncheck();
    await expect(page.locator('[data-ornament-id="veil-abyss"]')).not.toBeVisible();

    // Toggle pillars off
    await page.locator('label:has-text("Exibir Pilares") input').uncheck();
    await expect(page.locator('[data-ornament-id="pillar-boaz"]')).not.toBeVisible();
  });

  test('Search: queries, categories, focus+tooltip', async ({ page }) => {
    await page.goto('/pt-BR');
    await page.waitForSelector('[data-sephirot-id="tiferet"]', { timeout: 10000 });

    // Open search
    await page.locator('button[aria-label="Search"]').click();
    const input = page.locator('input[placeholder*="Buscar"]');
    await expect(input).toBeVisible();

    // Search sephirot
    await input.fill('coração');
    await expect(page.locator('button:has-text("Tiferet")')).toBeVisible();

    // Search qliphah
    await input.fill('lilith');
    await expect(page.locator('button:has-text("Gamaliel")')).toBeVisible();

    // Search veil
    await input.fill('abismo');
    await expect(page.locator('button:has-text("Véu do Abismo")')).toBeVisible();

    // Search pillar
    await input.fill('boaz');
    await expect(page.locator('button:has-text("Pilar da Severidade")')).toBeVisible();

    // Search ain soph
    await input.fill('ain soph');
    await expect(page.locator('button:has-text("Ain Soph")')).toBeVisible();

    // No results
    await input.fill('xyznothing');
    await expect(page.locator('text=Nenhum resultado')).toBeVisible();

    // Click result → focus + tooltip
    await input.fill('coração');
    await page.locator('button:has-text("Tiferet")').click();
    await expect(input).not.toBeVisible(); // search closes
    await page.waitForTimeout(600); // animation + tooltip trigger
    await expect(page.locator('.border-yellow-400\\/50')).toBeVisible();

    // Close search result tooltip
    await page.locator('header').click();

    // Clicking qliphah result switches view
    await page.locator('button[aria-label="Search"]').click();
    await page.locator('input[placeholder*="Buscar"]').fill('lilith');
    await page.locator('button:has-text("Gamaliel")').click();
    await page.waitForTimeout(400);
    await expect(page.locator('nav button.bg-red-900\\/40')).toBeVisible();
  });
});
