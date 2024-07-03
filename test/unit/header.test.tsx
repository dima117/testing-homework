import { it, expect } from "@jest/globals";
import { render } from "@testing-library/react";

import createApp from "../create-app";
import { PAGES } from "../shared-config";

describe("Header", () => {
  it("В шапке отображаются ссылки на страницы магазина, а также ссылка на корзину", () => {
    const app = createApp();
    const { container } = render(app);

    const links = Array.from(container.querySelectorAll("nav a"));

    const neededLinks = [...Object.values(PAGES), "/cart"].sort();
    const gotRoutes = links.map((el) => el.getAttribute("href")).sort();

    expect(gotRoutes).toEqual(neededLinks);
  });

  it("Название магазина в шапке должно быть ссылкой на главную страницуя", () => {
    const app = createApp();
    const { getByText } = render(app);

    const STORE_NAME = "Kogtetochka store";
    const brandLink = getByText(STORE_NAME, { selector: "nav *" });

    expect(brandLink.tagName.toLowerCase()).toBe("a");
    expect(brandLink.getAttribute("href")).toBe("/");
  });
});
