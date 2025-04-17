import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import SearchFilter from './SearchFilter';

// Componente Home que muestra el título principal de la aplicación y la lista de propiedades
const Home = ({ propiedades }) => {
  const [filteredPropiedades, setFilteredPropiedades] = useState(propiedades);

  return (
    <div className="home">
      <h1>Inmobiliaria</h1>
      <h2>Propiedades disponibles</h2>
      <SearchFilter propiedades={propiedades} setFilteredPropiedades={setFilteredPropiedades} />
      <div className="propiedades-lista">
        {filteredPropiedades.map((propiedad) => (
          <Link to={`/property/${propiedad.id}`} key={propiedad.id} className="propiedad-card">
            <img src={propiedad.imagen} alt={propiedad.titulo} />
            <h3>{propiedad.titulo}</h3>
            <p>{propiedad.descripcion}</p>
            <p><strong>Precio:</strong> ${propiedad.precio.toLocaleString()}</p>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Home;
