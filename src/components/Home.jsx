import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import SearchFilter from './SearchFilter';

// Componente Home que muestra el título principal de la aplicación y la lista de propiedades con paginación
const Home = ({ propiedades }) => {
  const [filteredPropiedades, setFilteredPropiedades] = useState(propiedades);
  const [currentPage, setCurrentPage] = useState(1);
  const propiedadesPorPagina = 5;

  // Calcular propiedades para la página actual
  const indexUltimaPropiedad = currentPage * propiedadesPorPagina;
  const indexPrimeraPropiedad = indexUltimaPropiedad - propiedadesPorPagina;
  const propiedadesActuales = filteredPropiedades.slice(indexPrimeraPropiedad, indexUltimaPropiedad);

  // Cambiar página
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  // Resetear página a 1 cuando cambian las propiedades filtradas
  useEffect(() => {
    setCurrentPage(1);
  }, [filteredPropiedades]);

  // Número total de páginas
  const totalPaginas = Math.ceil(filteredPropiedades.length / propiedadesPorPagina);

  return (
    <div className="home">
      <h2>Propiedades disponibles</h2>
      <SearchFilter propiedades={propiedades} setFilteredPropiedades={setFilteredPropiedades} />
      <div className="propiedades-lista">
        {propiedadesActuales.length === 0 ? (
          <p>No se encontraron propiedades que coincidan con la búsqueda.</p>
        ) : (
          propiedadesActuales.map((propiedad) => (
            <Link to={`/property/${propiedad.id}`} key={propiedad.id} className="propiedad-card">
              <img src={propiedad.imagen} alt={propiedad.titulo} />
              <h3>{propiedad.titulo}</h3>
              <p>{propiedad.descripcion}</p>
              <p><strong>Precio:</strong> ${propiedad.precio.toLocaleString()}</p>
            </Link>
          ))
        )}
      </div>
      {/* Controles de paginación */}
      <div className="pagination">
        <button onClick={() => paginate(currentPage - 1)} disabled={currentPage === 1}>
          Anterior
        </button>
        <span>Página {currentPage} de {totalPaginas}</span>
        <button onClick={() => paginate(currentPage + 1)} disabled={currentPage === totalPaginas}>
          Siguiente
        </button>
      </div>
    </div>
  );
};

export default Home;
