import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import SearchFilter from './SearchFilter';

// Componente Home que muestra el título principal de la aplicación y la lista de propiedades con infinite scroll y favoritos
const Home = ({ propiedades }) => {
  const [filteredPropiedades, setFilteredPropiedades] = useState(propiedades);
  const [visiblePropiedades, setVisiblePropiedades] = useState([]);
  const [hasMore, setHasMore] = useState(true);
  const propiedadesPorCarga = 5;
  const [favoritos, setFavoritos] = useState(() => {
    const saved = localStorage.getItem('favoritos');
    return saved ? JSON.parse(saved) : [];
  });
  const [favoritoMensaje, setFavoritoMensaje] = useState(null); // Estado para mostrar el mensaje

  useEffect(() => {
    // Inicializar las propiedades visibles
    setVisiblePropiedades(propiedades.slice(0, propiedadesPorCarga));
    setHasMore(propiedades.length > propiedadesPorCarga);
  }, [propiedades]);

  useEffect(() => {
    // Reiniciar las propiedades visibles cuando cambian los filtros
    setVisiblePropiedades(filteredPropiedades.slice(0, propiedadesPorCarga));
    setHasMore(filteredPropiedades.length > propiedadesPorCarga);
  }, [filteredPropiedades]);

  const cargarMasPropiedades = () => {
    const nuevasPropiedades = filteredPropiedades.slice(
      visiblePropiedades.length,
      visiblePropiedades.length + propiedadesPorCarga
    );
    setVisiblePropiedades((prev) => [...prev, ...nuevasPropiedades]);
    setHasMore(visiblePropiedades.length + nuevasPropiedades.length < filteredPropiedades.length);
  };

  const handleScroll = () => {
    if (
      window.innerHeight + document.documentElement.scrollTop >=
        document.documentElement.offsetHeight - 100 &&
      hasMore
    ) {
      cargarMasPropiedades();
    }
  };

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [hasMore, visiblePropiedades]);

  const toggleFavorito = (id) => {
    let updatedFavoritos;
    if (favoritos.includes(id)) {
      updatedFavoritos = favoritos.filter((favId) => favId !== id);
    } else {
      updatedFavoritos = [...favoritos, id];
      setFavoritoMensaje(id); // Mostrar mensaje para la propiedad agregada
      setTimeout(() => setFavoritoMensaje(null), 2000); // Ocultar mensaje después de 2 segundos
    }
    setFavoritos(updatedFavoritos);
    localStorage.setItem('favoritos', JSON.stringify(updatedFavoritos));
  };

  return (
    <div className="home">
      <h2>Propiedades disponibles</h2>
      <SearchFilter propiedades={propiedades} setFilteredPropiedades={setFilteredPropiedades} />
      <div className="propiedades-lista">
        {visiblePropiedades.length === 0 ? (
          <p>No se encontraron propiedades que coincidan con la búsqueda.</p>
        ) : (
          visiblePropiedades.map((propiedad) => (
            <div key={propiedad.id} className="propiedad-card">
              <Link to={`/property/${propiedad.id}`} className="propiedad-link">
                <img
                  src={propiedad.imagen}
                  alt={`Imagen de la propiedad ${propiedad.titulo}`}
                  loading="lazy"
                />
                <h3>{propiedad.titulo}</h3>
                <p>{propiedad.descripcion}</p>
                <p><strong>Precio:</strong> ${propiedad.precio.toLocaleString()}</p>
              </Link>
              <button
                className={`favorito-btn ${favoritos.includes(propiedad.id) ? 'favorito' : ''}`}
                onClick={() => toggleFavorito(propiedad.id)}
              >
                ★
              </button>
              {favoritoMensaje === propiedad.id && (
                <p className="favorito-leyenda mostrar">Propiedad agregada a favoritos</p>
              )}
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default Home;
