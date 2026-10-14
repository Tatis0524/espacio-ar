import { Link } from 'react-router-dom';
import { formatPrice } from '../data/products.js';
import { getColors } from '../utils/helpers.js';
import FavoriteButton from './FavoriteButton.jsx';

export default function ProductCard({ product }) {
  const colors = getColors(product);
  return (
    <article className="card">
      <Link to={`/producto/${product.id}`} className="card-link" aria-label={`Ver detalle de ${product.name}`}>
        <div className="card-media">
          <img src={product.image} alt={product.name} loading="lazy" />
          <span className={product.model ? 'badge badge-3d' : 'badge badge-no3d'}>
            {product.model ? 'Modelo 3D · AR' : 'Sin modelo 3D'}
          </span>
        </div>
        <div className="card-body">
          <p className="eyebrow">{product.category}</p>
          <h3>{product.name}</h3>
          <p className="muted small">{product.description}</p>
          <p className="swatches" aria-label={`Colores disponibles: ${colors.map((c) => c.name).join(', ')}`}>
            {colors.map((c) => (
              <span key={c.name} className="swatch" style={{ background: c.hex }} title={c.name} />
            ))}
            <span className="small muted">
              {colors.length === 1 ? colors[0].name : `${colors.length} colores`}
            </span>
          </p>
          <p className="price">
            {formatPrice(product.price)} <span className="demo-tag">Precio demostrativo</span>
          </p>
        </div>
      </Link>
      <FavoriteButton productId={product.id} productName={product.name} />
    </article>
  );
}
