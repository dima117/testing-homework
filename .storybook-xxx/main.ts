import type { StorybookConfig } from "@storybook/react-webpack5";

const config: StorybookConfig = {
  stories: ["../test/**/*.stories.@(js|jsx|mjs|ts|tsx)"],
  framework: "@storybook/react-webpack5",
};

export default config;
