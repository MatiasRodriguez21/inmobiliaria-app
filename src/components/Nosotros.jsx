import React from 'react';
import { motion } from 'framer-motion';
import { FaHome, FaHandshake, FaUsers, FaMedal } from 'react-icons/fa';

const Nosotros = () => {
  const fadeIn = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.6 }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-12">
      {/* Hero Section */}
      <motion.div 
        className="text-center mb-16"
        initial={fadeIn.initial}
        animate={fadeIn.animate}
        transition={fadeIn.transition}
      >
        <h1 className="text-4xl md:text-5xl font-bold text-gray-800 mb-6">
          Nuestra Historia
        </h1>
        <p className="text-xl text-gray-600 max-w-3xl mx-auto">
          Más de una década ayudando a las personas a encontrar el hogar de sus sueños
        </p>
      </motion.div>

      {/* Sobre Nosotros */}
      <motion.div 
        className="mb-16 max-w-4xl mx-auto"
        initial={fadeIn.initial}
        animate={fadeIn.animate}
        transition={{ ...fadeIn.transition, delay: 0.2 }}
      >
        <div className="bg-white p-8 rounded-2xl shadow-lg">
          <div className="flex items-center gap-3 mb-6">
            <FaHome className="text-4xl text-blue-600" />
            <h2 className="text-3xl font-bold text-gray-800">Sobre Nosotros</h2>
          </div>
          <div className="space-y-6 text-gray-600 leading-relaxed">
            <p>
              En Inmobiliaria MR, creemos que mudarse no es solo cambiar de casa: es comenzar una nueva etapa. 
              Por eso, nos dedicamos a conectar personas con lugares donde puedan construir sus historias.
            </p>
            <p>
              Con base en Madrid, contamos con un equipo comprometido, profesional y humano, 
              dispuesto a acompañarte en cada paso del proceso de compra, venta o alquiler de propiedades. 
              Nos enfocamos en ofrecer un servicio transparente, ágil y personalizado, adaptado a las 
              necesidades de cada cliente.
            </p>
            <p>
              Ya sea que estés buscando tu primera vivienda, una inversión o un nuevo espacio para tu familia, 
              estamos para ayudarte a tomar la mejor decisión con confianza.
            </p>
          </div>
        </div>
      </motion.div>

      {/* Historia y Misión */}
      <motion.div 
        className="grid md:grid-cols-2 gap-12 mb-16"
        initial={fadeIn.initial}
        animate={fadeIn.animate}
        transition={{ ...fadeIn.transition, delay: 0.2 }}
      >
        <div className="bg-white p-8 rounded-2xl shadow-lg">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">Nuestra Historia</h2>
          <p className="text-gray-600 leading-relaxed">
            Fundada en 2010, nuestra inmobiliaria comenzó con la visión de transformar 
            la manera en que las personas encuentran y adquieren propiedades. A lo largo 
            de los años, hemos crecido hasta convertirnos en una de las agencias más 
            respetadas del sector, manteniendo siempre nuestro compromiso con la 
            excelencia y la satisfacción del cliente.
          </p>
        </div>
        <div className="bg-white p-8 rounded-2xl shadow-lg">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">Nuestra Misión</h2>
          <p className="text-gray-600 leading-relaxed">
            Nuestra misión es proporcionar un servicio inmobiliario excepcional, 
            combinando experiencia profesional con un trato personalizado. Nos 
            esforzamos por hacer que el proceso de compra, venta o alquiler de 
            propiedades sea una experiencia positiva y sin complicaciones para 
            todos nuestros clientes.
          </p>
        </div>
      </motion.div>

      {/* Valores */}
      <motion.div 
        className="mb-16"
        initial={fadeIn.initial}
        animate={fadeIn.animate}
        transition={{ ...fadeIn.transition, delay: 0.4 }}
      >
        <h2 className="text-3xl font-bold text-gray-800 text-center mb-12">
          Nuestros Valores
        </h2>
        <div className="grid md:grid-cols-4 gap-8">
          <div className="text-center">
            <div className="bg-blue-600 text-white w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
              <FaHome className="text-2xl" />
            </div>
            <h3 className="text-xl font-semibold mb-2">Compromiso</h3>
            <p className="text-gray-600">Dedicados a encontrar la propiedad perfecta para cada cliente.</p>
          </div>
          <div className="text-center">
            <div className="bg-blue-600 text-white w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
              <FaHandshake className="text-2xl" />
            </div>
            <h3 className="text-xl font-semibold mb-2">Integridad</h3>
            <p className="text-gray-600">Transparencia y honestidad en cada transacción.</p>
          </div>
          <div className="text-center">
            <div className="bg-blue-600 text-white w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
              <FaUsers className="text-2xl" />
            </div>
            <h3 className="text-xl font-semibold mb-2">Experiencia</h3>
            <p className="text-gray-600">Profesionales altamente calificados a su servicio.</p>
          </div>
          <div className="text-center">
            <div className="bg-blue-600 text-white w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
              <FaMedal className="text-2xl" />
            </div>
            <h3 className="text-xl font-semibold mb-2">Excelencia</h3>
            <p className="text-gray-600">Buscamos la perfección en cada detalle.</p>
          </div>
        </div>
      </motion.div>

      {/* Equipo */}
      <motion.div 
        className="text-center"
        initial={fadeIn.initial}
        animate={fadeIn.animate}
        transition={{ ...fadeIn.transition, delay: 0.6 }}
      >
        <h2 className="text-3xl font-bold text-gray-800 mb-12">
          Nuestro Equipo
        </h2>
        <div className="grid md:grid-cols-3 gap-8">
          <div className="bg-white p-6 rounded-2xl shadow-lg">
            <img 
              src="/imagenes/team1.jpg" 
              alt="Director Ejecutivo"
              className="w-32 h-32 rounded-full mx-auto mb-4 object-cover"
            />
            <h3 className="text-xl font-semibold mb-2">Carlos Rodríguez</h3>
            <p className="text-gray-600 mb-2">Director Ejecutivo</p>
            <p className="text-gray-500 text-sm">
              15 años de experiencia en el sector inmobiliario
            </p>
          </div>
          <div className="bg-white p-6 rounded-2xl shadow-lg">
            <img 
              src="/imagenes/team2.jpg" 
              alt="Directora de Ventas"
              className="w-32 h-32 rounded-full mx-auto mb-4 object-cover"
            />
            <h3 className="text-xl font-semibold mb-2">Ana García</h3>
            <p className="text-gray-600 mb-2">Directora de Ventas</p>
            <p className="text-gray-500 text-sm">
              Especialista en propiedades de lujo
            </p>
          </div>
          <div className="bg-white p-6 rounded-2xl shadow-lg">
            <img 
              src="/imagenes/team3.jpg" 
              alt="Asesor Inmobiliario Senior"
              className="w-32 h-32 rounded-full mx-auto mb-4 object-cover"
            />
            <h3 className="text-xl font-semibold mb-2">Luis Martínez</h3>
            <p className="text-gray-600 mb-2">Asesor Inmobiliario Senior</p>
            <p className="text-gray-500 text-sm">
              Experto en inversiones inmobiliarias
            </p>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default Nosotros;