import type { Meta, StoryObj } from '@storybook/react';
import { RadioField } from './RadioField';
import React from 'react';

const meta: Meta<typeof RadioField> = {
  title: 'Components/CheckBox',
  component: RadioField,
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof RadioField>;

export const Active: Story = {
  args: {
    label: '텍스트',
    checked: true,
  },
};

export const Disabled: Story = {
  args: {
    label: '텍스트',
    checked: false,
  },
};

export const Options = {
  render: () => {
    const [selected, setSelected] = React.useState(0);
    const options = ['텍스트1', '텍스트2', '텍스트3'];
    return (
      <div style={{ display: 'flex', gap: 60 }}>
        {options.map((label, idx) => (
          <RadioField
            key={idx}
            label={label}
            checked={selected === idx}
            onClick={() => setSelected(idx)}
          />
        ))}
      </div>
    );
  },
};