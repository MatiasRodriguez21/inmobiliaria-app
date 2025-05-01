import React, { useState } from 'react';
import { FaSearch } from 'react-icons/fa';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';

const Hero = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('comprar');
  const [searchParams, setSearchParams] = useState({
    ubicacion: '',
    tipoPropiedad: ''
  });

  const tabs = [
    { id: 'comprar', text: 'Quiero comprar', bgColor: 'bg-blue-700' },
    { id: 'alquilar', text: 'Quiero alquilar', bgColor: 'bg-white' }
  ];

  const handleSearch = (e) => {
    e.preventDefault();
    const params = new URLSearchParams();
    if (searchParams.ubicacion) params.set('busqueda', searchParams.ubicacion);
    if (searchParams.tipoPropiedad) params.set('tipo', searchParams.tipoPropiedad);
    
    navigate(`/propiedades/${activeTab}?${params.toString()}`);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setSearchParams(prev => ({
      ...prev,
      [name]: value
    }));
  };

  return (
    <div className="relative w-full min-h-[90vh] overflow-hidden">
      {/* Fondo con efecto parallax */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: "url('/imagenes/casa1.jpg')",
          transform: "translateZ(0)",
          willChange: "transform"
        }}
      />
      
      {/* Overlay con gradiente */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-900/90 via-blue-800/85 to-blue-900/90" />

      {/* Contenido principal */}
      <div className="relative z-10 w-full min-h-[90vh] flex flex-col items-center justify-center px-4">
        <motion.div
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ 
            duration: 0.8,
            ease: [0.6, -0.05, 0.01, 0.99]
          }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-white mb-6 leading-tight">
            Encuentra tu lugar ideal
          </h1>
          <p className="text-xl md:text-2xl text-gray-200 max-w-3xl mx-auto">
            Descubre propiedades únicas y haz realidad el sueño de tu nuevo hogar
          </p>
        </motion.div>

        <motion.div 
          className="w-full max-w-4xl px-4"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ 
            duration: 0.8,
            delay: 0.2,
            ease: [0.6, -0.05, 0.01, 0.99]
          }}
        >
          {/* Botones de toggle */}
          <div className="flex flex-wrap justify-center gap-3 mb-6">
            {tabs.map((tab) => (
              <motion.button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`px-6 py-3 rounded-xl text-base font-medium transition-all duration-300 ${
                  activeTab === tab.id
                    ? 'bg-white text-blue-700 shadow-lg scale-105'
                    : 'bg-white/10 text-white hover:bg-white/20'
                }`}
                whileHover={{ scale: activeTab === tab.id ? 1.05 : 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                {tab.text}
              </motion.button>
            ))}
          </div>

          {/* Barra de búsqueda */}
          <motion.form 
            onSubmit={handleSearch}
            className="bg-white/10 backdrop-blur-md rounded-2xl p-4 shadow-2xl"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.6 }}
          >
            <div className="flex flex-col md:flex-row gap-4">
              <div className="flex-1">
                <input
                  type="text"
                  name="ubicacion"
                  placeholder={`¿Dónde querés ${activeTab === 'alquilar' ? 'alquilar' : 'mudarte'}?`}
                  value={searchParams.ubicacion}
                  onChange={handleInputChange}
                  className="w-full px-6 py-4 text-gray-700 bg-white/90 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
                />
              </div>
              <div className="w-full md:w-64">
                <select
                  name="tipoPropiedad"
                  value={searchParams.tipoPropiedad}
                  onChange={handleInputChange}
                  className="w-full px-6 py-4 text-gray-700 bg-white/90 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 appearance-none cursor-pointer transition-all"
                >
                  <option value="">Tipo de propiedad</option>
                  <option value="casa">Casa</option>
                  <option value="departamento">Departamento</option>
                  <option value="monoambiente">Monoambiente</option>
                </select>
              </div>
              <motion.button
                type="submit"
                className="w-full md:w-auto px-8 py-4 bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-xl hover:from-blue-700 hover:to-blue-800 transition-all flex items-center justify-center gap-2 shadow-lg"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <FaSearch className="text-lg" />
                <span className="font-medium">Buscar</span>
              </motion.button>
            </div>
          </motion.form>
        </motion.div>
      </div>
    </div>
  );
};

export default Hero;