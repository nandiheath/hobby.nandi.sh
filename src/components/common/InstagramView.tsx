import React from 'react';
import { InstagramEmbed } from 'react-social-media-embed';

interface InstagramViewProps {
  url: string;
}

const InstagramView: React.FC<InstagramViewProps> = ({ url }) => {
  return (
    <div className="mb-10 rounded-4xl overflow-hidden shadow-2xl bg-gray-100 dark:bg-gray-800 flex justify-center">
      <InstagramEmbed url={url} width={328} />
    </div>
  );
};

export default InstagramView;
