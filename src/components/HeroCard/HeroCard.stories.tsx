/** @jsxImportSource @emotion/react */
import { Meta, StoryObj } from '@storybook/react';
import { HeroCard } from './HeroCard';

const meta: Meta<typeof HeroCard> = {
  title: 'Components/HeroCard',
  component: HeroCard,
  tags: ['autodocs'],
};

export default meta;

type Story = StoryObj<typeof HeroCard>;

export const ImageMode: Story = {
  args: {
    title: '건강한 임신을 위한 팁',
    description: '임신 중 챙겨야 할 필수 정보를 알려드려요.',
    imageSrc: '/images/default_image.svg',
    mode: 'buttonMode',
  },
};

export const ButtonMode: Story = {
  args: {
    title: '지금 바로 시작하세요!',
    description: '산모 수첩을 만들고 출산 혜택을 확인해보세요.',
    mode: 'buttonMode',
  },
};
