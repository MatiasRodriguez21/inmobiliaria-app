import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { FaSearch, FaHome, FaDollarSign, FaMapMarkerAlt } from 'react-icons/fa';
import { motion } from 'framer-motion';

const SearchFilter = ({ propiedades, setFilteredPropiedades, initialBusqueda = '', initialTipo = '', isRental = false }) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [busqueda, setBusqueda] = useState(initialBusqueda);
  const [tipo, setTipo] = useState(initialTipo);
  const [precioMin, setPrecioMin] = useState('');
  const [precioMax, setPrecioMax] = useState('');
  const [isExpanded, setIsExpanded] = useState(false);

  useEffect(() => {
    setBusqueda(initialBusqueda);
    setTipo(initialTipo);
  }, [initialBusqueda, initialTipo]);

  const handleSearch = (e) => {
    e.preventDefault();
    const params = new URLSearchParams(searchParams);
    if (busqueda) params.set('busqueda', busqueda);
    else params.delete('busqueda');
    if (tipo) params.set('tipo', tipo);
    else params.delete('tipo');
    setSearchParams(params);

    const filtered = propiedades.filter(propiedad => {
      const cumpleBusqueda = !busqueda || 
        propiedad.titulo.toLowerCase().includes(busqueda.toLowerCase()) ||
        propiedad.descripcion.toLowerCase().includes(busqueda.toLowerCase()) ||
        propiedad.ubicacionTexto.toLowerCase().includes(busqueda.toLowerCase());
      const cumpleTipo = !tipo || propiedad.tipo === tipo;
      const cumplePrecioMin = !precioMin || propiedad.precio >= parseInt(precioMin);
      const cumplePrecioMax = !precioMax || propiedad.precio <= parseInt(precioMax);

      return cumpleBusqueda && cumpleTipo && cumplePrecioMin && cumplePrecioMax;
    });

    setFilteredPropiedades(filtered);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <form onSubmit={handleSearch} className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-6">
        <div className="space-y-4">
          {/* Barra principal de búsqueda */}
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1 relative">
              <div className="absolute inset-y-0 left-4 flex items-center pointer-events-none">
                <FaMapMarkerAlt className="text-gray-400" />
              </div>
              <input
                type="text"
                placeholder={`Buscar ${isRental ? 'alquiler' : 'propiedad'} por ubicación...`}
                value={busqueda}
                onChange={(e) => setBusqueda(e.target.value)}
                className="w-full pl-12 pr-4 py-3 rounded-xl border-2 border-gray-200 dark:border-gray-700 focus:border-blue-500 dark:focus:border-blue-400 focus:ring focus:ring-blue-200 dark:focus:ring-blue-800 dark:bg-gray-700 dark:text-white transition-all"
              />
            </div>

            <div className="md:w-64 relative">
              <div className="absolute inset-y-0 left-4 flex items-center pointer-events-none">
                <FaHome className="text-gray-400" />
              </div>
              <select 
                value={tipo} 
                onChange={(e) => setTipo(e.target.value)}
                className="w-full pl-12 pr-4 py-3 rounded-xl border-2 border-gray-200 dark:border-gray-700 focus:border-blue-500 dark:focus:border-blue-400 focus:ring focus:ring-blue-200 dark:focus:ring-blue-800 dark:bg-gray-700 dark:text-white appearance-none cursor-pointer transition-all"
              >
                <option value="">Tipo de propiedad</option>
                <option value="casa">Casa</option>
                <option value="departamento">Departamento</option>
                <option value="monoambiente">Monoambiente</option>
              </select>
            </div>

            <motion.button 
              type="submit"
              className="md:w-auto px-8 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-xl shadow-lg flex items-center justify-center gap-2 transition-colors"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <FaSearch />
              <span className="font-medium">Buscar</span>
            </motion.button>
          </div>

          {/* Botón para expandir filtros adicionales */}
          <button
            type="button"
            onClick={() => setIsExpanded(!isExpanded)}
            className="text-blue-600 dark:text-blue-400 text-sm font-medium hover:text-blue-700 dark:hover:text-blue-300 transition-colors focus:outline-none"
          >
            {isExpanded ? 'Menos filtros' : 'Más filtros'}
          </button>

          {/* Filtros adicionales */}
          <motion.div 
            initial={false}
            animate={{ 
              height: isExpanded ? 'auto' : 0,
              opacity: isExpanded ? 1 : 0
            }}
            transition={{ duration: 0.3 }}
            className="overflow-hidden"
          >
            <div className="pt-4 space-y-4">
              <div className="flex flex-col md:flex-row gap-4">
                <div className="flex-1 relative">
                  <div className="absolute inset-y-0 left-4 flex items-center pointer-events-none">
                    <FaDollarSign className="text-gray-400" />
                  </div>
                  <input
                    type="number"
                    placeholder={`Precio mínimo ${isRental ? 'mensual' : ''}`}
                    value={precioMin}
                    onChange={(e) => setPrecioMin(e.target.value)}
                    className="w-full pl-12 pr-4 py-3 rounded-xl border-2 border-gray-200 dark:border-gray-700 focus:border-blue-500 dark:focus:border-blue-400 focus:ring focus:ring-blue-200 dark:focus:ring-blue-800 dark:bg-gray-700 dark:text-white transition-all"
                  />
                </div>
                <div className="flex-1 relative">
                  <div className="absolute inset-y-0 left-4 flex items-center pointer-events-none">
                    <FaDollarSign className="text-gray-400" />
                  </div>
                  <input
                    type="number"
                    placeholder={`Precio máximo ${isRental ? 'mensual' : ''}`}
                    value={precioMax}
                    onChange={(e) => setPrecioMax(e.target.value)}
                    className="w-full pl-12 pr-4 py-3 rounded-xl border-2 border-gray-200 dark:border-gray-700 focus:border-blue-500 dark:focus:border-blue-400 focus:ring focus:ring-blue-200 dark:focus:ring-blue-800 dark:bg-gray-700 dark:text-white transition-all"
                  />
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </form>
    </motion.div>
  );
};

export default SearchFilter;
