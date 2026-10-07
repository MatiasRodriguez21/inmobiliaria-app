# Inmobiliaria SA

Sitio de una inmobiliaria ficticia hecho con React: listado de propiedades en venta y alquiler, filtros, favoritos y ficha de cada propiedad con galería y mapa.

**Demo:** https://inmobiliaria-app-theta.vercel.app/

> Es un proyecto modelo para practicar y mostrar cómo organizo una app de React. Los datos son de ejemplo.

## Qué incluye

- **Listado con filtros** por ubicación, tipo y rango de precio, y orden por precio o superficie. Los filtros viven en la URL, así que se pueden compartir con un link y el botón "Atrás" funciona.
- **Ficha de propiedad** con galería, datos principales, mapa (Leaflet + OpenStreetMap), formulario de consulta y propiedades similares.
- **Favoritos** guardados en el navegador.
- **Estados de carga, vacío y error**, y página 404.
- **SEO por página** con las etiquetas `<title>` y `<meta>` nativas de React 19.
- **Diseño responsive** con Tailwind CSS.

## Stack

React 19 · React Router 7 · Tailwind CSS · Framer Motion · Leaflet · Jest + Testing Library

## Cómo está organizado

```
src/
├── components/   Componentes de UI (PropertyCard, SearchFilter, PropertyDetail…)
├── data/         Datos de ejemplo
├── hooks/        usePropiedades (carga + estados) y useFavoritos (localStorage)
├── services/     Acceso a datos; hoy simula una API con promesas
└── utils/        Lógica pura de filtrado, orden y formato de precios, con tests
```

La capa `services/` es el único lugar que sabe de dónde salen los datos: para conectar un backend real alcanza con cambiar esas funciones por un `fetch`.

## Ejecutar en local

```bash
npm install
npm start      # http://localhost:3000
npm test       # tests unitarios
```

---

Hecho por [Matías Rodríguez](https://matiasrodriguez21.github.io/portafolio/).
