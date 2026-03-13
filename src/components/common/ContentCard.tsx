import React from 'react';
import { Card, Badge, Button } from 'react-bootstrap';
import { PlayCircle, Image as ImageIcon, Clock, ArrowRight, Instagram } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { ContentItem } from '../../utils/contentLoader';

interface ContentCardProps {
  item: ContentItem;
  onClick: () => void;
}

const ContentCard: React.FC<ContentCardProps> = ({ item, onClick }) => {
  const { t } = useTranslation();
  const isTutorial = item.type === 'tutorial';

  if (isTutorial) {
    return (
      <Card className="glass-card h-100 border-0 rounded-[2.5rem] overflow-hidden group hover:scale-[1.02] transition-all duration-500">
        <Card.Body className="p-8 md:p-10">
          <div className="flex align-items-center mb-6">
            <div className="w-14 h-14 rounded-2xl bg-indigo-600 text-white flex items-center justify-center shadow-lg shadow-indigo-600/30 group-hover:rotate-12 transition-transform">
              <PlayCircle size={28} fill="white" />
            </div>
            <Badge className="ms-auto bg-indigo-100 dark:bg-indigo-900/40 text-indigo-600 dark:text-indigo-400 rounded-lg px-3 py-1.5 uppercase tracking-wider text-[10px] border-0">
              {t('references.type_tutorial')}
            </Badge>
          </div>
          <h3 className="text-2xl font-black mb-4 dark:text-white group-hover:text-indigo-600 transition-colors">
            {item.title}
          </h3>
          <div className="flex flex-wrap items-center gap-4 mb-6 text-sm font-bold text-gray-500 dark:text-gray-400">
            <span className="flex items-center gap-2">
              <Clock size={18} className="text-indigo-600" /> {item.duration}
            </span>
            <span className="px-2 py-1 rounded bg-gray-100 dark:bg-gray-800 text-[11px] uppercase tracking-wider">
              {item.level}
            </span>
          </div>
          <div className="flex flex-wrap gap-2 mb-8">
            {(item.tags || []).map(tag => (
              <span key={tag} className="text-xs font-bold text-indigo-500 dark:text-indigo-400">#{tag}</span>
            ))}
          </div>
          <Button 
            variant="link" 
            className="p-0 text-indigo-600 dark:text-indigo-400 font-black no-underline flex items-center gap-2 hover:gap-4 transition-all mt-auto"
            onClick={onClick}
          >
            {t('home.btn_start_learning')} <ArrowRight size={20} />
          </Button>
        </Card.Body>
      </Card>
    );
  }

  // Portfolio/Image-style card
  return (
    <Card className="glass-card h-100 border-0 rounded-[2.5rem] overflow-hidden group transition-all duration-500 hover:-translate-y-4">
      <div 
        className="h-72 bg-gray-100 dark:bg-gray-800/50 flex items-center justify-center relative overflow-hidden cursor-pointer"
        onClick={onClick}
      >
        {item.images && item.images.length > 0 ? (
          <img 
            src={item.images[0].image_url} 
            alt={item.images[0].image_title || item.title}
            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
          />
        ) : (
          <div className="flex flex-col items-center gap-4">
            <div className="absolute inset-0 bg-gradient-to-tr from-indigo-500/10 to-purple-500/10 group-hover:scale-110 transition-transform duration-700"></div>
            {item.instagram_id ? (
              <Instagram className="text-pink-500/60 group-hover:scale-110 transition-transform duration-700 relative z-10" size={56} />
            ) : (
              <ImageIcon className="text-gray-300 dark:text-gray-600 group-hover:scale-110 transition-transform duration-700 relative z-10" size={56} />
            )}
            {item.category && <span className="text-gray-400 font-black text-xl opacity-30 uppercase tracking-widest relative z-10">{item.category}</span>}
          </div>
        )}
        <Badge className={`absolute top-6 ${item.type === 'image' ? 'right-6 bg-pink-600 shadow-pink-600/20' : 'left-6 bg-indigo-600 shadow-indigo-600/30'} rounded-xl px-4 py-2 text-white font-black shadow-lg uppercase tracking-wider text-[10px] border-0`}>
          {item.type === 'image' ? t('references.type_image') : (item.category || item.type)}
        </Badge>
      </div>
      <Card.Body className="p-8 md:p-10">
        <Card.Title 
          as="h3"
          className="text-2xl font-black mb-4 dark:text-white group-hover:text-indigo-600 transition-colors cursor-pointer"
          onClick={onClick}
        >
          {item.title}
        </Card.Title>
        {item.description && (
          <Card.Text className="text-gray-600 dark:text-gray-400 font-medium leading-relaxed mb-8 line-clamp-3">
            {item.description}
          </Card.Text>
        )}
        <div className="flex flex-wrap gap-2 mb-8">
          {(item.tags || []).map(tag => (
            <span key={tag} className="text-[10px] font-bold text-gray-400 dark:text-gray-500">#{tag}</span>
          ))}
        </div>
        <Button 
          variant="link" 
          className="p-0 text-indigo-600 dark:text-indigo-400 font-black no-underline flex items-center gap-2 hover:gap-4 transition-all"
          onClick={onClick}
        >
          {item.type === 'image' ? t('home.btn_start_learning') : t('portfolio.explore_btn')} <ArrowRight size={20} />
        </Button>
      </Card.Body>
    </Card>
  );
};

export default ContentCard;
