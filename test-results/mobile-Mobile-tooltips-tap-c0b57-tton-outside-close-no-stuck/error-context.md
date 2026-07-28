# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: mobile.spec.ts >> Mobile >> tooltips: tap open, close button, outside close, no stuck
- Location: e2e\mobile.spec.ts:15:7

# Error details

```
Error: expect(locator).toBeVisible() failed

Locator: locator('.border-yellow-400\\/50:has-text("Véu")')
Expected: visible
Timeout: 5000ms
Error: element(s) not found

Call log:
  - Expect "toBeVisible" with timeout 5000ms
  - waiting for locator('.border-yellow-400\\/50:has-text("Véu")')

```

```yaml
- banner:
  - text: ✡
  - heading "Kabbalah Interativa" [level=1]
  - button "Search":
    - img
  - button "Menu":
    - img
- navigation:
  - button "🌳 Vida"
  - button "💀 Morte"
  - button "☯ Ambas"
- main:
  - img: AIN — NADA — 0 AIN SOPH — ILIMITADO — 00 AIN SOPH AUR — LUZ ILIMITADA — 000 ∞ Jechidah Véu do Abismo Véu de Parokhet Véu de Nephesch B J
  - paragraph: 🕳️ Véu do Abismo
  - paragraph: Masach (מסך)
  - paragraph: Separa a Tríade Superna (o Divino Incognoscível) do restante da Árvore. Cruzá-lo exige a dissolução completa do ego.
  - paragraph: "Elemento: 🜁 Ar"
  - paragraph: "Mundo: Fronteira Atziluth → Briah"
  - paragraph: "Guardião: Choronzon (333)"
  - paragraph: Caminhos
  - paragraph: 14 (Daleth), 17 (Zayin), 13 (Gimel)
  - paragraph: "Acima: Kether, Chokmah, Binah"
  - paragraph: "Abaixo: Chesed, Gevurah, Tiferet, Netzach, Hod, Yesod, Malkuth"
  - paragraph: clique para fixar
  - img
  - img
  - img: 11 א 🜁 0 12 ב ☿ I 13 ג ☽ II 14 ד ♀ III 15 ה ♈ IV 16 ו ♉ V 17 ז ♊ VI 18 ח ♋ VII 19 ט ♌ VIII 20 י ♍ IX 21 כ ♃ X 22 ל ♎ XI 23 מ 🜄 XII 24 נ ♏ XIII 25 ס ♐ XIV 26 ע ♑ XV 27 פ ♂ XVI 28 צ ♒ XVII 29 ק ♓ XVIII 30 ר ☉ XIX 31 ש 🜂 XX 32 ת ♄ XXI
  - img
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
  4   |  * Mobile integration tests (iPhone 14 viewport + touch).
  5   |  * Consolidated flows to minimize page loads.
  6   |  */
  7   | 
  8   | test.describe('Mobile', () => {
  9   |   test.use({
  10  |     viewport: { width: 390, height: 844 },
  11  |     hasTouch: true,
  12  |     isMobile: true,
  13  |   });
  14  | 
  15  |   test('tooltips: tap open, close button, outside close, no stuck', async ({ page }) => {
  16  |     const errors: string[] = [];
  17  |     page.on('pageerror', (err) => errors.push(err.message));
  18  | 
  19  |     await page.goto('/pt-BR');
  20  |     await page.waitForSelector('[data-sephirot-id]', { timeout: 10000 });
  21  | 
  22  |     // ── Sephirot tap → tooltip opens ──
  23  |     const sephirot = page.locator('[data-sephirot-id]').first();
  24  |     await sephirot.tap({ force: true });
  25  |     await page.waitForTimeout(200);
  26  |     const tooltip = page.locator('.border-yellow-400\\/50');
  27  |     await expect(tooltip).toBeVisible();
  28  | 
  29  |     // ── Close via button ──
  30  |     await page.locator('button:has-text("✕")').last().tap();
  31  |     await expect(tooltip).not.toBeVisible();
  32  | 
  33  |     // ── Tap again → close via outside (header) ──
  34  |     await sephirot.tap({ force: true });
  35  |     await page.waitForTimeout(200);
  36  |     await expect(tooltip).toBeVisible();
  37  |     await page.locator('header').tap();
  38  |     await page.waitForTimeout(200);
  39  |     await expect(tooltip).not.toBeVisible();
  40  | 
  41  |     // ── Ain tooltip tap — no crash (regression test) ──
  42  |     const ainArea = page.locator('[data-ornament-id="ain"]');
  43  |     await ainArea.tap({ force: true });
  44  |     await page.waitForTimeout(200);
  45  |     expect(errors).toHaveLength(0);
  46  |     await expect(tooltip).toBeVisible();
  47  | 
  48  |     // Close ain tooltip
  49  |     await page.locator('header').tap();
  50  |     await page.waitForTimeout(200);
  51  | 
  52  |     // ── Veil tooltip tap ──
  53  |     const veilArea = page.locator('[data-ornament-id="veil-abyss"]');
  54  |     await veilArea.tap({ force: true });
  55  |     await page.waitForTimeout(200);
> 56  |     await expect(page.locator('.border-yellow-400\\/50:has-text("Véu")')).toBeVisible();
      |                                                                           ^ Error: expect(locator).toBeVisible() failed
  57  | 
  58  |     expect(errors).toHaveLength(0);
  59  |   });
  60  | 
  61  |   test('navbar: bottom tabs switch views, sidebar opens', async ({ page }) => {
  62  |     await page.goto('/pt-BR');
  63  |     await page.waitForSelector('[data-sephirot-id]', { timeout: 10000 });
  64  | 
  65  |     // ── Death tab ──
  66  |     await page.locator('nav.fixed button:has-text("💀")').tap();
  67  |     await page.waitForSelector('[data-sephirot-id="thaumiel"]');
  68  |     await expect(page.locator('[data-sephirot-id="thaumiel"]')).toBeVisible();
  69  | 
  70  |     // ── Life tab ──
  71  |     await page.locator('nav.fixed button:has-text("🌳")').tap();
  72  |     await page.waitForSelector('[data-sephirot-id="tiferet"]');
  73  |     await expect(page.locator('[data-sephirot-id="tiferet"]')).toBeVisible();
  74  | 
  75  |     // ── Sidebar opens ──
  76  |     await page.locator('button[aria-label="Menu"]').tap();
  77  |     await expect(page.locator('text=Configurações')).toBeVisible();
  78  | 
  79  |     // Toggle veils off
  80  |     const veilToggle = page.locator('label:has-text("Exibir Véus") button[role="switch"]');
  81  |     await veilToggle.tap();
  82  |     await page.waitForTimeout(100);
  83  | 
  84  |     // Close sidebar via backdrop
  85  |     await page.locator('.bg-black\\/50').tap();
  86  |     await page.waitForTimeout(200);
  87  | 
  88  |     // Veils gone
  89  |     await expect(page.locator('[data-ornament-id="veil-abyss"]')).not.toBeVisible();
  90  |   });
  91  | 
  92  |   test('search: open, query, tap result', async ({ page }) => {
  93  |     await page.goto('/pt-BR');
  94  |     await page.waitForSelector('[data-sephirot-id]', { timeout: 10000 });
  95  | 
  96  |     // Open search
  97  |     await page.locator('button[aria-label="Search"]').tap();
  98  |     const input = page.locator('input[placeholder*="Buscar"]');
  99  |     await expect(input).toBeVisible();
  100 | 
  101 |     // Search
  102 |     await input.fill('lua');
  103 |     await expect(page.locator('button:has-text("corresponde a")')).toBeVisible();
  104 | 
  105 |     // Tap result
  106 |     await page.locator('button:has-text("corresponde a")').first().tap();
  107 |     await page.waitForTimeout(500);
  108 |     await expect(input).not.toBeVisible();
  109 |   });
  110 | });
  111 | 
```