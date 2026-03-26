/**
 * Storybook configuration for AlgoFlow.
 * Uses the React-Vite framework, discovers stories from src/, and includes Chromatic addon.
 */
import type { StorybookConfig } from "@storybook/react-vite";

const config: StorybookConfig = {
  stories: ["../src/**/*.stories.@(ts|tsx)"],
  addons: ["@storybook/addon-essentials", "@chromatic-com/storybook"],
  framework: {
    name: "@storybook/react-vite",
    options: {},
  },
};

export default config;
