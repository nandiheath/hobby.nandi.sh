import type { Meta, StoryObj } from '@storybook/react';
import InstagramView from './InstagramView';

const meta: Meta<typeof InstagramView> = {
  title: 'Common/InstagramView',
  component: InstagramView,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof InstagramView>;

export const Reel: Story = {
  args: {
    url: 'https://www.instagram.com/reel/Crd3vySAeww/',
  },
};

export const Post: Story = {
  args: {
    url: 'https://www.instagram.com/p/Cg7X8W9L7z0/',
  },
};
