import type { Meta, StoryObj } from '@storybook/react';
import { MobileLayout } from './MobileLayout';

const meta: Meta<typeof MobileLayout> = {
  title: 'Layout/MobileLayout',
  component: MobileLayout,
};

export default meta;

type Story = StoryObj<typeof MobileLayout>;

export const Default: Story = {
  args: {
    topBarProps: {
      mode: 'logo',
      backgroundType: 'filled',
      title: '제목',
    },
    children: <div>본문 영역</div>,
  },
};