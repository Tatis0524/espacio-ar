import { Link } from 'react-router-dom';
import FavoriteButton from './FavoriteButton.jsx';
import { useExploraProgress } from '../hooks/useExploraProgress.js';

// Tarjeta de un item educativo de ExploraAR. Usa un "mosaico" con gradiente e
// ícono (nada de imágenes falsas) cuando no hay miniatura real disponible.
export default function ExploraCard({ item, categoryName }) {
  const { explored } = useExploraProgress();
  const seen = explored.includes(item.id);

  return (
    <article className="card explora-card">
      <Link to={`/explora/${item.id}`} className="card-link" aria-label={`Ver ficha de ${item.name}`}>
        <div className="card-media visual-tile" style={{ '--tint': item.visual.tint }}>
          <span className="visual-glyph" aria-hidden="true">{item.visual.glyph}</span>
          <span className={`badge ${item.model ? 'badge-3d' : 'badge-no3d'}`}>
            {item.model ? 'Modelo 3D · AR' : 'Modelo pendiente'}
          </span>
          {seen && <span className="badge badge-seen">Explorado ✓</span>}
        </div>
        <div className="card-body">
          <p className="eyebrow">{categoryName}</p>
          <h3>{item.name}</h3>
          <p className="muted small">{item.tagline}</p>
        </div>
      </Link>
      <FavoriteButton productId={`explora:${item.id}`} productName={item.name} />
    </article>
  );
}
