import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { FaSearch, FaHome, FaDollarSign } from 'react-icons/fa';
import { motion } from 'framer-motion';

const SearchFilter = ({ propiedades, setFilteredPropiedades, initialBusqueda = '', initialTipo = '' }) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [busqueda, setBusqueda] = useState(initialBusqueda);
  const [tipo, setTipo] = useState(initialTipo);
  const [precioMin, setPrecioMin] = useState('');
  const [precioMax, setPrecioMax] = useState('');

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
    <motion.form 
      onSubmit={handleSearch}
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="bg-white dark:bg-gray-800 rounded-2xl shadow-custom p-4"
    >
      <div className="flex flex-col md:flex-row items-center gap-4">
        {/* Campo de búsqueda */}
        <div className="relative w-full md:w-1/3">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <FaSearch className="text-gray-400" />
          </div>
          <input
            type="text"
            placeholder="Buscar por ubicación, tipo..."
            value={busqueda}
            onChange={(e) => setBusqueda(e.target.value)}
            className="w-full pl-10 pr-4 py-3 rounded-xl border-gray-200 dark:border-gray-700 focus:border-primary-500 focus:ring focus:ring-primary-200 dark:focus:ring-primary-800 dark:bg-gray-700 dark:text-white transition-colors"
          />
        </div>

        {/* Selector de tipo */}
        <div className="relative w-full md:w-56">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <FaHome className="text-gray-400" />
          </div>
          <select 
            value={tipo} 
            onChange={(e) => setTipo(e.target.value)}
            className="w-full pl-10 pr-4 py-3 rounded-xl border-gray-200 dark:border-gray-700 focus:border-primary-500 focus:ring focus:ring-primary-200 dark:focus:ring-primary-800 dark:bg-gray-700 dark:text-white transition-colors appearance-none bg-white dark:bg-gray-700 cursor-pointer"
          >
            <option value="">Tipo de propiedad</option>
            <option value="casa">Casa</option>
            <option value="departamento">Departamento</option>
            <option value="monoambiente">Monoambiente</option>
          </select>
        </div>

        {/* Precio mínimo */}
        <div className="relative w-full md:w-48">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <FaDollarSign className="text-gray-400" />
          </div>
          <input
            type="number"
            placeholder="Precio mínimo"
            value={precioMin}
            onChange={(e) => setPrecioMin(e.target.value)}
            className="w-full pl-10 pr-4 py-3 rounded-xl border-gray-200 dark:border-gray-700 focus:border-primary-500 focus:ring focus:ring-primary-200 dark:focus:ring-primary-800 dark:bg-gray-700 dark:text-white transition-colors"
          />
        </div>

        {/* Precio máximo */}
        <div className="relative w-full md:w-48">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <FaDollarSign className="text-gray-400" />
          </div>
          <input
            type="number"
            placeholder="Precio máximo"
            value={precioMax}
            onChange={(e) => setPrecioMax(e.target.value)}
            className="w-full pl-10 pr-4 py-3 rounded-xl border-gray-200 dark:border-gray-700 focus:border-primary-500 focus:ring focus:ring-primary-200 dark:focus:ring-primary-800 dark:bg-gray-700 dark:text-white transition-colors"
          />
        </div>

        {/* Botón de búsqueda */}
        <button 
          type="submit"
          className="w-full md:w-auto px-8 py-3 bg-primary-600 hover:bg-primary-700 text-white font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all duration-200 flex items-center justify-center gap-2 min-w-[120px]"
        >
          <FaSearch />
          <span>Buscar</span>
        </button>
      </div>
    </motion.form>
  );
};

export default SearchFilter;
