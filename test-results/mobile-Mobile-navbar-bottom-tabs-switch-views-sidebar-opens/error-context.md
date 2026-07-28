# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: mobile.spec.ts >> Mobile >> navbar: bottom tabs switch views, sidebar opens
- Location: e2e\mobile.spec.ts:61:7

# Error details

```
Test timeout of 30000ms exceeded.
```

```
Error: locator.tap: Test timeout of 30000ms exceeded.
Call log:
  - waiting for locator('.bg-black\\/50')
    - locator resolved to <div class="absolute inset-0 bg-black/50 backdrop-blur-sm animate-fadeIn"></div>
  - attempting tap action
    2 × waiting for element to be visible, enabled and stable
      - element is visible, enabled and stable
      - scrolling into view if needed
      - done scrolling
      - <div class="absolute right-0 top-0 bottom-0 w-[280px] max-w-[85vw] bg-gray-950/98 backdrop-blur-xl border-l border-white/10 shadow-2xl animate-slideInRight overflow-auto">…</div> intercepts pointer events
    - retrying tap action
    - waiting 20ms
    2 × waiting for element to be visible, enabled and stable
      - element is visible, enabled and stable
      - scrolling into view if needed
      - done scrolling
      - <div class="absolute right-0 top-0 bottom-0 w-[280px] max-w-[85vw] bg-gray-950/98 backdrop-blur-xl border-l border-white/10 shadow-2xl animate-slideInRight overflow-auto">…</div> intercepts pointer events
    - retrying tap action
      - waiting 100ms
    47 × waiting for element to be visible, enabled and stable
       - element is visible, enabled and stable
       - scrolling into view if needed
       - done scrolling
       - <div class="absolute right-0 top-0 bottom-0 w-[280px] max-w-[85vw] bg-gray-950/98 backdrop-blur-xl border-l border-white/10 shadow-2xl animate-slideInRight overflow-auto">…</div> intercepts pointer events
     - retrying tap action
       - waiting 500ms

```

# Page snapshot

```yaml
- generic [ref=e1]:
  - generic [ref=e2]:
    - banner [ref=e3]:
      - generic [ref=e4]:
        - generic [ref=e6]: ✡
        - heading "Kabbalah Interativa" [level=1] [ref=e7]
      - generic [ref=e8]:
        - button "Search" [ref=e10]:
          - img [ref=e11]
        - button "Menu" [ref=e14]:
          - img [ref=e15]
    - generic [ref=e19]:
      - generic [ref=e20]:
        - heading "Menu" [level=2] [ref=e21]
        - button [ref=e22]:
          - img [ref=e23]
      - generic [ref=e25]:
        - generic [ref=e26]:
          - paragraph [ref=e27]: Configurações
          - generic [ref=e28]:
            - generic [ref=e29] [cursor=pointer]:
              - generic [ref=e30]: Exibir Véus
              - switch "Exibir Véus" [active] [ref=e31]
            - generic [ref=e33] [cursor=pointer]:
              - generic [ref=e34]: Exibir Pilares
              - switch "Exibir Pilares" [checked] [ref=e35]
        - generic [ref=e37]:
          - paragraph [ref=e38]: Aparência
          - generic [ref=e39]:
            - generic [ref=e40]:
              - button "Toggle theme" [ref=e41]:
                - img [ref=e42]
              - generic [ref=e44]: Tema
            - combobox "Select Language" [ref=e45] [cursor=pointer]:
              - option "PT" [selected]
              - option "EN"
        - generic [ref=e46]:
          - paragraph [ref=e47]: Redes & Links
          - generic [ref=e48]:
            - link "GitHub @mrviniciux" [ref=e49] [cursor=pointer]:
              - /url: https://github.com/mrviniciux
              - img [ref=e51]
              - generic [ref=e53]:
                - generic [ref=e54]: GitHub
                - text: "@mrviniciux"
            - link "LinkedIn @mrviniciux" [ref=e55] [cursor=pointer]:
              - /url: https://linkedin.com/in/mrviniciux
              - img [ref=e57]
              - generic [ref=e59]:
                - generic [ref=e60]: LinkedIn
                - text: "@mrviniciux"
            - link "Instagram @mrviniciux" [ref=e61] [cursor=pointer]:
              - /url: https://instagram.com/mrviniciux
              - img [ref=e63]
              - generic [ref=e65]:
                - generic [ref=e66]: Instagram
                - text: "@mrviniciux"
        - generic [ref=e67]:
          - paragraph [ref=e68]: Apoiar
          - button "❤️ Buy me a therapy session PIX • Qualquer valor" [ref=e69]:
            - generic [ref=e70]: ❤️
            - generic [ref=e71]:
              - generic [ref=e72]: Buy me a therapy session
              - text: PIX • Qualquer valor
    - navigation [ref=e73]:
      - button "🌳 Vida" [ref=e74]:
        - generic [ref=e75]: 🌳
        - generic [ref=e76]: Vida
      - button "💀 Morte" [ref=e77]:
        - generic [ref=e78]: 💀
        - generic [ref=e79]: Morte
      - button "☯ Ambas" [ref=e80]:
        - generic [ref=e81]: ☯
        - generic [ref=e82]: Ambas
    - main [ref=e83]:
      - generic [ref=e84]:
        - generic:
          - img
        - generic [ref=e86]:
          - generic [ref=e87]:
            - img:
              - generic: AIN — NADA — 0
              - generic: AIN SOPH — ILIMITADO — 00
              - generic: AIN SOPH AUR — LUZ ILIMITADA — 000
              - generic: ∞
              - generic: Jechidah
              - generic:
                - generic: B
              - generic:
                - generic: J
          - generic [ref=e93]:
            - img
            - img
            - img:
              - generic:
                - generic: "11"
                - generic: א
                - generic: 🜁
                - generic: "0"
              - generic:
                - generic: "12"
                - generic: ב
                - generic: ☿
                - generic: I
              - generic:
                - generic: "13"
                - generic: ג
                - generic: ☽
                - generic: II
              - generic:
                - generic: "14"
                - generic: ד
                - generic: ♀
                - generic: III
              - generic:
                - generic: "15"
                - generic: ה
                - generic: ♈
                - generic: IV
              - generic:
                - generic: "16"
                - generic: ו
                - generic: ♉
                - generic: V
              - generic:
                - generic: "17"
                - generic: ז
                - generic: ♊
                - generic: VI
              - generic:
                - generic: "18"
                - generic: ח
                - generic: ♋
                - generic: VII
              - generic:
                - generic: "19"
                - generic: ט
                - generic: ♌
                - generic: VIII
              - generic:
                - generic: "20"
                - generic: י
                - generic: ♍
                - generic: IX
              - generic:
                - generic: "21"
                - generic: כ
                - generic: ♃
                - generic: X
              - generic:
                - generic: "22"
                - generic: ל
                - generic: ♎
                - generic: XI
              - generic:
                - generic: "23"
                - generic: מ
                - generic: 🜄
                - generic: XII
              - generic:
                - generic: "24"
                - generic: נ
                - generic: ♏
                - generic: XIII
              - generic:
                - generic: "25"
                - generic: ס
                - generic: ♐
                - generic: XIV
              - generic:
                - generic: "26"
                - generic: ע
                - generic: ♑
                - generic: XV
              - generic:
                - generic: "27"
                - generic: פ
                - generic: ♂
                - generic: XVI
              - generic:
                - generic: "28"
                - generic: צ
                - generic: ♒
                - generic: XVII
              - generic:
                - generic: "29"
                - generic: ק
                - generic: ♓
                - generic: XVIII
              - generic:
                - generic: "30"
                - generic: ר
                - generic: ☉
                - generic: XIX
              - generic:
                - generic: "31"
                - generic: ש
                - generic: 🜂
                - generic: XX
              - generic:
                - generic: "32"
                - generic: ת
                - generic: ♄
                - generic: XXI
            - img [ref=e94]
          - generic:
            - img [ref=e120]:
              - generic [ref=e128]: ♆
              - generic [ref=e129]: "1"
              - generic [ref=e131]: Serafins - Metatron
              - generic [ref=e132]: Kether
              - generic [ref=e133]: Coroa
              - generic [ref=e134]: Onipresença
            - img [ref=e138]:
              - generic [ref=e146]: ♄
              - generic [ref=e147]: "3"
              - generic [ref=e149]: Tronos - Tzafquiel
              - generic [ref=e150]: Binah
              - generic [ref=e151]: Entendimento
              - generic [ref=e152]: Onisciência
            - img [ref=e156]:
              - generic [ref=e164]: ♅
              - generic [ref=e165]: "2"
              - generic [ref=e167]: Querubins - Raziel
              - generic [ref=e168]: Chokmah
              - generic [ref=e169]: Sabedoria
              - generic [ref=e170]: Onipotência
            - img [ref=e174]:
              - generic [ref=e182]: ♇
              - generic [ref=e183]: "11"
              - generic [ref=e184]: Daath
              - generic [ref=e185]: Conhecimento
            - img [ref=e189]:
              - generic [ref=e197]: ♂
              - generic [ref=e198]: "5"
              - generic [ref=e200]: Potestades - Camael
              - generic [ref=e201]: Gevurah
              - generic [ref=e202]: Força
            - img [ref=e206]:
              - generic [ref=e214]: ♃
              - generic [ref=e215]: "4"
              - generic [ref=e217]: Dominações - Tzadkiel
              - generic [ref=e218]: Chesed
              - generic [ref=e219]: Misericórdia
            - img [ref=e223]:
              - generic [ref=e231]: ☉
              - generic [ref=e232]: "6"
              - generic [ref=e234]: Virtudes - Raphael
              - generic [ref=e235]: Tiferet
              - generic [ref=e236]: Beleza
            - img [ref=e240]:
              - generic [ref=e248]: ☿
              - generic [ref=e249]: "8"
              - generic [ref=e251]: Arcanjos - Michael
              - generic [ref=e252]: Hod
              - generic [ref=e253]: Glória
            - img [ref=e257]:
              - generic [ref=e265]: ♀
              - generic [ref=e266]: "7"
              - generic [ref=e268]: Principados - Haniel
              - generic [ref=e269]: Netzach
              - generic [ref=e270]: Eternidade
            - img [ref=e274]:
              - generic [ref=e282]: ☽
              - generic [ref=e283]: "9"
              - generic [ref=e285]: Anjos - Gabriel
              - generic [ref=e286]: Yesod
              - generic [ref=e287]: Fundação
            - img [ref=e291]:
              - generic [ref=e299]: ⨁
              - generic [ref=e300]: "10"
              - generic [ref=e302]: Querubins - Sandalfon
              - generic [ref=e303]: Malkuth
              - generic [ref=e304]: Reino
              - generic [ref=e305]: Mundo Material
  - button "Open Next.js Dev Tools" [ref=e311] [cursor=pointer]:
    - img [ref=e312]
  - alert [ref=e315]
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
  56  |     await expect(page.locator('.border-yellow-400\\/50:has-text("Véu")')).toBeVisible();
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
> 85  |     await page.locator('.bg-black\\/50').tap();
      |                                          ^ Error: locator.tap: Test timeout of 30000ms exceeded.
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