import { render, screen } from "@testing-library/react";
import React from "react";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import { createStore } from "redux";
import { Application } from "../../src/client/Application";
import "@testing-library/jest-dom/extend-expect";
import { Home } from "../../src/client/pages/Home";
import { Catalog } from "../../src/client/pages/Catalog";
import { Delivery } from "../../src/client/pages/Delivery";
import { Contacts } from "../../src/client/pages/Contacts";

const basename = "/";
const initState = { cart: {} };
const store = createStore(() => initState);

describe("В магазине должны быть страницы", () => {
  it("страница: главная", () => {
    render(
      <BrowserRouter basename={basename}>
        <Provider store={store}>
          <Home />
        </Provider>
      </BrowserRouter>
    );

    expect(
      screen.queryByRole("heading", { name: "Quickly" })
    ).toBeInTheDocument();
  });

  it("страница: каталог", () => {
    render(
      <BrowserRouter basename={basename}>
        <Provider store={store}>
          <Catalog />
        </Provider>
      </BrowserRouter>
    );

    expect(
      screen.queryByRole("heading", { name: "Catalog" })
    ).toBeInTheDocument();
  });

  it("страница: каталог", () => {
    render(
      <BrowserRouter basename={basename}>
        <Provider store={store}>
          <Catalog />
        </Provider>
      </BrowserRouter>
    );

    expect(
      screen.queryByRole("heading", { name: "Catalog" })
    ).toBeInTheDocument();
  });
  it("страница: условия доставки", () => {
    render(
      <BrowserRouter basename={basename}>
        <Provider store={store}>
          <Delivery />
        </Provider>
      </BrowserRouter>
    );

    expect(
      screen.queryByRole("heading", { name: "Delivery" })
    ).toBeInTheDocument();
  });

  it("страница: контакты", () => {
    render(
      <BrowserRouter basename={basename}>
        <Provider store={store}>
          <Contacts />
        </Provider>
      </BrowserRouter>
    );

    expect(
      screen.queryByRole("heading", { name: "Contacts" })
    ).toBeInTheDocument();
  });
});
