import React from 'react';
import { Button } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';

interface TagCloudProps {
  tags: string[];
  selectedTag: string | null;
  onTagSelect: (tag: string | null) => void;
}

const TagCloud: React.FC<TagCloudProps> = ({ tags, selectedTag, onTagSelect }) => {
  const { t } = useTranslation();

  return (
    <div className="flex flex-wrap justify-center gap-3 mb-4">
      <Button
        variant={selectedTag === null ? "indigo" : "outline-indigo"}
        className={`rounded-xl px-4 py-2 font-bold text-sm transition-all border-2 ${selectedTag === null ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-500/30 border-indigo-600' : 'text-gray-500 dark:text-gray-400 border-gray-100 dark:border-gray-800 hover:border-indigo-600 hover:text-indigo-600'}`}
        onClick={() => onTagSelect(null)}
      >
        {t('references.all_tags')}
      </Button>
      {tags.map(tag => (
        <Button
          key={tag}
          variant={selectedTag === tag ? "indigo" : "outline-indigo"}
          className={`rounded-xl px-4 py-2 font-bold text-sm transition-all border-2 ${selectedTag === tag ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-500/30 border-indigo-600' : 'text-gray-500 dark:text-gray-400 border-gray-100 dark:border-gray-800 hover:border-indigo-600 hover:text-indigo-600'}`}
          onClick={() => onTagSelect(tag)}
        >
          #{tag}
        </Button>
      ))}
    </div>
  );
};

export default TagCloud;
