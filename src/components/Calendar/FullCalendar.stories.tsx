import { Meta, StoryObj } from '@storybook/react';
import { FullCalendar } from './FullCalendar';

const meta: Meta<typeof FullCalendar> = {
    title: 'Components/FullCalendar',
    component: FullCalendar,
    tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof FullCalendar>;

export const Primary: Story = {};