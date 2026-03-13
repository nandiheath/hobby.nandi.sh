import React from 'react';
import ReactMarkdown from 'react-markdown';

interface MarkdownViewProps {
  content: string;
}

const MarkdownView: React.FC<MarkdownViewProps> = ({ content }) => {
  return (
    <div className="prose dark:prose-invert max-w-none dark:text-gray-300 font-medium leading-loose">
      <ReactMarkdown>{content}</ReactMarkdown>
    </div>
  );
};

export default MarkdownView;
