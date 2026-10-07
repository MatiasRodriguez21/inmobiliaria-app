// Funciones puras: no dependen de React, así que se pueden testear de forma aislada.

const normalizar = (texto = '') =>
  texto
    .toString()
    .toLowerCase()
    .normalize('NFD')
    .replace(/[̀-ͯ]/g, '');

export const ORDENES = {
  relevancia: 'Más relevantes',
  'precio-asc': 'Menor precio',
  'precio-desc': 'Mayor precio',
  'tamano-desc': 'Más grandes',
};

export function filtrarPropiedades(propiedades, { busqueda = '', tipo = '', precioMin, precioMax } = {}) {
  const termino = normalizar(busqueda.trim());
  const min = precioMin === '' || precioMin == null ? null : Number(precioMin);
  const max = precioMax === '' || precioMax == null ? null : Number(precioMax);

  return propiedades.filter((p) => {
    const coincideTexto =
      !termino ||
      [p.titulo, p.descripcion, p.ubicacionTexto].some((campo) => normalizar(campo).includes(termino));
    const coincideTipo = !tipo || p.tipo === tipo;
    const coincideMin = min === null || p.precio >= min;
    const coincideMax = max === null || p.precio <= max;
    return coincideTexto && coincideTipo && coincideMin && coincideMax;
  });
}

export function ordenarPropiedades(propiedades, orden = 'relevancia') {
  const copia = [...propiedades];
  switch (orden) {
    case 'precio-asc':
      return copia.sort((a, b) => a.precio - b.precio);
    case 'precio-desc':
      return copia.sort((a, b) => b.precio - a.precio);
    case 'tamano-desc':
      return copia.sort((a, b) => b.tamano - a.tamano);
    default:
      return copia;
  }
}

const formatoUSD = new Intl.NumberFormat('es-AR', {
  style: 'currency',
  currency: 'USD',
  maximumFractionDigits: 0,
});

export function formatearPrecio(precio, operacion) {
  const base = formatoUSD.format(precio);
  return operacion === 'alquiler' ? `${base}/mes` : base;
}
