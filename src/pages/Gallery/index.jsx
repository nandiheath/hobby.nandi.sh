import React, { useState } from 'react';
import { Container, Row, Col, Card, Badge, Form, InputGroup } from 'react-bootstrap';
import { Search, Image as ImageIcon, Filter, Maximize2 } from 'lucide-react';
import { useTranslation } from 'react-i18next';

const Gallery = () => {
  const { t } = useTranslation();
  const [searchTerm, setSearchTerm] = useState('');
  
  const images = [
    { id: 1, title: "Base Coating", tags: ["WIP", "Technique"] },
    { id: 2, title: "Final Polish", tags: ["Finished", "Detail"] },
    { id: 3, title: "Workshop Setup", tags: ["Workspace"] },
    { id: 4, title: "Airbrushing Session", tags: ["WIP", "Tools"] }
  ];

  const filteredImages = images.filter(img => 
    img.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    img.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  return (
    <div className="bg-transparent">
      <Container>
        <div className="d-flex flex-column flex-md-row justify-content-between align-items-center mb-16 gap-6">
          <div className="text-center text-md-start">
            <h1 className="text-4xl font-black text-gray-900 dark:text-white mb-2 tracking-tight">{t('gallery.title')}</h1>
            <p className="text-lg text-gray-500 dark:text-gray-400 font-medium">{t('gallery.subtitle')}</p>
          </div>
          
          <div className="w-100 max-w-md">
            <Card className="glass-card border-0 rounded-2xl overflow-hidden p-1">
              <InputGroup size="lg" className="border-0 bg-transparent">
                <InputGroup.Text className="bg-transparent border-0 pl-4">
                  <Search className="text-gray-400" size={20} />
                </InputGroup.Text>
                <Form.Control 
                  placeholder={t('gallery.search_placeholder')} 
                  className="border-0 py-3 focus:ring-0 bg-transparent dark:text-white font-medium"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
                <InputGroup.Text className="bg-transparent border-0 pr-4">
                  <Filter className="text-gray-400 cursor-pointer hover:text-indigo-600" size={20} />
                </InputGroup.Text>
              </InputGroup>
            </Card>
          </div>
        </div>

        <Row className="g-6">
          {filteredImages.map(img => (
            <Col key={img.id} lg={3} md={4} sm={6}>
              <Card className="glass-card h-100 border-0 rounded-[2rem] overflow-hidden group hover:scale-[1.05] transition-all duration-500">
                <div className="h-56 bg-gray-100 dark:bg-gray-800/50 flex items-center justify-center relative overflow-hidden">
                  <ImageIcon className="text-gray-300 dark:text-gray-600 group-hover:scale-125 transition-transform duration-700" size={64} />
                  <div className="absolute inset-0 bg-indigo-600/0 group-hover:bg-indigo-600/20 transition-all duration-500 flex items-center justify-center">
                    <Maximize2 className="text-white opacity-0 group-hover:opacity-100 transform translate-y-4 group-hover:translate-y-0 transition-all duration-500" size={32} />
                  </div>
                </div>
                <Card.Body className="p-6">
                  <Card.Title className="text-xl font-black mb-4 dark:text-white">{img.title}</Card.Title>
                  <div className="flex flex-wrap gap-2">
                    {img.tags.map(tag => (
                      <Badge 
                        key={tag} 
                        className="px-3 py-1.5 rounded-xl text-[10px] font-black uppercase tracking-widest border-0 bg-gray-100 dark:bg-gray-800 text-gray-500 dark:text-gray-400 group-hover:bg-indigo-600 group-hover:text-white transition-colors"
                      >
                        #{tag}
                      </Badge>
                    ))}
                  </div>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
        
        {filteredImages.length === 0 && (
          <div className="glass-card p-20 text-center rounded-[3rem] mt-12">
            <div className="text-7xl mb-6 opacity-20">🖼️</div>
            <h3 className="text-2xl font-black text-gray-500 mb-2">{t('gallery.no_results')}</h3>
            <p className="text-gray-400 font-medium">{t('gallery.no_results_desc')}</p>
          </div>
        )}
      </Container>
    </div>
  );
};

export default Gallery;
