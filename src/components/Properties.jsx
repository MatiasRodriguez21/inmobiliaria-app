import React, { useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';
import SearchFilter from './SearchFilter';
import PropertyCard, { PropertyCardSkeleton } from './PropertyCard';
import { usePropiedades } from '../hooks/usePropiedades';
import { useFavoritos } from '../hooks/useFavoritos';
import { filtrarPropiedades, ordenarPropiedades } from '../utils/propiedades';

const Properties = ({ isRental = false }) => {
  const operacion = isRental ? 'alquiler' : 'venta';
  const [searchParams, setSearchParams] = useSearchParams();
  const { propiedades, cargando, error } = usePropiedades(operacion);
  const { esFavorito, alternarFavorito } = useFavoritos();

  // Los filtros se leen de la URL y el resultado se recalcula solo cuando cambian.
  const resultado = useMemo(() => {
    const filtros = {
      busqueda: searchParams.get('busqueda') || '',
      tipo: searchParams.get('tipo') || '',
      precioMin: searchParams.get('precioMin') || '',
      precioMax: searchParams.get('precioMax') || '',
    };
    return ordenarPropiedades(filtrarPropiedades(propiedades, filtros), searchParams.get('orden') || 'relevancia');
  }, [propiedades, searchParams]);

  const titulo = `Propiedades en ${isRental ? 'alquiler' : 'venta'}`;

  return (
    <section className="w-full bg-gray-50 dark:bg-gray-900">
      <title>{`${titulo} | Inmobiliaria SA`}</title>
      <meta name="description" content={`Explorá casas, departamentos y monoambientes en ${operacion}. Filtrá por ubicación, tipo y precio.`} />

      <div className="mx-auto max-w-[1280px] px-4 py-10">
        <h1 className="mb-8 text-center font-display text-4xl font-bold text-primary-800 dark:text-white">{titulo}</h1>

        <div className="mb-8">
          <SearchFilter isRental={isRental} />
        </div>

        <p className="mb-6 text-gray-600 dark:text-gray-400" aria-live="polite">
          {cargando ? (
            'Buscando propiedades…'
          ) : (
            <>
              <span className="text-2xl font-bold text-blue-700">{resultado.length}</span>{' '}
              {resultado.length === 1 ? 'propiedad encontrada' : 'propiedades encontradas'}
            </>
          )}
        </p>

        {error && (
          <p className="rounded-xl bg-red-50 p-4 text-red-700" role="alert">
            No pudimos cargar las propiedades. Probá de nuevo en unos minutos.
          </p>
        )}

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {cargando
            ? Array.from({ length: 3 }, (_, i) => <PropertyCardSkeleton key={i} />)
            : resultado.map((propiedad) => (
                <PropertyCard
                  key={propiedad.id}
                  propiedad={propiedad}
                  esFavorito={esFavorito(propiedad.id)}
                  onToggleFavorito={alternarFavorito}
                />
              ))}
        </div>

        {!cargando && !error && resultado.length === 0 && (
          <div className="mx-auto max-w-md rounded-2xl border-2 border-dashed border-gray-200 p-10 text-center dark:border-gray-700">
            <p className="mb-2 text-lg font-semibold text-gray-800 dark:text-white">No hay propiedades con esos filtros</p>
            <p className="mb-6 text-gray-600 dark:text-gray-400">Probá con otra ubicación o ampliá el rango de precio.</p>
            <button type="button" onClick={() => setSearchParams({})} className="rounded-xl bg-blue-600 px-6 py-3 font-medium text-white hover:bg-blue-700">
              Ver todas
            </button>
          </div>
        )}
      </div>
    </section>
  );
};

export default Properties;
