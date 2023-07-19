const { assert } = require('chai');

async function checkScreenshot(browser, width, height) {
    const puppeteer = await browser.getPuppeteer();
    const [page] = await puppeteer.pages();

    await page.setViewport({
        width,
        height,
    })
    await page.goto('http://localhost:3000/hw/store');
    await browser.assertView('plain', '.Application', {
        screenshotDelay: 3000
    });
}

describe('Интеграционные тесты для проверки общих требований', () => {
    it('Вёрстка должна быть корректной при 1920px', async ({ browser }) => {
        await checkScreenshot(browser, 1920, 1080);
    })

    it('Вёрстка должна быть корректной при 1440px', async ({ browser }) => {
        await checkScreenshot(browser, 1440, 900);
    })

    it('Вёрстка должна быть корректной при 1024px', async ({ browser }) => {
        await checkScreenshot(browser, 1024, 768);
    })

    it('Вёрстка должна быть корректной при 640px', async ({ browser }) => {
        await checkScreenshot(browser, 640, 480);
    })

    it('Вёрстка должна быть корректной при 320px', async ({ browser }) => {
        await checkScreenshot(browser, 320, 1283);
    })
})
