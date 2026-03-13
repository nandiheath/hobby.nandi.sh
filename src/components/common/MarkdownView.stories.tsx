import type { Meta, StoryObj } from '@storybook/react';
import MarkdownView from './MarkdownView';
import React from 'react';

const meta: Meta<typeof MarkdownView> = {
  title: 'Common/MarkdownView',
  component: MarkdownView,
  decorators: [
    (Story: any) => (
      <div style={{ maxWidth: '800px', padding: '20px' }} className="bg-white dark:bg-gray-900">
        <Story />
      </div>
    ),
  ],
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof MarkdownView>;

export const Default: Story = {
  args: {
    content: `
# Hello World
This is a **markdown** preview.

- Item 1
- Item 2
- [Link](https://google.com)

\`\`\`javascript
console.log('hello world');
\`\`\`
    `,
  },
};
