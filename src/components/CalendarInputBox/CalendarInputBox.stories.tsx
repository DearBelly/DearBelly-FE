'use client';

import type { Meta, StoryObj } from '@storybook/react';
import { CalendarInputBox } from './CalendarInputBox';

const meta: Meta<typeof CalendarInputBox> = {
  title: 'Components/CalendarInputBox',
  component: CalendarInputBox,
  tags: ['autodocs'],
};

export default meta;

type Story = StoryObj<typeof CalendarInputBox>;

export const Default: Story = {
  args: {
    title: '날짜 선택',
    guideMessage: '날짜를 선택해 주세요.',
  },
};

export const ErrorState: Story = {
  args: {
    title: '날짜 선택',
    isError: true,
    errorMessage: '날짜를 다시 선택해 주세요.',
  },
};
