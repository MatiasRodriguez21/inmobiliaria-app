import React from 'react';
import { motion } from 'framer-motion';
import { FaHome, FaHandshake, FaChartLine, FaCamera, FaBuilding, FaFileContract, FaCalculator, FaSearchDollar, FaCog } from 'react-icons/fa';
import { MdHomeWork, MdGavel } from 'react-icons/md';

const Servicios = () => {
  const servicios = [
    {
      icon: FaHome,
      title: "Compra y Venta",
      description: "Asesoramiento personalizado en la compra y venta de propiedades",
      color: "from-blue-500 to-blue-700"
    },
    {
      icon: FaHandshake,
      title: "Alquiler",
      description: "Gestión completa de alquileres residenciales y comerciales",
      color: "from-green-500 to-green-700"
    },
    {
      icon: FaCalculator,
      title: "Tasaciones",
      description: "Tasaciones profesionales y estudios de mercado",
      color: "from-purple-500 to-purple-700"
    },
    {
      icon: MdGavel,
      title: "Asesoría Legal",
      description: "Asesoramiento legal en transacciones inmobiliarias",
      color: "from-red-500 to-red-700"
    },
    {
      icon: FaCog,
      title: "Gestión de Propiedades",
      description: "Administración integral de propiedades",
      color: "from-orange-500 to-orange-700"
    },
    {
      icon: FaChartLine,
      title: "Inversiones",
      description: "Asesoramiento en inversiones inmobiliarias",
      color: "from-teal-500 to-teal-700"
    },
    {
      icon: FaCamera,
      title: "Fotografía Profesional",
      description: "Servicios de fotografía y video para propiedades",
      color: "from-indigo-500 to-indigo-700"
    },
    {
      icon: MdHomeWork,
      title: "Home Staging",
      description: "Preparación de propiedades para la venta",
      color: "from-pink-500 to-pink-700"
    },
    {
      icon: FaSearchDollar,
      title: "Análisis de Mercado",
      description: "Estudios detallados del mercado inmobiliario",
      color: "from-cyan-500 to-cyan-700"
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white py-16 px-4">
      {/* Hero Section */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-center max-w-4xl mx-auto mb-16"
      >
        <h1 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-blue-600 to-blue-800 text-transparent bg-clip-text">
          Nuestros Servicios
        </h1>
        <p className="text-gray-600 text-lg md:text-xl">
          Ofrecemos una amplia gama de servicios inmobiliarios diseñados para satisfacer todas tus necesidades
        </p>
      </motion.div>

      {/* Grid de Servicios */}
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {servicios.map((servicio, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              whileHover={{ y: -10 }}
              className="bg-white p-6 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300"
            >
              <div className={`w-14 h-14 rounded-xl bg-gradient-to-br ${servicio.color} flex items-center justify-center mb-6 transform transition-transform group-hover:rotate-6`}>
                <servicio.icon className="text-2xl text-white" />
              </div>
              <h3 className="text-xl font-bold text-gray-800 mb-3">
                {servicio.title}
              </h3>
              <p className="text-gray-600">
                {servicio.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Sección de Contacto */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.8 }}
        className="max-w-4xl mx-auto mt-20 text-center"
      >
        <h2 className="text-3xl font-bold mb-6 text-gray-800">
          ¿Necesitas más información?
        </h2>
        <p className="text-gray-600 mb-8">
          Nuestro equipo está disponible para responder todas tus consultas
        </p>
        <button className="bg-blue-600 text-white px-8 py-3 rounded-xl hover:bg-blue-700 transition-colors duration-300 shadow-lg hover:shadow-xl">
          Contáctanos
        </button>
      </motion.div>
    </div>
  );
};

export default Servicios;