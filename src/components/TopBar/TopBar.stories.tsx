import type { Meta, StoryObj } from '@storybook/react';
import { TopBar } from './TopBar';
import { ChevronLeft } from '@mynaui/icons-react';

const meta: Meta<typeof TopBar> = {
  title: 'Components/TopBar',
  component: TopBar,
  tags: ['autodocs'],
  parameters: {
    layout: 'fullscreen',
  },
};

export default meta;
type Story = StoryObj<typeof TopBar>;

export const LogoFilled: Story = {
  args: {
    mode: 'logo',
    backgroundType: 'filled',
    firstIcon: <ChevronLeft />,
    secondIcon: <ChevronLeft />,
  },
};

export const LogoTransparent: Story = {
  args: {
    mode: 'logo',
    backgroundType: 'transparent',
    firstIcon: <ChevronLeft />,
    secondIcon: <ChevronLeft />,
  },
};

export const BackWithTitle: Story = {
  args: {
    mode: 'back',
    backgroundType: 'filled',
    title: '뒤로가기',
    firstIcon: <ChevronLeft />,
    secondIcon: <ChevronLeft />,
  },
};

export const BackTransparent: Story = {
  args: {
    mode: 'back',
    backgroundType: 'transparent',
    title: '타이틀',
    firstIcon: <ChevronLeft />
  },
};
