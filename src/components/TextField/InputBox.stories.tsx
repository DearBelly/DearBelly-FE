import type { Meta, StoryObj } from '@storybook/react';
import { InputBox } from './InputBox';

const meta: Meta<typeof InputBox> = {
  title: 'Components/InputBox',
  component: InputBox,
  tags: ['autodocs'],
  args: {
  },
};

export default meta;
type Story = StoryObj<typeof InputBox>;

export const Default: Story = {
  args: {
    provider: 'default',
  },
};

export const Active: Story = {
  args: {
    provider: 'active',
  },
};
	