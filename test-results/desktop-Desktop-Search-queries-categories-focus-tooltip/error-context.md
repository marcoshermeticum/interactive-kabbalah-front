# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: desktop.spec.ts >> Desktop >> Search: queries, categories, focus+tooltip
- Location: e2e\desktop.spec.ts:173:7

# Error details

```
Error: expect(locator).toBeVisible() failed

Locator: locator('button:has-text("Ain Soph")')
Expected: visible
Error: strict mode violation: locator('button:has-text("Ain Soph")') resolved to 3 elements:
    1) <button class="w-full text-left px-3 py-2.5 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition flex items-center gap-3">…</button> aka getByRole('button', { name: '🔮 Kether Sephirot' })
    2) <button class="w-full text-left px-3 py-2.5 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition flex items-center gap-3">…</button> aka getByRole('button', { name: '🪬 Ain Soph (Ilimitado) Véu' })
    3) <button class="w-full text-left px-3 py-2.5 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition flex items-center gap-3">…</button> aka getByRole('button', { name: '🪬 Ain Soph Aur (Luz' })

Call log:
  - Expect "toBeVisible" with timeout 5000ms
  - waiting for locator('button:has-text("Ain Soph")')

```

# Page snapshot

```yaml
- generic [ref=e1]:
  - generic [ref=e2]:
    - banner [ref=e3]:
      - generic [ref=e4]:
        - generic [ref=e6]: ✡
        - heading "Kabbalah Interativa" [level=1] [ref=e7]
      - navigation [ref=e8]:
        - button "🌳 Vida" [ref=e9]
        - button "💀 Morte" [ref=e10]
        - button "☯Ambas" [ref=e11]
      - generic [ref=e12]:
        - generic [ref=e13]:
          - button "Search" [ref=e14]:
            - img [ref=e15]
          - generic [ref=e18]:
            - 'textbox "Buscar: boi, lua, coração, rubi, abismo, boaz..." [active] [ref=e20]': ain soph
            - generic [ref=e21]:
              - 'button "🔮 Kether Sephirot corresponde a: ain soph 🌳" [ref=e22]':
                - generic [ref=e23]: 🔮
                - generic [ref=e24]:
                  - paragraph [ref=e25]: Kether
                  - paragraph [ref=e26]:
                    - generic [ref=e27]: Sephirot
                    - text: "corresponde a: ain soph"
                - generic [ref=e28]: 🌳
              - 'button "🪬 Ain Soph (Ilimitado) Véu corresponde a: ain soph 🌳" [ref=e29]':
                - generic [ref=e30]: 🪬
                - generic [ref=e31]:
                  - paragraph [ref=e32]: Ain Soph (Ilimitado)
                  - paragraph [ref=e33]:
                    - generic [ref=e34]: Véu
                    - text: "corresponde a: ain soph"
                - generic [ref=e35]: 🌳
              - 'button "🪬 Ain Soph Aur (Luz Ilimitada) Véu corresponde a: ain soph aur 🌳" [ref=e36]':
                - generic [ref=e37]: 🪬
                - generic [ref=e38]:
                  - paragraph [ref=e39]: Ain Soph Aur (Luz Ilimitada)
                  - paragraph [ref=e40]:
                    - generic [ref=e41]: Véu
                    - text: "corresponde a: ain soph aur"
                - generic [ref=e42]: 🌳
              - 'button "🪬 Ain (Nada) Véu corresponde a: ain 🌳" [ref=e43]':
                - generic [ref=e44]: 🪬
                - generic [ref=e45]:
                  - paragraph [ref=e46]: Ain (Nada)
                  - paragraph [ref=e47]:
                    - generic [ref=e48]: Véu
                    - text: "corresponde a: ain"
                - generic [ref=e49]: 🌳
        - generic [ref=e50]:
          - button "Settings" [ref=e52]:
            - img [ref=e53]
          - button "Toggle theme" [ref=e56]:
            - img [ref=e57]
          - combobox "Select Language" [ref=e59] [cursor=pointer]:
            - option "PT" [selected]
            - option "EN"
          - button "Donate" [ref=e60]:
            - img [ref=e61]
        - generic [ref=e63]:
          - link "GitHub" [ref=e64] [cursor=pointer]:
            - /url: https://github.com/mrviniciux
            - img [ref=e65]
          - link "LinkedIn" [ref=e67] [cursor=pointer]:
            - /url: https://linkedin.com/in/mrviniciux
            - img [ref=e68]
          - link "Instagram" [ref=e70] [cursor=pointer]:
            - /url: https://instagram.com/mrviniciux
            - img [ref=e71]
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
  190 |     // Search veil
  191 |     await input.fill('abismo');
  192 |     await expect(page.locator('button:has-text("Véu do Abismo")')).toBeVisible();
  193 | 
  194 |     // Search pillar
  195 |     await input.fill('boaz');
  196 |     await expect(page.locator('button:has-text("Pilar da Severidade")')).toBeVisible();
  197 | 
  198 |     // Search ain soph
  199 |     await input.fill('ain soph');
> 200 |     await expect(page.locator('button:has-text("Ain Soph")')).toBeVisible();
      |                                                               ^ Error: expect(locator).toBeVisible() failed
  201 | 
  202 |     // No results
  203 |     await input.fill('xyznothing');
  204 |     await expect(page.locator('text=Nenhum resultado')).toBeVisible();
  205 | 
  206 |     // Click result → focus + tooltip
  207 |     await input.fill('coração');
  208 |     await page.locator('button:has-text("Tiferet")').click();
  209 |     await expect(input).not.toBeVisible(); // search closes
  210 |     await page.waitForTimeout(600); // animation + tooltip trigger
  211 |     await expect(page.locator('.border-yellow-400\\/50')).toBeVisible();
  212 | 
  213 |     // Close search result tooltip
  214 |     await page.locator('header').click();
  215 | 
  216 |     // Clicking qliphah result switches view
  217 |     await page.locator('button[aria-label="Search"]').click();
  218 |     await page.locator('input[placeholder*="Buscar"]').fill('lilith');
  219 |     await page.locator('button:has-text("Gamaliel")').click();
  220 |     await page.waitForTimeout(400);
  221 |     await expect(page.locator('nav button.bg-red-900\\/40')).toBeVisible();
  222 |   });
  223 | });
  224 | 
```