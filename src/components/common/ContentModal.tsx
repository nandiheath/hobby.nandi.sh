import React from 'react';
import { Modal, Badge, Button } from 'react-bootstrap';
import { X, ExternalLink, Clock } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { ContentItem } from '../../utils/contentLoader';
import InstagramView from './InstagramView';
import CarouselView from './CarouselView';
import MarkdownView from './MarkdownView';

interface ContentModalProps {
  item: ContentItem | null;
  show: boolean;
  onHide: () => void;
}

const ContentModal: React.FC<ContentModalProps> = ({ item, show, onHide }) => {
  const { t } = useTranslation();

  if (!item) return null;

  const isTutorial = item.type === 'tutorial';

  const renderContent = () => {
    switch (item.type) {
      case 'instagram':
        return item.instagram_id ? <InstagramView url={item.instagram_id} /> : null;
      case 'text':
        return <MarkdownView content={item.content} />;
      case 'carousel':
      case 'image':
      case 'project':
      case 'tutorial':
      default:
        return (
          <>
            {item.instagram_id && <InstagramView url={item.instagram_id} />}
            {!item.instagram_id && item.images && item.images.length > 0 && (
              <CarouselView images={item.images} title={item.title} />
            )}
            <MarkdownView content={item.content} />
          </>
        );
    }
  };

  return (
    <Modal 
      show={show} 
      onHide={onHide}
      centered
      size="lg"
      contentClassName="modal-content glass-card border-0 rounded-[2.5rem] overflow-hidden"
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
        
        {renderContent()}

        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mt-6 mb-6">
          <h2 className="text-3xl md:text-4xl font-black dark:text-white mb-0">{item.title}</h2>
          {item.origin_url && (
              <a
                  href={item.origin_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex flex-row items-center flex-nowrap gap-2 px-4 py-2 rounded-xl bg-gray-100 dark:bg-gray-800 text-indigo-600 dark:text-indigo-400 font-bold text-sm no-underline hover:bg-indigo-50 dark:hover:bg-indigo-900/30 transition-all w-fit whitespace-nowrap"
              >
                <ExternalLink size={16} className="shrink-0"/> <span className="whitespace-nowrap leading-none">{t('portfolio.source')}</span>
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
