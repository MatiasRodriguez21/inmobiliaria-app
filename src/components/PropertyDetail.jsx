import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { Helmet } from 'react-helmet';
import { FaDollarSign, FaHome, FaMapMarkerAlt, FaRulerCombined, FaTimes, FaPhone, FaCalendar } from 'react-icons/fa';
import { motion } from 'framer-motion';
import '../App.css'; // Corregir la ruta de importación de estilos

// Iconos simples con emojis para ilustrar (pueden reemplazarse por SVG o librerías de iconos)
const IconoPrecio = () => <span role="img" aria-label="precio">💰</span>;
const IconoUbicacion = () => <span role="img" aria-label="ubicacion">📍</span>;
const IconoTamano = () => <span role="img" aria-label="tamaño">📐</span>;
const IconoCaracteristicas = () => <span role="img" aria-label="características">✨</span>;

// Definición del IconoTipo para evitar error
const IconoTipo = () => <span role="img" aria-label="tipo">🏠</span>;

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

// Componente para mostrar los detalles de una propiedad
const PropertyDetail = ({ propiedades }) => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [currentProperty, setCurrentProperty] = useState(null);
  const [showContactForm, setShowContactForm] = useState(false);

  useEffect(() => {
    const foundProperty = propiedades.find(prop => prop.id === parseInt(id));
    setCurrentProperty(foundProperty);
    window.scrollTo(0, 0); // Scroll to top when property changes
  }, [id, propiedades]);

  if (!currentProperty) {
    return <div className="min-h-screen flex items-center justify-center">
      <div className="text-xl text-gray-600">Cargando propiedad...</div>
    </div>;
  }

  const position = currentProperty.ubicacion || [40.4168, -3.7038]; // Madrid por defecto
  const propiedadesRelacionadas = propiedades.filter(
    prop => prop.tipo === currentProperty.tipo && prop.id !== currentProperty.id
  );

  return (
    <div className="property-detail">
      <Helmet>
        <title>{currentProperty.titulo} - Detalles de la Propiedad</title>
        <meta
          name="description"
          content={
            currentProperty.descripcionExtendida ||
            `Detalles de la propiedad ${currentProperty.titulo}, ubicada en ${currentProperty.ubicacionTexto || 'una ubicación privilegiada'}.`
          }
        />
      </Helmet>

      <button className="mb-6 px-6 py-2 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition-colors flex items-center gap-2 shadow-md" onClick={() => navigate(-1)}>
        <FaTimes className="text-lg" />
        Volver al listado
      </button>

      <h1 className="text-3xl md:text-4xl font-bold text-gray-800 mb-8">{currentProperty.titulo}</h1>

      <div className="property-main-content">
        {/* Carrusel de imágenes con miniaturas */}
        <div className="carousel-container">
          <Carousel showThumbs={true} infiniteLoop useKeyboardArrows autoPlay>
            {currentProperty.imagenes && currentProperty.imagenes.length > 0 ? (
              currentProperty.imagenes.map((img, index) => (
                <div key={index}>
                  <img src={img} alt={`${currentProperty.titulo} ${index + 1}`} />
                </div>
              ))
            ) : (
              <div>
                <img src={currentProperty.imagen} alt={currentProperty.titulo} />
              </div>
            )}
          </Carousel>
        </div>

        <motion.div
          className="property-info bg-white rounded-2xl shadow-md p-8 max-w-md"
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="flex items-center gap-3 mb-4">
            <FaDollarSign className="text-green-500" />
            <p><strong>Precio:</strong> <span className="text-green-500 font-extrabold text-lg">${currentProperty.precio.toLocaleString()}</span></p>
          </div>
          <div className="flex items-center gap-3 mb-4">
            <FaHome className="text-blue-500" />
            <p><strong>Tipo:</strong> {currentProperty.tipo}</p>
          </div>
          <div className="flex items-center gap-3 mb-4">
            <FaMapMarkerAlt className="text-pink-500" />
            <p><strong>Ubicación:</strong> {currentProperty.ubicacionTexto || 'No disponible'}</p>
          </div>
          <div className="flex items-center gap-3 mb-4">
            <FaRulerCombined className="text-purple-500" />
            <p><strong>Tamaño:</strong> {currentProperty.tamano || 'No disponible'} m²</p>
          </div>

          <hr className="border-t border-gray-200 my-4" />

          <h2 className="text-lg font-semibold text-gray-700 mb-2">Características</h2>
          <div className="flex flex-wrap gap-2">
            {currentProperty.caracteristicas ? (
              currentProperty.caracteristicas.split(',').map((caracteristica, index) => (
                <span
                  key={index}
                  className="bg-gray-200 text-gray-700 px-3 py-1 rounded-full text-sm flex items-center gap-2"
                >
                  {caracteristica.includes('Habitaciones') && <FaHome className="text-blue-500" />}
                  {caracteristica.includes('Baños') && <FaRulerCombined className="text-purple-500" />}
                  {caracteristica.includes('Balcón') && <FaMapMarkerAlt className="text-pink-500" />}
                  {caracteristica}
                </span>
              ))
            ) : (
              <p>No hay características disponibles.</p>
            )}
          </div>

          <hr className="border-t border-gray-200 my-4" />

          <p className="italic text-gray-500 mt-4">{currentProperty.descripcion}</p>
        </motion.div>
      </div>

      <hr className="border-t border-gray-200 my-4" />

      {/* Descripción extendida */}
      <div className="property-extended-description">
        <h2 className="text-2xl md:text-3xl font-bold text-gray-800 mb-6">Descripción extendida</h2>
        <p className="text-gray-600 leading-relaxed">{currentProperty.descripcionExtendida || 'No hay una descripción extendida disponible para esta propiedad.'}</p>
      </div>

      <hr className="border-t border-gray-200 my-8" />

      {/* Mapa con la ubicación */}
      <div className="space-y-4">
        <h2 className="text-2xl md:text-3xl font-bold text-gray-800 mb-6">Ubicación</h2>
        <div className="map-container rounded-2xl overflow-hidden shadow-lg" style={{ height: '400px', position: 'relative', zIndex: 10 }}>
          <MapContainer center={position} zoom={13} scrollWheelZoom={false} style={{ height: '100%', width: '100%' }}>
            <TileLayer
              attribution='&copy; <a href="https://osm.org/copyright">OpenStreetMap</a>'
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            <Marker position={position} icon={icon}>
              <Popup>
                <div className="text-center">
                  <h3 className="font-bold">{currentProperty.titulo}</h3>
                  <p>{currentProperty.ubicacionTexto}</p>
                </div>
              </Popup>
            </Marker>
          </MapContainer>
        </div>
      </div>

      <hr className="border-t border-gray-200 my-8" />

      {/* Botones estilizados */}
      <div className="flex flex-col sm:flex-row gap-4 justify-center my-8">
        <button 
          className="px-6 py-3 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition-colors flex items-center justify-center gap-2 shadow-md w-full sm:w-auto text-lg font-medium" 
          onClick={() => setShowContactForm(!showContactForm)}
        >
          <FaPhone className="text-lg" />
          {showContactForm ? 'Cerrar formulario' : 'Contactar vendedor'}
        </button>
        <button 
          className="px-6 py-3 bg-green-600 text-white rounded-xl hover:bg-green-700 transition-colors flex items-center justify-center gap-2 shadow-md w-full sm:w-auto text-lg font-medium"
          onClick={() => alert('Funcionalidad de agendar visita en desarrollo')}
        >
          <FaCalendar className="text-lg" />
          Agendar visita
        </button>
      </div>

      {/* Formulario de contacto rápido */}
      {showContactForm && (
        <motion.div 
          className="contact-form bg-white rounded-2xl shadow-lg p-8 max-w-2xl mx-auto my-8"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
        >
          <h3 className="text-2xl font-bold text-gray-800 mb-6">Formulario de Contacto</h3>
          <form className="space-y-6">
            <div className="form-group">
              <label htmlFor="name" className="block text-gray-700 font-medium mb-2">Nombre:</label>
              <input 
                type="text" 
                id="name" 
                name="name" 
                className="w-full px-4 py-2 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                required 
              />
            </div>
            <div className="form-group">
              <label htmlFor="email" className="block text-gray-700 font-medium mb-2">Correo Electrónico:</label>
              <input 
                type="email" 
                id="email" 
                name="email" 
                className="w-full px-4 py-2 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                required 
              />
            </div>
            <div className="form-group">
              <label htmlFor="message" className="block text-gray-700 font-medium mb-2">Mensaje:</label>
              <textarea 
                id="message" 
                name="message" 
                rows="4" 
                className="w-full px-4 py-2 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                required
              ></textarea>
            </div>
            <button 
              type="submit" 
              className="w-full px-6 py-3 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition-colors shadow-md font-medium text-lg"
            >
              Enviar mensaje
            </button>
          </form>
        </motion.div>
      )}

      <hr className="border-t border-gray-200 my-8" />

      {/* Propiedades relacionadas */}
      {propiedadesRelacionadas.length > 0 && (
        <div className="related-properties">
          <h2 className="text-2xl md:text-3xl font-bold text-gray-800 mb-8">Propiedades relacionadas</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {propiedadesRelacionadas.slice(0, 3).map((prop) => (
              <motion.div
                key={prop.id}
                className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden"
                whileHover={{ y: -10 }}
              >
                <Link to={`/property/${prop.id}`} className="block">
                  <div className="relative">
                    <img 
                      src={prop.imagen} 
                      alt={prop.titulo} 
                      className="w-full h-48 object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
                  </div>
                  <div className="p-6">
                    <h3 className="text-xl font-bold text-gray-800 mb-2 hover:text-blue-600 transition-colors">
                      {prop.titulo}
                    </h3>
                    <div className="flex items-center gap-2 text-green-600 font-bold mb-2">
                      <FaDollarSign />
                      <span className="text-lg">{prop.precio.toLocaleString()}</span>
                    </div>
                    <p className="text-gray-600 text-sm line-clamp-2">
                      {prop.descripcion}
                    </p>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default PropertyDetail;
