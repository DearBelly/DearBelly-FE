import { Meta, StoryObj } from '@storybook/react';
import { ProfilePersonalContent } from './ProfilePersonalContent';

const meta: Meta<typeof ProfilePersonalContent> = {
  title: 'Components/ProfilePersonalContent',
  component: ProfilePersonalContent,
  tags: ['autodocs'],
};

export default meta;

type Story = StoryObj<typeof ProfilePersonalContent>;

export const Primary: Story = {
  args: {
    title: '이름',
    content: '김서진',
  },
};