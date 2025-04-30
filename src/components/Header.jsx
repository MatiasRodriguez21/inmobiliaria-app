import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { FaHome, FaBuilding, FaMapMarkerAlt, FaUsers, FaPhoneAlt, FaSearch } from 'react-icons/fa';

const Header = () => {
  const [showDropdown, setShowDropdown] = useState(false);

  return (
    <header className="w-full bg-blue-600">
      <div className="max-w-7xl mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <Link to="/" className="logo-link" aria-label="Inicio">
            <img src="/inmobiliaria.png" alt="Inmobiliaria Logo" className="h-8 md:h-10" />
            <span className="text-white text-xl md:text-2xl font-bold">Inmobiliaria</span>
          </Link>
          
          <nav className="hidden md:flex items-center space-x-8">
            <Link to="/" className="nav-link">
              <FaHome className="inline-block mr-2" />
              Inicio
            </Link>
            
            <Link to="/propiedades/comprar" className="nav-link">
              <FaSearch className="inline-block mr-2" />
              Propiedades
            </Link>
            
            <Link to="/oficinas" className="nav-link">
              <FaBuilding className="inline-block mr-2" />
              Oficinas
            </Link>
            
            <Link to="/zonas" className="nav-link">
              <FaMapMarkerAlt className="inline-block mr-2" />
              Zonas
            </Link>
            
            <Link to="/agentes" className="nav-link">
              <FaUsers className="inline-block mr-2" />
              Agentes
            </Link>
            
            <Link to="/contacto" className="nav-link">
              <FaPhoneAlt className="inline-block mr-2" />
              Contacto
            </Link>
          </nav>
        </div>
      </div>
    </header>
  );
};

export default Header;
