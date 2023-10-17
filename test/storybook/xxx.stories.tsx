import React from 'react';
// Button.stories.ts|tsx

import type { Meta, StoryObj } from '@storybook/react';

// import { Button } from './Button';

const Xxx: React.FC<{ text: string }> = ({ text }) => {
    return <strong>Example Xxx: {text}</strong>;
};


const meta: Meta<typeof Xxx> = {
  component: Xxx,
};

export default meta;

type Story = StoryObj<typeof Xxx>;

/*
 *👇 Render functions are a framework specific feature to allow you control on how the component renders.
 * See https://storybook.js.org/docs/react/api/csf
 * to learn how to use render functions.
 */
export const Aaa: Story = {
  render: () => <Xxx text='Primary' />,
};

export const Bbb: Story = {
  render: () => <Xxx text='Secondary' />,
};
