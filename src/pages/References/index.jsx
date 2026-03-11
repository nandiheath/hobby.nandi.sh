import React, { useState, useMemo } from 'react';
import { Container, Row, Col, Card, Badge, Form, InputGroup, Button } from 'react-bootstrap';
import { Search, PlayCircle, Image as ImageIcon, Clock, ArrowRight, Tag } from 'lucide-react';
import { useTranslation } from 'react-i18next';

const References = () => {
  const { t } = useTranslation();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedTag, setSelectedTag] = useState(null);

  const referenceItems = useMemo(() => [
    { id: 1, type: 'tutorial', title: "Edge Highlighting Basics", duration: "10 mins", level: "Beginner", tags: ["Painting", "Basics"] },
    { id: 2, type: 'tutorial', title: "Weathering with Sponges", duration: "15 mins", level: "Intermediate", tags: ["Weathering", "Technique"] },
    { id: 3, type: 'tutorial', title: "Creating Realistic Rust", duration: "25 mins", level: "Advanced", tags: ["Weathering", "Advanced"] },
    { id: 4, type: 'tutorial', title: "Working with Photo Etch", duration: "20 mins", level: "Intermediate", tags: ["Assembly", "Technique"] },
    { id: 5, type: 'image', title: "Base Coating Session", tags: ["WIP", "Technique"] },
    { id: 6, type: 'image', title: "Final Polish Detail", tags: ["Finished", "Detail"] },
    { id: 7, type: 'image', title: "Workshop Setup", tags: ["Workspace"] },
    { id: 8, type: 'image', title: "Airbrushing Progress", tags: ["WIP", "Tools"] }
  ], []);

  const allTags = useMemo(() => {
    const tags = new Set();
    referenceItems.forEach(item => {
      item.tags.forEach(tag => tags.add(tag));
    });
    return Array.from(tags).sort();
  }, [referenceItems]);

  const filteredItems = referenceItems.filter(item => {
    const matchesSearch = item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()));
    const matchesTag = selectedTag ? item.tags.includes(selectedTag) : true;
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
                      {item.tags.map(tag => (
                        <span key={tag} className="text-xs font-bold text-indigo-500 dark:text-indigo-400">#{tag}</span>
                      ))}
                    </div>
                    <Button variant="link" className="p-0 text-indigo-600 dark:text-indigo-400 font-black no-underline flex items-center gap-2 hover:gap-4 transition-all mt-auto">
                      {t('home.btn_start_learning')} <ArrowRight size={20} />
                    </Button>
                  </Card.Body>
                ) : (
                  <>
                    <div className="h-56 bg-gray-100 dark:bg-gray-800/50 flex items-center justify-center relative overflow-hidden">
                      <ImageIcon className="text-gray-300 dark:text-gray-600 group-hover:scale-110 transition-transform duration-700" size={56} />
                      <Badge className="absolute top-4 right-4 bg-pink-600 text-white rounded-lg px-2 py-1 text-[9px] font-black uppercase tracking-wider border-0 shadow-lg shadow-pink-600/20">
                        {t('references.type_image')}
                      </Badge>
                    </div>
                    <Card.Body className="p-6">
                      <Card.Title className="text-lg font-black mb-3 dark:text-white group-hover:text-indigo-600 transition-colors">{item.title}</Card.Title>
                      <div className="flex flex-wrap gap-2">
                        {item.tags.map(tag => (
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
      </Container>
    </div>
  );
};

export default References;
