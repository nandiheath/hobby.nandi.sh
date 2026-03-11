import React, { useEffect } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Portfolio from './pages/Portfolio';
import References from './pages/References';

function App() {
  const { t, i18n } = useTranslation();
  const location = useLocation();

  useEffect(() => {
    const pathParts = location.pathname.split('/');
    const langInPath = pathParts[1];
    
    if (langInPath === 'en') {
      if (i18n.language !== 'en') {
        i18n.changeLanguage('en');
      }
    } else {
      if (i18n.language !== 'zh_tw') {
        i18n.changeLanguage('zh_tw');
      }
    }
  }, [location.pathname, i18n]);

  return (
    <div className="min-h-screen bg-transparent flex flex-col font-sans selection:bg-indigo-100 selection:text-indigo-900">
      <Navbar />
      <main className="flex-grow pb-12 md:pb-20 lg:pb-24">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/portfolio" element={<Portfolio />} />
          <Route path="/references" element={<References />} />
          
          <Route path="/en">
            <Route index element={<Home />} />
            <Route path="portfolio" element={<Portfolio />} />
            <Route path="references" element={<References />} />
          </Route>
        </Routes>
      </main>
      <footer className="py-12 border-t border-gray-100 dark:border-gray-800 text-center">
        <div className="container mx-auto px-4">
          <p className="text-sm font-bold text-gray-400 dark:text-gray-500 tracking-widest uppercase mb-2">
            hobby.nandi.sh
          </p>
          <p className="text-xs text-gray-400 dark:text-gray-600">
            &copy; {new Date().getFullYear()} {t('footer.crafted')}
          </p>
        </div>
      </footer>
    </div>
  );
}

export default App;
