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

async function checkBurgerMenu(browser) {
    const puppeteer = await browser.getPuppeteer();
    const [page] = await puppeteer.pages();

    await page.setViewport({
        width: 575,
        height: 480,
    })
    await page.goto('http://localhost:3000/hw/store');
    await page.waitForSelector('.Application', {
        timeout: 3000
    });
    return page;
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

    it('Hа ширине меньше 576px навигационное меню должно скрываться за "гамбургер"', async ({ browser }) => {
        const page = await checkBurgerMenu(browser);

        const menu = await page.$('.Application-Toggler');
        assert.ok(menu, 'меню не существует');
    })

    it('При выборе элемента из меню "гамбургера", меню должно закрываться', async ({ browser }) => {
        const page = await checkBurgerMenu(browser);

        await page.click('.Application-Toggler');
        await page.click('.nav-link');
        const collapsed = await page.$('.collapse');
        assert.ok(collapsed, 'меню не закрылось');
    })
})
