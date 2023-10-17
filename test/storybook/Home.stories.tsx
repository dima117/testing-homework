import React from "react";
import type { Meta, StoryObj } from "@storybook/react";

import { Home } from "../../src/client/pages/Home";
import { StorybookTestingProvider } from "./utils/StorybookTestingProvider";

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
    <StorybookTestingProvider>
      <Home />
    </StorybookTestingProvider>
  ),
};
