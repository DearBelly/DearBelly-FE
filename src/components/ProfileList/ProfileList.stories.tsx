/** @jsxImportSource @emotion/react */
import { Meta, StoryObj } from '@storybook/react';
import { ProfileList } from './ProfileList';

const meta: Meta<typeof ProfileList> = {
  title: 'Components/ProfileList',
  component: ProfileList,
  tags: ['autodocs'],
};

export default meta;

type Story = StoryObj<typeof ProfileList>;

export const Primary: Story = {
  args: {
    
  },
};