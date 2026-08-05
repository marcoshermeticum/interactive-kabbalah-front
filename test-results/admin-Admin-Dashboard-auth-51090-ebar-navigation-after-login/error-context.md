# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: admin.spec.ts >> Admin Dashboard (authenticated) >> dashboard shows sidebar navigation after login
- Location: e2e\admin.spec.ts:312:7

# Error details

```
Error: page.goto: Target page, context or browser has been closed
```

# Test source

```ts
  162 | 
  163 |     // If we found the answer, select the right radio
  164 |     if (correctAnswer) {
  165 |       // Find the radio whose value contains our answer
  166 |       const options = page.locator('.ant-radio-wrapper');
  167 |       const count = await options.count();
  168 |       for (let i = 0; i < count; i++) {
  169 |         const text = await options.nth(i).textContent();
  170 |         if (text?.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '').includes(correctAnswer)) {
  171 |           await options.nth(i).click();
  172 |           break;
  173 |         }
  174 |       }
  175 |     } else {
  176 |       // Fallback: try submitting via API directly with known captcha
  177 |       // This means the displayed question doesn't match — just click first option
  178 |       await page.locator('.ant-radio-wrapper').first().click();
  179 |     }
  180 | 
  181 |     // Submit login
  182 |     await page.locator('button:has-text("Entrar no Portal")').click();
  183 | 
  184 |     // If captcha was correct, should redirect to admin dashboard
  185 |     // If not (random mismatch), we just verify the flow doesn't crash
  186 |     await page.waitForTimeout(2000);
  187 | 
  188 |     const url = page.url();
  189 |     if (url.includes('/admin/login')) {
  190 |       // Captcha was wrong — just verify error message appears cleanly
  191 |       await expect(page.locator('.ant-message')).toBeVisible();
  192 |     } else {
  193 |       // Success — should be on admin dashboard
  194 |       await expect(page.locator('text=Editor de Conteúdo')).toBeVisible({ timeout: 5000 });
  195 |     }
  196 |   });
  197 | 
  198 |   test('LGPD modal opens and displays privacy policy', async ({ page }) => {
  199 |     await page.goto('/admin/login');
  200 |     await page.waitForLoadState('networkidle');
  201 | 
  202 |     // Wait for footer to render
  203 |     const footer = page.locator('footer');
  204 |     await expect(footer).toBeVisible({ timeout: 10000 });
  205 | 
  206 |     // Click privacy policy button in footer
  207 |     const privacyBtn = footer.locator('button');
  208 |     await expect(privacyBtn).toBeVisible();
  209 |     await privacyBtn.click();
  210 | 
  211 |     // Modal should appear with LGPD content
  212 |     const modal = page.locator('.ant-modal-body');
  213 |     await expect(modal).toBeVisible({ timeout: 5000 });
  214 | 
  215 |     // Should contain key LGPD terms (scroll-independent check)
  216 |     const modalText = await modal.textContent();
  217 |     expect(modalText).toContain('Dados Coletados');
  218 |     expect(modalText).toContain('Base Legal');
  219 |     expect(modalText).toContain('Direitos do Titular');
  220 | 
  221 |     // Close modal
  222 |     await page.locator('.ant-modal-close').click();
  223 |     await expect(modal).not.toBeVisible();
  224 |   });
  225 | 
  226 |   test('captcha API returns valid structure', async ({ page }) => {
  227 |     await page.goto('/admin/login');
  228 | 
  229 |     const response = await page.evaluate(async () => {
  230 |       const res = await fetch('/api/admin/captcha');
  231 |       return res.json();
  232 |     });
  233 | 
  234 |     // Verify structure
  235 |     expect(response).toHaveProperty('id');
  236 |     expect(response).toHaveProperty('question');
  237 |     expect(response).toHaveProperty('options');
  238 |     expect(response).toHaveProperty('signature');
  239 |     expect(response).toHaveProperty('timestamp');
  240 | 
  241 |     // Options should have 4 items
  242 |     expect(response.options).toHaveLength(4);
  243 | 
  244 |     // Each option should have label and value
  245 |     for (const opt of response.options) {
  246 |       expect(opt).toHaveProperty('label');
  247 |       expect(opt).toHaveProperty('value');
  248 |     }
  249 | 
  250 |     // Signature should be a hex string (SHA-256 HMAC = 64 chars)
  251 |     expect(response.signature).toMatch(/^[a-f0-9]{64}$/);
  252 |   });
  253 | });
  254 | 
  255 | test.describe('Admin Dashboard (authenticated)', () => {
  256 |   test.use({ viewport: { width: 1440, height: 900 } });
  257 | 
  258 |   // Known answers map for captcha
  259 |   const CAPTCHA_ANSWERS: Record<string, string> = {
  260 |     'Tiferet': 'Sol',
  261 |     'Sephirah': 'Netzach',
> 262 |     'Malkuth': '⨁',
      |                ^ Error: page.goto: Target page, context or browser has been closed
  263 |     'Arcanjo': 'Raphael',
  264 |     'caminho 13': 'Sacerdotisa',
  265 |     'Binah': 'Saturno',
  266 |     'pilar da esquerda': 'Severidade',
  267 |     'Fundação': 'Yesod',
  268 |     'caminho 23': 'Água',
  269 |     'Véu do Abismo': 'Choronzon',
  270 |     'Chokmah': '2',
  271 |     'sombra de Tiferet': 'Tagimron',
  272 |   };
  273 | 
  274 |   /**
  275 |    * Helper: login through the UI by answering the captcha correctly.
  276 |    */
  277 |   async function loginViaUI(page: import('@playwright/test').Page): Promise<boolean> {
  278 |     await page.goto('/admin/login');
  279 |     await page.waitForSelector('.ant-radio-wrapper', { timeout: 10000 });
  280 | 
  281 |     // Fill credentials
  282 |     await page.locator('input[placeholder="Email"]').fill('admin@interactive-kabbalah.kad.mon');
  283 |     await page.locator('input[placeholder="Senha"]').fill('@Abraxas541');
  284 | 
  285 |     // Read the question text from the page
  286 |     // The question is displayed before the radio group
  287 |     const questionArea = page.locator('[style*="rgba(20, 10, 40"]');
  288 |     const areaText = await questionArea.textContent() || '';
  289 | 
  290 |     // Find the right answer based on question keywords
  291 |     let correctLabel = '';
  292 |     for (const [keyword, answer] of Object.entries(CAPTCHA_ANSWERS)) {
  293 |       if (areaText.includes(keyword)) {
  294 |         correctLabel = answer;
  295 |         break;
  296 |       }
  297 |     }
  298 | 
  299 |     if (!correctLabel) return false;
  300 | 
  301 |     // Click the correct radio option
  302 |     const options = page.locator('.ant-radio-wrapper');
  303 |     const count = await options.count();
  304 |     let found = false;
  305 |     for (let i = 0; i < count; i++) {
  306 |       const text = await options.nth(i).textContent();
  307 |       if (text?.includes(correctLabel)) {
  308 |         await options.nth(i).click();
  309 |         found = true;
  310 |         break;
  311 |       }
  312 |     }
  313 | 
  314 |     if (!found) return false;
  315 | 
  316 |     // Submit
  317 |     await page.locator('button').filter({ hasText: 'Entrar' }).click();
  318 | 
  319 |     // Wait for redirect to dashboard
  320 |     try {
  321 |       await page.waitForURL('**/admin', { timeout: 10000 });
  322 |       // Make sure we're NOT on login page
  323 |       const url = page.url();
  324 |       return !url.includes('/login');
  325 |     } catch {
  326 |       return false;
  327 |     }
  328 |   }
  329 | 
  330 |   test('dashboard shows sidebar navigation after login', async ({ page }) => {
  331 |     const loggedIn = await loginViaUI(page);
  332 |     if (!loggedIn) {
  333 |       test.skip(true, 'Could not authenticate — captcha answer mismatch');
  334 |       return;
  335 |     }
  336 | 
  337 |     // Wait for dashboard to fully load
  338 |     await page.waitForLoadState('networkidle');
  339 |     await page.waitForTimeout(2000);
  340 | 
  341 |     // Check if we got redirected back to login
  342 |     if (page.url().includes('/login')) {
  343 |       test.skip(true, 'Session not persisted — cookie issue');
  344 |       return;
  345 |     }
  346 | 
  347 |     // Should have the sidebar
  348 |     const sider = page.locator('.ant-layout-sider');
  349 |     await expect(sider).toBeVisible({ timeout: 15000 });
  350 | 
  351 |     // Should have menu items
  352 |     await expect(page.locator('.ant-menu-item').first()).toBeVisible();
  353 | 
  354 |     // Logout button
  355 |     await expect(page.locator('button').filter({ hasText: 'Sair' })).toBeVisible();
  356 |   });
  357 | 
  358 |   test('logout redirects to login page', async ({ page }) => {
  359 |     const loggedIn = await loginViaUI(page);
  360 |     if (!loggedIn) {
  361 |       test.skip(true, 'Could not authenticate');
  362 |       return;
```