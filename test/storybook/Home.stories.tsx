import React from "react";
import type { Meta, StoryObj } from "@storybook/react";

import { Home } from "../../src/client/pages/Home";
import { TestingProvider } from "./utils/TestingProvider";

const meta: Meta<typeof Home> = {
  id: "мама мыла раму",
  component: Home,
};

export default meta;

type Story = StoryObj<typeof Home>;

export const Aaa: Story = {
  storyName: "Тестовый storyName",
  name: "Тестовая история",
  render: () => (
    <TestingProvider>
      <Home />
    </TestingProvider>
  ),
};
