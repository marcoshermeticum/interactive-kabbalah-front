# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: desktop.spec.ts >> Desktop >> Life view: path tooltips — pin, copy, close, multi-pin
- Location: e2e\desktop.spec.ts:82:7

# Error details

```
Error: expect(locator).toBeVisible() failed

Locator: locator('.bg-gray-900\\/95:has-text("25")')
Expected: visible
Timeout: 5000ms
Error: element(s) not found

Call log:
  - Expect "toBeVisible" with timeout 5000ms
  - waiting for locator('.bg-gray-900\\/95:has-text("25")')

```

```yaml
- banner:
  - text: ✡
  - heading "Kabbalah Interativa" [level=1]
  - navigation:
    - button "🌳 Vida"
    - button "💀 Morte"
    - button "☯Ambas"
  - button "Search":
    - img
  - button "Settings":
    - img
  - button "Toggle theme":
    - img
  - combobox "Select Language":
    - option "PT" [selected]
    - option "EN"
  - button "Donate":
    - img
  - link "GitHub":
    - /url: https://github.com/mrviniciux
    - img
  - link "LinkedIn":
    - /url: https://linkedin.com/in/mrviniciux
    - img
  - link "Instagram":
    - /url: https://instagram.com/mrviniciux
    - img
- main:
  - img: AIN — NADA — 0 AIN SOPH — ILIMITADO — 00 AIN SOPH AUR — LUZ ILIMITADA — 000 ∞ Jechidah Véu do Abismo Véu de Parokhet Véu de Nephesch B J
  - img
  - img
  - img: 11 א 🜁 0 12 ב ☿ I 13 ג ☽ II 14 ד ♀ III 15 ה ♈ IV 16 ו ♉ V 17 ז ♊ VI 18 ח ♋ VII 19 ט ♌ VIII 20 י ♍ IX 21 כ ♃ X 22 ל ♎ XI 23 מ 🜄 XII 24 נ ♏ XIII 25 ס ♐ XIV 26 ע ♑ XV 27 פ ♂ XVI 28 צ ♒ XVII 29 ק ♓ XVIII 30 ר ☉ XIX 31 ש 🜂 XX 32 ת ♄ XXI
  - img
  - paragraph: Caminho 27 — פ (Peh) — ♂ (Marte)
  - paragraph: 🃏 XVI - A Torre
  - paragraph: hod → netzach
  - paragraph: "✦ Virtude: Destruição do falso, despertar"
  - paragraph: "✧ Vício: Catástrofe, arrogância"
  - paragraph: clique para fixar
  - img: ♆ 1 Serafins - Metatron Kether Coroa Onipresença
  - img: ♄ 3 Tronos - Tzafquiel Binah Entendimento Onisciência
  - img: ♅ 2 Querubins - Raziel Chokmah Sabedoria Onipotência
  - img: ♇ 11 Daath Conhecimento
  - img: ♂ 5 Potestades - Camael Gevurah Força
  - img: ♃ 4 Dominações - Tzadkiel Chesed Misericórdia
  - img: ☉ 6 Virtudes - Raphael Tiferet Beleza
  - img: ☿ 8 Arcanjos - Michael Hod Glória
  - img: ♀ 7 Principados - Haniel Netzach Eternidade
  - img: ☽ 9 Anjos - Gabriel Yesod Fundação
  - img: ⨁ 10 Querubins - Sandalfon Malkuth Reino Mundo Material
- alert
```

# Test source

```ts
  1   | import { test, expect } from '@playwright/test';
  2   | 
  3   | /**
  4   |  * Desktop integration tests.
  5   |  * Single page load per test block — tests chained for speed.
  6   |  * Covers: hydration, tooltips (sephirot, paths, ornaments), search, navbar.
  7   |  */
  8   | 
  9   | test.describe('Desktop', () => {
  10  |   test.use({ viewport: { width: 1440, height: 900 } });
  11  | 
  12  |   test('Life view: hydration, ornament tooltips, and sephirot tooltips', async ({ page }) => {
  13  |     const errors: string[] = [];
  14  |     page.on('pageerror', (err) => errors.push(err.message));
  15  |     page.on('console', (msg) => {
  16  |       if (msg.type() === 'error' && msg.text().includes('hydrat')) errors.push(msg.text());
  17  |     });
  18  | 
  19  |     await page.goto('/pt-BR');
  20  |     await page.waitForSelector('[data-sephirot-id="tiferet"]', { timeout: 10000 });
  21  | 
  22  |     // ── Hydration check ──
  23  |     expect(errors).toHaveLength(0);
  24  | 
  25  |     // ── Ain tooltips (the bug regression) ──
  26  |     const ainArea = page.locator('[data-ornament-id="ain"]');
  27  |     await ainArea.hover({ force: true });
  28  |     await expect(page.locator('.bg-gray-900\\/95:has-text("Nada")')).toBeVisible();
  29  | 
  30  |     // Ain Soph
  31  |     const ainSophArea = page.locator('[data-ornament-id="ain-soph"]');
  32  |     await ainSophArea.hover({ force: true });
  33  |     await expect(page.locator('.bg-gray-900\\/95:has-text("Ilimitado")')).toBeVisible();
  34  | 
  35  |     // Ain Soph Aur — pin it
  36  |     const ainSophAurArea = page.locator('[data-ornament-id="ain-soph-aur"]');
  37  |     await ainSophAurArea.click({ force: true });
  38  |     const pinnedAin = page.locator('.border-yellow-400\\/50:has-text("Ain Soph Aur")');
  39  |     await expect(pinnedAin).toBeVisible();
  40  |     await expect(pinnedAin).toContainText('Golden Dawn');
  41  | 
  42  |     // Close via button
  43  |     await pinnedAin.locator('button:has-text("Fechar")').click();
  44  |     await expect(pinnedAin).not.toBeVisible();
  45  | 
  46  |     // No errors after ain interactions
  47  |     expect(errors).toHaveLength(0);
  48  | 
  49  |     // ── Veil tooltip ──
  50  |     const veilArea = page.locator('[data-ornament-id="veil-abyss"]');
  51  |     await veilArea.hover({ force: true });
  52  |     await expect(page.locator('.bg-gray-900\\/95:has-text("Véu do Abismo")')).toBeVisible();
  53  | 
  54  |     // Pin veil and close via outside click
  55  |     await veilArea.click({ force: true });
  56  |     const pinnedVeil = page.locator('.border-yellow-400\\/50:has-text("Véu do Abismo")');
  57  |     await expect(pinnedVeil).toBeVisible();
  58  |     await page.locator('header').click();
  59  |     await expect(pinnedVeil).not.toBeVisible();
  60  | 
  61  |     // ── Pillar tooltip ──
  62  |     const pillarArea = page.locator('[data-ornament-id="pillar-jachin"]');
  63  |     await pillarArea.hover({ force: true });
  64  |     await expect(page.locator('.bg-gray-900\\/95:has-text("Pilar da Misericórdia")')).toBeVisible();
  65  | 
  66  |     // ── Sephirot tooltip: hover, pin, escape, close ──
  67  |     const tiferet = page.locator('[data-sephirot-id="tiferet"]');
  68  |     await tiferet.hover();
  69  |     await expect(page.locator('.bg-gray-900\\/95:has-text("Tiferet")')).toBeVisible();
  70  | 
  71  |     await page.mouse.move(0, 0);
  72  |     await page.waitForTimeout(250);
  73  | 
  74  |     await tiferet.click();
  75  |     const sephTooltip = page.locator('.border-yellow-400\\/50');
  76  |     await expect(sephTooltip).toBeVisible();
  77  | 
  78  |     await page.keyboard.press('Escape');
  79  |     await expect(sephTooltip).not.toBeVisible();
  80  |   });
  81  | 
  82  |   test('Life view: path tooltips — pin, copy, close, multi-pin', async ({ page }) => {
  83  |     await page.goto('/pt-BR');
  84  |     await page.waitForSelector('[data-path-number="25"]', { timeout: 10000 });
  85  | 
  86  |     // Hover path
  87  |     const path25 = page.locator('[data-path-number="25"]');
  88  |     await path25.hover({ force: true });
> 89  |     await expect(page.locator('.bg-gray-900\\/95:has-text("25")')).toBeVisible();
      |                                                                    ^ Error: expect(locator).toBeVisible() failed
  90  | 
  91  |     // Pin path 25
  92  |     await path25.click({ force: true });
  93  |     const pinned25 = page.locator('.border-yellow-400\\/50:has-text("25")');
  94  |     await expect(pinned25).toBeVisible();
  95  |     await expect(pinned25).toContainText('✦');
  96  | 
  97  |     // Copy button
  98  |     await pinned25.locator('button:has-text("📋")').click();
  99  |     await expect(pinned25.locator('button:has-text("✓")')).toBeVisible();
  100 | 
  101 |     // Pin another path simultaneously
  102 |     const path32 = page.locator('[data-path-number="32"]');
  103 |     await path32.click({ force: true });
  104 |     const allPinned = page.locator('[data-pinned-tooltip]');
  105 |     expect(await allPinned.count()).toBeGreaterThanOrEqual(2);
  106 | 
  107 |     // Close one via button
  108 |     await pinned25.locator('button:has-text("✕")').click();
  109 |     await expect(pinned25).not.toBeVisible();
  110 |   });
  111 | 
  112 |   test('Death view: hydration, tunnel tooltips', async ({ page }) => {
  113 |     const errors: string[] = [];
  114 |     page.on('pageerror', (err) => errors.push(err.message));
  115 | 
  116 |     await page.goto('/pt-BR');
  117 |     await page.waitForSelector('svg circle', { timeout: 10000 });
  118 | 
  119 |     // Switch to death
  120 |     await page.locator('nav button:has-text("💀")').click();
  121 |     await page.waitForSelector('[data-sephirot-id="thaumiel"]');
  122 |     expect(errors).toHaveLength(0);
  123 | 
  124 |     // Tunnel tooltip
  125 |     const tunnel = page.locator('[data-path-number="tunnel-32"]');
  126 |     await tunnel.hover({ force: true });
  127 |     await expect(page.locator('.bg-black\\/95:has-text("32")')).toBeVisible();
  128 | 
  129 |     // Pin tunnel
  130 |     await tunnel.click({ force: true });
  131 |     const pinnedTunnel = page.locator('.border-red-500\\/50:has-text("Thantifaxath")');
  132 |     await expect(pinnedTunnel).toBeVisible();
  133 | 
  134 |     // Close
  135 |     await pinnedTunnel.locator('button:has-text("✕")').click();
  136 |     await expect(pinnedTunnel).not.toBeVisible();
  137 |   });
  138 | 
  139 |   test('Navbar: view switching and settings toggles', async ({ page }) => {
  140 |     await page.goto('/pt-BR');
  141 |     await page.waitForSelector('[data-sephirot-id="tiferet"]', { timeout: 10000 });
  142 | 
  143 |     // Life active by default
  144 |     const lifeTab = page.locator('nav button:has-text("🌳")');
  145 |     await expect(lifeTab).toHaveClass(/bg-white/);
  146 | 
  147 |     // Switch to death
  148 |     const deathTab = page.locator('nav button:has-text("💀")');
  149 |     await deathTab.click();
  150 |     await page.waitForSelector('[data-sephirot-id="thaumiel"]');
  151 |     await expect(deathTab).toHaveClass(/bg-red-900/);
  152 | 
  153 |     // Switch to both
  154 |     const bothTab = page.locator('nav button:has-text("☯")');
  155 |     await bothTab.click();
  156 |     await page.waitForSelector('[data-sephirot-id="kether"]');
  157 |     await expect(bothTab).toHaveClass(/bg-purple-900/);
  158 | 
  159 |     // Switch back to life for settings test
  160 |     await lifeTab.click();
  161 |     await page.waitForSelector('[data-ornament-id="veil-abyss"]');
  162 | 
  163 |     // Toggle veils off
  164 |     await page.locator('button[aria-label="Settings"]').click();
  165 |     await page.locator('label:has-text("Exibir Véus") input').uncheck();
  166 |     await expect(page.locator('[data-ornament-id="veil-abyss"]')).not.toBeVisible();
  167 | 
  168 |     // Toggle pillars off
  169 |     await page.locator('label:has-text("Exibir Pilares") input').uncheck();
  170 |     await expect(page.locator('[data-ornament-id="pillar-boaz"]')).not.toBeVisible();
  171 |   });
  172 | 
  173 |   test('Search: queries, categories, focus+tooltip', async ({ page }) => {
  174 |     await page.goto('/pt-BR');
  175 |     await page.waitForSelector('[data-sephirot-id="tiferet"]', { timeout: 10000 });
  176 | 
  177 |     // Open search
  178 |     await page.locator('button[aria-label="Search"]').click();
  179 |     const input = page.locator('input[placeholder*="Buscar"]');
  180 |     await expect(input).toBeVisible();
  181 | 
  182 |     // Search sephirot
  183 |     await input.fill('coração');
  184 |     await expect(page.locator('button:has-text("Tiferet")')).toBeVisible();
  185 | 
  186 |     // Search qliphah
  187 |     await input.fill('lilith');
  188 |     await expect(page.locator('button:has-text("Gamaliel")')).toBeVisible();
  189 | 
```