import React from 'react';
import { useParams } from 'react-router-dom';

// Componente para mostrar los detalles de una propiedad
const PropertyDetail = ({ propiedades }) => {
  const { id } = useParams();
  console.log("ID de la propiedad:", id); // Agregado para depuración
  console.log("Propiedades disponibles:", propiedades); // Agregado para depuración
  const propiedad = propiedades.find(prop => prop.id === parseInt(id));

  if (!propiedad) {
    return <div>Propiedad no encontrada.</div>;
  }

  return (
    <div className="property-detail">
      <h1>{propiedad.titulo}</h1>
      <img src={propiedad.imagen} alt={propiedad.titulo} />
      <p>{propiedad.descripcion}</p>
      <p><strong>Precio:</strong> ${propiedad.precio.toLocaleString()}</p>
      <p><strong>Tipo:</strong> {propiedad.tipo}</p>
      {/* Aquí se pueden agregar más detalles como ubicación, características, etc. */}
    </div>
  );
};

export default PropertyDetail;
