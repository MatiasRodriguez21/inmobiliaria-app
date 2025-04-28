import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { FaStar, FaRegStar } from 'react-icons/fa';
import SearchFilter from './SearchFilter';

const Home = ({ propiedades }) => {
  const [filteredPropiedades, setFilteredPropiedades] = useState(propiedades);
  const [favoritos, setFavoritos] = useState(() => {
    const savedFavoritos = localStorage.getItem('favoritos');
    return savedFavoritos ? JSON.parse(savedFavoritos) : [];
  });

  const toggleFavorito = (propiedadId, e) => {
    e.preventDefault();
    e.stopPropagation();
    setFavoritos(prevFavoritos => {
      const newFavoritos = prevFavoritos.includes(propiedadId)
        ? prevFavoritos.filter(id => id !== propiedadId)
        : [...prevFavoritos, propiedadId];
      localStorage.setItem('favoritos', JSON.stringify(newFavoritos));
      return newFavoritos;
    });
  };

  return (
    <div className="home">
      <h2>Encuentra tu propiedad ideal</h2>
      <SearchFilter 
        propiedades={propiedades}
        setFilteredPropiedades={setFilteredPropiedades}
      />
      <div className="propiedades-lista">
        {filteredPropiedades.length === 0 ? (
          <p>No se encontraron propiedades que coincidan con la búsqueda.</p>
        ) : (
          filteredPropiedades.map((propiedad) => (
            <div key={propiedad.id} className="propiedad-card">
              <Link to={`/property/${propiedad.id}`} className="propiedad-link">
                <img
                  src={propiedad.imagen}
                  alt={`Imagen de la propiedad ${propiedad.titulo}`}
                  loading="lazy"
                />
                <div className="propiedad-info">
                  <h3>{propiedad.titulo}</h3>
                  <p>{propiedad.descripcion}</p>
                  <p><strong>Precio:</strong> ${propiedad.precio.toLocaleString()}</p>
                  <p><strong>Tipo:</strong> {propiedad.tipo}</p>
                  <p><strong>Ubicación:</strong> {propiedad.ubicacionTexto}</p>
                </div>
              </Link>
              <button 
                onClick={(e) => toggleFavorito(propiedad.id, e)}
                className="favorito-btn"
                aria-label={favoritos.includes(propiedad.id) ? "Quitar de favoritos" : "Agregar a favoritos"}
              >
                {favoritos.includes(propiedad.id) ? (
                  <FaStar className="star-icon filled" />
                ) : (
                  <FaRegStar className="star-icon" />
                )}
              </button>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default Home;
