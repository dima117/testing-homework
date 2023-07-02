const { assert } = require("chai");

describe("Тесты требований к каталогу", async function () {
  it("Карточка товара имеет нужные элементы", async function ({ browser }) {
    await browser.setWindowSize(1366, 768);
    await browser.url("/hw/store/catalog");

    const testItemCard = await browser.$$(".ProductItem.card.w-100.mb-4")[0];
    await testItemCard.waitForExist({
      timeoutMsg: "Карточки товара не существует",
    });

    const testItemCardImage = await testItemCard.$(".Image.card-img-top");
    await testItemCardImage.waitForExist({
      timeoutMsg: "Картинки карточки не существует",
    });

    const testItemCardBody = await testItemCard.$(".card-body");
    await testItemCardBody.waitForExist({
      timeoutMsg: "Тела карточки не существует",
    });

    const testItemCardTitle = await testItemCardBody.$(
      ".ProductItem-Name.card-title"
    );
    await testItemCardTitle.waitForExist({
      timeoutMsg: "Заголовка карточки не существует",
    });

    const testItemCardPrice = await testItemCardBody.$(
      ".ProductItem-Price.card-text"
    );
    await testItemCardPrice.waitForExist({
      timeoutMsg: "У карточки отсутствует цена",
    });

    const testItemCardLink = await testItemCardBody.$(
      ".ProductItem-DetailsLink.card-link"
    );
    await testItemCardLink.waitForExist({
      timeoutMsg: "У карточки отсутствует ссылки",
    });
  });

  it("Подробная страница карточки имеет нужные элементы", async function ({
    browser,
  }) {
    await browser.setWindowSize(1366, 768);
    await browser.url("/hw/store/catalog/0");

    const testItemCardBody = await browser.$(".ProductDetails.row");
    await testItemCardBody.waitForExist({
      timeoutMsg: "Карточки товара не существует",
    });

    const testItemCardImage = await testItemCardBody.$(".Image");
    await testItemCardImage.waitForExist({
      timeoutMsg: "Картинки карточки не существует",
    });

    const testItemCardTitle = await testItemCardBody.$(".ProductDetails-Name");
    await testItemCardTitle.waitForExist({
      timeoutMsg: "Заголовка карточки не существует",
    });

    const testItemCardPrice = await testItemCardBody.$(".ProductDetails-Price");
    await testItemCardPrice.waitForExist({
      timeoutMsg: "У карточки отсутствует цена",
    });

    const testItemCardDesc = await testItemCardBody.$(
      ".ProductDetails-Description"
    );
    await testItemCardDesc.waitForExist({
      timeoutMsg: "У карточки отсутствует описание",
    });

    const testItemCardButton = await testItemCardBody.$(
      ".ProductDetails-AddToCart"
    );
    await testItemCardButton.waitForExist({
      timeoutMsg: "У карточки отсутствует кнопка добавления в корзину",
    });

    const testItemCardColor = await testItemCardBody.$(".ProductDetails-Color");
    await testItemCardColor.waitForExist({
      timeoutMsg: "У карточки отсутствует описание цвета",
    });

    const testItemCardMaterial = await testItemCardBody.$(
      ".ProductDetails-Material"
    );
    await testItemCardMaterial.waitForExist({
      timeoutMsg: "У карточки отсутствует описание материала",
    });
  });

  it("После добавления элемента в корзину отображается сообщение об этом", async function ({
    browser,
  }) {
    await browser.setWindowSize(1366, 768);
    await browser.url("/hw/store/cart");

    const navBarActive = await browser.$(".navbar-nav > .nav-link.active");
    const navBarActiveText = await navBarActive.getText();
    if (navBarActiveText.includes("(")) {
      const cartClearButton = await browser.$(".Cart-Clear");
      await cartClearButton.waitForExist();
      await cartClearButton.click();
    }

    await browser.url("/hw/store/catalog");

    const testItemCard = await browser.$$(".ProductItem.card.w-100.mb-4")[0];
    await testItemCard.waitForExist({
      timeoutMsg: "Карточки товара не существует",
    });

    const testItemCardLinkEl = await testItemCard.$(
      ".ProductItem-DetailsLink.card-link"
    );
    await testItemCardLinkEl.waitForExist({
      timeoutMsg: "У карточки отсутствует ссылки",
    });

    const testItemCardLink = await testItemCardLinkEl.getAttribute("href");

    await browser.url(testItemCardLink);

    const testItemCardButton = await browser.$(".ProductDetails-AddToCart");
    await testItemCardButton.waitForExist({
      timeoutMsg: "У карточки отсутствует кнопка добавления в корзину",
    });
    await testItemCardButton.click();

    const testItemCardDetailsBadge = await browser.$(".CartBadge");
    await testItemCardDetailsBadge.waitForExist({
      timeoutMsg:
        "Сообщение, после добавления товара в корзину, не отображается (Подробная карточка товара)",
    });

    await browser.url("/hw/store/catalog");

    const testItemCardBadge = await browser.$(".CartBadge");
    await testItemCardBadge.waitForExist({
      timeoutMsg:
        "Сообщение, после добавления товара в корзину, не отображается (Мини-карточка товара)",
    });
  });

  it("Содержимое корзины сохраняется после перезагрузки страницы", async function ({
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

    await browser.assertView("empty", "body", {
      screenshotDelay: 30,
    });

    await browser.url("/hw/store/catalog");

    const testItemCard = await browser.$$(".ProductItem.card.w-100.mb-4")[0];
    await testItemCard.waitForExist();

    const testItemCardLinkEl = await testItemCard.$(
      ".ProductItem-DetailsLink.card-link"
    );
    await testItemCardLinkEl.waitForExist();

    const testItemCardLink = await testItemCardLinkEl.getAttribute("href");

    await browser.url(testItemCardLink);

    const testItemCardButton = await browser.$(".ProductDetails-AddToCart");
    await testItemCardButton.waitForExist();
    await testItemCardButton.click();

    await browser.url("/hw/store/cart");
    await browser.refresh();
    await browser.assertView("notEmpty", ".Cart", {
      compositeImage: true,
      ignoreElements: [".Cart-Table"],
    });
  });

  it("Содержимое каталога зависит от данных с сервера", async function ({
    browser,
  }) {
    await browser.setWindowSize(1366, 768);
    const catalogItemsMock = await browser.mock("**/hw/store/api/products");
    await catalogItemsMock.respond(
      '[{"id":0,"name":"TestItemMocked","price":10}]'
    );
    const catalogItemMock = await browser.mock("**/hw/store/api/products/0");
    await catalogItemMock.respond(
      '{"id":0,"name":"TestItemMocked","description":"TestItemDesc","price":10,"color":"TestItemColor","material":"TestItemMaterial"}'
    );
    await browser.url("/hw/store/catalog");
    const testItemCard = await browser.$$(".ProductItem.card.w-100.mb-4")[0];
    const testItemCardTitle = await testItemCard
      .$(".ProductItem-Name")
      .getText();
    assert.equal(
      testItemCardTitle,
      "TestItemMocked",
      "Данные не соответствуют тестовым"
    );
  });

  it("При повторном добавлении товара в корзину, количество в корзине увеличивается", async function ({
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

    await browser.url("/hw/store/catalog");

    const testItemCard = await browser.$$(".ProductItem.card.w-100.mb-4")[0];
    await testItemCard.waitForExist({
      timeoutMsg: "Карточка товара не загрузилась",
    });
    const testItemCardLink = await testItemCard
      .$(".ProductItem-DetailsLink")
      .getAttribute("href");

    await browser.url(testItemCardLink);

    const testItemAddCart = await browser.$(".ProductDetails-AddToCart");
    await testItemAddCart.waitForExist();
    await testItemAddCart.click();

    await browser.url("/hw/store/cart");

    const testCartCountPrevEl = await browser.$$(".Cart-Count")[0];
    await testCartCountPrevEl.waitForExist();
    const testCartCountPrev = Number(await testCartCountPrevEl.getText());

    await browser.url(testItemCardLink);

    await testItemAddCart.waitForExist();
    await testItemAddCart.click();

    await browser.url("/hw/store/cart");

    const testCartCountCurrentEl = await browser.$$(".Cart-Count")[0];
    await testCartCountCurrentEl.waitForExist();
    const testCartCountCurrent = Number(await testCartCountCurrentEl.getText());

    assert.isAbove(
      testCartCountCurrent,
      testCartCountPrev,
      "Количество продукта при повторном добавлении в корзину не изменилось"
    );
  });
});
