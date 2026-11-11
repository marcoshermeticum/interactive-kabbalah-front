import { chromium } from 'playwright';
const browser = await chromium.launch();
const page = await browser.newPage({ viewport: { width: 1280, height: 900 } });
await page.addInitScript(() => { localStorage.setItem('vakinha-campaign-dismissed','true'); localStorage.setItem('kabbalah-guide-read','true'); });
await page.goto('http://localhost:3000/pt-BR/tarot/temperance');
await page.waitForTimeout(2500);
const diag = await page.evaluate(async () => {
  const btn = [...document.querySelectorAll('button')].find((x) => x.textContent.includes('Destacar símbolos'));
  const wrap = btn?.parentElement;
  const cs = wrap ? getComputedStyle(wrap) : null;
  const link = [...document.querySelectorAll('link[rel="stylesheet"]')].find(l => l.href.includes('_next'));
  const css = link ? await (await fetch(link.href)).text() : '';
  return {
    wrapperClass: wrap?.className,
    paddingBottom: cs?.paddingBottom,
    cssHasPb4: /\.pb-4\s*{/.test(css),
    cssHasStarReset: /\*\s*{[^}]*padding:\s*0/.test(css),
    cssLen: css.length,
  };
});
console.log(JSON.stringify(diag, null, 2));
await page.screenshot({ path: 'tmp/check-pb4.png' });
await browser.close();
