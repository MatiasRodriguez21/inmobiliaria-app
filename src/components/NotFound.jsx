import React from 'react';
import { Link } from 'react-router-dom';

const NotFound = ({ titulo = 'Página no encontrada', mensaje = 'La página que buscás no existe o fue movida.' }) => (
  <section className="flex min-h-[60vh] flex-col items-center justify-center px-4 text-center">
    <title>{`${titulo} | Inmobiliaria SA`}</title>
    <p className="mb-2 text-6xl font-bold text-blue-600">404</p>
    <h1 className="mb-3 text-2xl font-bold text-gray-900 dark:text-white">{titulo}</h1>
    <p className="mb-8 max-w-md text-gray-600 dark:text-gray-300">{mensaje}</p>
    <div className="flex flex-wrap justify-center gap-3">
      <Link to="/propiedades/comprar" className="rounded-xl bg-blue-600 px-6 py-3 font-medium text-white shadow hover:bg-blue-700">
        Ver propiedades en venta
      </Link>
      <Link to="/" className="rounded-xl border border-gray-300 px-6 py-3 font-medium text-gray-700 hover:bg-gray-50 dark:text-gray-200">
        Ir al inicio
      </Link>
    </div>
  </section>
);

export default NotFound;
