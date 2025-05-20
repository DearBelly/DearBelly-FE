import type { Meta, StoryObj } from '@storybook/react';
import { SocialLoginButton } from './SocialLoginButton';

const meta: Meta<typeof SocialLoginButton> = {
  title: 'Components/SocialLoginButton',
  component: SocialLoginButton,
  tags: ['autodocs'],
  args: {
    onClick: () => alert('로그인 버튼 클릭'),
  },
};

export default meta;
type Story = StoryObj<typeof SocialLoginButton>;

export const Naver: Story = {
  args: {
    provider: 'naver',
  },
};

export const Google: Story = {
  args: {
    provider: 'google',
  },
};

export const Kakao: Story = {
  args: {
    provider: 'kakao',
  },
};
