# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: desktop.spec.ts >> i18n >> all locales load and display translated UI + ornaments
- Location: e2e\desktop.spec.ts:228:7

# Error details

```
TimeoutError: page.waitForSelector: Timeout 10000ms exceeded.
Call log:
  - waiting for locator('[data-sephirot-id]') to be visible

```

# Page snapshot

```yaml
- generic [ref=e1]:
  - generic [ref=e6] [cursor=pointer]:
    - button "Open Next.js Dev Tools" [ref=e7]:
      - img [ref=e8]
    - generic [ref=e11]:
      - button "Open issues overlay" [ref=e12]:
        - generic [ref=e13]:
          - generic [ref=e14]: "0"
          - generic [ref=e15]: "1"
        - generic [ref=e16]: Issue
      - button "Collapse issues badge" [ref=e17]:
        - img [ref=e18]
  - generic [ref=e20]:
    - banner [ref=e21]:
      - link "Interactive Kabbalah" [ref=e22] [cursor=pointer]:
        - /url: /pt-BR
        - generic [ref=e24]: Interactive Kabbalah
      - generic [ref=e25]:
        - button "Notificações (3 não lidas)" [ref=e26]:
          - img [ref=e27]
        - button "Toggle theme" [ref=e31]:
          - img [ref=e32]
        - combobox "Idioma" [ref=e34] [cursor=pointer]:
          - option "🇧🇷 PT" [selected]
          - option "🇺🇸 EN"
          - option "🇯🇵 JA"
          - option "🇮🇱 HE"
        - button "Menu" [ref=e35]:
          - img [ref=e36]
    - main [ref=e38]:
      - generic [ref=e40]:
        - paragraph [ref=e41]: Portal de Espiritualidade
        - heading "O caminho do meio que você precisava" [level=1] [ref=e42]:
          - text: O
          - emphasis [ref=e43]: caminho do meio
          - text: que você precisava
        - paragraph [ref=e44]: Mapas interativos e ferramentas para sua espiritualidade
      - tablist "Portais" [ref=e47]:
        - tab "Todas" [selected] [ref=e48] [cursor=pointer]
        - tab "Kabbalah" [ref=e49] [cursor=pointer]
        - tab "Óraculo" [ref=e50] [cursor=pointer]
        - tab "Ferramentas" [ref=e51] [cursor=pointer]
      - generic [ref=e54]:
        - link [ref=e55] [cursor=pointer]:
          - /url: /pt-BR/arvore-da-vida
          - article [ref=e56]:
            - img "Árvore da Vida" [ref=e57]
            - generic [ref=e60]:
              - generic [ref=e61]: Kabbalah
              - heading "Árvore da Vida" [level=2] [ref=e62]
              - paragraph [ref=e63]: As 10 Sephirot, 22 caminhos e a Qliphoth em movimento vivo.
              - generic [ref=e64]: Disponível
        - link [ref=e65] [cursor=pointer]:
          - /url: /pt-BR/tarot
          - article [ref=e66]:
            - img "Tarot Rider-Waite" [ref=e67]
            - generic [ref=e70]:
              - generic [ref=e71]: Óraculo
              - heading "Tarot Rider-Waite" [level=2] [ref=e72]
              - paragraph [ref=e73]: Os 22 arcanos maiores do tarot com visualização interativa.
              - generic [ref=e74]: Disponível
        - link [ref=e75] [cursor=pointer]:
          - /url: /pt-BR/simbolos-alquimicos
          - article [ref=e76]:
            - img "Símbolos Alquímicos" [ref=e77]
            - generic [ref=e80]:
              - generic [ref=e81]: Ferramentas
              - heading "Símbolos Alquímicos" [level=2] [ref=e82]
              - paragraph [ref=e83]: Os signos dos elementos, planetas e processos da Grande Obra.
              - generic [ref=e84]: Disponível
  - alert [ref=e85]
  - generic [ref=e86]:
    - generic [ref=e87]: Este site usa armazenamento local para salvar suas preferências (tema, visualização). Nenhum dado pessoal é coletado.
    - button "OK" [ref=e88]
  - dialog "Transmute este projeto em algo maior" [ref=e91]:
    - button "Fechar" [active] [ref=e92] [cursor=pointer]:
      - img [ref=e93]
    - generic [ref=e95]:
      - heading "Transmute este projeto em algo maior" [level=2] [ref=e96]
      - paragraph [ref=e97]: ✦ Plataformização ✦
      - paragraph [ref=e98]: O Interactive Kabbalah está evoluindo para uma plataforma completa de estudo e prática. Sua contribuição financia o desenvolvimento de novas features, servidores e a missão de tornar a sabedoria da Kabbalah acessível a todos.
      - link "Acessar a Vakinha 🔗" [ref=e99] [cursor=pointer]:
        - /url: https://www.vakinha.com.br/vaquinha/interactive-kabbalah-redesign-e-plataformizacao
      - generic [ref=e100]:
        - paragraph [ref=e101]: Chave PIX Vakinha
        - generic [ref=e102]:
          - generic [ref=e103]: 6257640@vakinha.com.br
          - button "📋 Copiar" [ref=e104] [cursor=pointer]
      - paragraph [ref=e105]: Toda contribuição nos aproxima da plataformização. Obrigado! 🙏
```

# Test source

```ts
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
  221 |     await expect(page.locator('nav button.bg-red-900\\/40')).toBeVisible();
  222 |   });
  223 | });
  224 | 
  225 | test.describe('i18n', () => {
  226 |   test.use({ viewport: { width: 1440, height: 900 } });
  227 | 
  228 |   test('all locales load and display translated UI + ornaments', async ({ page }) => {
  229 |     // ── pt-BR (default) ──
  230 |     await page.goto('/pt-BR');
> 231 |     await page.waitForSelector('[data-sephirot-id]', { timeout: 10000 });
      |                ^ TimeoutError: page.waitForSelector: Timeout 10000ms exceeded.
  232 |     await expect(page.locator('text=Vida')).toBeVisible();
  233 |     await expect(page.locator('html')).toHaveAttribute('lang', 'pt-BR');
  234 |     // Veil label should be in Portuguese
  235 |     await expect(page.locator('text=Véu do Abismo')).toBeVisible();
  236 | 
  237 |     // ── en-US ──
  238 |     await page.goto('/en-US');
  239 |     await page.waitForSelector('[data-sephirot-id]', { timeout: 10000 });
  240 |     await expect(page.locator('text=Life')).toBeVisible();
  241 |     // Veil label in English
  242 |     await expect(page.locator('text=Veil of the Abyss')).toBeVisible();
  243 |     // Ain Soph label in English
  244 |     await expect(page.locator('text=AIN SOPH — LIMITLESS — 00')).toBeVisible();
  245 | 
  246 |     // ── ja ──
  247 |     await page.goto('/ja');
  248 |     await page.waitForSelector('[data-sephirot-id]', { timeout: 10000 });
  249 |     await expect(page.locator('text=生命')).toBeVisible();
  250 |     await expect(page.locator('text=深淵のヴェール')).toBeVisible();
  251 | 
  252 |     // ── he (RTL) ──
  253 |     await page.goto('/he');
  254 |     await page.waitForSelector('[data-sephirot-id]', { timeout: 10000 });
  255 |     await expect(page.locator('text=חיים')).toBeVisible();
  256 |     await expect(page.locator('html')).toHaveAttribute('dir', 'rtl');
  257 |     await expect(page.locator('text=מסך התהום')).toBeVisible();
  258 |   });
  259 | 
  260 |   test('sephirot tooltip content is fully translated per locale', async ({ page }) => {
  261 |     // English: hover Kether → should show translated planet, correspondences, archetypes
  262 |     await page.goto('/en-US');
  263 |     await page.waitForSelector('[data-sephirot-id="kether"]', { timeout: 10000 });
  264 |     await page.locator('[data-sephirot-id="kether"]').hover();
  265 |     await page.waitForTimeout(300);
  266 |     const tooltip = page.locator('.bg-gray-900\\/95:has-text("Crown")');
  267 |     await expect(tooltip).toBeVisible();
  268 |     // Planet translated
  269 |     await expect(tooltip).toContainText('Neptune');
  270 |     // Archetypes translated
  271 |     await expect(tooltip).toContainText('Ancient of Days');
  272 |     // Minor Arcana translated
  273 |     await expect(tooltip).toContainText('Ace of Wands');
  274 |     // Correspondences translated (not Portuguese)
  275 |     await expect(tooltip).toContainText('swan');
  276 |     await expect(tooltip).toContainText('diamond');
  277 |     await expect(tooltip).toContainText('skull');
  278 |   });
  279 | 
  280 |   test('language selector switches locale', async ({ page }) => {
  281 |     await page.goto('/pt-BR');
  282 |     await page.waitForSelector('[data-sephirot-id]', { timeout: 10000 });
  283 | 
  284 |     // Switch to English
  285 |     await page.locator('select[aria-label="Select Language"]').selectOption('en-US');
  286 |     await page.waitForSelector('text=Life', { timeout: 5000 });
  287 |     expect(page.url()).toContain('/en-US');
  288 | 
  289 |     // Switch to Japanese
  290 |     await page.locator('select[aria-label="Select Language"]').selectOption('ja');
  291 |     await page.waitForSelector('text=生命', { timeout: 5000 });
  292 |     expect(page.url()).toContain('/ja');
  293 |   });
  294 | });
  295 | 
```