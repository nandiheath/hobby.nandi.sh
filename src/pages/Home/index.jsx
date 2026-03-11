import React from 'react';
import { Container, Row, Col, Card, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { ArrowRight, Palette, Book } from 'lucide-react';
import { useTranslation } from 'react-i18next';

const Home = () => {
  const { t, i18n } = useTranslation();
  const base = i18n.language === 'en' ? '/en' : '';

  return (
    <div className="bg-transparent py-12 md:py-20 lg:py-24">
      <Container>
        {/* Hero Section */}
        <div className="relative overflow-hidden mb-24 p-12 md:p-20 bg-gray-900 rounded-3xl md:rounded-[3rem] shadow-2xl text-center text-white">
          <div className="absolute inset-0 hero-gradient opacity-90"></div>
          <div className="relative z-10">
            <h1 className="text-4xl md:text-7xl font-black mb-6 tracking-tight leading-tight">
              {t('home.hero_title_line1')} <br/><span className="text-indigo-200">{t('home.hero_title_accent')}</span>
            </h1>
            <p className="text-xl md:text-2xl text-indigo-100 mb-10 max-w-2xl mx-auto font-medium opacity-90 leading-relaxed">
              {t('home.hero_desc')}
            </p>
            <div className="flex flex-col sm:flex-row justify-center items-center gap-5">
              <Button as={Link} to={`${base}/portfolio`} className="bg-white text-indigo-700 hover:bg-indigo-50 border-0 px-8 py-4 rounded-2xl font-black text-lg transition-all transform hover:scale-105 shadow-xl">
                {t('home.btn_view_work')}
              </Button>
              <Button as={Link} to={`${base}/references`} className="bg-indigo-500/20 backdrop-blur-md text-white hover:bg-indigo-500/30 border border-white/30 px-8 py-4 rounded-2xl font-black text-lg transition-all transform hover:scale-105">
                {t('home.btn_start_learning')}
              </Button>
            </div>
          </div>
          {/* Decorative background element */}
          <div className="absolute -bottom-24 -right-24 w-96 h-96 bg-white/10 rounded-full blur-3xl"></div>
          <div className="absolute -top-24 -left-24 w-96 h-96 bg-indigo-500/20 rounded-full blur-3xl"></div>
        </div>

        {/* Feature Cards Section */}
        <div className="mb-10 text-center">
          <h2 className="text-3xl font-black mb-2 dark:text-white">{t('home.section_title')}</h2>
          <p className="text-gray-500 dark:text-gray-400">{t('home.section_desc')}</p>
        </div>

        <Row className="g-5 justify-content-center">
          <Col md={5}>
            <Card className="glass-card h-100 border-0 rounded-[2rem] overflow-hidden group transition-all duration-500 hover:-translate-y-3">
              <Card.Body className="p-10 text-center">
                <div className="w-16 h-16 bg-indigo-100 dark:bg-indigo-500/20 text-indigo-600 dark:text-indigo-400 rounded-2xl flex items-center justify-center mb-8 mx-auto transform group-hover:rotate-12 transition-transform">
                  <Palette size={32} />
                </div>
                <Card.Title className="text-2xl font-black mb-4 dark:text-white">{t('home.portfolio_title')}</Card.Title>
                <Card.Text className="text-gray-600 dark:text-gray-400 leading-relaxed mb-8">
                  {t('home.portfolio_desc')}
                </Card.Text>
                <Link to={`${base}/portfolio`} className="inline-flex items-center gap-2 font-black text-indigo-600 dark:text-indigo-400 hover:gap-4 transition-all no-underline">
                  {t('home.portfolio_link')} <ArrowRight size={20} />
                </Link>
              </Card.Body>
            </Card>
          </Col>
          <Col md={5}>
            <Card className="glass-card h-100 border-0 rounded-[2rem] overflow-hidden group transition-all duration-500 hover:-translate-y-3">
              <Card.Body className="p-10 text-center">
                <div className="w-16 h-16 bg-purple-100 dark:bg-purple-500/20 text-purple-600 dark:text-purple-400 rounded-2xl flex items-center justify-center mb-8 mx-auto transform group-hover:rotate-12 transition-transform">
                  <Book size={32} />
                </div>
                <Card.Title className="text-2xl font-black mb-4 dark:text-white">{t('home.references_title')}</Card.Title>
                <Card.Text className="text-gray-600 dark:text-gray-400 leading-relaxed mb-8">
                  {t('home.references_desc')}
                </Card.Text>
                <Link to={`${base}/references`} className="inline-flex items-center gap-2 font-black text-purple-600 dark:text-purple-400 hover:gap-4 transition-all no-underline">
                  {t('home.references_link')} <ArrowRight size={20} />
                </Link>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default Home;
