import React from 'react';
import { NavLink as RouterNavLink } from 'react-router-dom';
import { Navbar as BootstrapNavbar, Nav, Container } from 'react-bootstrap';

const Navbar = () => {
  const navItems = [
    { name: 'Home', path: '/' },
    { name: 'Portfolio', path: '/portfolio' },
    { name: 'Tutorials', path: '/tutorials' },
    { name: 'Gallery', path: '/gallery' },
  ];

  return (
    <BootstrapNavbar expand="lg" sticky="top" className="bg-white/70 dark:bg-gray-950/70 backdrop-blur-xl border-bottom border-white/20 dark:border-gray-800/50 py-4">
      <Container>
        <BootstrapNavbar.Brand as={RouterNavLink} to="/" className="text-2xl font-black tracking-tighter text-gray-900 dark:text-white d-flex align-items-center">
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
          </Nav>
        </BootstrapNavbar.Collapse>
      </Container>
    </BootstrapNavbar>
  );
};

export default Navbar;
