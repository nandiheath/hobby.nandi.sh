import React from 'react';
import { NavLink as RouterNavLink, useLocation, useNavigate } from 'react-router-dom';
import { Navbar as BootstrapNavbar, Nav, Container, NavDropdown } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import { Globe } from 'lucide-react';

const Navbar = () => {
  const { t, i18n } = useTranslation();
  const location = useLocation();
  const navigate = useNavigate();

  const isEn = i18n.language === 'en';
  const base = isEn ? '/en' : '';

  const navItems = [
    { name: t('navbar.home'), path: `${base}/` },
    { name: t('navbar.portfolio'), path: `${base}/portfolio` },
    { name: t('navbar.tutorials'), path: `${base}/tutorials` },
    { name: t('navbar.gallery'), path: `${base}/gallery` },
  ];

  const changeLanguage = (lng) => {
    const pathParts = location.pathname.split('/');
    if (lng === 'en') {
      if (pathParts[1] !== 'en') {
        navigate('/en' + location.pathname);
      }
    } else {
      if (pathParts[1] === 'en') {
        navigate(location.pathname.replace('/en', '') || '/');
      }
    }
  };

  return (
    <BootstrapNavbar expand="lg" sticky="top" className="bg-white/70 dark:bg-gray-950/70 backdrop-blur-xl border-bottom border-white/20 dark:border-gray-800/50 py-4">
      <Container>
        <BootstrapNavbar.Brand as={RouterNavLink} to={`${base}/`} className="text-2xl font-black tracking-tighter text-gray-900 dark:text-white d-flex align-items-center">
          <span className="bg-indigo-600 text-white p-1 rounded-lg mr-2 leading-none">h.</span>
          hobby.nandi.sh
        </BootstrapNavbar.Brand>
        <BootstrapNavbar.Toggle aria-controls="basic-navbar-nav" className="border-0 focus:shadow-none" />
        <BootstrapNavbar.Collapse id="basic-navbar-nav">
          <Nav className="ms-auto items-center gap-2">
            {navItems.map((item) => (
              <Nav.Link
                key={item.name}
                as={RouterNavLink}
                to={item.path}
                end={item.path === `${base}/`}
                className={({ isActive }) =>
                  `px-4 py-2 rounded-xl text-sm font-bold transition-all duration-300 ${
                    isActive
                      ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-500/30'
                      : 'text-gray-500 dark:text-gray-400 hover:text-indigo-600 dark:hover:text-indigo-400'
                  }`
                }
              >
                {item.name}
              </Nav.Link>
            ))}
            
            <NavDropdown 
              title={<span className="d-flex align-items-center gap-2 text-sm font-bold text-gray-500 dark:text-gray-400"><Globe size={18} /> {isEn ? 'EN' : '繁中'}</span>}
              id="language-dropdown"
              className="px-2"
            >
              <NavDropdown.Item onClick={() => changeLanguage('zh')} className="text-sm font-bold">繁體中文</NavDropdown.Item>
              <NavDropdown.Item onClick={() => changeLanguage('en')} className="text-sm font-bold">English</NavDropdown.Item>
            </NavDropdown>
          </Nav>
        </BootstrapNavbar.Collapse>
      </Container>
    </BootstrapNavbar>
  );
};

export default Navbar;
