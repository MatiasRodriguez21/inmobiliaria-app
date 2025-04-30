import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';

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
      const cumpleBusqueda = propiedad.titulo.toLowerCase().includes(busqueda.toLowerCase()) ||
                            propiedad.descripcion.toLowerCase().includes(busqueda.toLowerCase()) ||
                            propiedad.ubicacionTexto.toLowerCase().includes(busqueda.toLowerCase());
      const cumpleTipo = tipo === '' || propiedad.tipo === tipo;
      const cumplePrecioMin = precioMin === '' || propiedad.precio >= parseInt(precioMin);
      const cumplePrecioMax = precioMax === '' || propiedad.precio <= parseInt(precioMax);

      return cumpleBusqueda && cumpleTipo && cumplePrecioMin && cumplePrecioMax;
    });

    setFilteredPropiedades(filtered);
  };

  return (
    <form onSubmit={handleSearch} className="w-full">
      <div className="flex flex-col md:flex-row gap-3 items-stretch">
        <input
          type="text"
          placeholder="Buscar por ubicación, tipo de propiedad..."
          value={busqueda}
          onChange={(e) => setBusqueda(e.target.value)}
          className="flex-1 px-4 py-2.5 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <select 
          value={tipo} 
          onChange={(e) => setTipo(e.target.value)}
          className="md:w-48 px-4 py-2.5 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value="">Tipo de propiedad</option>
          <option value="casa">Casa</option>
          <option value="departamento">Departamento</option>
          <option value="monoambiente">Monoambiente</option>
        </select>
        <div className="flex gap-3">
          <input
            type="number"
            placeholder="Precio mínimo"
            value={precioMin}
            onChange={(e) => setPrecioMin(e.target.value)}
            className="w-full md:w-36 px-4 py-2.5 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <input
            type="number"
            placeholder="Precio máximo"
            value={precioMax}
            onChange={(e) => setPrecioMax(e.target.value)}
            className="w-full md:w-36 px-4 py-2.5 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <button 
          type="submit"
          className="px-8 py-2.5 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
        >
          Buscar
        </button>
      </div>
    </form>
  );
};

export default SearchFilter;
