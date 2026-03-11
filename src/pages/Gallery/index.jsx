import React, { useState } from 'react';
import { Container, Row, Col, Card, Badge, Form, InputGroup } from 'react-bootstrap';
import { Search, Image as ImageIcon, Filter } from 'lucide-react';

const Gallery = () => {
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
    <div className="bg-light dark:bg-gray-950 min-vh-100">
      <Container>
        <div className="d-flex flex-column flex-md-row justify-content-between align-items-center mb-12">
          <div className="text-center text-md-start mb-6 mb-md-0">
            <h1 className="display-4 font-extrabold text-indigo-600 dark:text-indigo-400 mb-2">Gallery</h1>
            <p className="lead text-gray-600 dark:text-gray-400">A visual record of the modeling process.</p>
          </div>
          
          <div className="w-100 max-w-md">
            <InputGroup size="lg" className="shadow-sm rounded-4 overflow-hidden border-0">
              <InputGroup.Text className="bg-white dark:bg-gray-800 border-0 pl-4">
                <Search className="text-gray-400" size={20} />
              </InputGroup.Text>
              <Form.Control 
                placeholder="Search by title or #tag..." 
                className="border-0 py-3 focus:ring-0 bg-white dark:bg-gray-800"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              <InputGroup.Text className="bg-white dark:bg-gray-800 border-0 pr-4">
                <Filter className="text-gray-400 cursor-pointer hover:text-indigo-600" size={20} />
              </InputGroup.Text>
            </InputGroup>
          </div>
        </div>

        <Row className="g-6">
          {filteredImages.map(img => (
            <Col key={img.id} lg={3} md={4} sm={6}>
              <Card className="h-100 border-0 shadow-sm rounded-4 overflow-hidden group hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
                <div className="h-48 bg-gray-200 dark:bg-gray-800 flex items-center justify-center relative overflow-hidden">
                  <ImageIcon className="text-gray-400 group-hover:scale-110 transition-transform duration-500" size={48} />
                  <div className="absolute inset-0 bg-indigo-600/0 group-hover:bg-indigo-600/10 transition-colors duration-300"></div>
                </div>
                <Card.Body className="p-4 bg-white dark:bg-gray-900">
                  <Card.Title className="h5 font-bold mb-3">{img.title}</Card.Title>
                  <div className="flex flex-wrap gap-2">
                    {img.tags.map(tag => (
                      <Badge 
                        key={tag} 
                        bg="none" 
                        className="px-2 py-1 rounded-pill text-[10px] font-bold uppercase tracking-wider border border-indigo-100 dark:border-indigo-800 text-indigo-600 dark:text-indigo-400 bg-indigo-50/50 dark:bg-indigo-900/20"
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
          <div className="text-center py-20 bg-white dark:bg-gray-900 rounded-5 shadow-sm mt-8 border border-gray-100 dark:border-gray-800">
            <div className="display-1 mb-4 opacity-20">🖼️</div>
            <h3 className="h4 font-bold text-gray-500">No matches found for "{searchTerm}"</h3>
            <p className="text-gray-400">Try searching for different tags like #WIP or #Finished</p>
          </div>
        )}
      </Container>
    </div>
  );
};

export default Gallery;
