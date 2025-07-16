import type { Meta, StoryObj } from '@storybook/react';
import { CheckBox } from './Checkbox';
import React from 'react';

const meta: Meta<typeof CheckBox> = {
  title: 'Components/CheckBox',
  component: CheckBox,
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof CheckBox>;

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
          <CheckBox
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