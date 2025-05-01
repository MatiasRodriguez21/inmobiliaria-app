import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { FaHome, FaBuilding, FaInfoCircle, FaPhoneAlt, FaBars, FaTimes, FaKey } from 'react-icons/fa';
import { MdRealEstateAgent } from 'react-icons/md';
import { motion, AnimatePresence } from 'framer-motion';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Cerrar el menú cuando se cambia de ruta
  useEffect(() => {
    if (isMenuOpen) {
      setIsMenuOpen(false);
      document.body.style.overflow = 'unset';
    }
  }, [location]);

  useEffect(() => {
    // Limpiar el overflow cuando se desmonta el componente
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, []);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
    document.body.style.overflow = !isMenuOpen ? 'hidden' : 'unset';
  };

  const menuLinks = [
    { to: '/', icon: FaHome, text: 'Inicio' },
    { to: '/propiedades/comprar', icon: FaBuilding, text: 'Comprar' },
    { to: '/propiedades/alquilar', icon: FaKey, text: 'Alquilar' },
    { to: '/servicios', icon: MdRealEstateAgent, text: 'Servicios' },
    { to: '/nosotros', icon: FaInfoCircle, text: 'Nosotros' },
    { to: '/contacto', icon: FaPhoneAlt, text: 'Contacto' }
  ];

  return (
    <header className={`fixed w-full z-50 transition-all duration-300 ${
      isScrolled ? 'bg-blue-600/95 backdrop-blur-md shadow-lg' : 'bg-blue-600'
    }`}>
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex items-center justify-between h-[72px] md:h-[80px]">
          {/* Logo */}
          <Link 
            to="/" 
            className="flex items-center gap-3 relative z-50" 
            aria-label="Inicio"
          >
            <img 
              src="/inmobiliaria.png" 
              alt="Inmobiliaria Logo" 
              className="h-8 md:h-10"
            />
            <span className="text-white text-xl md:text-2xl font-bold">
              Inmobiliaria
            </span>
          </Link>

          {/* Botón de menú móvil */}
          <button
            className="md:hidden relative z-50 p-2 text-white hover:bg-white/10 rounded-lg transition-colors"
            onClick={toggleMenu}
            aria-label={isMenuOpen ? 'Cerrar menú' : 'Abrir menú'}
          >
            <AnimatePresence mode="wait">
              {isMenuOpen ? (
                <motion.div
                  key="close"
                  initial={{ rotate: -180, opacity: 0 }}
                  animate={{ rotate: 0, opacity: 1 }}
                  exit={{ rotate: 180, opacity: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <FaTimes size={24} />
                </motion.div>
              ) : (
                <motion.div
                  key="menu"
                  initial={{ rotate: 180, opacity: 0 }}
                  animate={{ rotate: 0, opacity: 1 }}
                  exit={{ rotate: -180, opacity: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <FaBars size={24} />
                </motion.div>
              )}
            </AnimatePresence>
          </button>

          {/* Fondo oscuro para móvil */}
          <AnimatePresence>
            {isMenuOpen && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3 }}
                className="fixed inset-0 bg-black/50 backdrop-blur-sm md:hidden"
                onClick={toggleMenu}
              />
            )}
          </AnimatePresence>
          
          {/* Navegación principal */}
          <nav 
            className={`fixed md:relative top-0 right-0 h-[100dvh] md:h-auto w-[300px] md:w-auto
            md:flex md:items-center md:bg-transparent transform transition-transform duration-300 ease-in-out
            bg-blue-600/95 backdrop-blur-md md:backdrop-blur-none p-8 md:p-0
            ${isMenuOpen ? 'translate-x-0' : 'translate-x-full'} md:translate-x-0`}
          >
            <ul className="flex flex-col md:flex-row items-start md:items-center gap-6 md:gap-8 mt-20 md:mt-0">
              {menuLinks.map((link) => (
                <motion.li
                  key={link.to}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Link 
                    to={link.to} 
                    className={`flex items-center gap-3 text-white hover:text-blue-200 transition-colors
                      ${location.pathname === link.to ? 'text-blue-200' : ''}`}
                    onClick={() => setIsMenuOpen(false)}
                  >
                    <link.icon className="text-xl" />
                    <span className="font-medium">{link.text}</span>
                  </Link>
                </motion.li>
              ))}
            </ul>
          </nav>
        </div>
      </div>
    </header>
  );
};

export default Header;
