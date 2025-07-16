import type { Meta, StoryObj } from '@storybook/react';
import { InlineCard } from './InlineCard';

const meta: Meta<typeof InlineCard> = {
  title: 'Components/InlineCard',
  component: InlineCard,
  tags: ['autodocs'],
};

export default meta;

type Story = StoryObj<typeof InlineCard>;

export const Default: Story = {
  args: {
    imageDescription: '기본 이미지',
    description: '다른 기능들을 사용하도록 유도하는 메세지를 적어요.',
    shortcutLink: '자세히 보기',
    shortcutHref: '/guide/folic'
  },
};
