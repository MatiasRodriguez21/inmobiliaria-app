import { filtrarPropiedades, ordenarPropiedades, formatearPrecio } from './propiedades';

const lista = [
  { id: 1, titulo: 'Casa con jardín', descripcion: 'Amplia', ubicacionTexto: 'Córdoba Capital', tipo: 'casa', precio: 250000, tamano: 120 },
  { id: 2, titulo: 'Depto céntrico', descripcion: 'Luminoso', ubicacionTexto: 'Buenos Aires', tipo: 'departamento', precio: 120000, tamano: 85 },
  { id: 3, titulo: 'Monoambiente', descripcion: 'Ideal inversión', ubicacionTexto: 'Mendoza', tipo: 'monoambiente', precio: 90000, tamano: 40 },
];

describe('filtrarPropiedades', () => {
  test('sin filtros devuelve todas', () => {
    expect(filtrarPropiedades(lista)).toHaveLength(3);
  });

  test('busca sin importar mayúsculas ni acentos', () => {
    expect(filtrarPropiedades(lista, { busqueda: 'CORDOBA' }).map((p) => p.id)).toEqual([1]);
  });

  test('filtra por tipo', () => {
    expect(filtrarPropiedades(lista, { tipo: 'departamento' }).map((p) => p.id)).toEqual([2]);
  });

  test('filtra por rango de precio', () => {
    expect(filtrarPropiedades(lista, { precioMin: '100000', precioMax: '200000' }).map((p) => p.id)).toEqual([2]);
  });

  test('combina filtros', () => {
    expect(filtrarPropiedades(lista, { tipo: 'casa', precioMax: 100000 })).toHaveLength(0);
  });
});

describe('ordenarPropiedades', () => {
  test('ordena por precio ascendente sin modificar la lista original', () => {
    const ordenadas = ordenarPropiedades(lista, 'precio-asc');
    expect(ordenadas.map((p) => p.id)).toEqual([3, 2, 1]);
    expect(lista.map((p) => p.id)).toEqual([1, 2, 3]);
  });

  test('ordena por tamaño descendente', () => {
    expect(ordenarPropiedades(lista, 'tamano-desc').map((p) => p.id)).toEqual([1, 2, 3]);
  });
});

describe('formatearPrecio', () => {
  test('agrega /mes en alquileres', () => {
    expect(formatearPrecio(800, 'alquiler')).toMatch(/800\/mes$/);
  });

  test('usa separador de miles', () => {
    expect(formatearPrecio(250000, 'venta')).toMatch(/250\.000/);
  });
});
