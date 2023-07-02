// const { assert } = require("chai");

// const bugId = "?bug_id=2";

// describe("Основные требования:", async () => {
//   it("название - ссылка на главную", async function ({ browser }) {
//     await browser.url("/hw/store/catalog" + bugId);

//     const a = await browser.$(".Application");
//     await a.waitForExist();

//     const link = await browser.$(".Application-Brand");
//     await link.click();
//     const url = await browser.getUrl();

//     assert(url.endsWith("/hw/store/"));
//   });

//   it("ссылки на страницы магазина", async function ({ browser }) {
//     await browser.setWindowSize(1920, 1080);
//     await browser.url("/hw/store" + bugId);

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
//     await browser.url("/hw/store/" + bugId);
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
//     await browser.url("/hw/store/" + bugId);

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
// });
