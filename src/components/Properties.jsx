import React, { useState, useEffect } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { FaStar, FaRegStar } from 'react-icons/fa';
import SearchFilter from './SearchFilter';

const Properties = ({ propiedades }) => {
  const [searchParams] = useSearchParams();
  const [filteredPropiedades, setFilteredPropiedades] = useState([]);
  const [favoritos, setFavoritos] = useState([]);

  // Cargar favoritos del localStorage al iniciar
  useEffect(() => {
    const savedFavoritos = localStorage.getItem('favoritos');
    if (savedFavoritos) {
      setFavoritos(JSON.parse(savedFavoritos));
    }
  }, []);

  // Aplicar filtros iniciales basados en los parámetros de URL
  useEffect(() => {
    const busqueda = searchParams.get('busqueda') || '';
    const tipo = searchParams.get('tipo') || '';
    
    let filtered = propiedades.filter(prop => prop.tipo !== 'alquiler');

    if (busqueda) {
      filtered = filtered.filter(propiedad => 
        propiedad.titulo.toLowerCase().includes(busqueda.toLowerCase()) ||
        propiedad.descripcion.toLowerCase().includes(busqueda.toLowerCase()) ||
        propiedad.ubicacionTexto.toLowerCase().includes(busqueda.toLowerCase())
      );
    }

    if (tipo) {
      filtered = filtered.filter(propiedad => propiedad.tipo === tipo);
    }

    setFilteredPropiedades(filtered);
  }, [searchParams, propiedades]);

  // Guardar favoritos en localStorage cuando cambian
  useEffect(() => {
    localStorage.setItem('favoritos', JSON.stringify(favoritos));
  }, [favoritos]);

  const toggleFavorito = (propiedadId, e) => {
    e.preventDefault();
    e.stopPropagation();
    setFavoritos(prevFavoritos => {
      if (prevFavoritos.includes(propiedadId)) {
        return prevFavoritos.filter(id => id !== propiedadId);
      } else {
        return [...prevFavoritos, propiedadId];
      }
    });
  };

  return (
    <div className="max-w-[1440px] mx-auto px-4 py-8">
      <h2 className="text-3xl font-bold text-center mb-8">Propiedades en Venta</h2>
      <div className="max-w-[1280px] mx-auto">
        <SearchFilter 
          propiedades={propiedades} 
          setFilteredPropiedades={setFilteredPropiedades}
          initialBusqueda={searchParams.get('busqueda') || ''}
          initialTipo={searchParams.get('tipo') || ''}
        />
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mt-8">
        {filteredPropiedades.length === 0 ? (
          <p className="text-center col-span-full">No se encontraron propiedades que coincidan con la búsqueda.</p>
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

export default Properties;