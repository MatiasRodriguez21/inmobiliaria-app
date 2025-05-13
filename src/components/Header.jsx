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
            className="flex items-center gap-3"
            aria-label="Inicio"
          >
            <img 
              src="/Logo-inmob.png" 
              alt="Inmobiliaria Logo" 
              className="h-28 md:h-40 w-auto max-h-40 drop-shadow-xl"
            />
          </Link>

          {/* Botón de menú móvil */}
          <button
            className="md:hidden p-2 text-white hover:bg-white/10 rounded-lg transition-colors relative z-50"
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
                className="fixed inset-0 bg-black/30 backdrop-blur-sm md:hidden"
                onClick={toggleMenu}
                style={{ zIndex: 40 }}
              />
            )}
          </AnimatePresence>
          
          {/* Navegación principal */}
          <motion.nav 
            className={`fixed md:relative top-0 right-0 h-screen md:h-auto w-[280px] md:w-auto
            md:flex md:items-center transform transition-transform duration-300 ease-in-out
            bg-white dark:bg-gray-800 md:bg-transparent shadow-2xl md:shadow-none
            ${isMenuOpen ? 'translate-x-0' : 'translate-x-full'} md:translate-x-0`}
            style={{ zIndex: 45 }}
          >
            <div className="flex flex-col h-full p-6 md:p-0">
              <div className="mb-8 md:hidden">
                <h3 className="text-xl font-bold text-gray-800 dark:text-white">Menú</h3>
              </div>
              
              <ul className="flex flex-col md:flex-row items-start md:items-center gap-4 md:gap-8">
                {menuLinks.map((link) => (
                  <motion.li
                    key={link.to}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="w-full md:w-auto"
                  >
                    <Link 
                      to={link.to} 
                      className={`flex items-center gap-3 p-2 rounded-lg w-full
                        md:text-white text-gray-700 dark:text-gray-200
                        hover:bg-blue-50 md:hover:bg-transparent
                        md:hover:text-blue-200 transition-all duration-200
                        ${location.pathname === link.to ? 'bg-blue-50 text-blue-600 md:text-blue-200 md:bg-transparent' : ''}`}
                      onClick={() => setIsMenuOpen(false)}
                    >
                      <link.icon className="text-xl" />
                      <span className="font-medium">{link.text}</span>
                    </Link>
                  </motion.li>
                ))}
              </ul>

              <div className="mt-auto md:hidden">
                <hr className="my-6 border-gray-200 dark:border-gray-700" />
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  © 2024 Inmobiliaria. Todos los derechos reservados.
                </p>
              </div>
            </div>
          </motion.nav>
        </div>
      </div>
    </header>
  );
};

export default Header;
