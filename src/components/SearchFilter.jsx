import React, { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { FaSearch, FaHome, FaDollarSign, FaMapMarkerAlt } from 'react-icons/fa';
import { ORDENES } from '../utils/propiedades';

const CAMPOS = ['busqueda', 'tipo', 'precioMin', 'precioMax'];

const leerFormulario = (params) => Object.fromEntries(CAMPOS.map((c) => [c, params.get(c) || '']));

const inputBase =
  'w-full rounded-xl border-2 border-gray-200 py-3 pl-11 pr-4 transition focus:border-blue-500 focus:ring focus:ring-blue-200 dark:border-gray-700 dark:bg-gray-700 dark:text-white';

// El formulario edita los parámetros de la URL; el listado los lee y filtra.
// Así los filtros se pueden compartir con un link y el botón "Atrás" funciona.
const SearchFilter = ({ isRental = false }) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [form, setForm] = useState(() => leerFormulario(searchParams));
  const [masFiltros, setMasFiltros] = useState(() => Boolean(searchParams.get('precioMin') || searchParams.get('precioMax')));

  // Si la URL cambia desde afuera (por ejemplo, desde el buscador del inicio), sincronizar el formulario.
  useEffect(() => {
    setForm(leerFormulario(searchParams));
  }, [searchParams]);

  const actualizar = (e) => setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));

  const aplicar = (e) => {
    e.preventDefault();
    const params = new URLSearchParams(searchParams);
    CAMPOS.forEach((campo) => (form[campo] ? params.set(campo, form[campo]) : params.delete(campo)));
    setSearchParams(params);
  };

  const cambiarOrden = (e) => {
    const params = new URLSearchParams(searchParams);
    if (e.target.value === 'relevancia') params.delete('orden');
    else params.set('orden', e.target.value);
    setSearchParams(params, { replace: true });
  };

  const limpiar = () => setSearchParams({});

  const hayFiltros = CAMPOS.some((c) => searchParams.get(c));

  return (
    <form onSubmit={aplicar} className="rounded-2xl bg-white p-5 shadow-xl dark:bg-gray-800 md:p-6" role="search">
      <div className="flex flex-col gap-3 md:flex-row">
        <label className="relative flex-1">
          <span className="sr-only">Ubicación o palabra clave</span>
          <FaMapMarkerAlt className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" aria-hidden="true" />
          <input
            type="text"
            name="busqueda"
            placeholder={`Buscar ${isRental ? 'alquiler' : 'propiedad'} por ubicación...`}
            value={form.busqueda}
            onChange={actualizar}
            className={inputBase}
          />
        </label>

        <label className="relative md:w-56">
          <span className="sr-only">Tipo de propiedad</span>
          <FaHome className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" aria-hidden="true" />
          <select name="tipo" value={form.tipo} onChange={actualizar} className={`${inputBase} cursor-pointer appearance-none`}>
            <option value="">Todos los tipos</option>
            <option value="casa">Casa</option>
            <option value="departamento">Departamento</option>
            <option value="monoambiente">Monoambiente</option>
          </select>
        </label>

        <button
          type="submit"
          className="flex items-center justify-center gap-2 rounded-xl bg-blue-600 px-8 py-3 font-medium text-white shadow-lg transition hover:bg-blue-700 active:scale-[0.98]"
        >
          <FaSearch aria-hidden="true" />
          Buscar
        </button>
      </div>

      {masFiltros && (
        <div className="mt-3 flex flex-col gap-3 md:flex-row">
          <label className="relative flex-1">
            <span className="sr-only">Precio mínimo</span>
            <FaDollarSign className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" aria-hidden="true" />
            <input type="number" min="0" name="precioMin" placeholder={`Precio mínimo${isRental ? ' mensual' : ''}`} value={form.precioMin} onChange={actualizar} className={inputBase} />
          </label>
          <label className="relative flex-1">
            <span className="sr-only">Precio máximo</span>
            <FaDollarSign className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" aria-hidden="true" />
            <input type="number" min="0" name="precioMax" placeholder={`Precio máximo${isRental ? ' mensual' : ''}`} value={form.precioMax} onChange={actualizar} className={inputBase} />
          </label>
        </div>
      )}

      <div className="mt-4 flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-4 text-sm font-medium">
          <button type="button" onClick={() => setMasFiltros((v) => !v)} className="text-blue-600 hover:text-blue-700 dark:text-blue-400" aria-expanded={masFiltros}>
            {masFiltros ? 'Ocultar precio' : 'Filtrar por precio'}
          </button>
          {hayFiltros && (
            <button type="button" onClick={limpiar} className="text-gray-500 hover:text-gray-700 dark:text-gray-400">
              Limpiar filtros
            </button>
          )}
        </div>

        <label className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-300">
          Ordenar por
          <select
            value={searchParams.get('orden') || 'relevancia'}
            onChange={cambiarOrden}
            className="rounded-lg border-gray-200 py-1.5 text-sm dark:border-gray-700 dark:bg-gray-700"
          >
            {Object.entries(ORDENES).map(([valor, etiqueta]) => (
              <option key={valor} value={valor}>
                {etiqueta}
              </option>
            ))}
          </select>
        </label>
      </div>
    </form>
  );
};

export default SearchFilter;
