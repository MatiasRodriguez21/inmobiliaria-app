import propiedades from '../data/propiedades';

// Capa de acceso a datos. Hoy simula una API con datos locales y una pequeña demora;
// para usar un backend real alcanza con reemplazar el cuerpo de estas funciones por un fetch.
const DEMORA_MS = 350;

const esperar = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

export async function getPropiedades({ operacion } = {}) {
  await esperar(DEMORA_MS);
  return operacion ? propiedades.filter((p) => p.operacion === operacion) : propiedades;
}

export async function getPropiedad(id) {
  await esperar(DEMORA_MS);
  const propiedad = propiedades.find((p) => p.id === Number(id));
  if (!propiedad) {
    throw new Error('Propiedad no encontrada');
  }
  return propiedad;
}
