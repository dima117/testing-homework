const { assert } = require("chai");

describe("Тесты требований к корзине", async function () {
  it("Кнопка очистки корзины работает", async function ({ browser }) {
    await browser.setWindowSize(1366, 768);

    const catalogItemsMock = await browser.mock("**/hw/store/api/products");
    await catalogItemsMock.respond(
      '[{"id":0,"name":"TestItemMocked","price":10}, {"id":1,"name":"TestItemMocked2","price":15}]'
    );

    const catalogItemMock = await browser.mock("**/hw/store/api/products/0");
    await catalogItemMock.respond(
      '{"id":0,"name":"TestItemMocked","description":"TestItemDesc","price":10,"color":"TestItemColor","material":"TestItemMaterial"}'
    );

    await browser.url("/hw/store/catalog");

    await browser.url("/hw/store/catalog/0");
    const testItemAddCart = await browser.$(".ProductDetails-AddToCart");
    await testItemAddCart.waitForExist();
    await testItemAddCart.click();

    await browser.url("/hw/store/cart");

    const cartTable = await browser.$(".Cart-Table");
    await cartTable.waitForExist();
    const cartClearButton = await browser.$(".Cart-Clear");
    await cartClearButton.waitForExist();
    await cartClearButton.click();
    assert.isNotOk(
      await cartTable.isExisting(),
      "Таблица с элементами заказа не пропадает"
    );
  });

  it("Отображается верное количество не повторяющихся товаров в шапке рядом со ссылкой на корзину", async function ({
    browser,
  }) {
    await browser.setWindowSize(1366, 768);
    await browser.url("/hw/store/cart");

    const navBarActive = await browser.$(".navbar-nav > .nav-link.active");
    await navBarActive.waitForExist();
    const navBarActiveText = await navBarActive.getText();
    if (navBarActiveText.includes("(")) {
      const cartClearButton = await browser.$(".Cart-Clear");
      await cartClearButton.waitForExist();
      await cartClearButton.click();
    }

    const catalogItemsMock = await browser.mock("**/hw/store/api/products");
    await catalogItemsMock.respond(
      '[{"id":0,"name":"TestItemMocked","price":10}, {"id":1,"name":"TestItemMocked2","price":15}]'
    );

    const catalogItemMock = await browser.mock("**/hw/store/api/products/0");
    await catalogItemMock.respond(
      '{"id":0,"name":"TestItemMocked","description":"TestItemDesc","price":10,"color":"TestItemColor","material":"TestItemMaterial"}'
    );

    const catalogItemMockSecond = await browser.mock(
      "**/hw/store/api/products/1"
    );
    await catalogItemMockSecond.respond(
      '{"id":1,"name":"TestItemMocked2","description":"TestItemDesc","price":16,"color":"TestItemColor","material":"TestItemMaterial"}'
    );

    await browser.url("/hw/store/catalog/0");
    const testItemAddCart = await browser.$(".ProductDetails-AddToCart");
    await testItemAddCart.waitForExist();
    await testItemAddCart.click();
    await testItemAddCart.click();

    await browser.url("/hw/store/cart");
    const navActiveTab = await browser.$(".nav-link.active");
    await navActiveTab.waitForExist();
    const navActiveTabTextPrev = await navActiveTab.getText();

    assert.equal(
      await navActiveTabTextPrev.slice(-2, -1),
      "1",
      "Некорректное отображение предметов в корзине"
    );

    await browser.url("/hw/store/catalog/1");
    await testItemAddCart.waitForExist();
    await testItemAddCart.click();
    await testItemAddCart.click();

    await browser.url("/hw/store/cart");
    await navActiveTab.waitForExist();
    const navActiveTabTextCurrent = await navActiveTab.getText();

    assert.equal(
      await navActiveTabTextCurrent.slice(-2, -1),
      "2",
      "Некорректное отображение предметов в корзине"
    );
  });

  it("В корзине отображается таблица с добавленными в нее товарами", async function ({
    browser,
  }) {
    await browser.setWindowSize(1366, 768);
    await browser.url("/hw/store/cart");

    const navBarActive = await browser.$(".navbar-nav > .nav-link.active");
    await navBarActive.waitForExist();
    const navBarActiveText = await navBarActive.getText();
    if (navBarActiveText.includes("(")) {
      const cartClearButton = await browser.$(".Cart-Clear");
      await cartClearButton.waitForExist();
      await cartClearButton.click();
    }

    const catalogItemsMock = await browser.mock("**/hw/store/api/products");
    await catalogItemsMock.respond(
      '[{"id":0,"name":"TestItemMocked","price":10}, {"id":1,"name":"TestItemMocked2","price":15}]'
    );

    const catalogItemMock = await browser.mock("**/hw/store/api/products/0");
    await catalogItemMock.respond(
      '{"id":0,"name":"TestItemMocked","description":"TestItemDesc","price":10,"color":"TestItemColor","material":"TestItemMaterial"}'
    );

    const catalogItemMockSecond = await browser.mock(
      "**/hw/store/api/products/1"
    );
    await catalogItemMockSecond.respond(
      '{"id":1,"name":"TestItemMocked2","description":"TestItemDesc","price":16,"color":"TestItemColor","material":"TestItemMaterial"}'
    );

    let cartElements = [];
    await browser.url("/hw/store/catalog/0");
    const testItemAddCart = await browser.$(".ProductDetails-AddToCart");
    cartElements.push(await browser.$(".ProductDetails-Name").getText());
    await testItemAddCart.waitForExist();
    await testItemAddCart.click();
    await testItemAddCart.click();

    await browser.url("/hw/store/catalog/1");
    cartElements.push(await browser.$(".ProductDetails-Name").getText());
    await testItemAddCart.waitForExist();
    await testItemAddCart.click();
    await testItemAddCart.click();

    await browser.url("/hw/store/cart");
    const cartTable = await browser.$(".Cart-Table.table");
    await cartTable.waitForExist({
      timeoutMsg: "Таблица с товарами не появилась",
    });

    const cartTableItems = await cartTable.$$(".Cart-Name");
    for (let i = 0; i < cartTableItems.length; i++) {
      const el = await cartTableItems[i];
      assert.equal(
        await el.getText(),
        await cartElements[i],
        "Таблица появляется, но элементы не совпадают"
      );
    }
  });

  it("Товар в корзине имеет необходимые поля", async function ({ browser }) {
    await browser.setWindowSize(1366, 768);
    await browser.url("/hw/store/cart");

    const navBarActive = await browser.$(".navbar-nav > .nav-link.active");
    await navBarActive.waitForExist();
    const navBarActiveText = await navBarActive.getText();
    if (navBarActiveText.includes("(")) {
      const cartClearButton = await browser.$(".Cart-Clear");
      await cartClearButton.waitForExist();
      await cartClearButton.click();
    }

    const catalogItemsMock = await browser.mock("**/hw/store/api/products");
    await catalogItemsMock.respond(
      '[{"id":0,"name":"TestItemMocked","price":10}, {"id":1,"name":"TestItemMocked2","price":15}]'
    );

    const catalogItemMock = await browser.mock("**/hw/store/api/products/0");
    await catalogItemMock.respond(
      '{"id":0,"name":"TestItemMocked","description":"TestItemDesc","price":10,"color":"TestItemColor","material":"TestItemMaterial"}'
    );

    await browser.url("/hw/store/catalog/0");
    const testItemAddCart = await browser.$(".ProductDetails-AddToCart");
    await testItemAddCart.waitForExist();
    await testItemAddCart.click();

    await browser.url("/hw/store/cart");

    const cartTable = await browser.$(".Cart-Table.table");
    await cartTable.waitForExist({
      timeoutMsg: "Таблица с товарами не появилась",
    });
    const cartTableItem = await cartTable.$$("tbody > tr")[0];
    const cartTableItemName = await cartTableItem.$(".Cart-Name");
    await cartTableItemName.waitForExist({
      timeoutMsg: "Название товара отсутствует в корзине",
    });
    const cartTableItemPrice = await cartTableItem.$(".Cart-Price");
    await cartTableItemPrice.waitForExist({
      timeoutMsg: "Цена товара отсутствует в корзине",
    });
    const cartTableItemAmount = await cartTableItem.$(".Cart-Count");
    await cartTableItemAmount.waitForExist({
      timeoutMsg: "Количество товара отсутствует в корзине",
    });
    const cartTableItemTotal = await cartTableItem.$(".Cart-Total");
    await cartTableItemTotal.waitForExist({
      timeoutMsg: "Общая стоимость товара отсутствует в корзине",
    });
    const cartTableOrderPrice = await cartTable.$(".Cart-OrderPrice");
    await cartTableOrderPrice.waitForExist({
      timeoutMsg: "Общая стоимость заказа отсутствует в корзине",
    });
  });

  it("Если корзина пустая - отображается ссылка на каталог", async function ({
    browser,
  }) {
    await browser.setWindowSize(1366, 768);
    await browser.url("/hw/store/cart");

    const navBarActive = await browser.$(".navbar-nav > .nav-link.active");
    await navBarActive.waitForExist();
    const navBarActiveText = await navBarActive.getText();
    if (navBarActiveText.includes("(")) {
      const cartClearButton = await browser.$(".Cart-Clear");
      await cartClearButton.waitForExist();
      await cartClearButton.click();
    }

    const colElement = await browser.$(".col");
    await colElement.waitForExist();

    const colCatalogLink = await colElement.$("a");
    await colCatalogLink.waitForExist({
      timeoutMsg: "Ссылки на каталог не существует",
    });
    const colCatalogLinkDisplayed = await colCatalogLink.isDisplayed();
    const colCatalogLinkHref = await colCatalogLink.getAttribute("href");
    assert.isOk(colCatalogLinkDisplayed, "Ссылка на каталог не отображается");
    assert.equal(
      colCatalogLinkHref,
      "/hw/store/catalog",
      "Ссылка на каталог неверна"
    );
  });
});
