import React, { Component, useState } from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import { ComboBox } from './combo-box';

export default {
  title: 'ComboBox',
  component: ComboBox,
  argTypes: {
    defaultValue: { control: 'text' },
    options: { control: 'array' }
  },
  decorators: [
    (Story) => {
      const [value, setValue] = useState('');
      const onChange = (val: string) => {
        setValue(val);
      };
      return (
        <div style={{ margin: '3em' }}>
          <Story
            args={{
              onChange,
              value,
              options: ['asdfasdf', 'ggdsfgsad', 'ttttsaf']
            }}
          />
        </div>
      );
    }
  ]
} as ComponentMeta<typeof ComboBox>;

export const Default: ComponentStory<typeof ComboBox> = (args) => (
  <ComboBox {...args} />
);
