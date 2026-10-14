import { createContext, useCallback, useContext, useMemo } from 'react';
import { useLocalStorage } from './useLocalStorage.js';

const FavoritesContext = createContext(null);

// Un solo estado compartido para toda la app, persistido en LocalStorage.
export function FavoritesProvider({ children }) {
  const [favorites, setFavorites] = useLocalStorage('espacioar:favorites', []);

  const toggle = useCallback(
    (id) => setFavorites((prev) => (prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id])),
    [setFavorites]
  );

  const value = useMemo(
    () => ({ favorites, toggle, isFavorite: (id) => favorites.includes(id) }),
    [favorites, toggle]
  );

  return <FavoritesContext.Provider value={value}>{children}</FavoritesContext.Provider>;
}

export const useFavorites = () => useContext(FavoritesContext);
