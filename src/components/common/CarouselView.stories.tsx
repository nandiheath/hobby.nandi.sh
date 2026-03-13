import type { Meta, StoryObj } from '@storybook/react';
import CarouselView from './CarouselView';
import { I18nextProvider } from 'react-i18next';
import i18n from '../../i18n';
import React from 'react';

const meta: Meta<typeof CarouselView> = {
  title: 'Common/CarouselView',
  component: CarouselView,
  decorators: [
    (Story: any) => (
      <I18nextProvider i18n={i18n}>
        <div style={{ maxWidth: '800px' }}>
          <Story />
        </div>
      </I18nextProvider>
    ),
  ],
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof CarouselView>;

export const SingleImage: Story = {
  args: {
    title: 'Single Image',
    images: [
      { image_url: 'https://picsum.photos/800/600', image_title: 'Title 1', origin_url: 'https://google.com' },
    ],
  },
};

export const MultipleImages: Story = {
  args: {
    title: 'Multiple Images',
    images: [
      { image_url: 'https://picsum.photos/800/600', image_title: 'Title 1', origin_url: 'https://google.com' },
      { image_url: 'https://picsum.photos/801/600', image_title: 'Title 2' },
      { image_url: 'https://picsum.photos/802/600', origin_url: 'https://github.com' },
    ],
  },
};
