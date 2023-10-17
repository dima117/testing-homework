import React from "react";
import { Provider } from "react-redux";

import { initStore } from "../../../src/client/store";
import { CartApi, ExampleApi } from "../../../src/client/api";
import { MemoryRouter } from "react-router";
import { AxiosResponse } from "axios";

// импортируем общие стили
import "bootstrap/dist/css/bootstrap.min.css";
import "../../../src/client/index.css";

export const mockResponse: <T>(obj: T) => Promise<AxiosResponse<T>> = function <
  T
>(data: T) {
  return Promise.resolve<AxiosResponse<T>>({
    status: 200,
    statusText: "ok",
    headers: {},
    config: {},
    data,
  });
};

export interface TestingProviderProps {
  url?: string;
  api?: ExampleApi;
}

export const TestingProvider: React.FC<
  TestingProviderProps
> = (props) => {
  const { children, url = "/", api = new ExampleApi("/") } = props;

  const cart = new CartApi();
  const store = initStore(api, cart);

  // оборачиваем в роутер и redux provider
  return (
    <MemoryRouter initialEntries={[url]} initialIndex={0}>
      <Provider store={store}>{children}</Provider>
    </MemoryRouter>
  );
};
