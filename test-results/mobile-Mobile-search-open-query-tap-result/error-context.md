# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: mobile.spec.ts >> Mobile >> search: open, query, tap result
- Location: e2e\mobile.spec.ts:92:7

# Error details

```
Error: expect(locator).toBeVisible() failed

Locator: locator('button:has-text("corresponde a")')
Expected: visible
Error: strict mode violation: locator('button:has-text("corresponde a")') resolved to 6 elements:
    1) <button class="w-full text-left px-3 py-2.5 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition flex items-center gap-3">…</button> aka getByRole('button', { name: '🛤️ Caminho 29 (Qoph) Caminho' })
    2) <button class="w-full text-left px-3 py-2.5 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition flex items-center gap-3">…</button> aka getByRole('button', { name: '💀 Gamaliel Qliphah' })
    3) <button class="w-full text-left px-3 py-2.5 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition flex items-center gap-3">…</button> aka getByRole('button', { name: '🕳️ Túnel 13 (Gimel) —' })
    4) <button class="w-full text-left px-3 py-2.5 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition flex items-center gap-3">…</button> aka getByRole('button', { name: '🔮 Hod Sephirot corresponde a' })
    5) <button class="w-full text-left px-3 py-2.5 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition flex items-center gap-3">…</button> aka getByRole('button', { name: '🔮 Yesod Sephirot corresponde' })
    6) <button class="w-full text-left px-3 py-2.5 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition flex items-center gap-3">…</button> aka getByRole('button', { name: '🛤️ Caminho 13 (Gimel)' })

Call log:
  - Expect "toBeVisible" with timeout 5000ms
  - waiting for locator('button:has-text("corresponde a")')

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
        - generic [ref=e9]:
          - button "Search" [ref=e10]:
            - img [ref=e11]
          - generic [ref=e14]:
            - 'textbox "Buscar: boi, lua, coração, rubi, abismo, boaz..." [active] [ref=e16]': lua
            - generic [ref=e17]:
              - 'button "🛤️ Caminho 29 (Qoph) Caminho corresponde a: lua 🌳" [ref=e18]':
                - generic [ref=e19]: 🛤️
                - generic [ref=e20]:
                  - paragraph [ref=e21]: Caminho 29 (Qoph)
                  - paragraph [ref=e22]:
                    - generic [ref=e23]: Caminho
                    - text: "corresponde a: lua"
                - generic [ref=e24]: 🌳
              - 'button "💀 Gamaliel Qliphah corresponde a: lua (sombra) 💀" [ref=e25]':
                - generic [ref=e26]: 💀
                - generic [ref=e27]:
                  - paragraph [ref=e28]: Gamaliel
                  - paragraph [ref=e29]:
                    - generic [ref=e30]: Qliphah
                    - text: "corresponde a: lua (sombra)"
                - generic [ref=e31]: 💀
              - 'button "🕳️ Túnel 13 (Gimel) — Gargophias Túnel corresponde a: lua negra 💀" [ref=e32]':
                - generic [ref=e33]: 🕳️
                - generic [ref=e34]:
                  - paragraph [ref=e35]: Túnel 13 (Gimel) — Gargophias
                  - paragraph [ref=e36]:
                    - generic [ref=e37]: Túnel
                    - text: "corresponde a: lua negra"
                - generic [ref=e38]: 💀
              - 'button "🔮 Hod Sephirot corresponde a: pedra da lua 🌳" [ref=e39]':
                - generic [ref=e40]: 🔮
                - generic [ref=e41]:
                  - paragraph [ref=e42]: Hod
                  - paragraph [ref=e43]:
                    - generic [ref=e44]: Sephirot
                    - text: "corresponde a: pedra da lua"
                - generic [ref=e45]: 🌳
              - 'button "🔮 Yesod Sephirot corresponde a: pedra da lua 🌳" [ref=e46]':
                - generic [ref=e47]: 🔮
                - generic [ref=e48]:
                  - paragraph [ref=e49]: Yesod
                  - paragraph [ref=e50]:
                    - generic [ref=e51]: Sephirot
                    - text: "corresponde a: pedra da lua"
                - generic [ref=e52]: 🌳
              - 'button "🛤️ Caminho 13 (Gimel) Caminho corresponde a: pedra da lua 🌳" [ref=e53]':
                - generic [ref=e54]: 🛤️
                - generic [ref=e55]:
                  - paragraph [ref=e56]: Caminho 13 (Gimel)
                  - paragraph [ref=e57]:
                    - generic [ref=e58]: Caminho
                    - text: "corresponde a: pedra da lua"
                - generic [ref=e59]: 🌳
        - button "Menu" [ref=e60]:
          - img [ref=e61]
    - navigation [ref=e63]:
      - button "🌳 Vida" [ref=e64]:
        - generic [ref=e65]: 🌳
        - generic [ref=e66]: Vida
      - button "💀 Morte" [ref=e67]:
        - generic [ref=e68]: 💀
        - generic [ref=e69]: Morte
      - button "☯ Ambas" [ref=e70]:
        - generic [ref=e71]: ☯
        - generic [ref=e72]: Ambas
    - main [ref=e73]:
      - generic [ref=e74]:
        - generic:
          - img
        - generic [ref=e76]:
          - generic [ref=e77]:
            - img:
              - generic: AIN — NADA — 0
              - generic: AIN SOPH — ILIMITADO — 00
              - generic: AIN SOPH AUR — LUZ ILIMITADA — 000
              - generic: ∞
              - generic: Jechidah
              - generic: Véu do Abismo
              - generic: Véu de Parokhet
              - generic: Véu de Nephesch
              - generic:
                - generic: B
              - generic:
                - generic: J
          - generic [ref=e86]:
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
            - img [ref=e87]
          - generic:
            - img [ref=e113]:
              - generic [ref=e121]: ♆
              - generic [ref=e122]: "1"
              - generic [ref=e124]: Serafins - Metatron
              - generic [ref=e125]: Kether
              - generic [ref=e126]: Coroa
              - generic [ref=e127]: Onipresença
            - img [ref=e131]:
              - generic [ref=e139]: ♄
              - generic [ref=e140]: "3"
              - generic [ref=e142]: Tronos - Tzafquiel
              - generic [ref=e143]: Binah
              - generic [ref=e144]: Entendimento
              - generic [ref=e145]: Onisciência
            - img [ref=e149]:
              - generic [ref=e157]: ♅
              - generic [ref=e158]: "2"
              - generic [ref=e160]: Querubins - Raziel
              - generic [ref=e161]: Chokmah
              - generic [ref=e162]: Sabedoria
              - generic [ref=e163]: Onipotência
            - img [ref=e167]:
              - generic [ref=e175]: ♇
              - generic [ref=e176]: "11"
              - generic [ref=e177]: Daath
              - generic [ref=e178]: Conhecimento
            - img [ref=e182]:
              - generic [ref=e190]: ♂
              - generic [ref=e191]: "5"
              - generic [ref=e193]: Potestades - Camael
              - generic [ref=e194]: Gevurah
              - generic [ref=e195]: Força
            - img [ref=e199]:
              - generic [ref=e207]: ♃
              - generic [ref=e208]: "4"
              - generic [ref=e210]: Dominações - Tzadkiel
              - generic [ref=e211]: Chesed
              - generic [ref=e212]: Misericórdia
            - img [ref=e216]:
              - generic [ref=e224]: ☉
              - generic [ref=e225]: "6"
              - generic [ref=e227]: Virtudes - Raphael
              - generic [ref=e228]: Tiferet
              - generic [ref=e229]: Beleza
            - img [ref=e233]:
              - generic [ref=e241]: ☿
              - generic [ref=e242]: "8"
              - generic [ref=e244]: Arcanjos - Michael
              - generic [ref=e245]: Hod
              - generic [ref=e246]: Glória
            - img [ref=e250]:
              - generic [ref=e258]: ♀
              - generic [ref=e259]: "7"
              - generic [ref=e261]: Principados - Haniel
              - generic [ref=e262]: Netzach
              - generic [ref=e263]: Eternidade
            - img [ref=e267]:
              - generic [ref=e275]: ☽
              - generic [ref=e276]: "9"
              - generic [ref=e278]: Anjos - Gabriel
              - generic [ref=e279]: Yesod
              - generic [ref=e280]: Fundação
            - img [ref=e284]:
              - generic [ref=e292]: ⨁
              - generic [ref=e293]: "10"
              - generic [ref=e295]: Querubins - Sandalfon
              - generic [ref=e296]: Malkuth
              - generic [ref=e297]: Reino
              - generic [ref=e298]: Mundo Material
  - button "Open Next.js Dev Tools" [ref=e304] [cursor=pointer]:
    - img [ref=e305]
  - alert [ref=e308]
```

# Test source

```ts
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
> 103 |     await expect(page.locator('button:has-text("corresponde a")')).toBeVisible();
      |                                                                    ^ Error: expect(locator).toBeVisible() failed
  104 | 
  105 |     // Tap result
  106 |     await page.locator('button:has-text("corresponde a")').first().tap();
  107 |     await page.waitForTimeout(500);
  108 |     await expect(input).not.toBeVisible();
  109 |   });
  110 | });
  111 | 
```