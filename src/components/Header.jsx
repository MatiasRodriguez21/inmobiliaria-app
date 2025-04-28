import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { FaHome, FaBuilding, FaMapMarkerAlt, FaUsers, FaPhoneAlt } from 'react-icons/fa';

const Header = () => {
  const [showDropdown, setShowDropdown] = useState(false);

  return (
    <header className="header">
      <div className="header-content">
        <Link to="/" className="logo-link" aria-label="Inicio">
          <img src="/inmobiliaria.png" alt="Inmobiliaria Logo" className="logo" />
          <span className="title">Inmobiliaria</span>
        </Link>
        
        <nav className="nav-menu">
          <div 
            className="nav-item-wrapper"
            onMouseEnter={() => setShowDropdown(true)}
            onMouseLeave={() => setShowDropdown(false)}
          >
            <Link to="/propiedades" className="nav-link">
              <FaHome className="inline-block mr-1" />
              Propiedades
            </Link>
            {showDropdown && (
              <div className="dropdown-menu">
                <Link to="/propiedades/comprar" className="dropdown-item">Comprar</Link>
                <Link to="/propiedades/alquilar" className="dropdown-item">Alquilar</Link>
                <Link to="/propiedades/inversiones" className="dropdown-item">Inversiones</Link>
              </div>
            )}
          </div>
          
          <Link to="/oficinas" className="nav-link">
            <FaBuilding className="inline-block mr-1" />
            Oficinas
          </Link>
          
          <Link to="/zonas" className="nav-link">
            <FaMapMarkerAlt className="inline-block mr-1" />
            Zonas
          </Link>
          
          <Link to="/agentes" className="nav-link">
            <FaUsers className="inline-block mr-1" />
            Agentes
          </Link>
          
          <Link to="/contacto" className="nav-link">
            <FaPhoneAlt className="inline-block mr-1" />
            Contacto
          </Link>
        </nav>
      </div>
    </header>
  );
};

export default Header;
