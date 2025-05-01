import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { Helmet } from 'react-helmet';
import { FaDollarSign, FaHome, FaMapMarkerAlt, FaRulerCombined } from 'react-icons/fa';
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
  const navigate = useNavigate(); // Hook para navegación
  const propiedad = propiedades.find(prop => prop.id === parseInt(id));
  const [showContactForm, setShowContactForm] = useState(false); // Estado para mostrar/ocultar el formulario

  const toggleContactForm = () => {
    setShowContactForm(!showContactForm);
  };

  if (!propiedad) {
    return <div>Propiedad no encontrada.</div>;
  }

  const position = propiedad.ubicacion || [40.4168, -3.7038]; // Madrid por defecto
  const propiedadesRelacionadas = propiedades.filter(
    prop => prop.tipo === propiedad.tipo && prop.id !== propiedad.id
  );

  return (
    <div className="property-detail">
      <Helmet>
        <title>{propiedad.titulo} - Detalles de la Propiedad</title>
        <meta
          name="description"
          content={
            propiedad.descripcionExtendida ||
            `Detalles de la propiedad ${propiedad.titulo}, ubicada en ${propiedad.ubicacionTexto || 'una ubicación privilegiada'}.`
          }
        />
      </Helmet>

      <button className="btn btn-back" onClick={() => navigate(-1)}>
        Volver al listado
      </button>

      <h1>{propiedad.titulo}</h1>

      <div className="property-main-content">
        {/* Carrusel de imágenes con miniaturas */}
        <div className="carousel-container">
          <Carousel showThumbs={true} infiniteLoop useKeyboardArrows autoPlay>
            {propiedad.imagenes && propiedad.imagenes.length > 0 ? (
              propiedad.imagenes.map((img, index) => (
                <div key={index}>
                  <img src={img} alt={`${propiedad.titulo} ${index + 1}`} />
                </div>
              ))
            ) : (
              <div>
                <img src={propiedad.imagen} alt={propiedad.titulo} />
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
            <p><strong>Precio:</strong> <span className="text-green-500 font-extrabold text-lg">${propiedad.precio.toLocaleString()}</span></p>
          </div>
          <div className="flex items-center gap-3 mb-4">
            <FaHome className="text-blue-500" />
            <p><strong>Tipo:</strong> {propiedad.tipo}</p>
          </div>
          <div className="flex items-center gap-3 mb-4">
            <FaMapMarkerAlt className="text-pink-500" />
            <p><strong>Ubicación:</strong> {propiedad.ubicacionTexto || 'No disponible'}</p>
          </div>
          <div className="flex items-center gap-3 mb-4">
            <FaRulerCombined className="text-purple-500" />
            <p><strong>Tamaño:</strong> {propiedad.tamano || 'No disponible'} m²</p>
          </div>

          <hr className="border-t border-gray-200 my-4" />

          <h2 className="text-lg font-semibold text-gray-700 mb-2">Características</h2>
          <div className="flex flex-wrap gap-2">
            {propiedad.caracteristicas ? (
              propiedad.caracteristicas.split(',').map((caracteristica, index) => (
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

          <p className="italic text-gray-500 mt-4">{propiedad.descripcion}</p>
        </motion.div>
      </div>

      <hr className="border-t border-gray-200 my-4" />

      {/* Descripción extendida */}
      <div className="property-extended-description">
        <h2>Descripción extendida</h2>
        <p>{propiedad.descripcionExtendida || 'No hay una descripción extendida disponible para esta propiedad.'}</p>
      </div>

      <hr className="border-t border-gray-200 my-4" />

      {/* Mapa con la ubicación */}
      <div className="map-container" style={{ height: '300px', marginBottom: '20px' }}>
        <MapContainer center={position} zoom={13} scrollWheelZoom={false} style={{ height: '100%', width: '100%' }}>
          <TileLayer
            attribution='&copy; <a href="https://osm.org/copyright">OpenStreetMap</a>'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          <Marker position={position} icon={icon}>
            <Popup>
              <div className="text-center">
                <h3 className="font-bold">{propiedad.titulo}</h3>
                <p>{propiedad.ubicacionTexto}</p>
              </div>
            </Popup>
          </Marker>
        </MapContainer>
      </div>

      <hr className="border-t border-gray-200 my-4" />

      {/* Botones estilizados */}
      <div className="buttons-container">
        <button className="btn btn-primary" onClick={toggleContactForm}>
          {showContactForm ? 'Cerrar formulario' : 'Contactar vendedor'}
        </button>
        <button className="btn btn-secondary" onClick={() => alert('Funcionalidad de agendar visita en desarrollo')}>
          Agendar visita
        </button>
      </div>

      {/* Formulario de contacto rápido */}
      {showContactForm && (
        <div className="contact-form">
          <h3>Formulario de Contacto</h3>
          <form>
            <div className="form-group">
              <label htmlFor="name">Nombre:</label>
              <input type="text" id="name" name="name" required />
            </div>
            <div className="form-group">
              <label htmlFor="email">Correo Electrónico:</label>
              <input type="email" id="email" name="email" required />
            </div>
            <div className="form-group">
              <label htmlFor="message">Mensaje:</label>
              <textarea id="message" name="message" rows="4" required></textarea>
            </div>
            <button type="submit" className="btn btn-submit">Enviar</button>
          </form>
        </div>
      )}

      <hr className="border-t border-gray-200 my-4" />

      {/* Propiedades relacionadas */}
      {propiedadesRelacionadas.length > 0 && (
        <div className="related-properties">
          <h2>Propiedades relacionadas</h2>
          <div className="propiedades-lista">
            {propiedadesRelacionadas.map((prop) => (
              <div key={prop.id} className="propiedad-card">
                <img src={prop.imagen} alt={prop.titulo} className="propiedad-card-img" />
                <div className="propiedad-card-body">
                  <h3>{prop.titulo}</h3>
                  <p><strong>Precio:</strong> ${prop.precio.toLocaleString()}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default PropertyDetail;
