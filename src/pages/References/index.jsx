import React, { useState, useMemo, useEffect } from 'react';
import { Container, Row, Col, Card, Badge, Form, InputGroup, Button, Modal, Carousel } from 'react-bootstrap';
import { Search, PlayCircle, Image as ImageIcon, Clock, ArrowRight, X, ExternalLink } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import ReactMarkdown from 'react-markdown';
import { loadMarkdownContent } from '../../utils/contentLoader';

const References = () => {
  const { t, i18n } = useTranslation();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedTag, setSelectedTag] = useState(null);
  const [referenceItems, setReferenceItems] = useState([]);
  const [selectedItem, setSelectedItem] = useState(null);

  useEffect(() => {
    const fetchContent = async () => {
      const currentLang = i18n.language === 'en' ? 'en' : 'zh_tw';
      const items = await loadMarkdownContent('references', currentLang);
      setReferenceItems(items);
      
      // If there was a selected item, update it from the fresh items
      if (selectedItem) {
        const updatedItem = items.find(item => item.id === selectedItem.id);
        if (updatedItem) {
          setSelectedItem(updatedItem);
        }
      }
    };
    fetchContent();
  }, [i18n.language, i18n, selectedItem]);

  const allTags = useMemo(() => {
    const tags = new Set();
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

        {/* Search and Filter Section */}
        <Row className="mb-12 justify-content-center">
          <Col lg={8}>
            <Card className="glass-card border-0 rounded-[2rem] overflow-hidden p-2 mb-8">
              <Card.Body className="p-0">
                <InputGroup size="lg" className="border-0">
                  <InputGroup.Text className="bg-transparent border-0 pl-6">
                    <Search className="text-gray-400 w-6 h-6" />
                  </InputGroup.Text>
                  <Form.Control 
                    placeholder={t('references.search_placeholder')} 
                    className="border-0 py-4 focus:ring-0 bg-transparent dark:text-white text-lg font-medium placeholder:text-gray-400"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </InputGroup>
              </Card.Body>
            </Card>

            {/* Tag Cloud */}
            <div className="flex flex-wrap justify-center gap-3 mb-4">
              <Button
                variant={selectedTag === null ? "indigo" : "outline-indigo"}
                className={`rounded-xl px-4 py-2 font-bold text-sm transition-all border-2 ${selectedTag === null ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-500/30 border-indigo-600' : 'text-gray-500 dark:text-gray-400 border-gray-100 dark:border-gray-800 hover:border-indigo-600 hover:text-indigo-600'}`}
                onClick={() => setSelectedTag(null)}
              >
                {t('references.all_tags')}
              </Button>
              {allTags.map(tag => (
                <Button
                  key={tag}
                  variant={selectedTag === tag ? "indigo" : "outline-indigo"}
                  className={`rounded-xl px-4 py-2 font-bold text-sm transition-all border-2 ${selectedTag === tag ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-500/30 border-indigo-600' : 'text-gray-500 dark:text-gray-400 border-gray-100 dark:border-gray-800 hover:border-indigo-600 hover:text-indigo-600'}`}
                  onClick={() => setSelectedTag(tag)}
                >
                  #{tag}
                </Button>
              ))}
            </div>
          </Col>
        </Row>

        {/* Results Grid */}
        <Row className="g-6">
          {filteredItems.map(item => (
            <Col key={item.id} lg={item.type === 'tutorial' ? 6 : 3} md={6}>
              <Card className="glass-card h-100 border-0 rounded-[2.5rem] overflow-hidden group hover:scale-[1.02] transition-all duration-500">
                {item.type === 'tutorial' ? (
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
                      onClick={() => setSelectedItem(item)}
                    >
                      {t('home.btn_start_learning')} <ArrowRight size={20} />
                    </Button>
                  </Card.Body>
                ) : (
                  <>
                    <div 
                      className="h-56 bg-gray-100 dark:bg-gray-800/50 flex items-center justify-center relative overflow-hidden cursor-pointer"
                      onClick={() => setSelectedItem(item)}
                    >
                      {item.images && item.images.length > 0 ? (
                        <img 
                          src={item.images[0].image_url} 
                          alt={item.images[0].image_title || item.title}
                          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                        />
                      ) : (
                        <ImageIcon className="text-gray-300 dark:text-gray-600 group-hover:scale-110 transition-transform duration-700" size={56} />
                      )}
                      <Badge className="absolute top-4 right-4 bg-pink-600 text-white rounded-lg px-2 py-1 text-[9px] font-black uppercase tracking-wider border-0 shadow-lg shadow-pink-600/20">
                        {t('references.type_image')}
                      </Badge>
                    </div>
                    <Card.Body className="p-6">
                      <Card.Title 
                        as="h3"
                        className="text-lg font-black mb-3 dark:text-white group-hover:text-indigo-600 transition-colors cursor-pointer"
                        onClick={() => setSelectedItem(item)}
                      >
                        {item.title}
                      </Card.Title>
                      <div className="flex flex-wrap gap-2">
                        {(item.tags || []).map(tag => (
                          <span key={tag} className="text-[10px] font-bold text-gray-400 dark:text-gray-500">#{tag}</span>
                        ))}
                      </div>
                    </Card.Body>
                  </>
                )}
              </Card>
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

        {/* Detail Modal */}
        <Modal 
          show={selectedItem !== null} 
          onHide={() => setSelectedItem(null)}
          centered
          size="lg"
          contentClassName="glass-card border-0 rounded-[2.5rem] overflow-hidden"
        >
          <Modal.Header className="border-0 p-8 pb-0 flex items-center justify-between">
            <Badge className="bg-indigo-600 text-white rounded-xl px-4 py-2 font-black uppercase tracking-widest text-[10px]">
              {selectedItem?.type === 'tutorial' ? t('references.type_tutorial') : t('references.type_image')}
            </Badge>
            <Button 
              variant="link" 
              className="p-2 text-gray-400 hover:text-indigo-600 transition-colors"
              onClick={() => setSelectedItem(null)}
            >
              <X size={24} />
            </Button>
          </Modal.Header>
          <Modal.Body className="p-8 md:p-12 pt-4">
            {selectedItem?.images && selectedItem.images.length > 0 && (
              <div className="mb-10 rounded-[2rem] overflow-hidden shadow-2xl bg-gray-100 dark:bg-gray-800">
                <Carousel interval={null} indicators={selectedItem.images.length > 1} controls={selectedItem.images.length > 1}>
                  {selectedItem.images.map((img, idx) => (
                    <Carousel.Item key={idx}>
                      <div className="relative group/carousel">
                        <img 
                          src={img.image_url} 
                          alt={img.image_title || `${selectedItem.title} ${idx + 1}`}
                          className="w-full aspect-video object-cover"
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
              <h2 className="text-3xl md:text-4xl font-black dark:text-white mb-0">{selectedItem?.title}</h2>
              {selectedItem?.origin_url && (
                <a 
                  href={selectedItem.origin_url} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-gray-100 dark:bg-gray-800 text-indigo-600 dark:text-indigo-400 font-bold text-sm no-underline hover:bg-indigo-50 dark:hover:bg-indigo-900/30 transition-all w-fit"
                >
                  <ExternalLink size={16} /> {t('portfolio.source')}
                </a>
              )}
            </div>
            {selectedItem?.type === 'tutorial' && (
              <div className="flex flex-wrap items-center gap-6 mb-8 text-sm font-bold text-gray-500 dark:text-gray-400">
                <span className="flex items-center gap-2">
                  <Clock size={20} className="text-indigo-600" /> {selectedItem?.duration}
                </span>
                <span className="px-3 py-1.5 rounded-lg bg-gray-100 dark:bg-gray-800 text-[12px] uppercase tracking-wider">
                  {selectedItem?.level}
                </span>
              </div>
            )}
            <div className="prose dark:prose-invert max-w-none dark:text-gray-300 font-medium leading-loose">
              <ReactMarkdown>{selectedItem?.content}</ReactMarkdown>
            </div>
          </Modal.Body>
        </Modal>
      </Container>
    </div>
  );
};

export default References;
