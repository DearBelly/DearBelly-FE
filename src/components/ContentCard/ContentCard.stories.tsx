/** @jsxImportSource @emotion/react */
import { Meta, StoryObj } from '@storybook/nextjs';
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
    id: 1,
    title: '깊이 잠들고 싶어요..',
    subTitle: '깊은 숙면을 도와주는 5가지 습관',
    imageSrc: '/images/default_image.svg',
    routerSrc: '/Information/InformationDetail',
  },
};