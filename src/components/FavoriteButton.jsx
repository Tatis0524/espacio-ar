import { useFavorites } from '../hooks/FavoritesContext.jsx';

export default function FavoriteButton({ productId, productName, variant = 'icon' }) {
  const { isFavorite, toggle } = useFavorites();
  const active = isFavorite(productId);
  const label = active ? `Quitar ${productName} de favoritos` : `Agregar ${productName} a favoritos`;

  return (
    <button
      type="button"
      className={`fav-btn ${variant} ${active ? 'active' : ''}`}
      aria-pressed={active}
      aria-label={label}
      title={label}
      onClick={(e) => {
        e.preventDefault();
        e.stopPropagation();
        toggle(productId);
      }}
    >
      <span aria-hidden="true">{active ? '♥' : '♡'}</span>
      {variant === 'full' && <span>{active ? 'En favoritos' : 'Agregar a favoritos'}</span>}
    </button>
  );
}
