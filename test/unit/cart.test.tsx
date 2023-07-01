import React from "react";

import { Application } from "../../src/client/Application";
import { ExampleApi, CartApi } from "../../src/client/api";
import { initStore } from "../../src/client/store";

import { render, screen, fireEvent } from "@testing-library/react";
import { BrowserRouter, MemoryRouter } from "react-router-dom";
import { Provider } from "react-redux";
import events from "@testing-library/user-event";
import { Cart } from "../../src/client/pages/Cart";

const basename = "/hw/store";

const api = new ExampleApi(basename);
const cart = new CartApi();

describe("Проверка корзины", () => {
  it("в шапке рядом со ссылкой на корзину должно отображаться количество не повторяющихся товаров в ней", async () => {
    const store = initStore(api, cart);
    const cartPage = (
      <MemoryRouter initialEntries={["/hw/store/cart"]} initialIndex={0}>
        <Provider store={store}>
          <Application />
        </Provider>
      </MemoryRouter>
    );
    const renderedCart = render(cartPage);
    const tableBody = renderedCart.getByTestId("table-body") as HTMLElement;

    const catalogPage = (
      <MemoryRouter initialEntries={["/hw/store/catalog"]} initialIndex={0}>
        <Provider store={store}>
          <Application />
        </Provider>
      </MemoryRouter>
    );
    const renderedCatalog = render(catalogPage);

    const firstProduct = renderedCatalog.getByTestId("0") as HTMLElement;
    const secondProduct = renderedCatalog.getByTestId("1") as HTMLElement;

    const catalogLinkFromGamburger = getByTestId("catalog-link") as HTMLElement;
  });
});
