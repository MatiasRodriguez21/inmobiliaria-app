import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { FaPhone, FaEnvelope, FaMapMarkerAlt, FaWhatsapp, FaClock } from 'react-icons/fa';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

// Configuración del icono del marcador
const icon = L.icon({
  iconUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
  iconRetinaUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png",
  shadowUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41]
});

const Contacto = () => {
  const [formData, setFormData] = useState({
    nombre: '',
    email: '',
    telefono: '',
    asunto: '',
    mensaje: ''
  });

  const [enviado, setEnviado] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Aquí iría la lógica para enviar el formulario
    console.log('Formulario enviado:', formData);
    setEnviado(true);
    // Resetear el formulario después de 3 segundos
    setTimeout(() => {
      setEnviado(false);
      setFormData({
        nombre: '',
        email: '',
        telefono: '',
        asunto: '',
        mensaje: ''
      });
    }, 3000);
  };

  // Coordenadas de Córdoba, Argentina
  const position = [-31.4201, -64.1888];

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
          Contáctanos
        </h1>
        <p className="text-gray-600 text-lg md:text-xl">
          Estamos aquí para ayudarte a encontrar tu próxima propiedad ideal
        </p>
      </motion.div>

      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12">
        {/* Información de contacto */}
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="space-y-8"
        >
          <div className="bg-white rounded-2xl shadow-lg p-8">
            <h2 className="text-2xl font-bold text-gray-800 mb-6">
              Información de Contacto
            </h2>
            <div className="space-y-6">
              <div className="flex items-center gap-4">
                <div className="bg-blue-100 p-4 rounded-xl">
                  <FaPhone className="text-blue-600 text-xl" />
                </div>
                <div>
                  <h3 className="font-medium text-gray-800">Teléfono</h3>
                  <p className="text-gray-600">+54 351 123 4567</p>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <div className="bg-green-100 p-4 rounded-xl">
                  <FaWhatsapp className="text-green-600 text-xl" />
                </div>
                <div>
                  <h3 className="font-medium text-gray-800">WhatsApp</h3>
                  <p className="text-gray-600">+54 9 351 123 4567</p>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <div className="bg-purple-100 p-4 rounded-xl">
                  <FaEnvelope className="text-purple-600 text-xl" />
                </div>
                <div>
                  <h3 className="font-medium text-gray-800">Email</h3>
                  <p className="text-gray-600">info@inmobiliaria.com</p>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <div className="bg-red-100 p-4 rounded-xl">
                  <FaMapMarkerAlt className="text-red-600 text-xl" />
                </div>
                <div>
                  <h3 className="font-medium text-gray-800">Dirección</h3>
                  <p className="text-gray-600">Av. Colón 1234, Nueva Córdoba</p>
                  <p className="text-gray-600">Córdoba, Argentina</p>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <div className="bg-orange-100 p-4 rounded-xl">
                  <FaClock className="text-orange-600 text-xl" />
                </div>
                <div>
                  <h3 className="font-medium text-gray-800">Horario</h3>
                  <p className="text-gray-600">Lun - Vie: 9:00 - 18:00</p>
                  <p className="text-gray-600">Sáb: 9:00 - 13:00</p>
                </div>
              </div>
            </div>
          </div>

          {/* Mapa */}
          <div className="bg-white rounded-2xl shadow-lg p-8">
            <h2 className="text-2xl font-bold text-gray-800 mb-6">
              Nuestra Ubicación
            </h2>
            <div className="h-[300px] rounded-xl overflow-hidden">
              <MapContainer 
                center={position} 
                zoom={13} 
                style={{ height: '100%', width: '100%' }}
                scrollWheelZoom={false}
              >
                <TileLayer
                  url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                  attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                />
                <Marker position={position} icon={icon}>
                  <Popup>
                    <div className="text-center">
                      <h3 className="font-bold">Inmobiliaria MR</h3>
                      <p>Av. Colón 1234, Nueva Córdoba</p>
                      <p>Córdoba, Argentina</p>
                    </div>
                  </Popup>
                </Marker>
              </MapContainer>
            </div>
          </div>
        </motion.div>

        {/* Formulario de contacto */}
        <motion.div
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          <div className="bg-white rounded-2xl shadow-lg p-8">
            <h2 className="text-2xl font-bold text-gray-800 mb-6">
              Envíanos un mensaje
            </h2>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label htmlFor="nombre" className="block text-gray-700 font-medium mb-2">
                  Nombre completo
                </label>
                <input
                  type="text"
                  id="nombre"
                  name="nombre"
                  value={formData.nombre}
                  onChange={handleChange}
                  className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:border-blue-500 focus:ring focus:ring-blue-200 transition-colors"
                  required
                />
              </div>
              <div>
                <label htmlFor="email" className="block text-gray-700 font-medium mb-2">
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:border-blue-500 focus:ring focus:ring-blue-200 transition-colors"
                  required
                />
              </div>
              <div>
                <label htmlFor="telefono" className="block text-gray-700 font-medium mb-2">
                  Teléfono
                </label>
                <input
                  type="tel"
                  id="telefono"
                  name="telefono"
                  value={formData.telefono}
                  onChange={handleChange}
                  className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:border-blue-500 focus:ring focus:ring-blue-200 transition-colors"
                  required
                />
              </div>
              <div>
                <label htmlFor="asunto" className="block text-gray-700 font-medium mb-2">
                  Asunto
                </label>
                <input
                  type="text"
                  id="asunto"
                  name="asunto"
                  value={formData.asunto}
                  onChange={handleChange}
                  className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:border-blue-500 focus:ring focus:ring-blue-200 transition-colors"
                  required
                />
              </div>
              <div>
                <label htmlFor="mensaje" className="block text-gray-700 font-medium mb-2">
                  Mensaje
                </label>
                <textarea
                  id="mensaje"
                  name="mensaje"
                  value={formData.mensaje}
                  onChange={handleChange}
                  rows="4"
                  className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:border-blue-500 focus:ring focus:ring-blue-200 transition-colors"
                  required
                ></textarea>
              </div>
              <motion.button
                type="submit"
                className="w-full bg-blue-600 text-white py-3 px-6 rounded-xl hover:bg-blue-700 transition-colors font-medium"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                Enviar mensaje
              </motion.button>
            </form>

            {/* Mensaje de éxito */}
            {enviado && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="mt-4 p-4 bg-green-100 text-green-700 rounded-xl text-center"
              >
                ¡Mensaje enviado con éxito! Nos pondremos en contacto contigo pronto.
              </motion.div>
            )}
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Contacto;