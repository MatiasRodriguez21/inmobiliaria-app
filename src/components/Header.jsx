import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { FaHome, FaBuilding, FaInfoCircle, FaPhoneAlt, FaBars, FaTimes } from 'react-icons/fa';
import { MdRealEstateAgent } from 'react-icons/md';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <header className="w-full bg-blue-600 shadow-lg">
      <div className="max-w-7xl mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-3" aria-label="Inicio">
            <img src="/inmobiliaria.png" alt="Inmobiliaria Logo" className="h-8 md:h-10" />
            <span className="text-white text-xl md:text-2xl font-bold">Inmobiliaria</span>
          </Link>

          {/* Botón de menú móvil */}
          <button
            className="md:hidden text-white p-2 hover:bg-blue-700 rounded-lg transition-colors"
            onClick={toggleMenu}
            aria-label={isMenuOpen ? 'Cerrar menú' : 'Abrir menú'}
          >
            {isMenuOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
          </button>
          
          {/* Navegación principal */}
          <nav className={`${
            isMenuOpen ? 'flex' : 'hidden'
          } md:flex absolute md:relative top-full left-0 right-0 md:top-auto bg-blue-600 md:bg-transparent p-4 md:p-0 flex-col md:flex-row items-start md:items-center gap-4 md:gap-8 w-full md:w-auto`}>
            <Link 
              to="/" 
              className="nav-link flex items-center gap-2 text-white hover:text-blue-200 transition-colors w-full md:w-auto"
              onClick={() => setIsMenuOpen(false)}
            >
              <FaHome className="text-xl" />
              <span>Inicio</span>
            </Link>
            
            <Link 
              to="/propiedades/comprar" 
              className="nav-link flex items-center gap-2 text-white hover:text-blue-200 transition-colors w-full md:w-auto"
              onClick={() => setIsMenuOpen(false)}
            >
              <FaBuilding className="text-xl" />
              <span>Propiedades</span>
            </Link>

            <Link 
              to="/servicios" 
              className="nav-link flex items-center gap-2 text-white hover:text-blue-200 transition-colors w-full md:w-auto"
              onClick={() => setIsMenuOpen(false)}
            >
              <MdRealEstateAgent className="text-xl" />
              <span>Servicios</span>
            </Link>
            
            <Link 
              to="/nosotros" 
              className="nav-link flex items-center gap-2 text-white hover:text-blue-200 transition-colors w-full md:w-auto"
              onClick={() => setIsMenuOpen(false)}
            >
              <FaInfoCircle className="text-xl" />
              <span>Nosotros</span>
            </Link>
            
            <Link 
              to="/contacto" 
              className="nav-link flex items-center gap-2 text-white hover:text-blue-200 transition-colors w-full md:w-auto"
              onClick={() => setIsMenuOpen(false)}
            >
              <FaPhoneAlt className="text-xl" />
              <span>Contacto</span>
            </Link>
          </nav>
        </div>
      </div>
    </header>
  );
};

export default Header;
