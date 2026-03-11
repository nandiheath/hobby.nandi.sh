import React from 'react';
import { Container, Row, Col, Card, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { ArrowRight, Palette, Book, Camera } from 'lucide-react';

const Home = () => {
  return (
    <div className="bg-transparent">
      <Container>
        {/* Hero Section */}
        <div className="relative overflow-hidden mb-16 p-12 md:p-20 bg-gray-900 rounded-3xl md:rounded-[3rem] shadow-2xl text-center text-white">
          <div className="absolute inset-0 hero-gradient opacity-90"></div>
          <div className="relative z-10">
            <h1 className="text-4xl md:text-7xl font-black mb-6 tracking-tight leading-tight">
              Create. Build. <br/><span className="text-indigo-200">Inspire.</span>
            </h1>
            <p className="text-xl md:text-2xl text-indigo-100 mb-10 max-w-2xl mx-auto font-medium opacity-90 leading-relaxed">
              Exploring the artistry of miniatures, model building, and creative crafting through detailed tutorials and showcases.
            </p>
            <div className="flex flex-col sm:flex-row justify-center items-center gap-5">
              <Button as={Link} to="/portfolio" className="bg-white text-indigo-700 hover:bg-indigo-50 border-0 px-8 py-4 rounded-2xl font-black text-lg transition-all transform hover:scale-105 shadow-xl">
                View My Work
              </Button>
              <Button as={Link} to="/tutorials" className="bg-indigo-500/20 backdrop-blur-md text-white hover:bg-indigo-500/30 border border-white/30 px-8 py-4 rounded-2xl font-black text-lg transition-all transform hover:scale-105">
                Start Learning
              </Button>
            </div>
          </div>
          {/* Decorative background element */}
          <div className="absolute -bottom-24 -right-24 w-96 h-96 bg-white/10 rounded-full blur-3xl"></div>
          <div className="absolute -top-24 -left-24 w-96 h-96 bg-indigo-500/20 rounded-full blur-3xl"></div>
        </div>

        {/* Feature Cards Section */}
        <div className="mb-10 text-center">
          <h2 className="text-3xl font-black mb-2 dark:text-white">Explore the Hobby</h2>
          <p className="text-gray-500 dark:text-gray-400">Discover projects, techniques, and inspiration</p>
        </div>

        <Row className="g-5">
          <Col md={4}>
            <Card className="glass-card h-100 border-0 rounded-[2rem] overflow-hidden group transition-all duration-500 hover:-translate-y-3">
              <Card.Body className="p-10 text-center">
                <div className="w-16 h-16 bg-indigo-100 dark:bg-indigo-500/20 text-indigo-600 dark:text-indigo-400 rounded-2xl flex items-center justify-center mb-8 mx-auto transform group-hover:rotate-12 transition-transform">
                  <Palette size={32} />
                </div>
                <Card.Title className="text-2xl font-black mb-4 dark:text-white">Portfolio</Card.Title>
                <Card.Text className="text-gray-600 dark:text-gray-400 leading-relaxed mb-8">
                  Detailed showcases of finished miniatures and high-end models.
                </Card.Text>
                <Link to="/portfolio" className="inline-flex items-center gap-2 font-black text-indigo-600 dark:text-indigo-400 hover:gap-4 transition-all no-underline">
                  Browse Works <ArrowRight size={20} />
                </Link>
              </Card.Body>
            </Card>
          </Col>
          <Col md={4}>
            <Card className="glass-card h-100 border-0 rounded-[2rem] overflow-hidden group transition-all duration-500 hover:-translate-y-3">
              <Card.Body className="p-10 text-center">
                <div className="w-16 h-16 bg-purple-100 dark:bg-purple-500/20 text-purple-600 dark:text-purple-400 rounded-2xl flex items-center justify-center mb-8 mx-auto transform group-hover:rotate-12 transition-transform">
                  <Book size={32} />
                </div>
                <Card.Title className="text-2xl font-black mb-4 dark:text-white">Tutorials</Card.Title>
                <Card.Text className="text-gray-600 dark:text-gray-400 leading-relaxed mb-8">
                  Step-by-step guides for advanced painting and building techniques.
                </Card.Text>
                <Link to="/tutorials" className="inline-flex items-center gap-2 font-black text-purple-600 dark:text-purple-400 hover:gap-4 transition-all no-underline">
                  Learn More <ArrowRight size={20} />
                </Link>
              </Card.Body>
            </Card>
          </Col>
          <Col md={4}>
            <Card className="glass-card h-100 border-0 rounded-[2rem] overflow-hidden group transition-all duration-500 hover:-translate-y-3">
              <Card.Body className="p-10 text-center">
                <div className="w-16 h-16 bg-pink-100 dark:bg-pink-500/20 text-pink-600 dark:text-pink-400 rounded-2xl flex items-center justify-center mb-8 mx-auto transform group-hover:rotate-12 transition-transform">
                  <Camera size={32} />
                </div>
                <Card.Title className="text-2xl font-black mb-4 dark:text-white">Gallery</Card.Title>
                <Card.Text className="text-gray-600 dark:text-gray-400 leading-relaxed mb-8">
                  Raw captures, WIP shots, and visual inspiration from the workbench.
                </Card.Text>
                <Link to="/gallery" className="inline-flex items-center gap-2 font-black text-pink-600 dark:text-pink-400 hover:gap-4 transition-all no-underline">
                  View Assets <ArrowRight size={20} />
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
