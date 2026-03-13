import React, { useState, useRef } from 'react';
import { Modal, Badge, Button, Carousel } from 'react-bootstrap';
import { X, ExternalLink, Clock } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import ReactMarkdown from 'react-markdown';
import { ContentItem } from '../../utils/contentLoader';

interface ContentModalProps {
  item: ContentItem | null;
  show: boolean;
  onHide: () => void;
}

interface ImageMagnifierProps {
  src: string;
  alt: string;
}

const ImageMagnifier: React.FC<ImageMagnifierProps> = ({ src, alt }) => {
  const [showMagnifier, setShowMagnifier] = useState(false);
  const [[x, y], setXY] = useState([0, 0]);
  const [[imgWidth, imgHeight], setSize] = useState([0, 0]);
  const imgRef = useRef<HTMLImageElement>(null);

  const magnifierHeight = 150;
  const magnifierWidth = 150;
  const zoomLevel = 2.5;

  const handleMouseEnter = (e: React.MouseEvent<HTMLDivElement>) => {
    const elem = e.currentTarget;
    const { width, height } = elem.getBoundingClientRect();
    setSize([width, height]);
    setShowMagnifier(true);
  };

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const elem = e.currentTarget;
    const { top, left } = elem.getBoundingClientRect();

    // calculate cursor position on the image
    const x = e.pageX - left - window.scrollX;
    const y = e.pageY - top - window.scrollY;
    setXY([x, y]);
  };

  const handleMouseLeave = () => {
    setShowMagnifier(false);
  };

  return (
    <div 
      className="relative overflow-hidden group/magnifier"
      onMouseEnter={handleMouseEnter}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      <img
        ref={imgRef}
        src={src}
        alt={alt}
        className="w-full aspect-video object-cover transition-transform duration-500 group-hover/magnifier:scale-105"
      />

      {showMagnifier && (
        <div
          style={{
            position: 'absolute',
            pointerEvents: 'none',
            height: `${magnifierHeight}px`,
            width: `${magnifierWidth}px`,
            top: `${y - magnifierHeight / 2}px`,
            left: `${x - magnifierWidth / 2}px`,
            opacity: '1',
            border: '2px solid rgba(255, 255, 255, 0.5)',
            backgroundColor: 'white',
            backgroundImage: `url('${src}')`,
            backgroundRepeat: 'no-repeat',
            backgroundSize: `${imgWidth * zoomLevel}px ${imgHeight * zoomLevel}px`,
            backgroundPosition: `${-x * zoomLevel + magnifierWidth / 2}px ${-y * zoomLevel + magnifierHeight / 2}px`,
            borderRadius: '1rem',
            boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.5)',
            zIndex: 50,
            backdropFilter: 'blur(4px)',
          }}
          className="glass-magnifier"
        />
      )}
    </div>
  );
};

const ContentModal: React.FC<ContentModalProps> = ({ item, show, onHide }) => {
  const { t } = useTranslation();

  if (!item) return null;

  const isTutorial = item.type === 'tutorial';

  return (
    <Modal 
      show={show} 
      onHide={onHide}
      centered
      size="lg"
      contentClassName="glass-card border-0 rounded-[2.5rem] overflow-hidden"
    >
      <Modal.Header className="border-0 p-8 pb-0 flex items-center justify-between">
        <Badge className="bg-indigo-600 text-white rounded-xl px-4 py-2 font-black uppercase tracking-widest text-[10px] shadow-lg shadow-indigo-600/30 border-0">
          {isTutorial ? t('references.type_tutorial') : (item.type === 'image' ? t('references.type_image') : (item.category || item.type))}
        </Badge>
        <Button 
          variant="link" 
          className="p-2 text-gray-400 hover:text-indigo-600 transition-colors"
          onClick={onHide}
        >
          <X size={24} />
        </Button>
      </Modal.Header>
      <Modal.Body className="p-8 md:p-12 pt-4">
        <style>
          {`
            .carousel-control-prev-icon,
            .carousel-control-next-icon {
              filter: drop-shadow(0 4px 6px rgba(0, 0, 0, 0.4));
              width: 2.5rem;
              height: 2.5rem;
            }
          `}
        </style>
        {item.images && item.images.length > 0 && (
          <div className="mb-10 rounded-4xl overflow-hidden shadow-2xl bg-gray-100 dark:bg-gray-800">
            <Carousel interval={null} indicators={item.images.length > 1} controls={item.images.length > 1}>
              {item.images.map((img, idx) => (
                <Carousel.Item key={idx}>
                  <div className="relative">
                    <ImageMagnifier 
                      src={img.image_url} 
                      alt={img.image_title || `${item.title} ${idx + 1}`}
                    />

                    {(img.image_title || img.origin_url) && (
                      <Carousel.Caption className="bg-black/60 backdrop-blur-md rounded-2xl px-6 py-4 mb-4 mx-4 text-left border border-white/10 shadow-2xl">
                        {img.image_title && <h5 className="text-white font-black mb-1">{img.image_title}</h5>}
                        {img.origin_url && (
                          <a 
                            href={img.origin_url} 
                            target="_blank" 
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-2 text-indigo-300 hover:text-indigo-200 text-xs font-bold no-underline transition-colors"
                          >
                            <ExternalLink size={12} /> {t('portfolio.source')}
                          </a>
                        )}
                      </Carousel.Caption>
                    )}
                  </div>
                </Carousel.Item>
              ))}
            </Carousel>
          </div>
        )}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
          <h2 className="text-3xl md:text-4xl font-black dark:text-white mb-0">{item.title}</h2>
          {item.origin_url && (
            <a 
              href={item.origin_url} 
              target="_blank" 
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-gray-100 dark:bg-gray-800 text-indigo-600 dark:text-indigo-400 font-bold text-sm no-underline hover:bg-indigo-50 dark:hover:bg-indigo-900/30 transition-all w-fit"
            >
              <ExternalLink size={16} /> {t('portfolio.source')}
            </a>
          )}
        </div>
        
        {isTutorial && (
          <div className="flex flex-wrap items-center gap-6 mb-8 text-sm font-bold text-gray-500 dark:text-gray-400">
            <span className="flex items-center gap-2">
              <Clock size={20} className="text-indigo-600" /> {item.duration}
            </span>
            <span className="px-3 py-1.5 rounded-lg bg-gray-100 dark:bg-gray-800 text-[12px] uppercase tracking-wider">
              {item.level}
            </span>
          </div>
        )}

        <div className="prose dark:prose-invert max-w-none dark:text-gray-300 font-medium leading-loose">
          <ReactMarkdown>{item.content}</ReactMarkdown>
        </div>

        {item.tags && item.tags.length > 0 && (
          <div className="mt-10 flex flex-wrap gap-2">
            {item.tags.map(tag => (
              <span key={tag} className="px-3 py-1 rounded-lg bg-gray-100 dark:bg-gray-800 text-xs font-bold text-gray-500">#{tag}</span>
            ))}
          </div>
        )}
      </Modal.Body>
    </Modal>
  );
};

export default ContentModal;
