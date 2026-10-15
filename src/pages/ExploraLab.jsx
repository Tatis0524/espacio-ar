import { Link } from 'react-router-dom';
import { exploraCategories, exploraItemsWithModel } from '../data/explora.js';
import ProductViewer from '../components/ProductViewer.jsx';
import FavoriteButton from '../components/FavoriteButton.jsx';
import { useLocalStorage } from '../hooks/useLocalStorage.js';

const activity = [
  'Elige un objeto del catálogo visual (aquí arriba).',
  'Gíralo, acércalo y aléjalo: observalo desde todos los lados en el visor 3D.',
  'Lee su ficha: qué es, de dónde viene, su licencia y sus curiosidades.',
  'Desde un celular compatible, pulsa «Probar en mi espacio».',
  'Acepta el permiso de cámara, apunta al piso y mueve el celular despacio hasta que se detecte la superficie.',
  'Toca para colocarlo. Camina alrededor y compáralo con objetos reales de tu espacio.',
  'Si pierde el seguimiento, vuelve a apuntar al piso: ayuda tener buena luz y superficies con algo de textura.',
];

export default function ExploraLab() {
  // El objeto seleccionado persiste en LocalStorage.
  const [selectedId, setSelectedId] = useLocalStorage(
    'espacioar:explora:lab',
    exploraItemsWithModel[0]?.id ?? null
  );

  // Si la selección guardada ya no existe o perdió su modelo, se usa la primera opción válida.
  const item =
    exploraItemsWithModel.find((i) => i.id === selectedId) ?? exploraItemsWithModel[0];
  const category = exploraCategories.find((c) => c.id === item?.category);

  if (!item) {
    return (
      <section className="container section empty">
        <h1>No hay modelos disponibles</h1>
        <p>El Laboratorio necesita al menos un modelo 3D cargado. Revisa docs/EXPLORA.md para agregar uno.</p>
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

      <h1>🧪 Laboratorio AR</h1>
      <p className="muted">
        Experimenta libremente: elige un objeto 3D, obsérvalo en el visor y, si tu dispositivo lo permite, ábrelo en
        realidad aumentada.
      </p>

      {/* Catálogo visual + control de cambio de modelo */}
      <div className="lab-picker" role="group" aria-label="Elegir objeto 3D">
        {exploraItemsWithModel.map((i) => (
          <button
            key={i.id}
            type="button"
            className={`lab-chip ${i.id === item.id ? 'active' : ''}`}
            style={{ '--tint': i.visual.tint }}
            onClick={() => setSelectedId(i.id)}
            aria-pressed={i.id === item.id}
          >
            <span aria-hidden="true">{i.visual.glyph}</span>
            <span>{i.name}</span>
          </button>
        ))}
      </div>

      <div className="detail">
        <div>
          <ProductViewer
            key={item.id}
            src={item.model.src}
            alt={item.model.alt}
            arPlacement={item.model.arPlacement}
            label={`${item.name} — modelo seleccionado`}
          />
        </div>

        <div className="detail-info">
          <p className="eyebrow">{category?.glyph} {category?.name}</p>
          <h2>{item.name}</h2>
          <p className="lead">{item.tagline}</p>
          <p>{item.description}</p>

          <p className="small muted model-credit">
            Modelo: {item.model.attribution} ·{' '}
            <a href={item.model.sourceUrl} target="_blank" rel="noreferrer">{item.model.source}</a> ·{' '}
            Licencia <a href={item.model.licenseUrl} target="_blank" rel="noreferrer">{item.model.license}</a>
          </p>

          <div className="detail-actions">
            <FavoriteButton productId={`explora:${item.id}`} productName={item.name} variant="full" />
            <Link to={`/explora/${item.id}`} className="btn">Ver ficha completa</Link>
          </div>
        </div>
      </div>

      {/* Actividad guiada */}
      <div className="lab-activity">
        <h2>🎯 Mi primera experiencia AR</h2>
        <p className="muted">Sigue estos pasos en orden para tu primera sesión de realidad aumentada.</p>
        <ol className="steps">
          {activity.map((s) => <li key={s}>{s}</li>)}
        </ol>
      </div>

      {/* Limitaciones de compatibilidad */}
      <div className="panel lab-limits">
        <h3>Limitaciones de compatibilidad</h3>
        <ul className="list">
          <li>La AR funciona en <strong>celulares y tabletas compatibles</strong>: Android con ARCore y iPhone/iPad con Safari. En computador solo hay visor 3D.</li>
          <li>Requiere <strong>HTTPS</strong>: la versión publicada de la app ya lo cumple; en desarrollo local (localhost) también se considera seguro.</li>
          <li>El sistema detecta <strong>superficies planas</strong> (piso o paredes). Puede tardar unos segundos o fallar con poca luz, paredes lisas o suelos muy uniformes.</li>
          <li>Si el dispositivo o el navegador no soportan AR, aquí verás un aviso: no se simula la cámara. El visor 3D sigue siendo totalmente usable.</li>
          <li>No todos los dispositivos permiten mover o escalar el objeto: esa capacidad la decide el sistema operativo, no la aplicación.</li>
        </ul>
      </div>
    </section>
  );
}
