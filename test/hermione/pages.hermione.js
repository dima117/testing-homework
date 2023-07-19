const { assert } = require('chai');

async function checkScreenshot(browser, route) {
  const puppeteer = await browser.getPuppeteer();
  const [page] = await puppeteer.pages();

  await page.setViewport({
    width: 1920,
    height: 1080,
  });
  await page.goto('http://localhost:3000/hw/store' + route);
  await browser.assertView('plain', '.Application', {
    screenshotDelay: 3000
  });
}

describe('Интеграционные тесты для проверки статичных страниц', () => {
  it('Страница доставки соответствует своему содержимому', async ({ browser }) => {
    await checkScreenshot(browser, '/delivery');
  })

  it('Страница контактов соответствует своему содержимому', async ({ browser }) => {
    await checkScreenshot(browser, '/contacts');
  })
})
