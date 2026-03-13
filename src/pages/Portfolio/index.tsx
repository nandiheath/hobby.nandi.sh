import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Button } from 'react-bootstrap';
import { Filter } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { loadMarkdownContent, ContentItem } from '../../utils/contentLoader';
import ContentCard from '../../components/common/ContentCard';
import ContentModal from '../../components/common/ContentModal';

const Portfolio: React.FC = () => {
  const { t, i18n } = useTranslation();
  const [projects, setProjects] = useState<ContentItem[]>([]);
  const [selectedProject, setSelectedProject] = useState<ContentItem | null>(null);

  useEffect(() => {
    const fetchContent = async () => {
      const currentLang = i18n.language === 'en' ? 'en' : 'zh_tw';
      const items = await loadMarkdownContent('portfolio', currentLang);
      setProjects(items);

      setSelectedProject(prev => {
        if (!prev) return null;
        return items.find(p => p.id === prev.id) || null;
      });
    };
    fetchContent();
  }, [i18n.language]);

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
              <ContentCard item={project} onClick={() => setSelectedProject(project)} />
            </Col>
          ))}
        </Row>

        <ContentModal 
          item={selectedProject} 
          show={selectedProject !== null} 
          onHide={() => setSelectedProject(null)} 
        />
      </Container>
    </div>
  );
};

export default Portfolio;
