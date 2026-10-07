import React from 'react';
import { Link } from 'react-router-dom';
import { FaStar, FaRegStar, FaBed, FaBath, FaMapMarkerAlt, FaRulerCombined } from 'react-icons/fa';
import { formatearPrecio } from '../utils/propiedades';

// Tarjeta reutilizada en el listado y en "propiedades relacionadas".
const PropertyCard = ({ propiedad, esFavorito = false, onToggleFavorito }) => {
  const { id, titulo, descripcion, ubicacionTexto, precio, operacion, imagenes, habitaciones, banos, tamano } = propiedad;

  return (
    <article className="group relative h-full overflow-hidden rounded-2xl bg-white shadow-md transition duration-300 hover:-translate-y-1 hover:shadow-xl dark:bg-gray-800">
      <Link to={`/property/${id}`} className="flex h-full flex-col">
        <div className="relative overflow-hidden">
          <img
            src={imagenes[0]}
            alt={titulo}
            className="h-56 w-full object-cover transition duration-500 group-hover:scale-105"
            loading="lazy"
          />
          <span className="absolute bottom-3 left-3 rounded-full bg-white/95 px-3 py-1 text-sm font-bold text-blue-700 shadow">
            {formatearPrecio(precio, operacion)}
          </span>
        </div>

        <div className="flex flex-1 flex-col p-5">
          <h3 className="mb-2 line-clamp-1 text-lg font-bold text-gray-900 transition-colors group-hover:text-blue-600 dark:text-white">
            {titulo}
          </h3>
          <p className="mb-3 flex items-center gap-2 text-sm text-gray-600 dark:text-gray-300">
            <FaMapMarkerAlt className="text-blue-500" aria-hidden="true" />
            <span className="line-clamp-1">{ubicacionTexto}</span>
          </p>
          <p className="mb-4 line-clamp-2 text-sm text-gray-600 dark:text-gray-400">{descripcion}</p>

          <ul className="mt-auto flex items-center gap-5 border-t border-gray-100 pt-4 text-sm text-gray-700 dark:border-gray-700 dark:text-gray-300">
            <li className="flex items-center gap-1.5" title="Habitaciones">
              <FaBed aria-hidden="true" /> {habitaciones}
            </li>
            <li className="flex items-center gap-1.5" title="Baños">
              <FaBath aria-hidden="true" /> {banos}
            </li>
            <li className="flex items-center gap-1.5" title="Superficie">
              <FaRulerCombined aria-hidden="true" /> {tamano} m²
            </li>
          </ul>
        </div>
      </Link>

      {onToggleFavorito && (
        <button
          type="button"
          onClick={() => onToggleFavorito(id)}
          className="absolute right-3 top-3 rounded-full bg-white/95 p-2.5 shadow transition hover:scale-110 active:scale-95"
          aria-label={esFavorito ? 'Quitar de favoritos' : 'Agregar a favoritos'}
          aria-pressed={esFavorito}
        >
          {esFavorito ? <FaStar className="text-lg text-yellow-400" /> : <FaRegStar className="text-lg text-gray-600" />}
        </button>
      )}
    </article>
  );
};

export const PropertyCardSkeleton = () => (
  <div className="h-full overflow-hidden rounded-2xl bg-white shadow-md dark:bg-gray-800" aria-hidden="true">
    <div className="h-56 animate-pulse bg-gray-200 dark:bg-gray-700" />
    <div className="space-y-3 p-5">
      <div className="h-5 w-3/4 animate-pulse rounded bg-gray-200 dark:bg-gray-700" />
      <div className="h-4 w-1/2 animate-pulse rounded bg-gray-200 dark:bg-gray-700" />
      <div className="h-4 w-full animate-pulse rounded bg-gray-200 dark:bg-gray-700" />
      <div className="h-4 w-2/3 animate-pulse rounded bg-gray-200 dark:bg-gray-700" />
    </div>
  </div>
);

export default PropertyCard;
