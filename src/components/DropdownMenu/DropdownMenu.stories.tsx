/** @jsxImportSource @emotion/react */
import { Meta, StoryObj } from '@storybook/react';
import { DropdownMenu } from './DropdownMenu';

const meta: Meta<typeof DropdownMenu> = {
  title: 'Components/DropdownMenu',
  component: DropdownMenu,
  tags: ['autodocs'],
};

export default meta;

type Story = StoryObj<typeof DropdownMenu>;

export const Primary: Story = {
  args: {
  },
};