import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const SearchFilter = ({ propiedades, setFilteredPropiedades }) => {
  const [busqueda, setBusqueda] = useState('');
  const [tipo, setTipo] = useState('');
  const [precioMin, setPrecioMin] = useState('');
  const [precioMax, setPrecioMax] = useState('');
  const navigate = useNavigate();

  const handleSearch = (e) => {
    e.preventDefault();
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
    navigate('/propiedades/comprar');
  };

  return (
    <form onSubmit={handleSearch} className="search-filter">
      <input
        type="text"
        placeholder="Buscar por ubicación, tipo de propiedad..."
        value={busqueda}
        onChange={(e) => setBusqueda(e.target.value)}
      />
      <select value={tipo} onChange={(e) => setTipo(e.target.value)}>
        <option value="">Tipo de propiedad</option>
        <option value="casa">Casa</option>
        <option value="departamento">Departamento</option>
        <option value="monoambiente">Monoambiente</option>
      </select>
      <input
        type="number"
        placeholder="Precio mínimo"
        value={precioMin}
        onChange={(e) => setPrecioMin(e.target.value)}
      />
      <input
        type="number"
        placeholder="Precio máximo"
        value={precioMax}
        onChange={(e) => setPrecioMax(e.target.value)}
      />
      <button type="submit">Buscar</button>
    </form>
  );
};

export default SearchFilter;
