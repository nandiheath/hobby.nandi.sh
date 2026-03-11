import React, { useState } from 'react';
import { Container, Row, Col, ListGroup, InputGroup, Form, Card } from 'react-bootstrap';
import { Search, Clock, PlayCircle } from 'lucide-react';

const Tutorials = () => {
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
    <div className="bg-light dark:bg-gray-950 min-vh-100">
      <Container className="max-w-4xl">
        <div className="text-center mb-12">
          <h1 className="display-4 font-extrabold text-indigo-600 dark:text-indigo-400 mb-3">Skill Tutorials</h1>
          <p className="lead text-gray-600 dark:text-gray-400">Master the art of miniature painting and model building.</p>
        </div>
        
        <Card className="border-0 shadow-sm rounded-4 overflow-hidden mb-10">
          <Card.Body className="p-2">
            <InputGroup size="lg" className="border-0">
              <InputGroup.Text className="bg-white dark:bg-gray-800 border-0 pl-4">
                <Search className="text-gray-400 w-6 h-6" />
              </InputGroup.Text>
              <Form.Control 
                placeholder="Search tutorials by title..." 
                className="border-0 py-4 focus:ring-0 bg-white dark:bg-gray-800 text-lg"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </InputGroup>
          </Card.Body>
        </Card>

        <ListGroup variant="flush" className="rounded-4 shadow-sm overflow-hidden border-0">
          {filteredTutorials.map(tutorial => (
            <ListGroup.Item 
              key={tutorial.id} 
              className="p-8 border-bottom border-gray-100 dark:border-gray-800 dark:bg-gray-900 hover:bg-indigo-50/30 dark:hover:bg-indigo-900/10 transition-all cursor-pointer group"
            >
              <Row className="align-items-center">
                <Col xs="auto">
                  <div className="w-14 h-14 rounded-full bg-indigo-100 dark:bg-indigo-900/30 text-indigo-600 dark:text-indigo-400 flex items-center justify-center group-hover:scale-110 transition-transform">
                    <PlayCircle size={28} />
                  </div>
                </Col>
                <Col className="ms-3">
                  <h3 className="h4 font-bold mb-1 group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">
                    {tutorial.title}
                  </h3>
                  <div className="flex flex-column flex-sm-row items-sm-center gap-2 gap-sm-4 text-sm text-gray-500 dark:text-gray-400 font-medium">
                    <span className="flex items-center gap-1"><Clock size={16} /> {tutorial.duration}</span>
                    <span className="px-2 py-0.5 rounded bg-gray-100 dark:bg-gray-800 uppercase tracking-wider text-[10px]">{tutorial.level}</span>
                  </div>
                </Col>
                <Col xs="auto">
                  <span className="text-indigo-600 font-bold opacity-0 group-hover:opacity-100 transition-opacity">Watch Now →</span>
                </Col>
              </Row>
            </ListGroup.Item>
          ))}
          {filteredTutorials.length === 0 && (
            <ListGroup.Item className="p-12 text-center bg-white dark:bg-gray-900">
              <div className="text-4xl mb-4">🔍</div>
              <p className="text-gray-500 dark:text-gray-400 text-lg">No tutorials found matching "{searchTerm}"</p>
            </ListGroup.Item>
          )}
        </ListGroup>
      </Container>
    </div>
  );
};

export default Tutorials;
