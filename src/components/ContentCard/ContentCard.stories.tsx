/** @jsxImportSource @emotion/react */
import { Meta, StoryObj } from '@storybook/react';
import { ContendCard } from './ContentCard';

const meta: Meta<typeof ContendCard> = {
  title: 'Components/ContendCard',
  component: ContendCard,
  tags: ['autodocs'],
};

export default meta;

type Story = StoryObj<typeof ContendCard>;

export const Primary: Story = {
  args: {
    title: '깊이 잠들고 싶어요..',
    description: '깊은 숙면을 도와주는 5가지 습관',
    imageSrc: '/images/default_image.svg',
  },
};