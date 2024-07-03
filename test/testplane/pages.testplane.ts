import { basename, baseUrl } from "./config";
import { PAGES } from "../shared-config";

describe("Страницы", function () {
  it("В магазине должны быть страницы: главная, каталог, условия доставки, контакты", async () => {
    const base = baseUrl + basename;
    // const responseBad = await fetch(base + "/" + crypto.randomUUID());
    // expect(responseBad.status).not.toBe(404);

    // Promise.all is redundant here, but it's a good practice to use it
    const responseMain = await fetch(base + PAGES["главная"]);
    const responseCatalog = await fetch(base + PAGES["каталог"]);
    const responseDelivery = await fetch(base + PAGES["условия доставки"]);
    const responseContacts = await fetch(base + PAGES["контакты"]);

    expect(responseMain.status).not.toBe(404);
    expect(responseCatalog.status).not.toBe(404);
    expect(responseDelivery.status).not.toBe(404);
    expect(responseContacts.status).not.toBe(404);
  });
});
