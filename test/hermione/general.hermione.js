const { assert } = require("chai");

describe("Тесты общих требований", async function () {
  describe("Интерфейс адаптируется под ширину экрана", async function () {
    it("Гамбургер-меню появляется при ширине меньше 576px", async function ({
      browser,
    }) {
      await browser.setWindowSize(500, 1000);
      await browser.url("/hw/store");

      const appToggler = await browser.$(".Application-Toggler");
      await appToggler.waitForExist();
      const appTogglerDisplay = await appToggler.isDisplayed();
      assert.notEqual(appTogglerDisplay, 0, "гамбургер-меню не появляется");
    });
    it("Меню ссылок скрывается при ширине меньше 576px", async function ({
      browser,
    }) {
      await browser.setWindowSize(500, 1000);
      await browser.url("/hw/store");

      const appMenu = await browser.$(".Application-Menu");
      await appMenu.waitForExist();
      const appMenuDisplay = await appMenu.isDisplayed();
      assert.equal(appMenuDisplay, 0, "меню ссылок не скрывается");
    });
    it("Ширина элементов меняется меньше 576px", async function ({ browser }) {
      await browser.setWindowSize(1366, 768);
      await browser.url("/hw/store");

      const appContent = await browser.$(".container.pt-4");
      await appContent.waitForExist();
      const prevWidth = await appContent.getSize("width");

      await browser.setWindowSize(500, 1000);
      const currentWidth = await appContent.getSize("width");
      assert.isBelow(currentWidth, prevWidth, "меню ссылок не скрывается");
    });
  });

  it("Гамбургер-меню закрывается при выборе элемента", async function ({
    browser,
  }) {
    await browser.setWindowSize(500, 1080);
    await browser.url("/hw/store/");

    const appMenu = await browser.$(".Application-Menu");
    await appMenu.waitForExist();

    const appToggler = await browser.$(".Application-Toggler");
    await appToggler.waitForExist();

    await appToggler.click();

    const link = await appMenu.$$(".nav-link")[0];
    await link.waitForExist();

    await link.click();
    const appMenuClasses = await appMenu.getAttribute("class");
    const appMenuCollapse = appMenuClasses.split(" ").includes("collapse");
    assert.notEqual(appMenuCollapse, false, "Меню не закрывается");
  });

  it("Ссылки в шапке отображаются", async function ({ browser }) {
    await browser.setWindowSize(1980, 1080);
    await browser.url("/hw/store");
    const linkBox = await browser.$(".navbar-nav");
    await linkBox.waitForExist();
    const links = await linkBox.$$(".nav-link");
    for (let index = 0; index < links.length; index++) {
      const element = links[index];
      const elDisplay = await element.isDisplayed();
      assert.notEqual(
        elDisplay,
        false,
        `Ссылка номер ${index + 1} (${await element.getText()}) не отображается`
      );
    }
  });
  it("Нажатие по заголовку перенаправляет на главную страницу", async function ({
    browser,
  }) {
    await browser.url("/hw/store/cart");
    const brandTitle = await browser.$(".Application-Brand");
    await brandTitle.waitForExist();

    await brandTitle.click();

    assert.equal(
      await browser.getUrl(),
      "http://localhost:3000/hw/store/",
      "Заголовок не перенаправляет на главную страницу"
    );
  });
});
