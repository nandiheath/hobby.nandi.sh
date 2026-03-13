import type { Meta, StoryObj } from '@storybook/react';
import ContentModal from './ContentModal';
import { I18nextProvider } from 'react-i18next';
import i18n from '../../i18n';
import React from 'react';

const meta: Meta<typeof ContentModal> = {
  title: 'Common/ContentModal',
  component: ContentModal,
  decorators: [
    (Story: any) => (
      <I18nextProvider i18n={i18n}>
        <Story />
      </I18nextProvider>
    ),
  ],
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof ContentModal>;

const commonArgs = {
  show: true,
  onHide: () => console.log('hide'),
};

export const Tutorial: Story = {
  args: {
    ...commonArgs,
    item: {
      id: 1,
      type: 'tutorial',
      title: 'Edge Highlighting Basics',
      duration: '10 mins',
      level: 'Beginner',
      tags: ['Painting', 'Basics'],
      images: [{ image_url: 'https://picsum.photos/800/600', image_title: 'Step 1' }],
      content: '## How to edge highlight\n\n1. Use a thin brush\n2. Use the side of the brush',
      filename: 'edge-highlighting',
    },
  },
};

export const Instagram: Story = {
  args: {
    ...commonArgs,
    item: {
      id: 2,
      type: 'instagram',
      title: 'Instagram Showcase',
      instagram_id: 'https://www.instagram.com/reel/Crd3vySAeww/',
      tags: ['Social', 'Reel'],
      images: [],
      content: 'Check out this cool reel!',
      filename: 'insta-showcase',
    },
  },
};

export const TextOnly: Story = {
  args: {
    ...commonArgs,
    item: {
      id: 3,
      type: 'text',
      title: 'Simple Note',
      tags: ['Note'],
      images: [],
      content: 'This is just some text content without images.',
      filename: 'simple-note',
    },
  },
};
