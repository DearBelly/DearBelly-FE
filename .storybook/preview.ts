import type { Preview } from '@storybook/react';

const customViewports = {
  desktop1600x900: {
    name: 'Desktop (1280×1024)',
    styles: {
      width: '1280px',
      height: '1024px',
    },
    type: 'desktop',
  },
  desktop1920x1080: {
    name: 'Desktop (1920×1080)',
    styles: {
      width: '1920px',
      height: '1080px',
    },
    type: 'desktop',
  },
};

const preview: Preview = {
  parameters: {
    viewport: {
      viewports: customViewports,
      defaultViewport: 'responsive'
    },
  },
};

export default preview;
