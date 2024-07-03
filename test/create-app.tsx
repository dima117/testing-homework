import React from "react";

import { CartApi, ExampleApi } from "../src/client/api";
import { initStore } from "../src/client/store";
import { MemoryRouter, Route } from "react-router-dom";
import { Provider } from "react-redux";
import { Application } from "../src/client/Application";
import { BASE_NAME } from "./unit/config";
import { INVALID_ROUTE_TEXT } from "./shared-config";

type CreateAppOptions = {
  api?: ExampleApi;
  cart?: CartApi;
  initialEntries?: string[];
  initialIndex?: number;
};
function createApp(args?: CreateAppOptions) {
  const { api, cart, initialEntries, initialIndex } = args ?? {};
  const _api = api ?? new ExampleApi(BASE_NAME);
  const _cart = cart ?? new CartApi();
  const store = initStore(_api, _cart);

  const app = (
    <MemoryRouter
      basename={BASE_NAME}
      initialEntries={initialEntries ?? ["/"]}
      initialIndex={initialIndex ?? 0}
    >
      <Provider store={store}>
        <Application />
      </Provider>
    </MemoryRouter>
  );

  return app;
}

export default createApp;
