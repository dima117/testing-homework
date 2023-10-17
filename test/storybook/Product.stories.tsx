import React from "react";
import type { Meta, StoryObj } from "@storybook/react";

import { Product } from "../../src/client/pages/Product";
import { TestingProvider, mockResponse } from "./utils/TestingProvider";
import { ExampleApi } from "../../src/client/api";
import { Route } from "react-router";

const meta: Meta<typeof Product> = {
  component: Product,
};

export default meta;

type Story = StoryObj<typeof Product>;

export const Xxx: Story = {
  render: () => {
    // заглушка для сервера
    const api = new ExampleApi();
    api.getProductById = () =>
      mockResponse({
        id: 123,
        name: "Тестовый товар",
        price: 100500,
        material: "Дерево",
        color: "Красный",
        description: "Тестовое описание товара",
      });

    // важно обернуть в Route, чтобы правильно парсились параметры url
    return (
      <TestingProvider url="/catalog/123" api={api}>
        <Route path="/catalog/:id">
          <Product />
        </Route>
      </TestingProvider>
    );
  },
};
