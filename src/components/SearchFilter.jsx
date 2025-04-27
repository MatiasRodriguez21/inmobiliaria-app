import React, { useState } from 'react';

// Componente de búsqueda y filtros
const SearchFilter = ({ propiedades, setFilteredPropiedades }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [priceRange, setPriceRange] = useState('');
  const [propertyType, setPropertyType] = useState(''); // Nuevo estado para tipo de propiedad
  const [rooms, setRooms] = useState(''); // Nuevo estado para cantidad de habitaciones

  const handleSearch = (event) => {
    const value = event.target.value;
    setSearchTerm(value);
  };

  const handlePriceChange = (event) => {
    const value = event.target.value;
    setPriceRange(value);
  };

  const handlePropertyTypeChange = (event) => {
    const value = event.target.value;
    setPropertyType(value);
  };

  const handleRoomsChange = (event) => {
    const value = event.target.value;
    setRooms(value);
  };

  const handleSearchClick = () => {
    let filtered = propiedades;

    console.log("Término de búsqueda:", searchTerm); // Para depuración
    console.log("Rango de precio:", priceRange); // Para depuración
    console.log("Tipo de propiedad:", propertyType); // Para depuración
    console.log("Cantidad de habitaciones:", rooms); // Para depuración

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

    // Filtrar por tipo de propiedad
    if (propertyType) {
      filtered = filtered.filter(propiedad => propiedad.tipo === propertyType);
    }

    // Filtrar por cantidad de habitaciones
    if (rooms) {
      filtered = filtered.filter(propiedad => propiedad.habitaciones === Number(rooms));
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
        onKeyDown={handleKeyDown}
      />
      <select value={priceRange} onChange={handlePriceChange} className="filter-select">
        <option value="">Seleccionar rango de precio</option>
        <option value="0-100000">Hasta $100,000</option>
        <option value="100000-200000">$100,000 - $200,000</option>
        <option value="200000-300000">$200,000 - $300,000</option>
        <option value="300000">Más de $300,000</option>
      </select>
      <select value={propertyType} onChange={handlePropertyTypeChange} className="filter-select">
        <option value="">Seleccionar tipo de propiedad</option>
        <option value="casa">Casa</option>
        <option value="departamento">Departamento</option>
        <option value="monoambiente">Monoambiente</option>
      </select>
      <select value={rooms} onChange={handleRoomsChange} className="filter-select">
        <option value="">Seleccionar habitaciones</option>
        <option value="1">1</option>
        <option value="2">2</option>
        <option value="3">3</option>
        <option value="4">4+</option>
      </select>
      <button onClick={handleSearchClick}>Buscar</button>
    </div>
  );
};

export default SearchFilter;
