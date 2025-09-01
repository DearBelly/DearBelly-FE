import type { Meta, StoryObj } from '@storybook/react';
import { LoginModal } from './LoginModal';

const meta: Meta<typeof LoginModal> = {
  title: 'Components/LoginModal',
  component: LoginModal,
  tags: ['autodocs'],
};

export default meta;

type Story = StoryObj<typeof LoginModal>;

export const Default: Story = {
  args: {
  },
};
