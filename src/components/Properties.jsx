import React, { useState, useEffect } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { FaStar, FaRegStar, FaBed, FaBath, FaMapMarkerAlt, FaRulerCombined } from 'react-icons/fa';
import { motion } from 'framer-motion';
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
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="max-w-[1440px] mx-auto px-4 py-12"
    >
      <h2 className="text-4xl font-display font-bold text-center mb-8 text-primary-800">
        Propiedades en Venta
      </h2>
      <div className="max-w-[1280px] mx-auto mb-12">
        <SearchFilter 
          propiedades={propiedades} 
          setFilteredPropiedades={setFilteredPropiedades}
          initialBusqueda={searchParams.get('busqueda') || ''}
          initialTipo={searchParams.get('tipo') || ''}
        />
      </div>
      <motion.div 
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8"
        variants={{
          hidden: { opacity: 0 },
          show: {
            opacity: 1,
            transition: {
              staggerChildren: 0.1
            }
          }
        }}
        initial="hidden"
        animate="show"
      >
        {filteredPropiedades.length === 0 ? (
          <p className="text-center col-span-full text-lg text-gray-600">
            No se encontraron propiedades que coincidan con la búsqueda.
          </p>
        ) : (
          filteredPropiedades.map((propiedad) => (
            <motion.div
              key={propiedad.id}
              className="relative group bg-white dark:bg-gray-800 rounded-2xl shadow-custom-lg hover:shadow-custom-xl transition-all duration-300 overflow-hidden h-full"
              variants={{
                hidden: { opacity: 0, y: 20 },
                show: { opacity: 1, y: 0 }
              }}
            >
              <Link to={`/property/${propiedad.id}`} className="block h-full">
                <div className="relative overflow-hidden">
                  <img
                    src={propiedad.imagen}
                    alt={`Imagen de ${propiedad.titulo}`}
                    className="w-full h-48 object-cover transform group-hover:scale-110 transition-transform duration-300"
                    loading="lazy"
                  />
                  <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-4">
                    <p className="text-white text-2xl font-semibold">
                      ${propiedad.precio.toLocaleString()}
                    </p>
                  </div>
                  <button 
                    onClick={(e) => toggleFavorito(propiedad.id, e)}
                    className="absolute top-4 right-4 p-2 bg-white/90 dark:bg-gray-800/90 rounded-full shadow-lg hover:scale-110 transition-transform duration-200 z-10"
                    aria-label={favoritos.includes(propiedad.id) ? "Quitar de favoritos" : "Agregar a favoritos"}
                  >
                    {favoritos.includes(propiedad.id) ? (
                      <FaStar className="text-yellow-400 text-xl" />
                    ) : (
                      <FaRegStar className="text-gray-600 dark:text-gray-300 text-xl" />
                    )}
                  </button>
                </div>
                
                <div className="p-6">
                  <h3 className="text-xl font-semibold text-primary-700 dark:text-primary-300 mb-2 line-clamp-1">
                    {propiedad.titulo}
                  </h3>
                  
                  <div className="flex items-center text-gray-600 dark:text-gray-300 mb-4">
                    <FaMapMarkerAlt className="mr-2 text-secondary-500" />
                    <span className="text-sm line-clamp-1">{propiedad.ubicacionTexto}</span>
                  </div>
                  
                  <p className="text-gray-600 dark:text-gray-400 mb-4 text-sm line-clamp-2">
                    {propiedad.descripcion}
                  </p>
                  
                  <div className="flex items-center justify-between text-sm text-gray-600 dark:text-gray-400 border-t border-gray-200 dark:border-gray-700 pt-4">
                    <div className="flex items-center gap-4">
                      {propiedad.caracteristicas && (
                        <>
                          {propiedad.caracteristicas.includes('habitaciones') && (
                            <span className="flex items-center gap-1">
                              <FaBed className="text-primary-500" />
                              {propiedad.caracteristicas.match(/\d+(?=\s*habitaciones)/)?.[0] || ''}
                            </span>
                          )}
                          {propiedad.caracteristicas.includes('baño') && (
                            <span className="flex items-center gap-1">
                              <FaBath className="text-primary-500" />
                              {propiedad.caracteristicas.match(/\d+(?=\s*baño)/)?.[0] || ''}
                            </span>
                          )}
                        </>
                      )}
                      <span className="flex items-center gap-1">
                        <FaRulerCombined className="text-primary-500" />
                        {propiedad.tamano}m²
                      </span>
                    </div>
                  </div>
                </div>
              </Link>
            </motion.div>
          ))
        )}
      </motion.div>
    </motion.div>
  );
};

export default Properties;