import type { Meta, StoryObj } from '@storybook/nextjs';
import { PhotoBtn } from './PhotoBtn';

const meta: Meta<typeof PhotoBtn> = {
  title: 'Components/PhotoBtn',
  component: PhotoBtn,
  tags: ['autodocs'],
  args: {
    onClick: () => alert('버튼 클릭'),
  },
};

export default meta;
type Story = StoryObj<typeof PhotoBtn>;

export const Large: Story = {
  args: {
    variant: 'large',
    children: '확인',
  },
};

export const Primary: Story = {
  args: {
    variant: 'primary',
    children: '결과보기',
  },
};

export const Assistive: Story = {
  args: {
    variant: 'assistive',
    children: '다시찍기',
  },
};
