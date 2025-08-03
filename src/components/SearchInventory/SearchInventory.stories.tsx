import { Meta, StoryObj } from '@storybook/react';
import { SearchInventory } from './SearchInventory';

const meta: Meta<typeof SearchInventory> = {
    title: 'Components/SearchInventory',
    component: SearchInventory,
    tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof SearchInventory>;

export const Primary: Story = {
    args: {
      description: '임신테스트기',
    },
  };