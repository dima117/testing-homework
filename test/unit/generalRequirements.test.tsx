import React from "react";

import { Application } from "../../src/client/Application";
import { ExampleApi, CartApi } from "../../src/client/api";
import { initStore } from "../../src/client/store";

import { render, screen, fireEvent } from "@testing-library/react";
import { BrowserRouter, MemoryRouter } from "react-router-dom";
import { Provider } from "react-redux";
import events from "@testing-library/user-event";

const basename = "/hw/store";

const api = new ExampleApi(basename);
const cart = new CartApi();

describe("Проверка общих требований", () => {
  it('на ширине меньше 576px навигационное меню должно скрываться за "гамбургер"', async () => {
    // Это юнит тестом не проверить
  });

  it('BUG_ID=4 при выборе элемента из меню "гамбургера", меню должно закрываться', async () => {
    const store = initStore(api, cart);
    const app = (
      <MemoryRouter initialEntries={["/hw/store/"]} initialIndex={0}>
        <Provider store={store}>
          <Application />
        </Provider>
      </MemoryRouter>
    );

    const { container, getByTestId } = render(app);

    const gamburgerList = getByTestId("gamburger-list") as HTMLElement;
    const catalogLinkFromGamburger = getByTestId("catalog-link") as HTMLElement;

    await events.click(catalogLinkFromGamburger);

    expect(gamburgerList).toHaveClass("collapse");
  });
});
