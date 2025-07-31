import type { Meta, StoryObj } from '@storybook/react';
import { IoIosSend } from "react-icons/io";
import { InputBox } from './InputBox';

const meta: Meta<typeof InputBox> = {
  title: 'Components/InputBox',
  component: InputBox,
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: { type: 'radio' },
      options: ['default', 'transparent'],
    },
    icon: {
      control: false, 
    },
    onClick: { action: 'clicked' },
  },
};

export default meta;
type Story = StoryObj<typeof InputBox>;

export const Default: Story = {
  args: {
    variant: 'default',
    icon: <IoIosSend size={24} color="#000" />,
    title: '닉네임',
    detail: '닉네임을 입력해주세요',
  },
};

export const Transparent: Story = {
  args: {
    variant: 'transparent',
    icon: undefined, 
    title: '닉네임',
    detail: '닉네임을 입력해주세요',
  },
};
