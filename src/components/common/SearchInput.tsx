import React from 'react';
import { Card, Form, InputGroup } from 'react-bootstrap';
import { Search } from 'lucide-react';

interface SearchInputProps {
  value: string;
  onChange: (value: string) => void;
  placeholder: string;
}

const SearchInput: React.FC<SearchInputProps> = ({ value, onChange, placeholder }) => {
  return (
    <Card className="glass-card border-0 rounded-[2rem] overflow-hidden p-2 mb-8">
      <Card.Body className="p-0">
        <InputGroup size="lg" className="border-0">
          <InputGroup.Text className="bg-transparent border-0 pl-6">
            <Search className="text-gray-400 w-6 h-6" />
          </InputGroup.Text>
          <Form.Control 
            placeholder={placeholder} 
            className="border-0 py-4 focus:ring-0 bg-transparent dark:text-white text-lg font-medium placeholder:text-gray-400"
            value={value}
            onChange={(e) => onChange(e.target.value)}
          />
        </InputGroup>
      </Card.Body>
    </Card>
  );
};

export default SearchInput;
