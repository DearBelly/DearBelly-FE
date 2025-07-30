import type { Meta, StoryObj } from '@storybook/react';
import { NoticeBox } from './NoticeBox';

const meta: Meta<typeof NoticeBox> = {
  title: 'Components/NoticeBox',
  component: NoticeBox,
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof NoticeBox>;

export const Notice: Story = {
  args: {
    label: '5월은 ab 정책을 신청할 수 있어요.',
  },
};