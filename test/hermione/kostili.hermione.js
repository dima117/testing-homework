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

  // BUG_ID = 5
  it("После отправки формы в корзине появляется надпись об успехе", async function ({
    browser,
  }) {
    await browser.url("/hw/store/catalog/0");
    const button = await browser.$(".ProductDetails-AddToCart");
    await button.waitForExist();
    await button.click();

    const catalogItemsMock = await browser.mock("**/hw/store/api/checkout");

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

    await browser.assertView("cartform", ".Application", {
      compositeImage: true,
      ignoreElements: [".Cart-SuccessMessage"],
    });
  });
});
