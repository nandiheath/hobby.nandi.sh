import React, { useEffect } from 'react';
import { Routes, Route, useLocation, useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Portfolio from './pages/Portfolio';
import Tutorials from './pages/Tutorials';
import Gallery from './pages/Gallery';

function App() {
  const { t, i18n } = useTranslation();
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const pathParts = location.pathname.split('/');
    const langInPath = pathParts[1];
    
    if (langInPath === 'en') {
      if (i18n.language !== 'en') {
        i18n.changeLanguage('en');
      }
    } else {
      if (i18n.language !== 'zh') {
        i18n.changeLanguage('zh');
      }
    }
  }, [location.pathname, i18n]);

  return (
    <div className="min-h-screen bg-transparent flex flex-col font-sans selection:bg-indigo-100 selection:text-indigo-900">
      <Navbar />
      <main className="flex-grow py-12 md:py-20 lg:py-24">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/portfolio" element={<Portfolio />} />
          <Route path="/tutorials" element={<Tutorials />} />
          <Route path="/gallery" element={<Gallery />} />
          
          <Route path="/en">
            <Route index element={<Home />} />
            <Route path="portfolio" element={<Portfolio />} />
            <Route path="tutorials" element={<Tutorials />} />
            <Route path="gallery" element={<Gallery />} />
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
