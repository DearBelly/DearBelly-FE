import React from 'react'; 
import type { Preview } from '@storybook/nextjs';
import { withThemeByClassName } from '@storybook/addon-themes';
import { Provider } from "../src/components/UI/Provider";

const customViewports = {
  desktop1600x900: {
    name: 'Desktop (1280×1024)',
    styles: {
      width: '1280px',
      height: '1024px',
    },
    type: 'desktop',
  },
  iphone390X844: {
    name: 'iphone (390X844)',
    styles: { width: '390px', height: '844px' }, 
    type: 'mobile',
  },
};

const preview: Preview = {
  decorators: [
    (Story) => (
      <Provider>
        <Story />
      </Provider>
    ),
    withThemeByClassName({
      themes: {
        light: '',
        dark: 'dark',
      },
      defaultTheme: 'light',
    }),
  ],
  parameters: {
    viewport: {
      options: {
        ...customViewports,
      },
    },
  },
  initialGlobals: {
    viewport: {
      value: 'iphone390X844',
      isRotated: false,
    },
  },
};

export default preview;