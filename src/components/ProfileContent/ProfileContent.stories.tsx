import type { Meta, StoryObj } from '@storybook/react';
import { ProfileContent } from './ProfileContent';

const meta: Meta<typeof ProfileContent> = {
    title: 'Components/ProfileContent',
    component: ProfileContent,
    tags: ['autodocs'],
};

export default meta;

type Story = StoryObj<typeof ProfileContent>;

export const Default: Story = {
    args: {
      content: '가족 코드',
    },
  };
  