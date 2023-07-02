const { assert } = require("chai");

describe("Дополнительные костыльные проверки", async function () {
  // BUG_ID = 1
  it("В каталоге у продуктов есть имя", async function ({ browser }) {
    await browser.url("/hw/store/catalog");
    const productName = await browser.$(".ProductItem-Name");
    await productName.waitForExist();
    console.log(await productName.getText());
    assert.notEqual(await productName.getText(), "", "Нет имени");
  });

  // BUG_ID = 3
  it("Продукт корректно отображается", async function ({ browser }) {
    await browser.url("/hw/store/catalog/1");

    const product = await browser.$(".Product");
    await product.waitForExist();

    assert.notEqual(
      await product.getText(),
      "LOADING",
      "Продукт не загрузился"
    );
  });

  // BUG_ID = 5 6 7 8 10
  it("Добавилили товар в корзину, заполнили и отправили форму в корзине, появилась надпись об успехе c корректным #", async function ({
    browser,
  }) {
    await browser.url("/hw/store/catalog/0");
    const button = await browser.$(".ProductDetails-AddToCart");
    await button.waitForExist();
    await button.click();

    await browser.url("/hw/store/cart");

    const nameInput = await browser.$(".Form-Field_type_name");
    await nameInput.waitForExist();
    await nameInput.setValue("nikita");

    const phoneInput = await browser.$(".Form-Field_type_phone");
    await phoneInput.waitForExist();
    await phoneInput.setValue("777877776676767");

    const addressInput = await browser.$(".Form-Field_type_address");
    await addressInput.waitForExist();
    await addressInput.setValue("qwerty");

    const formButton = await browser.$(".Form-Submit");
    await formButton.waitForExist();

    await formButton.click();

    const success = await browser.$(".alert-success");
    assert.isOk(success, "Успешной формы не появилось");

    await browser.assertView("cartform", ".Application", {
      compositeImage: true,
      ignoreElements: [".Cart-SuccessMessage"],
    });

    const cartNumber = await browser.$(".Cart-Number");
    await cartNumber.waitForExist();
    assert.equal(await cartNumber.getText(), "1", "Номер заказа не 1");
  });

  // BUG_ID = 9
  it("Размер кнопки на странице товара не изменился", async function ({
    browser,
  }) {
    const mockProduct = `{"id":0,"name":"Мой продукт","description":"The automobile layout consists of a front-engine design, with transaxle-type transmissions mounted at the rear of the engine and four wheel drive","price":914,"color":"maroon","material":"Fresh"}`;
    const productMock = await browser.mock("**/hw/store/api/products/0");
    await productMock.respond(mockProduct);

    await browser.url("/hw/store/catalog/0");
    await browser.assertView("catalogpage", ".Application", {
      ignoreElements: [
        ".ProductDetails-Name",
        ".ProductDetails-Description",
        ".ProductDetails-Color",
        ".ProductDetails-Price",
        ".ProductDetails-Material",
        ".navbar",
        ".CartBadge",
      ],
      compositeImage: true,
    });
  });
});
