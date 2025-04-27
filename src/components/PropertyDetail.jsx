import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import '../App.css'; // Corregir la ruta de importación de estilos

// Iconos simples con emojis para ilustrar (pueden reemplazarse por SVG o librerías de iconos)
const IconoPrecio = () => <span role="img" aria-label="precio">💰</span>;
const IconoUbicacion = () => <span role="img" aria-label="ubicacion">📍</span>;
const IconoTamano = () => <span role="img" aria-label="tamaño">📐</span>;
const IconoCaracteristicas = () => <span role="img" aria-label="características">✨</span>;

// Definición del IconoTipo para evitar error
const IconoTipo = () => <span role="img" aria-label="tipo">🏠</span>;

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

        {/* Información de la propiedad */}
        <div className="property-info">
          <p><IconoPrecio /> <strong>Precio:</strong> ${propiedad.precio.toLocaleString()}</p>
          <p><IconoTipo /> <strong>Tipo:</strong> {propiedad.tipo}</p>
          <p><IconoUbicacion /> <strong>Ubicación:</strong> {propiedad.ubicacionTexto || 'No disponible'}</p>
          <p><IconoTamano /> <strong>Tamaño:</strong> {propiedad.tamano || 'No disponible'} m²</p>
          <p className="caracteristicas-row">
            <IconoCaracteristicas />
            <strong>Características:</strong>
            <span className="caracteristicas-text">{propiedad.caracteristicas || 'No disponible'}</span>
          </p>
          <p className="descripcion">{propiedad.descripcion}</p>
        </div>
      </div>

      {/* Descripción extendida */}
      <div className="property-extended-description">
        <h2>Descripción extendida</h2>
        <p>{propiedad.descripcionExtendida || 'No hay una descripción extendida disponible para esta propiedad.'}</p>
      </div>

      {/* Mapa con la ubicación */}
      <div className="map-container" style={{ height: '300px', marginBottom: '20px' }}>
        <MapContainer center={position} zoom={13} scrollWheelZoom={false} style={{ height: '100%', width: '100%' }}>
          <TileLayer
            attribution='&copy; <a href="https://osm.org/copyright">OpenStreetMap</a>'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          <Marker position={position}>
            <Popup>{propiedad.titulo}</Popup>
          </Marker>
        </MapContainer>
      </div>

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

      {/* Propiedades relacionadas con diseño mejorado */}
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
