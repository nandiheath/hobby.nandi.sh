import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Portfolio from './pages/Portfolio';
import Tutorials from './pages/Tutorials';
import Gallery from './pages/Gallery';

function App() {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950 text-gray-900 dark:text-gray-100">
      <Navbar />
      <main className="flex-grow py-8 md:py-16">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/portfolio" element={<Portfolio />} />
          <Route path="/tutorials" element={<Tutorials />} />
          <Route path="/gallery" element={<Gallery />} />
        </Routes>
      </main>
      <footer className="py-8 border-t text-center text-sm opacity-60">
        &copy; {new Date().getFullYear()} hobby.nandi.sh. All rights reserved.
      </footer>
    </div>
  );
}

export default App;
