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
});
