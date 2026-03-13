import React from 'react';
import { Carousel } from 'react-bootstrap';
import { ExternalLink } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { ContentImage } from '../../utils/contentLoader';
import ImageMagnifier from './ImageMagnifier';

interface CarouselViewProps {
  images: ContentImage[];
  title: string;
}

const CarouselView: React.FC<CarouselViewProps> = ({ images, title }) => {
  const { t } = useTranslation();

  if (!images || images.length === 0) return null;

  return (
    <div className="mb-10 rounded-4xl overflow-hidden shadow-2xl bg-gray-100 dark:bg-gray-800">
      <Carousel interval={null} indicators={images.length > 1} controls={images.length > 1}>
        {images.map((img, idx) => (
          <Carousel.Item key={idx}>
            <div className="relative">
              <ImageMagnifier
                src={img.image_url}
                alt={img.image_title || `${title} ${idx + 1}`}
              />

              {(img.image_title || img.origin_url) && (
                <Carousel.Caption className="bg-black/60 backdrop-blur-md rounded-2xl px-6 py-4 mb-4 mx-4 text-left border border-white/10 shadow-2xl">
                  {img.image_title && <h5 className="text-white font-black mb-1">{img.image_title}</h5>}
                  {img.origin_url && (
                    <div className="flex flex-row items-center flex-nowrap mt-2">
                      <a
                        href={img.origin_url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex flex-row items-center flex-nowrap gap-2 text-indigo-300 hover:text-indigo-200 text-xs font-bold no-underline transition-colors whitespace-nowrap"
                      >
                        <ExternalLink size={12} className="shrink-0" />
                        <span className="whitespace-nowrap leading-none">{t('portfolio.source')}</span>
                      </a>
                    </div>
                  )}
                </Carousel.Caption>
              )}
            </div>
          </Carousel.Item>
        ))}
      </Carousel>
    </div>
  );
};

export default CarouselView;
