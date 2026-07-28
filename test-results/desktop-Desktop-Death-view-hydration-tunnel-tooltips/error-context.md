# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: desktop.spec.ts >> Desktop >> Death view: hydration, tunnel tooltips
- Location: e2e\desktop.spec.ts:112:7

# Error details

```
Error: locator.click: Error: strict mode violation: locator('nav button:has-text("💀")') resolved to 2 elements:
    1) <button class="px-3 py-1.5 text-xs rounded-full transition-all duration-200 font-medium whitespace-nowrap text-white/40 hover:text-white/70">…</button> aka getByRole('button', { name: '💀 Morte' })
    2) <button class="flex-1 flex flex-col items-center gap-0.5 py-1.5 rounded-xl transition-all duration-200 text-white/40">…</button> aka getByText('💀Morte')

Call log:
  - waiting for locator('nav button:has-text("💀")')

```

# Page snapshot

```yaml
- generic [active] [ref=e1]:
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
        - button "Search" [ref=e14]:
          - img [ref=e15]
        - generic [ref=e18]:
          - button "Settings" [ref=e20]:
            - img [ref=e21]
          - button "Toggle theme" [ref=e24]:
            - img [ref=e25]
          - combobox "Select Language" [ref=e27] [cursor=pointer]:
            - option "PT" [selected]
            - option "EN"
          - button "Donate" [ref=e28]:
            - img [ref=e29]
        - generic [ref=e31]:
          - link "GitHub" [ref=e32] [cursor=pointer]:
            - /url: https://github.com/mrviniciux
            - img [ref=e33]
          - link "LinkedIn" [ref=e35] [cursor=pointer]:
            - /url: https://linkedin.com/in/mrviniciux
            - img [ref=e36]
          - link "Instagram" [ref=e38] [cursor=pointer]:
            - /url: https://instagram.com/mrviniciux
            - img [ref=e39]
    - main [ref=e41]:
      - generic [ref=e42]:
        - generic:
          - img
        - generic [ref=e44]:
          - generic [ref=e45]:
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
          - generic [ref=e54]:
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
            - img [ref=e55]
          - generic:
            - img [ref=e81]:
              - generic [ref=e89]: ♆
              - generic [ref=e90]: "1"
              - generic [ref=e92]: Serafins - Metatron
              - generic [ref=e93]: Kether
              - generic [ref=e94]: Coroa
              - generic [ref=e95]: Onipresença
            - img [ref=e99]:
              - generic [ref=e107]: ♄
              - generic [ref=e108]: "3"
              - generic [ref=e110]: Tronos - Tzafquiel
              - generic [ref=e111]: Binah
              - generic [ref=e112]: Entendimento
              - generic [ref=e113]: Onisciência
            - img [ref=e117]:
              - generic [ref=e125]: ♅
              - generic [ref=e126]: "2"
              - generic [ref=e128]: Querubins - Raziel
              - generic [ref=e129]: Chokmah
              - generic [ref=e130]: Sabedoria
              - generic [ref=e131]: Onipotência
            - img [ref=e135]:
              - generic [ref=e143]: ♇
              - generic [ref=e144]: "11"
              - generic [ref=e145]: Daath
              - generic [ref=e146]: Conhecimento
            - img [ref=e150]:
              - generic [ref=e158]: ♂
              - generic [ref=e159]: "5"
              - generic [ref=e161]: Potestades - Camael
              - generic [ref=e162]: Gevurah
              - generic [ref=e163]: Força
            - img [ref=e167]:
              - generic [ref=e175]: ♃
              - generic [ref=e176]: "4"
              - generic [ref=e178]: Dominações - Tzadkiel
              - generic [ref=e179]: Chesed
              - generic [ref=e180]: Misericórdia
            - img [ref=e184]:
              - generic [ref=e192]: ☉
              - generic [ref=e193]: "6"
              - generic [ref=e195]: Virtudes - Raphael
              - generic [ref=e196]: Tiferet
              - generic [ref=e197]: Beleza
            - img [ref=e201]:
              - generic [ref=e209]: ☿
              - generic [ref=e210]: "8"
              - generic [ref=e212]: Arcanjos - Michael
              - generic [ref=e213]: Hod
              - generic [ref=e214]: Glória
            - img [ref=e218]:
              - generic [ref=e226]: ♀
              - generic [ref=e227]: "7"
              - generic [ref=e229]: Principados - Haniel
              - generic [ref=e230]: Netzach
              - generic [ref=e231]: Eternidade
            - img [ref=e235]:
              - generic [ref=e243]: ☽
              - generic [ref=e244]: "9"
              - generic [ref=e246]: Anjos - Gabriel
              - generic [ref=e247]: Yesod
              - generic [ref=e248]: Fundação
            - img [ref=e252]:
              - generic [ref=e260]: ⨁
              - generic [ref=e261]: "10"
              - generic [ref=e263]: Querubins - Sandalfon
              - generic [ref=e264]: Malkuth
              - generic [ref=e265]: Reino
              - generic [ref=e266]: Mundo Material
  - button "Open Next.js Dev Tools" [ref=e272] [cursor=pointer]:
    - img [ref=e273]
  - alert [ref=e276]
```

# Test source

```ts
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
  89  |     await expect(page.locator('.bg-gray-900\\/95:has-text("25")')).toBeVisible();
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
> 120 |     await page.locator('nav button:has-text("💀")').click();
      |                                                     ^ Error: locator.click: Error: strict mode violation: locator('nav button:has-text("💀")') resolved to 2 elements:
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
  200 |     await expect(page.locator('button:has-text("Ain Soph")')).toBeVisible();
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
```