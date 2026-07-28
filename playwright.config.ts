import { defineConfig, devices } from '@playwright/test';

/**
 * Playwright Test Configuration.
 * 
 * Tests are split into desktop.spec.ts and mobile.spec.ts.
 * Each spec sets its own viewport/touch config, so we only need one project (Chromium).
 * 
 * Running:
 *   npm test              — all tests
 *   npm run test:headed   — with browser visible
 *   npm run test:ui       — interactive Playwright UI
 */
export default defineConfig({
  testDir: './e2e',
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 1 : 0,
  workers: process.env.CI ? 1 : undefined,
  reporter: process.env.CI ? [['html'], ['github']] : 'html',
  timeout: 30000,
  expect: {
    timeout: 5000,
  },
  use: {
    baseURL: 'http://localhost:3000',
    trace: 'on-first-retry',
    screenshot: 'only-on-failure',
    ...devices['Desktop Chrome'],
  },
  webServer: {
    command: process.env.CI ? 'npm start' : 'npm run dev',
    url: 'http://localhost:3000',
    reuseExistingServer: !process.env.CI,
    timeout: 120000,
  },
});
