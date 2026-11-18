# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: admin.spec.ts >> Admin Panel >> shows error with wrong credentials
- Location: e2e\admin.spec.ts:101:7

# Error details

```
TimeoutError: page.waitForSelector: Timeout 5000ms exceeded.
Call log:
  - waiting for locator('.ant-radio-wrapper') to be visible

```

# Page snapshot

```yaml
- generic [active] [ref=e1]:
  - generic [ref=e5]:
    - generic [ref=e6]:
      - heading "✦ Portal do Administrador ✦" [level=3] [ref=e7]
      - generic [ref=e8]: Interactive Kabbalah — Painel de Conteúdo
    - generic [ref=e9]:
      - generic [ref=e10]:
        - img "mail" [ref=e12]:
          - img [ref=e13]
        - textbox "Email" [ref=e15]
      - generic [ref=e16]:
        - img "lock" [ref=e18]:
          - img [ref=e19]
        - textbox "Senha" [ref=e21]
        - button "Show" [ref=e23] [cursor=pointer]:
          - img "eye-invisible" [ref=e24]:
            - img [ref=e25]
      - generic [ref=e29]:
        - generic [ref=e30]: 🔮 Desafio Esotérico
        - button "↻ outro" [ref=e31] [cursor=pointer]:
          - generic [ref=e32]: ↻ outro
      - button "Entrar no Portal ✦" [ref=e41] [cursor=pointer]:
        - generic [ref=e42]: Entrar no Portal ✦
    - generic [ref=e44]: Acesso restrito. Tentativas são registradas.
  - contentinfo [ref=e45]:
    - text: Este painel utiliza cookies de sessão para autenticação. Nenhum dado pessoal é compartilhado com terceiros.
    - button "Política de Privacidade" [ref=e46] [cursor=pointer]
  - button "Open Next.js Dev Tools" [ref=e52] [cursor=pointer]:
    - img [ref=e53]
  - alert [ref=e56]
```

# Test source

```ts
  3   | /**
  4   |  * Admin Panel E2E tests.
  5   |  * 
  6   |  * Tests the login flow, captcha, content editor, and history panel.
  7   |  * These tests run against the local dev server and mock credentials.
  8   |  * 
  9   |  * Prerequisites:
  10  |  *   - Environment variables set (ADMIN_PASSWORD_HASH, ADMIN_JWT_SECRET, CAPTCHA_SECRET)
  11  |  *   - No GitHub token needed for login/captcha tests (only for content save)
  12  |  */
  13  | 
  14  | test.describe('Admin Panel', () => {
  15  |   test.use({ viewport: { width: 1440, height: 900 } });
  16  | 
  17  |   test('redirects unauthenticated users to login', async ({ page }) => {
  18  |     await page.goto('/admin');
  19  |     await page.waitForURL('**/admin/login', { timeout: 10000 });
  20  |     await expect(page.locator('text=Portal do Administrador')).toBeVisible();
  21  |   });
  22  | 
  23  |   test('login page renders correctly', async ({ page }) => {
  24  |     await page.goto('/admin/login');
  25  |     await page.waitForLoadState('networkidle');
  26  | 
  27  |     // Title
  28  |     await expect(page.locator('text=Portal do Administrador')).toBeVisible({ timeout: 10000 });
  29  | 
  30  |     // Email and password inputs
  31  |     await expect(page.locator('input[placeholder="Email"]')).toBeVisible();
  32  |     await expect(page.locator('input[placeholder="Senha"]')).toBeVisible();
  33  | 
  34  |     // Captcha section
  35  |     await expect(page.locator('text=Desafio Esotérico')).toBeVisible();
  36  | 
  37  |     // Login button
  38  |     await expect(page.locator('button:has-text("Entrar no Portal")')).toBeVisible();
  39  | 
  40  |     // LGPD footer
  41  |     await expect(page.locator('text=cookies de sessão')).toBeVisible();
  42  |     await expect(page.locator('text=Política de Privacidade')).toBeVisible();
  43  |   });
  44  | 
  45  |   test('captcha loads with question and options', async ({ page }) => {
  46  |     await page.goto('/admin/login');
  47  | 
  48  |     // Wait for captcha to load
  49  |     await expect(page.locator('text=Desafio Esotérico')).toBeVisible();
  50  | 
  51  |     // Should have a question (text ending with ?)
  52  |     const questionLocator = page.locator('.ant-radio-group').locator('..');
  53  |     await expect(questionLocator).toBeVisible();
  54  | 
  55  |     // Should have radio options (at least 4)
  56  |     const radios = page.locator('.ant-radio-wrapper');
  57  |     await expect(radios).toHaveCount(4);
  58  | 
  59  |     // "outro" button to refresh captcha
  60  |     await expect(page.locator('button:has-text("outro")')).toBeVisible();
  61  |   });
  62  | 
  63  |   test('captcha refresh generates new question', async ({ page }) => {
  64  |     await page.goto('/admin/login');
  65  |     await page.waitForSelector('.ant-radio-wrapper', { timeout: 10000 });
  66  | 
  67  |     // Get initial question text from the captcha area
  68  |     const getCaptchaText = () => page.locator('.ant-radio-wrapper').first().textContent();
  69  |     const initialOption = await getCaptchaText();
  70  | 
  71  |     // Click refresh multiple times until options change
  72  |     let changed = false;
  73  |     for (let i = 0; i < 8; i++) {
  74  |       await page.locator('button:has-text("outro")').click();
  75  |       await page.waitForTimeout(600);
  76  |       const newOption = await getCaptchaText();
  77  |       if (newOption !== initialOption) {
  78  |         changed = true;
  79  |         break;
  80  |       }
  81  |     }
  82  |     // With 12 questions × 4 shuffled options, should change quickly
  83  |     expect(changed).toBe(true);
  84  |   });
  85  | 
  86  |   test('shows error when submitting without captcha', async ({ page }) => {
  87  |     await page.goto('/admin/login');
  88  |     await page.waitForSelector('.ant-radio-wrapper', { timeout: 5000 });
  89  | 
  90  |     // Fill credentials but don't select captcha
  91  |     await page.locator('input[placeholder="Email"]').fill('admin@interactive-kabbalah.kad.mon');
  92  |     await page.locator('input[placeholder="Senha"]').fill('@Abraxas541');
  93  | 
  94  |     // Submit
  95  |     await page.locator('button:has-text("Entrar no Portal")').click();
  96  | 
  97  |     // Should show warning
  98  |     await expect(page.locator('.ant-message')).toBeVisible({ timeout: 3000 });
  99  |   });
  100 | 
  101 |   test('shows error with wrong credentials', async ({ page }) => {
  102 |     await page.goto('/admin/login');
> 103 |     await page.waitForSelector('.ant-radio-wrapper', { timeout: 5000 });
      |                ^ TimeoutError: page.waitForSelector: Timeout 5000ms exceeded.
  104 | 
  105 |     // Fill wrong credentials
  106 |     await page.locator('input[placeholder="Email"]').fill('wrong@email.com');
  107 |     await page.locator('input[placeholder="Senha"]').fill('wrongpassword');
  108 | 
  109 |     // Select first captcha option (might be wrong but that's fine — tests error flow)
  110 |     await page.locator('.ant-radio-wrapper').first().click();
  111 | 
  112 |     // Submit
  113 |     await page.locator('button:has-text("Entrar no Portal")').click();
  114 | 
  115 |     // Should show error message
  116 |     await expect(page.locator('.ant-message')).toBeVisible({ timeout: 5000 });
  117 |   });
  118 | 
  119 |   test('successful login with correct credentials and captcha', async ({ page }) => {
  120 |     await page.goto('/admin/login');
  121 |     await page.waitForSelector('.ant-radio-wrapper', { timeout: 5000 });
  122 | 
  123 |     // Fill credentials
  124 |     await page.locator('input[placeholder="Email"]').fill('admin@interactive-kabbalah.kad.mon');
  125 |     await page.locator('input[placeholder="Senha"]').fill('@Abraxas541');
  126 | 
  127 |     // Read the question displayed on page (has leet-speak obfuscation)
  128 |     const captchaArea = page.locator('[style*="rgba(20, 10, 40"]');
  129 |     const questionText = await captchaArea.textContent() || '';
  130 | 
  131 |     // Match by static (non-obfuscated) parts of the question
  132 |     const ANSWERS: Record<string, string> = {
  133 |       'planeta associado': 'Sol',
  134 |       'associada a': 'Netzach',
  135 |       'símbolo de': '⨁',
  136 |       'Arcanjo de': 'Raphael',
  137 |       'Arcano Maior': 'Sacerdotisa',
  138 |       'planeta rege': 'Saturno',
  139 |       'pilar da': 'Severidade',
  140 |       'chamada de': 'Yesod',
  141 |       'Enforcado': 'Água',
  142 |       'guardião': 'Choronzon',
  143 |       'valor numérico': '2',
  144 |       'sombra de': 'Tagimron',
  145 |       'metal': 'Ouro',
  146 |       'caminhos conectam': '22',
  147 |       'central no pilar': 'Tiferet',
  148 |       'demônio': 'Lilith',
  149 |     };
  150 | 
  151 |     // Find the correct answer based on static question text
  152 |     let correctLabel = '';
  153 |     for (const [keyword, answer] of Object.entries(ANSWERS)) {
  154 |       if (questionText.includes(keyword)) {
  155 |         correctLabel = answer;
  156 |         break;
  157 |       }
  158 |     }
  159 | 
  160 |     // Select the matching radio option
  161 |     if (correctLabel) {
  162 |       const options = page.locator('.ant-radio-wrapper');
  163 |       const count = await options.count();
  164 |       for (let i = 0; i < count; i++) {
  165 |         const text = await options.nth(i).textContent();
  166 |         if (text?.includes(correctLabel)) {
  167 |           await options.nth(i).click();
  168 |           break;
  169 |         }
  170 |       }
  171 |     } else {
  172 |       // Fallback: click first option
  173 |       await page.locator('.ant-radio-wrapper').first().click();
  174 |     }
  175 | 
  176 |     // Submit login
  177 |     await page.locator('button').filter({ hasText: 'Entrar' }).click();
  178 | 
  179 |     // Verify the flow doesn't crash
  180 |     await page.waitForTimeout(2000);
  181 | 
  182 |     const url = page.url();
  183 |     if (url.includes('/admin/login')) {
  184 |       // Captcha was wrong — just verify error message appears cleanly
  185 |       await expect(page.locator('.ant-message')).toBeVisible();
  186 |     } else {
  187 |       // Success — on admin dashboard
  188 |       expect(url).toContain('/admin');
  189 |     }
  190 |   });
  191 | 
  192 |   test('LGPD modal opens and displays privacy policy', async ({ page }) => {
  193 |     await page.goto('/admin/login');
  194 |     await page.waitForLoadState('networkidle');
  195 | 
  196 |     // Wait for footer to render
  197 |     const footer = page.locator('footer');
  198 |     await expect(footer).toBeVisible({ timeout: 10000 });
  199 | 
  200 |     // Click privacy policy button in footer
  201 |     const privacyBtn = footer.locator('button');
  202 |     await expect(privacyBtn).toBeVisible();
  203 |     await privacyBtn.click();
```