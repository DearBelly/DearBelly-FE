import type { Meta, StoryObj } from '@storybook/react';
import { Button } from './Button';

const meta: Meta<typeof Button> = {
  title: 'Components/Button',
  component: Button,
  tags: ['autodocs'],
  argTypes: {
    onClick: { action: 'clicked' },
    width: { control: 'text' },
    height: { control: 'text' },
    size: {
      control: { type: 'radio' },
      options: ['large', 'medium', 'small'],
    },
    type: {
      control: { type: 'radio' },
      options: ['primary', 'secondary'],
    },
    disabled: { control: 'boolean' },
  },
};

export default meta;
type Story = StoryObj<typeof Button>;

export const PrimaryLarge: Story = {
  args: {
    type: 'primary',
    size: 'large',
    children: 'primary large',
  },
};

export const SecondaryMedium: Story = {
  args: {
    type: 'secondary',
    size: 'medium',
    children: 'secondary medium',
  },
};

export const DisabledSmall: Story = {
  args: {
    type: 'primary',
    size: 'small',
    disabled: true,
    children: '비활성',
  },
};

export const CustomSize: Story = {
  args: {
    type: 'primary',
    size: 'medium',
    width: '10rem',
    height: '4rem',
    children: '커스텀 크기',
  },
};
