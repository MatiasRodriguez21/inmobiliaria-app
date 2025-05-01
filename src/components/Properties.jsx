import React, { useState, useEffect } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { FaStar, FaRegStar, FaBed, FaBath, FaMapMarkerAlt, FaRulerCombined } from 'react-icons/fa';
import { motion } from 'framer-motion';
import SearchFilter from './SearchFilter';

const Properties = ({ propiedades, isRental = false }) => {
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
    
    let filtered = propiedades;

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
        Propiedades en {isRental ? 'Alquiler' : 'Venta'}
      </h2>

      <div className="max-w-[1280px] mx-auto mb-12">
        <SearchFilter 
          propiedades={propiedades} 
          setFilteredPropiedades={setFilteredPropiedades}
          initialBusqueda={searchParams.get('busqueda') || ''}
          initialTipo={searchParams.get('tipo') || ''}
          isRental={isRental}
        />
      </div>

      <div className="max-w-[1280px] mx-auto -ml-1 mb-8">
        <div className="flex items-baseline gap-2">
          <span className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-blue-800 bg-clip-text text-transparent">
            {filteredPropiedades.length}
          </span>
          <span className="text-gray-600 dark:text-gray-400 font-medium">
            propiedades en {isRental ? 'alquiler' : 'venta'}
            {(searchParams.get('busqueda') || searchParams.get('tipo')) && (
              <span className="ml-1 text-gray-500">encontradas</span>
            )}
          </span>
        </div>
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
              className="relative group bg-white dark:bg-gray-800 rounded-2xl shadow-custom-lg hover:shadow-custom-xl transition-all duration-500 overflow-hidden h-full transform-gpu hover:-translate-y-2"
              variants={{
                hidden: { opacity: 0, y: 20 },
                show: { opacity: 1, y: 0, transition: { duration: 0.6 } }
              }}
              whileHover={{ scale: 1.02 }}
            >
              <Link to={`/property/${propiedad.id}`} className="block h-full">
                <div className="relative overflow-hidden">
                  <motion.img
                    src={propiedad.imagen}
                    alt={`Imagen de ${propiedad.titulo}`}
                    className="w-full h-64 object-cover"
                    initial={{ scale: 1 }}
                    whileHover={{ scale: 1.1 }}
                    transition={{ duration: 0.6 }}
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  <div className="absolute bottom-0 left-0 right-0 p-6 transform translate-y-6 group-hover:translate-y-0 transition-transform duration-300">
                    <p className="text-white text-2xl font-bold mb-2">
                      ${propiedad.precio.toLocaleString()}{isRental && '/mes'}
                    </p>
                  </div>
                </div>
                
                <motion.button 
                  onClick={(e) => toggleFavorito(propiedad.id, e)}
                  className="absolute top-4 right-4 p-3 bg-white/90 dark:bg-gray-800/90 rounded-full shadow-lg hover:scale-110 transition-all duration-300 z-10"
                  whileHover={{ scale: 1.2 }}
                  whileTap={{ scale: 0.9 }}
                  aria-label={favoritos.includes(propiedad.id) ? "Quitar de favoritos" : "Agregar a favoritos"}
                >
                  {favoritos.includes(propiedad.id) ? (
                    <FaStar className="text-yellow-400 text-xl" />
                  ) : (
                    <FaRegStar className="text-gray-600 dark:text-gray-300 text-xl" />
                  )}
                </motion.button>
                
                <div className="p-6">
                  <h3 className="text-xl font-bold text-primary-700 dark:text-primary-300 mb-3 line-clamp-1 group-hover:text-blue-600 transition-colors duration-300">
                    {propiedad.titulo}
                  </h3>
                  
                  <div className="flex items-center text-gray-600 dark:text-gray-300 mb-4 group-hover:text-blue-500 transition-colors duration-300">
                    <FaMapMarkerAlt className="mr-2 text-secondary-500" />
                    <span className="text-sm line-clamp-1">{propiedad.ubicacionTexto}</span>
                  </div>
                  
                  <p className="text-gray-600 dark:text-gray-400 mb-6 text-sm line-clamp-2 group-hover:text-gray-800 dark:group-hover:text-gray-200 transition-colors duration-300">
                    {propiedad.descripcion}
                  </p>
                  
                  <div className="flex items-center justify-between text-sm border-t border-gray-200 dark:border-gray-700 pt-4">
                    <div className="flex items-center gap-6">
                      {propiedad.caracteristicas && (
                        <>
                          {propiedad.caracteristicas.includes('habitaciones') && (
                            <div className="flex items-center gap-2 text-gray-600 dark:text-gray-400 group-hover:text-blue-600 transition-colors duration-300">
                              <FaBed className="text-lg" />
                              <span>{propiedad.caracteristicas.match(/\d+(?=\s*habitaciones)/)?.[0] || ''}</span>
                            </div>
                          )}
                          {propiedad.caracteristicas.includes('baño') && (
                            <div className="flex items-center gap-2 text-gray-600 dark:text-gray-400 group-hover:text-blue-600 transition-colors duration-300">
                              <FaBath className="text-lg" />
                              <span>{propiedad.caracteristicas.match(/\d+(?=\s*baño)/)?.[0] || ''}</span>
                            </div>
                          )}
                        </>
                      )}
                      <div className="flex items-center gap-2 text-gray-600 dark:text-gray-400 group-hover:text-blue-600 transition-colors duration-300">
                        <FaRulerCombined className="text-lg" />
                        <span>{propiedad.tamano}m²</span>
                      </div>
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