# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: mobile.spec.ts >> Mobile >> search: open, query, tap result
- Location: e2e\mobile.spec.ts:92:7

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
  85  |     await page.locator('.bg-black\\/50').tap();
  86  |     await page.waitForTimeout(200);
  87  | 
  88  |     // Veils gone
  89  |     await expect(page.locator('[data-ornament-id="veil-abyss"]')).not.toBeVisible();
  90  |   });
  91  | 
  92  |   test('search: open, query, tap result', async ({ page }) => {
  93  |     await page.goto('/pt-BR');
> 94  |     await page.waitForSelector('[data-sephirot-id]', { timeout: 10000 });
      |                ^ TimeoutError: page.waitForSelector: Timeout 10000ms exceeded.
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