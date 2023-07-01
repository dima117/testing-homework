import React from "react";

import { Application } from "../../src/client/Application";
import { ExampleApi, CartApi } from "../../src/client/api";
import { initStore } from "../../src/client/store";

import { render, screen, fireEvent } from "@testing-library/react";
import { BrowserRouter, MemoryRouter } from "react-router-dom";
import { Provider } from "react-redux";
import events from "@testing-library/user-event";
import { Cart } from "../../src/client/pages/Cart";
import { createStore } from "redux";

const basename = "/";

describe("Проверка корзины", () => {
  it("в шапке рядом со ссылкой на корзину должно отображаться количество не повторяющихся товаров в ней", async () => {
    const initState = {
      cart: [
        { id: 228, name: "apple", price: 110, count: 6 },
        { id: 1337, name: "banana", price: 50, count: 3 },
      ],
      products: [
        { id: 228, name: "apple", price: 110 },
        { id: 1337, name: "banana", price: 50 },
        { id: 574, name: "carrot", price: 70 },
      ],
    };
    const store = createStore(() => initState);

    render(
      <MemoryRouter initialEntries={["/cart"]}>
        <Provider store={store}>
          <Application />
        </Provider>
      </MemoryRouter>
    );

    /*
    Инфа о queryByRole https://testing-library.com/docs/queries/byrole/
    Но я его скопировал из интерфейса в screen.logTestingPlaygroundURL();
    */
    expect(
      screen.getByRole("link", { name: /Cart \(2\)/i })
    ).toBeInTheDocument();
  });

  it("в корзине должна отображаться таблица с добавленными в нее товарами", async () => {
    const initState = {
      cart: [
        { id: 228, name: "apple", price: 110, count: 6 },
        { id: 1337, name: "banana", price: 50, count: 3 },
      ],
      products: [
        { id: 228, name: "apple", price: 110 },
        { id: 1337, name: "banana", price: 50 },
        { id: 574, name: "carrot", price: 70 },
      ],
    };
    const store = createStore(() => initState);

    render(
      <MemoryRouter initialEntries={["/cart"]}>
        <Provider store={store}>
          <Application />
        </Provider>
      </MemoryRouter>
    );

    expect(screen.getByTestId("0")).toBeInTheDocument();
    expect(screen.getByRole("cell", { name: /apple/i })).toBeInTheDocument();

    expect(screen.getByTestId("1")).toBeInTheDocument();
    expect(
      screen.getByRole("cell", {
        name: /banana/i,
      })
    ).toBeInTheDocument();
  });

  it("для каждого товара должны отображаться название, цена, количество , стоимость, а также должна отображаться общая сумма заказа", async () => {
    const initState = {
      cart: [
        { id: 228, name: "apple", price: 110, count: 6 },
        { id: 1337, name: "banana", price: 50, count: 3 },
      ],
      products: [
        { id: 228, name: "apple", price: 110 },
        { id: 1337, name: "banana", price: 50 },
        { id: 574, name: "carrot", price: 70 },
      ],
    };
    const store = createStore(() => initState);

    render(
      <MemoryRouter initialEntries={["/cart"]}>
        <Provider store={store}>
          <Application />
        </Provider>
      </MemoryRouter>
    );

    // Проверка, что для apple отображается название, цена, количество и стоимость
    expect(screen.queryByText("apple")).toBeInTheDocument();
    expect(screen.queryByText("$110")).toBeInTheDocument();
    expect(screen.queryByText("6")).toBeInTheDocument();
    expect(screen.queryByText("$660")).toBeInTheDocument();

    // Проверка, что для banana отображается название, цена, количество и стоимость
    expect(screen.queryByText("banana")).toBeInTheDocument();
    expect(screen.queryByText("$50")).toBeInTheDocument();
    expect(screen.queryByText("3")).toBeInTheDocument();
    expect(screen.queryByText("$150")).toBeInTheDocument();

    // Проверка общей суммы заказа
    expect(screen.queryByText("$810")).toBeInTheDocument();
  });

  it(`в корзине должна быть кнопка "очистить корзину", по нажатию на которую все товары должны удаляться`, async () => {
    const initState = {
      "0": { name: "apple", count: 6, price: 110 },
      "1": { name: "Sleek Salad", count: 3, price: 199 },
      "2": { name: "Tasty Keyboard", count: 2, price: 302 },
    };
    const basename = "/hw/store";

    const api = new ExampleApi(basename);
    const cart = new CartApi();
    cart.setState(initState);
    const store = initStore(api, cart);

    const { getByTestId, getAllByTestId } = render(
      <MemoryRouter initialEntries={["/cart"]}>
        <Provider store={store}>
          <Application />
        </Provider>
      </MemoryRouter>
    );

    // Проверяем, что кнопка есть
    const button = screen.getByRole("button", {
      name: /clear shopping cart/i,
    });
    expect(button).toBeInTheDocument();

    expect(screen.queryByText("apple")).toBeInTheDocument();
    expect(screen.queryByText("Sleek Salad")).toBeInTheDocument();
    expect(screen.queryByText("Tasty Keyboard")).toBeInTheDocument();

    await events.click(button);

    expect(screen.queryByText("apple")).not.toBeInTheDocument();
    expect(screen.queryByText("Sleek Salad")).not.toBeInTheDocument();
    expect(screen.queryByText("Tasty Keyboard")).not.toBeInTheDocument();
  });

  it("если корзина пустая, должна отображаться ссылка на каталог товаров", async () => {
    const initState = {
      cart: {},
    };
    const store = createStore(() => initState);

    render(
      <BrowserRouter basename={basename}>
        <Provider store={store}>
          <Cart />
        </Provider>
      </BrowserRouter>
    );

    expect(screen.queryByRole("link", { name: "catalog" })).toHaveAttribute(
      "href",
      "/catalog"
    );
  });
});
