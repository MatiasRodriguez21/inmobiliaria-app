import { useEffect, useState } from 'react';
import { getPropiedad, getPropiedades } from '../services/propiedadesService';

// Envuelve una llamada asíncrona y expone { data, cargando, error }.
// El flag "activo" evita actualizar el estado si el componente se desmontó o cambió la consulta.
function useConsulta(consulta, dependencias) {
  const [estado, setEstado] = useState({ data: null, cargando: true, error: null });

  useEffect(() => {
    let activo = true;
    setEstado((prev) => ({ ...prev, cargando: true, error: null }));
    consulta()
      .then((data) => activo && setEstado({ data, cargando: false, error: null }))
      .catch((error) => activo && setEstado({ data: null, cargando: false, error }));
    return () => {
      activo = false;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, dependencias);

  return estado;
}

export function usePropiedades(operacion) {
  const { data, cargando, error } = useConsulta(() => getPropiedades({ operacion }), [operacion]);
  return { propiedades: data ?? [], cargando, error };
}

export function usePropiedad(id) {
  const { data, cargando, error } = useConsulta(() => getPropiedad(id), [id]);
  return { propiedad: data, cargando, error };
}
