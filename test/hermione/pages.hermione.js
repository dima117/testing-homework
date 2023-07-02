const { assert } = require("chai");

describe("Тесты требований к страницам", async function () {
  describe("Проверка страниц на статическое содержание", async function () {
    it("Главная страница имеет статическое содержание", async function ({
      browser,
    }) {
      await browser.setWindowSize(1366, 768);
      await browser.url("/hw/store/");
      await browser.assertView("home", ".Application", {
        compositeImage: true,
        ignoreElements: [".navbar > .container"],
      });
    });
    it("Страница доставки имеет статическое содержание", async function ({
      browser,
    }) {
      await browser.setWindowSize(1366, 768);
      await browser.url("/hw/store/delivery");
      await browser.assertView("delivery", ".Application", {
        compositeImage: true,
        ignoreElements: [".navbar > .container"],
      });
    });
    it("Страница с контактами имеет статическое содержание", async function ({
      browser,
    }) {
      await browser.setWindowSize(1366, 768);
      await browser.url("/hw/store/contacts");
      await browser.assertView("contacts", ".Application", {
        compositeImage: true,
        ignoreElements: [".navbar > .container"],
      });
    });
  });
  it("Страницы: главная, каталог, условия доставки, контакты существуют", async function ({
    browser,
  }) {
    await browser.setWindowSize(1366, 768);

    await browser.url("/hw/store/delivery");
    const appDelivery = await browser.$(".Application");
    await appDelivery.waitForExist({
      timeoutMsg: "Страницы с условиям доставки не существует",
    });

    await browser.url("/hw/store/catalog");
    const appCatalog = await browser.$(".Application");
    await appCatalog.waitForExist({
      timeoutMsg: "Страницы с каталогом не существует",
    });

    await browser.url("/hw/store/contacts");
    const appContacts = await browser.$(".Application");
    await appContacts.waitForExist({
      timeoutMsg: "Страницы с контактами не существует",
    });

    await browser.url("/hw/store/");
    const appHome = await browser.$(".Application");
    await appHome.waitForExist({
      timeoutMsg: "Главной страницы не существует",
    });
  });
});
