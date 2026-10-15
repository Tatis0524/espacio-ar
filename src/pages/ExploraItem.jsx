import { useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { exploraCategories, getExploraItem } from '../data/explora.js';
import ProductViewer from '../components/ProductViewer.jsx';
import PendingModel from '../components/PendingModel.jsx';
import FavoriteButton from '../components/FavoriteButton.jsx';
import { useExploraProgress } from '../hooks/useExploraProgress.js';

export default function ExploraItem() {
  const { id } = useParams();
  const item = getExploraItem(id);
  const category = exploraCategories.find((c) => c.id === item?.category);
  const { markExplored, visitCategory } = useExploraProgress();

  // Registra el progreso local: modelo explorado y categoría visitada.
  useEffect(() => {
    if (!item) return;
    markExplored(item.id);
    visitCategory(item.category);
  }, [item, markExplored, visitCategory]);

  if (!item) {
    return (
      <section className="container section empty">
        <h1>Elemento no encontrado</h1>
        <p>El enlace no corresponde a ningún elemento de ExploraAR.</p>
        <Link to="/explora" className="btn btn-primary">Volver a ExploraAR</Link>
      </section>
    );
  }

  return (
    <section className="container section">
      <p className="breadcrumb">
        <Link to="/explora" className="back-link">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            <path d="M15 18l-6-6 6-6" />
          </svg>
          Volver a ExploraAR
        </Link>
      </p>

      <div className="detail">
        <div>
          {item.model ? (
            <ProductViewer
              src={item.model.src}
              alt={item.model.alt}
              arPlacement={item.model.arPlacement}
            />
          ) : (
            <PendingModel item={item} />
          )}
        </div>

        <div className="detail-info">
          <p className="eyebrow">
            {category?.glyph} {category?.name}
          </p>
          <h1>{item.name}</h1>
          <p className="lead">{item.tagline}</p>
          <p>{item.description}</p>

          {item.reconstruction && (
            <p className="notice">
              <strong>Reconstrucción digital ilustrativa:</strong> el modelo (si está disponible) representa este tipo
              de objeto, pero no es una pieza arqueológica ni histórica original.
            </p>
          )}
          {item.notice && <p className="notice warn">{item.notice}</p>}

          <h2 className="h-small">Curiosidades</h2>
          <ul className="item-facts">
            {item.curiosities.map((c) => <li key={c}>{c}</li>)}
          </ul>

          {item.model ? (
            <p className="small muted model-credit">
              Modelo: {item.model.attribution} ·{' '}
              <a href={item.model.sourceUrl} target="_blank" rel="noreferrer">{item.model.source}</a> ·{' '}
              Licencia <a href={item.model.licenseUrl} target="_blank" rel="noreferrer">{item.model.license}</a>
            </p>
          ) : (
            item.source && (
              <p className="small muted model-credit">
                Información: <a href={item.sourceUrl} target="_blank" rel="noreferrer">{item.source}</a>
              </p>
            )
          )}

          <div className="detail-actions">
            <FavoriteButton productId={`explora:${item.id}`} productName={item.name} variant="full" />
            <Link to="/explora/laboratorio" className="btn">Abrir en el Laboratorio</Link>
          </div>
        </div>
      </div>
    </section>
  );
}
