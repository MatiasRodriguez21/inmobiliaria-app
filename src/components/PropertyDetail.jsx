import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { FaArrowLeft, FaBed, FaBath, FaRulerCombined, FaMapMarkerAlt, FaHome, FaEnvelope } from 'react-icons/fa';
import PropertyCard from './PropertyCard';
import NotFound from './NotFound';
import { usePropiedad, usePropiedades } from '../hooks/usePropiedades';
import { useFavoritos } from '../hooks/useFavoritos';
import { formatearPrecio } from '../utils/propiedades';

// Ícono del marcador (Leaflet no resuelve sus imágenes por defecto con Webpack)
const icon = L.icon({
  iconUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png',
  iconRetinaUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png',
  shadowUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41],
});

const Dato = ({ icono: Icono, etiqueta, valor }) => (
  <div className="flex items-center gap-3 rounded-xl bg-gray-50 p-3 dark:bg-gray-700/50">
    <Icono className="text-lg text-blue-600" aria-hidden="true" />
    <div>
      <p className="text-xs uppercase tracking-wide text-gray-500 dark:text-gray-400">{etiqueta}</p>
      <p className="font-semibold capitalize text-gray-900 dark:text-white">{valor}</p>
    </div>
  </div>
);

const FormularioConsulta = ({ titulo }) => {
  const [enviado, setEnviado] = useState(false);

  if (enviado) {
    return (
      <p className="rounded-xl bg-green-50 p-4 text-green-800" role="status">
        ¡Gracias! Recibimos tu consulta y te vamos a responder a la brevedad.
      </p>
    );
  }

  // Demo: no hay backend de mensajes, así que solo se confirma el envío en pantalla.
  const enviar = (e) => {
    e.preventDefault();
    setEnviado(true);
  };

  const campo = 'w-full rounded-xl border border-gray-300 px-4 py-2.5 focus:border-blue-500 focus:ring-2 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white';

  return (
    <form onSubmit={enviar} className="space-y-4">
      <label className="block">
        <span className="mb-1 block text-sm font-medium text-gray-700 dark:text-gray-200">Nombre</span>
        <input type="text" name="nombre" required className={campo} autoComplete="name" />
      </label>
      <label className="block">
        <span className="mb-1 block text-sm font-medium text-gray-700 dark:text-gray-200">Email</span>
        <input type="email" name="email" required className={campo} autoComplete="email" />
      </label>
      <label className="block">
        <span className="mb-1 block text-sm font-medium text-gray-700 dark:text-gray-200">Mensaje</span>
        <textarea name="mensaje" rows="3" required className={campo} defaultValue={`Hola, me interesa "${titulo}". ¿Sigue disponible?`} />
      </label>
      <button type="submit" className="w-full rounded-xl bg-blue-600 px-6 py-3 font-medium text-white shadow hover:bg-blue-700 active:scale-[0.99]">
        Enviar consulta
      </button>
    </form>
  );
};

const PropertyDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { propiedad, cargando, error } = usePropiedad(id);
  const { propiedades } = usePropiedades(propiedad?.operacion);
  const { esFavorito, alternarFavorito } = useFavoritos();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [id]);

  if (cargando) {
    return (
      <div className="flex min-h-[60vh] items-center justify-center text-gray-600" role="status">
        Cargando propiedad…
      </div>
    );
  }

  if (error || !propiedad) {
    return <NotFound titulo="Propiedad no encontrada" mensaje="Puede que ya no esté publicada o que el enlace sea incorrecto." />;
  }

  const relacionadas = propiedades.filter((p) => p.tipo === propiedad.tipo && p.id !== propiedad.id).slice(0, 3);

  return (
    <article className="mx-auto max-w-[1200px] px-4 py-8">
      <title>{`${propiedad.titulo} | Inmobiliaria SA`}</title>
      <meta name="description" content={`${propiedad.descripcion} ${propiedad.ubicacionTexto}.`} />

      <button
        type="button"
        onClick={() => navigate(-1)}
        className="mb-6 flex items-center gap-2 text-sm font-medium text-blue-600 hover:text-blue-700"
      >
        <FaArrowLeft aria-hidden="true" /> Volver al listado
      </button>

      <header className="mb-6">
        <p className="mb-1 text-sm font-medium uppercase tracking-wide text-blue-600">
          {propiedad.operacion === 'alquiler' ? 'En alquiler' : 'En venta'}
        </p>
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white md:text-4xl">{propiedad.titulo}</h1>
        <p className="mt-2 flex items-center gap-2 text-gray-600 dark:text-gray-300">
          <FaMapMarkerAlt className="text-blue-500" aria-hidden="true" /> {propiedad.ubicacionTexto}
        </p>
      </header>

      <div className="grid gap-8 lg:grid-cols-[1.4fr_1fr]">
        <div className="overflow-hidden rounded-2xl shadow-md">
          <Carousel showThumbs infiniteLoop useKeyboardArrows showStatus={false}>
            {propiedad.imagenes.map((img, i) => (
              <div key={img + i}>
                <img src={img} alt={`${propiedad.titulo}, foto ${i + 1}`} />
              </div>
            ))}
          </Carousel>
        </div>

        <aside className="h-fit rounded-2xl bg-white p-6 shadow-md dark:bg-gray-800">
          <div className="mb-5 flex items-start justify-between gap-4">
            <p className="text-3xl font-bold text-gray-900 dark:text-white">{formatearPrecio(propiedad.precio, propiedad.operacion)}</p>
            <button
              type="button"
              onClick={() => alternarFavorito(propiedad.id)}
              aria-pressed={esFavorito(propiedad.id)}
              className="rounded-full border border-gray-200 px-3 py-1.5 text-sm text-gray-700 hover:bg-gray-50 dark:border-gray-600 dark:text-gray-200"
            >
              {esFavorito(propiedad.id) ? '★ Guardada' : '☆ Guardar'}
            </button>
          </div>

          <div className="mb-6 grid grid-cols-2 gap-3">
            <Dato icono={FaHome} etiqueta="Tipo" valor={propiedad.tipo} />
            <Dato icono={FaRulerCombined} etiqueta="Superficie" valor={`${propiedad.tamano} m²`} />
            <Dato icono={FaBed} etiqueta="Habitaciones" valor={propiedad.habitaciones} />
            <Dato icono={FaBath} etiqueta="Baños" valor={propiedad.banos} />
          </div>

          <h2 className="mb-3 flex items-center gap-2 font-semibold text-gray-900 dark:text-white">
            <FaEnvelope className="text-blue-600" aria-hidden="true" /> Consultar por esta propiedad
          </h2>
          <FormularioConsulta titulo={propiedad.titulo} />
        </aside>
      </div>

      <section className="mt-10 grid gap-8 lg:grid-cols-[1.4fr_1fr]">
        <div>
          <h2 className="mb-3 text-2xl font-bold text-gray-900 dark:text-white">Descripción</h2>
          <p className="leading-relaxed text-gray-700 dark:text-gray-300">{propiedad.descripcionExtendida || propiedad.descripcion}</p>
        </div>
        <div>
          <h2 className="mb-3 text-2xl font-bold text-gray-900 dark:text-white">Características</h2>
          <ul className="flex flex-wrap gap-2">
            {propiedad.caracteristicas.map((c) => (
              <li key={c} className="rounded-full bg-blue-50 px-3 py-1 text-sm text-blue-800 dark:bg-blue-900/40 dark:text-blue-200">
                {c}
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="mt-10">
        <h2 className="mb-4 text-2xl font-bold text-gray-900 dark:text-white">Ubicación</h2>
        <div className="relative z-0 h-[360px] overflow-hidden rounded-2xl shadow-md">
          <MapContainer center={propiedad.ubicacion} zoom={13} scrollWheelZoom={false} style={{ height: '100%', width: '100%' }}>
            <TileLayer
              attribution='&copy; <a href="https://osm.org/copyright">OpenStreetMap</a>'
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            <Marker position={propiedad.ubicacion} icon={icon}>
              <Popup>
                <strong>{propiedad.titulo}</strong>
                <br />
                {propiedad.ubicacionTexto}
              </Popup>
            </Marker>
          </MapContainer>
        </div>
      </section>

      {relacionadas.length > 0 && (
        <section className="mt-12">
          <h2 className="mb-6 text-2xl font-bold text-gray-900 dark:text-white">Propiedades similares</h2>
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {relacionadas.map((p) => (
              <PropertyCard key={p.id} propiedad={p} esFavorito={esFavorito(p.id)} onToggleFavorito={alternarFavorito} />
            ))}
          </div>
        </section>
      )}
    </article>
  );
};

export default PropertyDetail;
