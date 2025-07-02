import type { Meta, StoryObj } from '@storybook/react';
import { ProfileBtn } from './ProfileBtn';

const meta: Meta<typeof ProfileBtn> = {
  title: 'Components/ProfileBtn',
  component: ProfileBtn,
  tags: ['autodocs'],
  args: {
    onClick: () => alert('버튼 클릭'),
  },
};

export default meta;
type Story = StoryObj<typeof ProfileBtn>;

export const Primary: Story = {
  args: {
    variant: 'large_pink',
    children: '완료',
  },
};

export const Regular_Pink: Story = {
  args: {
    variant: 'regular_pink',
    children: '가족 코드 공유하기',
  },
};

export const Regular_Gray: Story = {
  args: {
    variant: 'regular_gray',
    children: '입력하기',
  },
};
