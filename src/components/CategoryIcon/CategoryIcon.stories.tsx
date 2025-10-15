import { Meta, StoryObj } from '@storybook/nextjs';
import { CategoryIcon } from './CategoryIcon';

const meta: Meta<typeof CategoryIcon> = {
    title: 'Components/CategoryIcon',
    component: CategoryIcon,
    tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof CategoryIcon>;

export const Primary: Story = {
    args: {
      name: '교육',
      imageSrc: '/images/information/education_light.svg',
    },
};