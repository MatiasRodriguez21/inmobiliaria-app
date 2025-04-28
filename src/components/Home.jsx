import React from 'react';
import SearchFilter from './SearchFilter';

const Home = ({ propiedades }) => {
  return (
    <div className="home">
      <div className="hero-section">
        <h1>Encuentra la propiedad de tus sueños</h1>
        <p>Busca entre nuestras propiedades disponibles</p>
        <div className="search-container">
          <SearchFilter 
            propiedades={propiedades}
            setFilteredPropiedades={() => {}}
          />
        </div>
      </div>
    </div>
  );
};

export default Home;
