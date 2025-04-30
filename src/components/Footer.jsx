import React from 'react';
import { Link } from 'react-router-dom';
import { FaFacebook, FaTwitter, FaInstagram, FaLinkedin, FaPhone, FaEnvelope, FaMapMarkerAlt, FaCode } from 'react-icons/fa';

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Sección de la empresa */}
          <div>
            <h3 className="text-xl font-bold mb-4">Inmobiliaria</h3>
            <p className="text-gray-400 mb-4">
              Encuentra tu hogar ideal con nosotros. Más de 10 años de experiencia en el mercado inmobiliario.
            </p>
          </div>

          {/* Enlaces útiles */}
          <div>
            <h3 className="text-xl font-bold mb-4">Enlaces Útiles</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/propiedades/comprar" className="text-gray-400 hover:text-white transition-colors">
                  Propiedades en Venta
                </Link>
              </li>
              <li>
                <Link to="/zonas" className="text-gray-400 hover:text-white transition-colors">
                  Zonas Destacadas
                </Link>
              </li>
              <li>
                <Link to="/agentes" className="text-gray-400 hover:text-white transition-colors">
                  Nuestros Agentes
                </Link>
              </li>
              <li>
                <Link to="/contacto" className="text-gray-400 hover:text-white transition-colors">
                  Contacto
                </Link>
              </li>
            </ul>
          </div>

          {/* Información de contacto */}
          <div>
            <h3 className="text-xl font-bold mb-4">Contacto</h3>
            <ul className="space-y-2">
              <li className="flex items-center text-gray-400">
                <FaMapMarkerAlt className="mr-2" />
                <span>Av. Principal 123, Madrid</span>
              </li>
              <li className="flex items-center text-gray-400">
                <FaPhone className="mr-2" />
                <span>+34 91 123 4567</span>
              </li>
              <li className="flex items-center text-gray-400">
                <FaEnvelope className="mr-2" />
                <span>info@inmobiliaria.com</span>
              </li>
            </ul>
          </div>

          {/* Redes sociales */}
          <div>
            <h3 className="text-xl font-bold mb-4">Síguenos</h3>
            <div className="flex space-x-4">
              <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" 
                className="text-gray-400 hover:text-white transition-colors">
                <FaFacebook size={24} />
              </a>
              <a href="https://twitter.com" target="_blank" rel="noopener noreferrer"
                className="text-gray-400 hover:text-white transition-colors">
                <FaTwitter size={24} />
              </a>
              <a href="https://instagram.com" target="_blank" rel="noopener noreferrer"
                className="text-gray-400 hover:text-white transition-colors">
                <FaInstagram size={24} />
              </a>
              <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer"
                className="text-gray-400 hover:text-white transition-colors">
                <FaLinkedin size={24} />
              </a>
            </div>
          </div>
        </div>

        {/* Línea divisoria */}
        <hr className="my-8 border-gray-800" />

        {/* Copyright y desarrollador */}
        <div className="text-center text-gray-400">
          <p className="mb-2">© {new Date().getFullYear()} Inmobiliaria. Todos los derechos reservados.</p>
          <p className="flex items-center justify-center gap-2">
            <FaCode className="text-blue-500" />
            Desarrollado por <span className="text-blue-500 font-medium">Matías Rodríguez</span>
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
