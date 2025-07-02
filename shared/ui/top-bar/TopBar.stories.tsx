import type { Meta, StoryObj } from '@storybook/react';
import { TopBar } from './TopBar';
import Image from 'next/image';
import { ChevronLeft } from "@mynaui/icons-react";


const meta: Meta<typeof TopBar> = {
  title: 'Shared/TopBar',
  component: TopBar,
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof TopBar>;

export const LogoOnly: Story = {
  render: () => (
    <TopBar>
      <Image src="/TypeLogo.svg" alt="logo" width={102} height={20} />
    </TopBar>
  ),
};

