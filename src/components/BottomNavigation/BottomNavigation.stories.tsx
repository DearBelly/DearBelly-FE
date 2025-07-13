import type { Meta, StoryObj } from '@storybook/react';
import { BottomNavigation } from './BottomNavigation';
import { MockPathnameProvider } from '@/src/lib/test/mockRouter'; 

const meta: Meta<typeof BottomNavigation> = {
  component: BottomNavigation,
  title: 'Components/BottomNavigation',
  decorators: [
    (Story, context) => {
      const pathname = (context.args as { pathname?: string })?.pathname || '/';
      return (
        <MockPathnameProvider pathname={pathname}>
          <Story />
        </MockPathnameProvider>
      );
    },
  ],
  argTypes: {
    pathname: {
      control: 'text',
      description: 'Mocked pathname for usePathname',
    },
  },
};

export default meta;

type Story = StoryObj<typeof BottomNavigation>;

export const Home: Story = {
  args: {
    pathname: '/',
  },
};

export const Info: Story = {
  args: {
    pathname: '/info',
  },
};

export const MyPage: Story = {
  args: {
    pathname: '/mypage',
  },
};
