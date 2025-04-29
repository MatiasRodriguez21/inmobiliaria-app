import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const HomeSearchFilter = ({ propiedades }) => {
  const [busqueda, setBusqueda] = useState('');
  const [tipo, setTipo] = useState('');
  const navigate = useNavigate();

  const handleSearch = (e) => {
    e.preventDefault();
    const searchParams = new URLSearchParams();
    if (busqueda) searchParams.set('busqueda', busqueda);
    if (tipo) searchParams.set('tipo', tipo);
    
    navigate(`/propiedades/comprar?${searchParams.toString()}`);
  };

  return (
    <form onSubmit={handleSearch} className="home-search-filter">
      <div className="search-inputs">
        <input
          type="text"
          placeholder="¿Dónde quieres vivir?"
          value={busqueda}
          onChange={(e) => setBusqueda(e.target.value)}
          className="search-input"
        />
        <select 
          value={tipo} 
          onChange={(e) => setTipo(e.target.value)}
          className="type-select"
        >
          <option value="">Tipo de propiedad</option>
          <option value="casa">Casa</option>
          <option value="departamento">Departamento</option>
          <option value="monoambiente">Monoambiente</option>
        </select>
      </div>
      <button type="submit" className="search-button">
        Buscar Propiedades
      </button>
    </form>
  );
};

export default HomeSearchFilter;