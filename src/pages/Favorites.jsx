import { Link } from 'react-router-dom';
import { products } from '../data/products.js';
import { exploraCategories, exploraItems } from '../data/explora.js';
import { useFavorites } from '../hooks/FavoritesContext.jsx';
import ProductCard from '../components/ProductCard.jsx';
import ExploraCard from '../components/ExploraCard.jsx';

export default function Favorites() {
  const { favorites } = useFavorites();
  const items = products.filter((p) => favorites.includes(p.id));
  // Favoritos de ExploraAR guardados con el prefijo "explora:".
  const exploraFavs = exploraItems.filter((i) => favorites.includes(`explora:${i.id}`));
  const empty = items.length === 0 && exploraFavs.length === 0;

  return (
    <section className="container section">
      <h1>Mis favoritos</h1>
      {empty ? (
        <div className="empty">
          <h3>Aún no tienes favoritos</h3>
          <p>Pulsa el corazón en cualquier producto o ficha de ExploraAR para guardarlo aquí.</p>
          <Link to="/catalogo" className="btn btn-primary">Explorar muebles</Link>
        </div>
      ) : (
        <>
          <p className="muted small">Se guardan en este navegador (LocalStorage) y se mantienen al recargar.</p>
          {items.length > 0 && (
            <div className="grid">{items.map((p) => <ProductCard key={p.id} product={p} />)}</div>
          )}
          {exploraFavs.length > 0 && (
            <>
              <h2 className="h-small">ExploraAR</h2>
              <div className="grid">
                {exploraFavs.map((i) => (
                  <ExploraCard
                    key={i.id}
                    item={i}
                    categoryName={exploraCategories.find((c) => c.id === i.category)?.name}
                  />
                ))}
              </div>
            </>
          )}
        </>
      )}
    </section>
  );
}
