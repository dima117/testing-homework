import { basename, baseUrl } from "./config";

describe("header", function () {
  it('На ширине меньше 576px навигационное меню должно скрываться за "гамбургер"', async ({
    browser,
  }) => {
    await browser.setWindowSize(575, 800);
    await browser.url(baseUrl + basename);

    const toggle = await browser.$("[aria-label='Toggle navigation']");
    const menuLinks = await browser.$$("nav a:not(.navbar-brand)");

    await expect(toggle).toBeDisplayedInViewport();
    await expect(menuLinks).not.toBeDisplayedInViewport();
  });

  it('При клике на "гамбургер", меню должно открываться', async ({
    browser,
  }) => {
    await browser.setWindowSize(575, 800);
    await browser.url(baseUrl + basename);

    const toggle = await browser.$("[aria-label='Toggle navigation']");
    const menuLinks = await browser.$$("nav a:not(.navbar-brand)");

    await toggle.click();

    await expect(menuLinks).toBeDisplayedInViewport();
  });

  it('При выборе элемента из меню "гамбургера", меню должно закрываться', async ({
    browser,
  }) => {
    await browser.setWindowSize(575, 800);
    await browser.url(baseUrl + basename);
    const toggle = await browser.$("[aria-label='Toggle navigation']");
    const menuLinks = await browser.$$("nav a:not(.navbar-brand)");

    await toggle.click();
    await menuLinks[0].click();

    // await expect(toggle).toBeDisplayedInViewport();
    // await expect(menuLinks).not.toBeDisplayedInViewport();
    await expect(menuLinks).not.toBeDisplayedInViewport();
  });
});
