import { defineConfig, devices } from '@playwright/test';

/**
 * Visual regression testing for the Kabbalah Tree design.
 * 
 * Usage:
 *   1. Start dev server: npm run dev (port 3000)
 *   2. Run tests: npx playwright test --update-snapshots
 *   3. Compare: npx playwright show-report
 * 
 * Or for CI (auto-starts server):
 *   CI=1 npx playwright test
 */
export default defineConfig({
  testDir: './e2e',
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  workers: process.env.CI ? 1 : undefined,
  reporter: 'html',
  use: {
    baseURL: process.env.CI ? 'http://localhost:3000' : 'http://localhost:3000',
    trace: 'on-first-retry',
  },
  projects: [
    {
      name: 'desktop-chromium',
      use: { ...devices['Desktop Chrome'], viewport: { width: 1440, height: 900 } },
    },
    {
      name: 'mobile-iphone',
      use: { ...devices['iPhone 14'] },
    },
  ],
  ...(process.env.CI
    ? {
        webServer: {
          command: 'npm run build && npm start',
          url: 'http://localhost:3000',
          reuseExistingServer: false,
          timeout: 120000,
        },
      }
    : {}),
});
