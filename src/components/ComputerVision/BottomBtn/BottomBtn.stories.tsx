import type { Meta, StoryObj } from '@storybook/react';
import { BottomBtn } from './BottomBtn';

const meta: Meta<typeof BottomBtn> = {
    title: 'Components/BottomBtn',
    component: BottomBtn,
    tags: ['autodocs'],
  };

export default meta;
type Story = StoryObj<typeof BottomBtn>;

export const ok: Story = {
    args: {
      children: '확인',
    },
};