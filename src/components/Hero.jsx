import React, { useState } from 'react';
import { FaSearch } from 'react-icons/fa';
import { motion } from 'framer-motion';

const Hero = () => {
  const [activeTab, setActiveTab] = useState('comprar');

  const tabs = [
    { id: 'comprar', text: 'Quiero comprar', bgColor: 'bg-blue-700' },
    { id: 'alquilar', text: 'Quiero alquilar', bgColor: 'bg-white' },
    { id: 'vender', text: 'Quiero vender', bgColor: 'bg-white' },
    { id: 'emprendimientos', text: 'Emprendimientos', bgColor: 'bg-white' }
  ];

  return (
    <div className="relative w-full min-h-[80vh] bg-gradient-to-br from-blue-900 to-blue-800">
      {/* Overlay oscuro */}
      <div className="absolute inset-0 bg-black/40"></div>

      {/* Contenido principal */}
      <div className="relative z-10 w-full min-h-[80vh] flex flex-col items-center justify-center px-4">
        <motion.h1 
          className="text-white text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-8 md:mb-12 text-center max-w-4xl mx-auto"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          Mucho más que mudarte
        </motion.h1>

        <motion.div 
          className="w-full max-w-4xl px-4"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          {/* Botones de toggle */}
          <div className="flex flex-wrap justify-center gap-2 sm:gap-4 mb-6">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`px-4 sm:px-6 py-2 sm:py-3 rounded-lg text-sm sm:text-base font-medium transition-all duration-300 ${
                  activeTab === tab.id
                    ? 'bg-blue-700 text-white shadow-lg scale-105'
                    : 'bg-white text-gray-800 hover:bg-gray-100'
                }`}
              >
                {tab.text}
              </button>
            ))}
          </div>

          {/* Barra de búsqueda */}
          <div className="bg-white/95 backdrop-blur-sm rounded-lg shadow-lg p-2 sm:p-3">
            <div className="flex flex-col sm:flex-row gap-2 sm:gap-3">
              <div className="flex-1">
                <input
                  type="text"
                  placeholder="¿Dónde querés mudarte?"
                  className="w-full px-4 py-3 text-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
                />
              </div>
              <div className="w-full sm:w-64">
                <select
                  className="w-full px-4 py-3 text-gray-700 rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 appearance-none cursor-pointer transition-all"
                >
                  <option value="">Tipo de propiedad</option>
                  <option value="casa">Casa</option>
                  <option value="departamento">Departamento</option>
                  <option value="terreno">Terreno</option>
                  <option value="local">Local</option>
                </select>
              </div>
              <button
                className="w-full sm:w-auto px-6 py-3 bg-blue-700 text-white rounded-lg hover:bg-blue-600 transition-colors flex items-center justify-center gap-2"
              >
                <FaSearch className="text-lg" />
                <span className="sm:inline">Buscar</span>
              </button>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Hero;