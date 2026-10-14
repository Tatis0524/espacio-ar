import { useEffect, useState } from 'react';

// Lectura segura: LocalStorage puede estar bloqueado (modo privado, políticas del navegador).
function read(key, fallback) {
  try {
    const raw = window.localStorage.getItem(key);
    return raw === null ? fallback : JSON.parse(raw);
  } catch {
    return fallback;
  }
}

export function useLocalStorage(key, fallback) {
  const [value, setValue] = useState(() => read(key, fallback));

  useEffect(() => {
    try {
      window.localStorage.setItem(key, JSON.stringify(value));
    } catch {
      /* sin almacenamiento disponible: la app sigue funcionando sin persistir */
    }
  }, [key, value]);

  // Sincroniza otras pestañas abiertas del mismo sitio.
  useEffect(() => {
    const onStorage = (e) => {
      if (e.key === key) setValue(read(key, fallback));
    };
    window.addEventListener('storage', onStorage);
    return () => window.removeEventListener('storage', onStorage);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [key]);

  return [value, setValue];
}
