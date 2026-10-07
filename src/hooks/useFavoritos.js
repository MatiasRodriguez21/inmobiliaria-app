import { useCallback, useEffect, useState } from 'react';

const CLAVE = 'favoritos';

const leer = () => {
  try {
    const guardado = JSON.parse(localStorage.getItem(CLAVE));
    return Array.isArray(guardado) ? guardado : [];
  } catch {
    return [];
  }
};

// Favoritos persistidos en localStorage. Si el almacenamiento no está disponible
// (modo privado, cookies bloqueadas), la app sigue funcionando en memoria.
export function useFavoritos() {
  const [favoritos, setFavoritos] = useState(leer);

  useEffect(() => {
    try {
      localStorage.setItem(CLAVE, JSON.stringify(favoritos));
    } catch {
      /* sin persistencia */
    }
  }, [favoritos]);

  const esFavorito = useCallback((id) => favoritos.includes(id), [favoritos]);

  const alternarFavorito = useCallback((id) => {
    setFavoritos((prev) => (prev.includes(id) ? prev.filter((f) => f !== id) : [...prev, id]));
  }, []);

  return { favoritos, esFavorito, alternarFavorito };
}
