import React, { useState } from 'react';
import { Container, Row, Col, ListGroup, InputGroup, Form, Card, Badge } from 'react-bootstrap';
import { Search, Clock, PlayCircle, ArrowRight } from 'lucide-react';
import { useTranslation } from 'react-i18next';

const Tutorials = () => {
  const { t } = useTranslation();
  const [searchTerm, setSearchTerm] = useState('');
  
  const tutorials = [
    { id: 1, title: "Edge Highlighting Basics", duration: "10 mins", level: "Beginner" },
    { id: 2, title: "Weathering with Sponges", duration: "15 mins", level: "Intermediate" },
    { id: 3, title: "Creating Realistic Rust", duration: "25 mins", level: "Advanced" },
    { id: 4, title: "Working with Photo Etch", duration: "20 mins", level: "Intermediate" }
  ];

  const filteredTutorials = tutorials.filter(t => 
    t.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="bg-transparent">
      <Container className="max-w-4xl">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-black text-gray-900 dark:text-white mb-3 tracking-tight">{t('tutorials.title')}</h1>
          <p className="text-lg text-gray-500 dark:text-gray-400 font-medium">{t('tutorials.subtitle')}</p>
        </div>
        
        <Card className="glass-card border-0 rounded-[2rem] overflow-hidden mb-12 p-2">
          <Card.Body className="p-0">
            <InputGroup size="lg" className="border-0">
              <InputGroup.Text className="bg-transparent border-0 pl-6">
                <Search className="text-gray-400 w-6 h-6" />
              </InputGroup.Text>
              <Form.Control 
                placeholder={t('tutorials.search_placeholder')} 
                className="border-0 py-4 focus:ring-0 bg-transparent dark:text-white text-lg font-medium placeholder:text-gray-400 placeholder:font-normal"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </InputGroup>
          </Card.Body>
        </Card>

        <div className="space-y-6">
          {filteredTutorials.map(tutorial => (
            <div 
              key={tutorial.id} 
              className="glass-card p-6 md:p-10 rounded-[2.5rem] group hover:scale-[1.02] transition-all cursor-pointer border-0"
            >
              <Row className="align-items-center">
                <Col xs="auto">
                  <div className="w-16 h-16 rounded-2xl bg-indigo-600 text-white flex items-center justify-center shadow-lg shadow-indigo-600/30 group-hover:rotate-12 transition-transform">
                    <PlayCircle size={32} fill="white" />
                  </div>
                </Col>
                <Col className="ms-4">
                  <h3 className="text-2xl font-black mb-2 dark:text-white group-hover:text-indigo-600 transition-colors">
                    {tutorial.title}
                  </h3>
                  <div className="flex flex-wrap items-center gap-4 text-sm font-bold">
                    <span className="flex items-center gap-2 text-gray-500 dark:text-gray-400">
                      <Clock size={18} className="text-indigo-600" /> {tutorial.duration}
                    </span>
                    <Badge className="bg-indigo-100 dark:bg-indigo-900/40 text-indigo-600 dark:text-indigo-400 rounded-lg px-3 py-1.5 uppercase tracking-wider text-[11px] border-0">
                      {tutorial.level}
                    </Badge>
                  </div>
                </Col>
                <Col xs="auto" className="hidden md:block">
                  <div className="p-3 rounded-full bg-gray-100 dark:bg-gray-800 text-gray-400 group-hover:bg-indigo-600 group-hover:text-white transition-all">
                    <ArrowRight size={24} />
                  </div>
                </Col>
              </Row>
            </div>
          ))}
          
          {filteredTutorials.length === 0 && (
            <div className="glass-card p-20 text-center rounded-[3rem]">
              <div className="text-6xl mb-6 opacity-30">🔍</div>
              <h3 className="text-2xl font-black text-gray-500 mb-2">{t('tutorials.no_results')}</h3>
              <p className="text-gray-400 font-medium">{t('tutorials.no_results_desc')}</p>
            </div>
          )}
        </div>
      </Container>
    </div>
  );
};

export default Tutorials;
