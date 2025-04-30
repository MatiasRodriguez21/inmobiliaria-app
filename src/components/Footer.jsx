import React from 'react';
import { Link } from 'react-router-dom';
import { FaFacebookF, FaTwitter, FaInstagram, FaLinkedinIn, FaPhone, FaEnvelope, FaMapMarkerAlt } from 'react-icons/fa';

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-gray-300">
      <div className="max-w-7xl mx-auto px-4 py-12 sm:px-6 lg:py-16 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Columna 1 - Sobre nosotros */}
          <div>
            <h3 className="text-white text-lg font-semibold mb-4">Sobre Nosotros</h3>
            <p className="text-gray-400 text-sm leading-relaxed mb-4">
              Somos una inmobiliaria comprometida con encontrar el hogar perfecto para cada familia. 
              Con años de experiencia en el mercado inmobiliario, ofrecemos un servicio personalizado y profesional.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                <FaFacebookF className="w-5 h-5" />
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                <FaTwitter className="w-5 h-5" />
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                <FaInstagram className="w-5 h-5" />
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                <FaLinkedinIn className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Columna 2 - Enlaces rápidos */}
          <div>
            <h3 className="text-white text-lg font-semibold mb-4">Enlaces Rápidos</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/" className="text-gray-400 hover:text-white transition-colors">
                  Inicio
                </Link>
              </li>
              <li>
                <Link to="/propiedades" className="text-gray-400 hover:text-white transition-colors">
                  Propiedades
                </Link>
              </li>
              <li>
                <Link to="/nosotros" className="text-gray-400 hover:text-white transition-colors">
                  Nosotros
                </Link>
              </li>
              <li>
                <Link to="/contacto" className="text-gray-400 hover:text-white transition-colors">
                  Contacto
                </Link>
              </li>
              <li>
                <Link to="/blog" className="text-gray-400 hover:text-white transition-colors">
                  Blog
                </Link>
              </li>
            </ul>
          </div>

          {/* Columna 3 - Servicios */}
          <div>
            <h3 className="text-white text-lg font-semibold mb-4">Servicios</h3>
            <ul className="space-y-2">
              <li className="text-gray-400 hover:text-white transition-colors cursor-pointer">
                Compra de propiedades
              </li>
              <li className="text-gray-400 hover:text-white transition-colors cursor-pointer">
                Venta de propiedades
              </li>
              <li className="text-gray-400 hover:text-white transition-colors cursor-pointer">
                Alquiler de propiedades
              </li>
              <li className="text-gray-400 hover:text-white transition-colors cursor-pointer">
                Tasaciones
              </li>
              <li className="text-gray-400 hover:text-white transition-colors cursor-pointer">
                Asesoramiento legal
              </li>
            </ul>
          </div>

          {/* Columna 4 - Contacto */}
          <div>
            <h3 className="text-white text-lg font-semibold mb-4">Contacto</h3>
            <ul className="space-y-4">
              <li className="flex items-start space-x-3">
                <FaMapMarkerAlt className="w-5 h-5 text-blue-500 mt-1" />
                <span className="text-gray-400">
                  Av. Principal 123,<br />
                  Ciudad, CP 1234
                </span>
              </li>
              <li className="flex items-center space-x-3">
                <FaPhone className="w-5 h-5 text-blue-500" />
                <span className="text-gray-400">+54 (11) 1234-5678</span>
              </li>
              <li className="flex items-center space-x-3">
                <FaEnvelope className="w-5 h-5 text-blue-500" />
                <span className="text-gray-400">info@inmobiliaria.com</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Línea divisora */}
        <div className="border-t border-gray-800 mt-12 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-400 text-sm text-center md:text-left">
              © {new Date().getFullYear()} Tu Inmobiliaria. Todos los derechos reservados.
            </p>
            <div className="mt-4 md:mt-0">
              <ul className="flex space-x-6">
                <li>
                  <a href="#" className="text-gray-400 hover:text-white text-sm transition-colors">
                    Política de privacidad
                  </a>
                </li>
                <li>
                  <a href="#" className="text-gray-400 hover:text-white text-sm transition-colors">
                    Términos de uso
                  </a>
                </li>
                <li>
                  <a href="#" className="text-gray-400 hover:text-white text-sm transition-colors">
                    Mapa del sitio
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
