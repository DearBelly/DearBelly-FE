import type { StorybookConfig } from '@storybook/nextjs';

const config: StorybookConfig = {
  stories: ["../src/components/**/*.stories.@(ts|tsx)"],
  addons: [
    "@storybook/addon-onboarding",
    "@chromatic-com/storybook",
    "@storybook/addon-vitest",
    "@storybook/addon-docs",
    "@storybook/addon-viewport"     
  ],
  framework: {
    name: "@storybook/nextjs",
    options: {}
  },
  staticDirs: ["../public"]
};

export default config;
