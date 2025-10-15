import type { Meta, StoryObj } from '@storybook/nextjs';
import { InputBox } from './InputBox';

const meta: Meta<typeof InputBox> = {
  title: 'Components/InputBox',
  component: InputBox,
  tags: ['autodocs'],
  args: {
  },
};

export default meta;
type Story = StoryObj<typeof InputBox>;

export const Default: Story = {
  args: {
    mode: 'default',
    title: '닉네임',
    placeholder: '텍스트를 입력해 주세요',
    errorMessage: '에러 메시지',
    isError: false,
    onClick: () => console.log('클릭'),
  },
};

export const Active: Story = {
  args: {
    mode: 'transparent', 
    title: '닉네임',
    placeholder: '텍스트를 입력해 주세요',
    errorMessage: '에러 메시지',
    isError: false,
    onClick: () => console.log('클릭'),
  },
};
	