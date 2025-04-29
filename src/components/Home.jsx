import React from 'react';
import HomeSearchFilter from './HomeSearchFilter';

const Home = ({ propiedades }) => {
  return (
    <div className="home">
      <div className="hero-section">
        <h1>Encuentra la propiedad de tus sueños</h1>
        <p>Busca entre nuestras propiedades disponibles</p>
        <div className="search-container">
          <HomeSearchFilter propiedades={propiedades} />
        </div>
      </div>
    </div>
  );
};

export default Home;
