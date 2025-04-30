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
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white">
      {/* Hero Section con imagen de fondo */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-blue-600 opacity-10 z-0"></div>
        <motion.div 
          className="relative z-10 text-center py-16 px-4"
          initial={fadeIn.initial}
          animate={fadeIn.animate}
          transition={fadeIn.transition}
        >
          <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6 tracking-tight">
            Nuestra Historia
          </h1>
          <p className="text-xl md:text-2xl text-gray-700 max-w-3xl mx-auto font-light">
            Más de una década ayudando a las personas a encontrar el hogar de sus sueños
          </p>
        </motion.div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-12">
        {/* Sobre Nosotros */}
        <motion.div 
          className="mb-20 max-w-4xl mx-auto"
          initial={fadeIn.initial}
          animate={fadeIn.animate}
          transition={{ ...fadeIn.transition, delay: 0.2 }}
        >
          <div className="bg-white p-8 md:p-12 rounded-3xl shadow-xl hover:shadow-2xl transition-all duration-300">
            <div className="flex items-center gap-4 mb-8">
              <div className="bg-blue-600 p-4 rounded-2xl">
                <FaHome className="text-4xl text-white" />
              </div>
              <h2 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-blue-600 to-blue-800 text-transparent bg-clip-text">
                Sobre Nosotros
              </h2>
            </div>
            <div className="space-y-6 text-gray-600 leading-relaxed text-lg">
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
          className="grid md:grid-cols-2 gap-8 mb-20"
          initial={fadeIn.initial}
          animate={fadeIn.animate}
          transition={{ ...fadeIn.transition, delay: 0.3 }}
        >
          <motion.div 
            className="bg-white p-8 rounded-3xl shadow-lg hover:shadow-xl transition-all duration-300"
            whileHover={{ scale: 1.02 }}
          >
            <h2 className="text-2xl font-bold text-blue-600 mb-6">Nuestra Historia</h2>
            <p className="text-gray-600 leading-relaxed">
              Fundada en 2010, nuestra inmobiliaria comenzó con la visión de transformar 
              la manera en que las personas encuentran y adquieren propiedades. A lo largo 
              de los años, hemos crecido hasta convertirnos en una de las agencias más 
              respetadas del sector, manteniendo siempre nuestro compromiso con la 
              excelencia y la satisfacción del cliente.
            </p>
          </motion.div>
          <motion.div 
            className="bg-white p-8 rounded-3xl shadow-lg hover:shadow-xl transition-all duration-300"
            whileHover={{ scale: 1.02 }}
          >
            <h2 className="text-2xl font-bold text-blue-600 mb-6">Nuestra Misión</h2>
            <p className="text-gray-600 leading-relaxed">
              Nuestra misión es proporcionar un servicio inmobiliario excepcional, 
              combinando experiencia profesional con un trato personalizado. Nos 
              esforzamos por hacer que el proceso de compra, venta o alquiler de 
              propiedades sea una experiencia positiva y sin complicaciones para 
              todos nuestros clientes.
            </p>
          </motion.div>
        </motion.div>

        {/* Valores */}
        <motion.div 
          className="mb-20"
          initial={fadeIn.initial}
          animate={fadeIn.animate}
          transition={{ ...fadeIn.transition, delay: 0.4 }}
        >
          <h2 className="text-4xl font-bold text-center mb-16 bg-gradient-to-r from-blue-600 to-blue-800 text-transparent bg-clip-text">
            Nuestros Valores
          </h2>
          <div className="grid md:grid-cols-4 gap-8">
            {[
              { icon: FaHome, title: 'Compromiso', text: 'Dedicados a encontrar la propiedad perfecta para cada cliente.' },
              { icon: FaHandshake, title: 'Integridad', text: 'Transparencia y honestidad en cada transacción.' },
              { icon: FaUsers, title: 'Experiencia', text: 'Profesionales altamente calificados a su servicio.' },
              { icon: FaMedal, title: 'Excelencia', text: 'Buscamos la perfección en cada detalle.' }
            ].map((valor, index) => (
              <motion.div
                key={index}
                className="text-center group"
                whileHover={{ y: -10 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <div className="bg-gradient-to-br from-blue-500 to-blue-700 w-20 h-20 rounded-2xl flex items-center justify-center mx-auto mb-6 transform group-hover:rotate-6 transition-transform duration-300">
                  <valor.icon className="text-3xl text-white" />
                </div>
                <h3 className="text-xl font-bold mb-3 text-gray-800">{valor.title}</h3>
                <p className="text-gray-600">{valor.text}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Equipo */}
        <motion.div 
          className="text-center"
          initial={fadeIn.initial}
          animate={fadeIn.animate}
          transition={{ ...fadeIn.transition, delay: 0.5 }}
        >
          <h2 className="text-4xl font-bold mb-16 bg-gradient-to-r from-blue-600 to-blue-800 text-transparent bg-clip-text">
            Nuestro Equipo
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                name: "Carlos Rodríguez",
                role: "Director Ejecutivo",
                description: "15 años de experiencia en el sector inmobiliario",
                image: "/imagenes/team1.jpg"
              },
              {
                name: "Ana García",
                role: "Directora de Ventas",
                description: "Especialista en propiedades de lujo",
                image: "/imagenes/team2.jpg"
              },
              {
                name: "Luis Martínez",
                role: "Asesor Inmobiliario Senior",
                description: "Experto en inversiones inmobiliarias",
                image: "/imagenes/team3.jpg"
              }
            ].map((member, index) => (
              <motion.div
                key={index}
                className="bg-white p-8 rounded-3xl shadow-lg hover:shadow-xl transition-all duration-300 group"
                whileHover={{ y: -10 }}
              >
                <div className="relative w-40 h-40 mx-auto mb-6 overflow-hidden rounded-2xl">
                  <img 
                    src={member.image}
                    alt={member.name}
                    className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-300"
                  />
                </div>
                <h3 className="text-2xl font-bold text-gray-800 mb-2">{member.name}</h3>
                <p className="text-blue-600 font-medium mb-3">{member.role}</p>
                <p className="text-gray-500">{member.description}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Nosotros;