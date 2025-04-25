import React from 'react';
import { useParams } from 'react-router-dom';
import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';

// Iconos simples con emojis para ilustrar (pueden reemplazarse por SVG o librerías de iconos)
const IconoPrecio = () => <span role="img" aria-label="precio">💰</span>;
const IconoTipo = () => <span role="img" aria-label="tipo">🏠</span>;
const IconoUbicacion = () => <span role="img" aria-label="ubicacion">📍</span>;
const IconoTamano = () => <span role="img" aria-label="tamaño">📐</span>;
const IconoCaracteristicas = () => <span role="img" aria-label="características">✨</span>;

// Componente para mostrar los detalles de una propiedad
const PropertyDetail = ({ propiedades }) => {
  const { id } = useParams();
  const propiedad = propiedades.find(prop => prop.id === parseInt(id));

  if (!propiedad) {
    return <div>Propiedad no encontrada.</div>;
  }

  const position = propiedad.ubicacion || [40.4168, -3.7038]; // Madrid por defecto
  const propiedadesRelacionadas = propiedades.filter(
    prop => prop.tipo === propiedad.tipo && prop.id !== propiedad.id
  );

  return (
    <div className="property-detail">
      <h1>{propiedad.titulo}</h1>

      <div className="property-main-content">
        {/* Carrusel de imágenes */}
        <div className="carousel-container">
          <Carousel showThumbs={false} infiniteLoop useKeyboardArrows autoPlay>
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

      {/* Botones de contacto y agendar visita */}
      <div className="buttons-container">
        <button onClick={() => alert('Funcionalidad de contacto en desarrollo')}>Contactar vendedor</button>
        <button onClick={() => alert('Funcionalidad de agendar visita en desarrollo')}>Agendar visita</button>
      </div>

      {/* Propiedades relacionadas */}
      {propiedadesRelacionadas.length > 0 && (
        <div className="related-properties">
          <h2>Propiedades relacionadas</h2>
          <div className="propiedades-lista">
            {propiedadesRelacionadas.map((prop) => (
              <div key={prop.id} className="propiedad-card">
                <img src={prop.imagen} alt={prop.titulo} />
                <h3>{prop.titulo}</h3>
                <p><strong>Precio:</strong> ${prop.precio.toLocaleString()}</p>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default PropertyDetail;