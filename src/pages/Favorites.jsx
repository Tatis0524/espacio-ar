import { Link } from 'react-router-dom';
import { products } from '../data/products.js';
import { useFavorites } from '../hooks/FavoritesContext.jsx';
import ProductCard from '../components/ProductCard.jsx';

export default function Favorites() {
  const { favorites } = useFavorites();
  const items = products.filter((p) => favorites.includes(p.id));
  return (
    <section className="container section">
      <h1>Mis favoritos</h1>
      {items.length ? (
        <>
          <p className="muted small">Se guardan en este navegador (LocalStorage) y se mantienen al recargar.</p>
          <div className="grid">{items.map((p) => <ProductCard key={p.id} product={p} />)}</div>
        </>
      ) : (
        <div className="empty">
          <h3>Aún no tienes favoritos</h3>
          <p>Pulsa el corazón en cualquier producto para guardarlo aquí.</p>
          <Link to="/catalogo" className="btn btn-primary">Explorar muebles</Link>
        </div>
      )}
    </section>
  );
}
