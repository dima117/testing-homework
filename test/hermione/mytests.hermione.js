// const { assert } = require("chai");

// let bug_id = 0;

// describe("Тесты", async function () {
//   it("Название - это ссылка на главную", async function ({ browser }) {
//     await browser.url("/hw/store/catalog?bug_id=" + bug_id);

//     const a = await browser.$(".Application");
//     await a.waitForExist();

//     const link = await browser.$(".Application-Brand");
//     await link.click();
//     const url = await browser.getUrl();

//     assert(url.endsWith("/hw/store/"));
//   });

//   it("ссылки на страницы магазина", async function ({ browser }) {
//     await browser.setWindowSize(1920, 1080);
//     await browser.url("/hw/store?bug_id=" + bug_id);

//     const navlinks = await browser.$(".navbar-nav");

//     await navlinks.waitForExist();

//     for (let i = 1; i <= 4; i++) {
//       const navlink = await navlinks.$(`.nav-link:nth-child(${i})`);
//       await navlink.waitForExist({ timeout: 500 });
//       const link = await navlink.getAttribute("href");
//       const links = await [
//         "/hw/store/catalog",
//         "/hw/store/delivery",
//         "/hw/store/contacts",
//         "/hw/store/cart",
//       ];
//       const res = await links.includes(link);

//       assert(res, "ссылка не работатет");
//     }
//   });

//   it("wide < 576px меню - гамбургер", async function ({ browser }) {
//     await browser.url("/hw/store?bug_id=" + bug_id);
//     await browser.setWindowSize(575, 500);

//     const a = await browser.$(".Application");
//     await a.waitForExist();

//     const toggler = await browser.$(".Application-Toggler");

//     assert(await toggler.isDisplayed(), "меню-бургера нет");
//   });
//   it("после выбора пункта из гамбургера, закрыается меню", async function ({
//     browser,
//   }) {
//     await browser.setWindowSize(500, 1080); // проявлятся баг при bug_id=4
//     await browser.url("/hw/store?bug_id=" + bug_id);

//     const Menu = await browser.$(".Application-Menu");
//     await Menu.waitForExist();

//     const Toggler = await browser.$(".Application-Toggler");
//     await Toggler.waitForExist();
//     await Toggler.click();

//     const link = await Menu.$$(".nav-link")[0];
//     link.waitForExist({ timeout: 500 });

//     await link.click();

//     const IsMenuCollapsed = async () => {
//       const classMenu = await Menu.getAttribute("class");
//       const classes = classMenu.split(" ");
//       return classes.includes("collapse");
//     };

//     const res = await IsMenuCollapsed();

//     assert(res, "не закрывается после клика");
//   });
//   it("Существование страниц", async function ({ browser }) {
//     await browser.url("http://localhost:3000/hw/store?bug_id=" + bug_id);
//     isExist = await (await browser.$(".Application")).isExisting();
//     assert.equal(isExist, true, "Нет главной страницы");
//     await browser.assertView("home", ".Application");

//     await browser.url(
//       "http://localhost:3000/hw/store/catalog?bug_id=" + bug_id
//     );
//     isExist = await (await browser.$(".Application")).isExisting();
//     assert.equal(isExist, true, "Нет страницы каталога");

//     await browser.url(
//       "http://localhost:3000/hw/store/delivery?bug_id=" + bug_id
//     );
//     isExist = await (await browser.$(".Application")).isExisting();
//     assert.equal(isExist, true, "Нет страницы доставки");
//     await browser.assertView("delivery", ".Application");

//     await browser.url(
//       "http://localhost:3000/hw/store/contacts?bug_id=" + bug_id
//     );
//     isExist = await (await browser.$(".Application")).isExisting();
//     assert.equal(isExist, true, "Нет страницы контактов");
//     await browser.assertView("contacts", ".Application");
//   });
//   it("Отображение информации о товаре", async function ({ browser }) {
//     await browser.url(
//       "http://localhost:3000/hw/store/catalog?bug_id=" + bug_id
//     );
//     assert.equal(await browser.$$(".ProductItem-Name")[0].isDisplayed(), true);
//     assert.equal(await browser.$$(".ProductItem-Price")[0].isDisplayed(), true);
//     assert.equal(
//       await browser.$$(".ProductItem-DetailsLink")[0].isDisplayed(),
//       true
//     );
//   });

// // BUG_ID = 9
// it("Размер кнопки", async function ({ browser }) {
//   await browser.url(
//     "http://localhost:3000/hw/store/catalog/0?bug_id=" + bug_id
//   );
//   await browser.assertView("catalogpage", ".Application", {
//     ignoreElements: [
//       ".ProductDetails-Name",
//       ".ProductDetails-Description",
//       ".ProductDetails-Color",
//       ".ProductDetails-Price",
//       ".ProductDetails-Material",
//     ],
//     compositeImage: true,
//   });
// });
//   it("Отображение в карточке продукта", async function ({ browser }) {
//     await browser.url(
//       "http://localhost:3000/hw/store/catalog/0?bug_id=" + bug_id
//     );
//     assert.equal(await browser.$(".ProductDetails-Name").isDisplayed(), true);
//     assert.equal(
//       await browser.$(".ProductDetails-Description").isDisplayed(),
//       true
//     );
//     assert.equal(await browser.$(".ProductDetails-Price").isDisplayed(), true);
//     assert.equal(await browser.$(".ProductDetails-Color").isDisplayed(), true);
//     assert.equal(
//       await browser.$(".ProductDetails-Material").isDisplayed(),
//       true
//     );
//     assert.equal(
//       await browser.$(".ProductDetails-AddToCart").isDisplayed(),
//       true
//     );
//   });
//   it("Меню отображается", async function ({ browser }) {
//     await browser.url(
//       "http://localhost:3000/hw/store/catalog?bug_id=" + bug_id
//     );
//     assert.equal(await browser.$$(".nav-link")[0].isDisplayed(), true);
//     assert.equal(await browser.$$(".nav-link")[1].isDisplayed(), true);
//     assert.equal(await browser.$$(".nav-link")[2].isDisplayed(), true);
//     assert.equal(await browser.$$(".nav-link")[3].isDisplayed(), true);
//     assert.equal(await browser.$(".navbar-brand").isDisplayed(), true);
//   });

//   // BUG_ID 4
//   it("Меню-гамбургер", async function ({ browser }) {
//     await browser.url(
//       "http://localhost:3000/hw/store/catalog?bug_id=" + bug_id
//     );
//     await browser.setWindowSize(570, 1000);
//     assert.equal(await browser.$(".Application-Toggler").isDisplayed(), true);
//     await browser.$(".Application-Toggler").click();
//     assert.equal(await browser.$(".Application-Menu").isDisplayed(), true);
//     await browser.$$(".nav-link")[0].click();
//     assert.equal(await browser.$(".Application-Menu").isDisplayed(), false);
//     await browser.setWindowSize(784, 1000);
//   });
//   it("Ссылка на главную страницу", async function ({ browser }) {
//     await browser.url(
//       "http://localhost:3000/hw/store/catalog?bug_id=" + bug_id
//     );
//     assert.equal(
//       await (await browser.$(".Application-Brand")).getAttribute("href"),
//       "/hw/store/"
//     );
//   });
//   it("Отображение Item in Cart", async function ({ browser }) {
//     await browser.url(
//       "http://localhost:3000/hw/store/catalog/1?bug_id=" + bug_id
//     );
//     await browser.$(".ProductDetails-AddToCart").click();
//     assert.equal(await browser.$(".CartBadge").isDisplayed(), true);
//     await browser.url(
//       "http://localhost:3000/hw/store/catalog?bug_id=" + bug_id
//     );
//     assert.equal(await browser.$(".CartBadge").isDisplayed(), true);
//   });
//   it("Сохранение корзины после перезагрузки", async function ({ browser }) {
//     await browser.url(
//       "http://localhost:3000/hw/store/catalog/2?bug_id=" + bug_id
//     );
//     await browser.$(".ProductDetails-AddToCart").click();
//     await browser.url("http://localhost:3000/hw/store/cart?bug_id=" + bug_id);
//     let cartText = await (await browser.$(".Application")).getText();
//     await browser.refresh();
//     let cartTextNew = await (await browser.$(".Application")).getText();
//     assert.equal(cartText, cartTextNew, "Корзина не сохраняется");
//   });
//   it("Отображается количество продуктов около ссылки на корзину", async function ({
//     browser,
//   }) {
//     await browser.url(
//       "http://localhost:3000/hw/store/catalog/2?bug_id=" + bug_id
//     );
//     await browser.$(".ProductDetails-AddToCart").click();
//     await browser.url("http://localhost:3000/hw/store/cart?bug_id=" + bug_id);
//     assert.equal(
//       await browser.$$(".nav-link")[3].getText(),
//       "Cart (2)",
//       "Количество продуктов не отображается"
//     );
//   });
//   it("Отображение товара в корзине", async function ({ browser }) {
//     await browser.url("http://localhost:3000/hw/store/cart?bug_id=" + bug_id);
//     assert.equal(await browser.$(".Cart-Index").isDisplayed(), true);
//     assert.equal(await browser.$(".Cart-Name").isDisplayed(), true);
//     assert.equal(await browser.$(".Cart-Price").isDisplayed(), true);
//     assert.equal(await browser.$(".Cart-Count").isDisplayed(), true);
//     assert.equal(await browser.$(".Cart-Total").isDisplayed(), true);
//     assert.equal(await browser.$(".Cart-OrderPrice").isDisplayed(), true);
//   });
//   it("Удаление товаров из корзины", async function ({ browser }) {
//     await browser.url(
//       "http://localhost:3000/hw/store/catalog/2?bug_id=" + bug_id
//     );
//     await browser.$(".ProductDetails-AddToCart").click();
//     await browser.url("http://localhost:3000/hw/store/cart?bug_id=" + bug_id);
//     await (await browser.$(".Cart-Clear")).click();
//     assert.equal(
//       await (await browser.$(".Cart")).getText(),
//       "Shopping cart\nCart is empty. Please select products in the catalog.",
//       "Корзина не очищается"
//     );
//     assert.equal(
//       await (await browser.$(".col a")).getAttribute("href"),
//       "/hw/store/catalog",
//       "Ссылка на каталог не отображается"
//     );
//   });
// });
