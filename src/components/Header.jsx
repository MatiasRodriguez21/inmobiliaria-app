import React from 'react';
import { Link } from 'react-router-dom';

// Header con logo personalizado y menú de navegación
const Header = () => {
  return (
    <header className="header">
      <div className="header-content">
        {/* Logo imagen inmobiliaria.png */}
        <Link to="/" className="logo-link" aria-label="Inicio">
          <img src="/inmobiliaria.png" alt="Inmobiliaria Logo" className="logo" />
          <span className="title">Inmobiliaria</span>
        </Link>
        <nav className="nav-menu">
          <Link to="/" className="nav-link">Home</Link>
          <Link to="/contacto" className="nav-link">Contacto</Link>
        </nav>
      </div>
    </header>
  );
};

export default Header;
