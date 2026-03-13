import React, { useState, useMemo, useEffect } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import { loadMarkdownContent, ContentItem } from '../../utils/contentLoader';
import ContentCard from '../../components/common/ContentCard';
import ContentModal from '../../components/common/ContentModal';
import TagCloud from '../../components/common/TagCloud';
import SearchInput from '../../components/common/SearchInput';

const References: React.FC = () => {
  const { t, i18n } = useTranslation();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedTag, setSelectedTag] = useState<string | null>(null);
  const [referenceItems, setReferenceItems] = useState<ContentItem[]>([]);
  const [selectedItem, setSelectedItem] = useState<ContentItem | null>(null);

  useEffect(() => {
    const fetchContent = async () => {
      const currentLang = i18n.language === 'en' ? 'en' : 'zh_tw';
      const items = await loadMarkdownContent('references', currentLang);
      setReferenceItems(items);
      
      if (selectedItem) {
        const updatedItem = items.find(item => item.id === selectedItem.id);
        if (updatedItem) {
          setSelectedItem(updatedItem);
        }
      }
    };
    fetchContent();
  }, [i18n.language, selectedItem]);

  const allTags = useMemo(() => {
    const tags = new Set<string>();
    referenceItems.forEach(item => {
      if (item.tags && Array.isArray(item.tags)) {
        item.tags.forEach(tag => tags.add(tag));
      }
    });
    return Array.from(tags).sort();
  }, [referenceItems]);

  const filteredItems = referenceItems.filter(item => {
    const matchesSearch = (item.title || '').toLowerCase().includes(searchTerm.toLowerCase()) ||
      (item.tags || []).some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()));
    const matchesTag = selectedTag ? (item.tags || []).includes(selectedTag) : true;
    return matchesSearch && matchesTag;
  });

  return (
    <div className="bg-transparent py-12 md:py-20 lg:py-24">
      <Container>
        <div className="text-center mb-16">
          <h1 className="text-4xl font-black text-gray-900 dark:text-white mb-3 tracking-tight">{t('references.title')}</h1>
          <p className="text-lg text-gray-500 dark:text-gray-400 font-medium max-w-2xl mx-auto">{t('references.subtitle')}</p>
        </div>

        <Row className="mb-12 justify-content-center">
          <Col lg={8}>
            <SearchInput 
              value={searchTerm} 
              onChange={setSearchTerm} 
              placeholder={t('references.search_placeholder')} 
            />
            <TagCloud 
              tags={allTags} 
              selectedTag={selectedTag} 
              onTagSelect={setSelectedTag} 
            />
          </Col>
        </Row>

        <Row className="g-6">
          {filteredItems.map(item => (
            <Col key={item.id} lg={item.type === 'tutorial' ? 6 : 3} md={6}>
              <ContentCard item={item} onClick={() => setSelectedItem(item)} />
            </Col>
          ))}

          {filteredItems.length === 0 && (
            <Col xs={12}>
              <div className="glass-card p-20 text-center rounded-[3rem]">
                <div className="text-7xl mb-6 opacity-20">🔍</div>
                <h3 className="text-2xl font-black text-gray-500 mb-2">{t('references.no_results')}</h3>
                <p className="text-gray-400 font-medium">{t('references.no_results_desc')}</p>
              </div>
            </Col>
          )}
        </Row>

        <ContentModal 
          item={selectedItem} 
          show={selectedItem !== null} 
          onHide={() => setSelectedItem(null)} 
        />
      </Container>
    </div>
  );
};

export default References;
