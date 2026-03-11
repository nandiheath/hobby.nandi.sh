import React from 'react';
import { Container, Row, Col, Card, Badge, Button } from 'react-bootstrap';
import { Filter, ArrowRight } from 'lucide-react';
import { useTranslation } from 'react-i18next';

const Portfolio = () => {
  const { t } = useTranslation();
  const projects = [
    { id: 1, title: "Stormcast Eternal", category: "Miniature", description: "Detailed gold armor with blue accents." },
    { id: 2, title: "WWII Tank Diorama", category: "Model", description: "A muddy winter scene in 1/35 scale." },
    { id: 3, title: "Cyberpunk Street Scene", category: "Terrain", description: "Neon-lit urban environment with scratch-built details." }
  ];

  return (
    <div className="bg-transparent">
      <Container>
        <div className="d-flex flex-column flex-md-row justify-content-between align-items-center mb-12 text-center text-md-start gap-4">
          <div>
            <h1 className="text-4xl font-black text-gray-900 dark:text-white mb-2 tracking-tight">{t('portfolio.title')}</h1>
            <p className="text-lg text-gray-500 dark:text-gray-400 font-medium">{t('portfolio.subtitle')}</p>
          </div>
          <Button variant="outline-indigo" className="rounded-2xl px-5 py-3 font-black border-2 flex items-center gap-2 hover:bg-indigo-600 hover:text-white transition-all">
            <Filter size={20} /> {t('portfolio.filter_btn')}
          </Button>
        </div>
        
        <Row className="g-8">
          {projects.map(project => (
            <Col key={project.id} lg={4} md={6}>
              <Card className="glass-card h-100 border-0 rounded-[2.5rem] overflow-hidden group transition-all duration-500 hover:-translate-y-4">
                <div className="h-72 bg-gray-100 dark:bg-gray-800/50 flex items-center justify-center relative overflow-hidden">
                  {/* Placeholder for actual images */}
                  <div className="absolute inset-0 bg-gradient-to-tr from-indigo-500/10 to-purple-500/10 group-hover:scale-110 transition-transform duration-700"></div>
                  <span className="text-gray-400 font-black text-xl opacity-30 uppercase tracking-widest">{project.category}</span>
                  <Badge className="absolute top-6 left-6 rounded-xl px-4 py-2 bg-indigo-600 text-white font-black shadow-lg shadow-indigo-600/30">
                    {project.category}
                  </Badge>
                </div>
                <Card.Body className="p-10">
                  <Card.Title className="text-2xl font-black mb-4 dark:text-white group-hover:text-indigo-600 transition-colors">
                    {project.title}
                  </Card.Title>
                  <Card.Text className="text-gray-600 dark:text-gray-400 font-medium leading-relaxed mb-8">
                    {project.description}
                  </Card.Text>
                  <Button variant="link" className="p-0 text-indigo-600 dark:text-indigo-400 font-black no-underline flex items-center gap-2 hover:gap-4 transition-all">
                    {t('portfolio.explore_btn')} <ArrowRight size={20} />
                  </Button>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
      </Container>
    </div>
  );
};

export default Portfolio;
