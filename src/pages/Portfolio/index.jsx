import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Card, Badge, Button, Modal, Carousel } from 'react-bootstrap';
import { Filter, ArrowRight, X, ExternalLink } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import ReactMarkdown from 'react-markdown';
import { loadMarkdownContent } from '../../utils/contentLoader';

const Portfolio = () => {
  const { t, i18n } = useTranslation();
  const [projects, setProjects] = useState([]);
  const [selectedProject, setSelectedProject] = useState(null);

  useEffect(() => {
    const fetchContent = async () => {
      const currentLang = i18n.language === 'en' ? 'en' : 'zh_tw';
      const items = await loadMarkdownContent('portfolio', currentLang);
      setProjects(items);

      if (selectedProject) {
        const updated = items.find(p => p.id === selectedProject.id);
        if (updated) setSelectedProject(updated);
      }
    };
    fetchContent();
  }, [i18n.language, i18n, selectedProject]);

  return (
    <div className="bg-transparent py-12 md:py-20 lg:py-24">
      <Container>
        <div className="d-flex flex-column flex-md-row justify-content-between align-items-center mb-16 text-center text-md-start gap-6">
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
                  {project.images && project.images.length > 0 ? (
                    <img 
                      src={project.images[0].image_url} 
                      alt={project.images[0].image_title || project.title}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                    />
                  ) : (
                    <>
                      <div className="absolute inset-0 bg-gradient-to-tr from-indigo-500/10 to-purple-500/10 group-hover:scale-110 transition-transform duration-700"></div>
                      <span className="text-gray-400 font-black text-xl opacity-30 uppercase tracking-widest">{project.category}</span>
                    </>
                  )}
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
                  <Button 
                    variant="link" 
                    className="p-0 text-indigo-600 dark:text-indigo-400 font-black no-underline flex items-center gap-2 hover:gap-4 transition-all"
                    onClick={() => setSelectedProject(project)}
                  >
                    {t('portfolio.explore_btn')} <ArrowRight size={20} />
                  </Button>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>

        {/* Detail Modal */}
        <Modal 
          show={selectedProject !== null} 
          onHide={() => setSelectedProject(null)}
          centered
          size="lg"
          contentClassName="glass-card border-0 rounded-[2.5rem] overflow-hidden"
        >
          <Modal.Header className="border-0 p-8 pb-0 flex items-center justify-between">
            <Badge className="bg-indigo-600 text-white rounded-xl px-4 py-2 font-black shadow-lg shadow-indigo-600/30">
              {selectedProject?.category}
            </Badge>
            <Button 
              variant="link" 
              className="p-2 text-gray-400 hover:text-indigo-600 transition-colors"
              onClick={() => setSelectedProject(null)}
            >
              <X size={24} />
            </Button>
          </Modal.Header>
          <Modal.Body className="p-8 md:p-12 pt-4">
            {selectedProject?.images && selectedProject.images.length > 0 && (
              <div className="mb-10 rounded-[2rem] overflow-hidden shadow-2xl bg-gray-100 dark:bg-gray-800">
                <Carousel interval={null} indicators={selectedProject.images.length > 1} controls={selectedProject.images.length > 1}>
                  {selectedProject.images.map((img, idx) => (
                    <Carousel.Item key={idx}>
                      <div className="relative group/carousel">
                        <img 
                          src={img.image_url} 
                          alt={img.image_title || `${selectedProject.title} ${idx + 1}`}
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
              <h2 className="text-3xl md:text-4xl font-black dark:text-white mb-0">{selectedProject?.title}</h2>
              {selectedProject?.origin_url && (
                <a 
                  href={selectedProject.origin_url} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-gray-100 dark:bg-gray-800 text-indigo-600 dark:text-indigo-400 font-bold text-sm no-underline hover:bg-indigo-50 dark:hover:bg-indigo-900/30 transition-all w-fit"
                >
                  <ExternalLink size={16} /> {t('portfolio.source')}
                </a>
              )}
            </div>
            <div className="prose dark:prose-invert max-w-none dark:text-gray-300 font-medium leading-loose">
              <ReactMarkdown>{selectedProject?.content}</ReactMarkdown>
            </div>
            <div className="mt-10 flex flex-wrap gap-2">
              {selectedProject?.tags?.map(tag => (
                <span key={tag} className="px-3 py-1 rounded-lg bg-gray-100 dark:bg-gray-800 text-xs font-bold text-gray-500">#{tag}</span>
              ))}
            </div>
          </Modal.Body>
        </Modal>
      </Container>
    </div>
  );
};

export default Portfolio;
