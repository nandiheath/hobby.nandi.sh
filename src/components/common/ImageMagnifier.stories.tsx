import type { Meta, StoryObj } from '@storybook/react';
import ImageMagnifier from './ImageMagnifier';

const meta: Meta<typeof ImageMagnifier> = {
  title: 'Common/ImageMagnifier',
  component: ImageMagnifier,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof ImageMagnifier>;

export const Default: Story = {
  args: {
    src: 'https://picsum.photos/800/600',
    alt: 'Sample Image',
  },
};
