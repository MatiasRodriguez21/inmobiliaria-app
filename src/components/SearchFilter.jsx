import React, { useState } from 'react';

// Componente de búsqueda y filtros
const SearchFilter = ({ propiedades, setFilteredPropiedades }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [priceRange, setPriceRange] = useState('');

  const handleSearch = (event) => {
    const value = event.target.value;
    setSearchTerm(value);
  };

  const handlePriceChange = (event) => {
    const value = event.target.value;
    setPriceRange(value);
  };

  const handleSearchClick = () => {
    let filtered = propiedades;

    console.log("Término de búsqueda:", searchTerm); // Para depuración
    console.log("Rango de precio:", priceRange); // Para depuración

    // Filtrar por término de búsqueda
    if (searchTerm) {
      filtered = filtered.filter(propiedad =>
        propiedad.titulo.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Filtrar por rango de precio
    if (priceRange) {
      const [min, max] = priceRange.split('-').map(Number);
      filtered = filtered.filter(propiedad => {
        if (max) {
          return propiedad.precio >= min && propiedad.precio <= max;
        }
        return propiedad.precio >= min;
      });
    }

    console.log("Propiedades filtradas:", filtered); // Para depuración
    setFilteredPropiedades(filtered);
  };

  const handleKeyDown = (event) => {
    if (event.key === 'Enter') {
      handleSearchClick();
    }
  };

  return (
    <div className="search-filter">
      <input
        type="text"
        placeholder="Buscar propiedades..."
        value={searchTerm}
        onChange={handleSearch}
        onKeyDown={handleKeyDown} // Agregado para manejar el evento de tecla
      />
      <select value={priceRange} onChange={handlePriceChange} className="filter-select">
        <option value="">Seleccionar rango de precio</option>
        <option value="0-100000">Hasta $100,000</option>
        <option value="100000-200000">$100,000 - $200,000</option>
        <option value="200000-300000">$200,000 - $300,000</option>
        <option value="300000">Más de $300,000</option>
      </select>
      <button onClick={handleSearchClick}>Buscar</button>
    </div>
  );
};

export default SearchFilter;
