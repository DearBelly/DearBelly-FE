import type { Meta, StoryObj } from '@storybook/react';
import { MobileLayout } from './MobileLayout';

const meta: Meta<typeof MobileLayout> = {
  title: 'Layout/MobileLayout',
  component: MobileLayout,
};

export default meta;

type Story = StoryObj<typeof MobileLayout>;

export const Default: Story = {
  args: {
    topbarMode: 'logo',
    topbarBackground: 'filled',
    topbarTitle: '제목',
    children: <div>본문 영역</div>,
    hasTopPadding: true,
    showBottomNav: true,
    topbarContent: <div>오른쪽 콘텐츠</div>, // 필요시
    searchbarContent: undefined, // 필요시 검색바 넣기
  },
};
