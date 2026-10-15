import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { getProduct, formatPrice, DEMO_MODEL } from '../data/products.js';
import { getColors } from '../utils/helpers.js';
import ProductViewer from '../components/ProductViewer.jsx';
import ColorSelector from '../components/ColorSelector.jsx';
import FavoriteButton from '../components/FavoriteButton.jsx';
import NoModel from '../components/NoModel.jsx';

export default function ProductDetail() {
  const { id } = useParams();
  const product = getProduct(id);
  const [colorIdx, setColorIdx] = useState(0);
  const [demo, setDemo] = useState(false);

  useEffect(() => { setColorIdx(0); setDemo(false); }, [id]);

  if (!product) {
    return (
      <section className="container section empty">
        <h1>Producto no encontrado</h1>
        <p>El enlace no corresponde a ningún producto del catálogo.</p>
        <Link to="/catalogo" className="btn btn-primary">Volver al catálogo</Link>
      </section>
    );
  }

  const colors = getColors(product);
  const hasVariants = Boolean(product.model?.variants?.length);
  const selected = colors[colorIdx];

  return (
    <section className="container section">
      <p className="breadcrumb">
        <Link to="/catalogo" className="back-link">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            <path d="M15 18l-6-6 6-6" />
          </svg>
          Volver al catálogo
        </Link>
      </p>
      <div className="detail">
        <div>
          {product.model ? (
            <ProductViewer
              src={product.model.src}
              alt={product.model.alt}
              variantName={hasVariants ? selected?.variantName : undefined}
              arPlacement={product.model.arPlacement}
            />
          ) : demo ? (
            <>
              <p className="notice warn">
                Estás viendo un modelo de demostración: <strong>no es «{product.name}»</strong>.
              </p>
              <ProductViewer src={DEMO_MODEL.src} alt={DEMO_MODEL.label} label={DEMO_MODEL.label} />
              <button className="btn" onClick={() => setDemo(false)}>Volver al producto</button>
            </>
          ) : (
            <NoModel product={product} onDemo={() => setDemo(true)} />
          )}
        </div>

        <div className="detail-info">
          <p className="eyebrow">{product.category}</p>
          <h1>{product.name}</h1>
          <p className="price big">
            {formatPrice(product.price)} <span className="demo-tag">Precio demostrativo (ficticio)</span>
          </p>
          <p>{product.description}</p>
          <ColorSelector colors={colors} selected={colorIdx} onSelect={setColorIdx} selectable={hasVariants} />
          {hasVariants && (
            <p className="small muted">Los colores corresponden a variantes reales incluidas en el modelo 3D.</p>
          )}
          <div className="detail-actions">
            <FavoriteButton productId={product.id} productName={product.name} variant="full" />
          </div>
        </div>
      </div>
    </section>
  );
}
