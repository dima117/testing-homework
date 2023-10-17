import React from 'react';
// Button.stories.ts|tsx

import type { Meta, StoryObj } from '@storybook/react';

// import { Button } from './Button';

const Example: React.FC<{ text: string }> = ({ text }) => {
    return <h1>Example: {text}</h1>;
};


const meta: Meta<typeof Example> = {
  component: Example,
};

export default meta;

type Story = StoryObj<typeof Example>;

/*
 *👇 Render functions are a framework specific feature to allow you control on how the component renders.
 * See https://storybook.js.org/docs/react/api/csf
 * to learn how to use render functions.
 */
export const Primary: Story = {
  render: () => <Example text='Primary' />,
};

export const Secondary: Story = {
  render: () => <Example text='Secondary' />,
};
