import { useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { exploraCategories, exploraItems, quizQuestions } from '../data/explora.js';
import ExploraCard from '../components/ExploraCard.jsx';
import Quiz from '../components/Quiz.jsx';
import { useExploraProgress } from '../hooks/useExploraProgress.js';

const norm = (s) => s.normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase();

const phoneSteps = [
  'Abre ExploraAR desde el celular (necesitas HTTPS: la versión publicada en GitHub Pages ya lo cumple).',
  'Elige un modelo y pulsa «Probar en mi espacio».',
  'Concede el permiso de cámara cuando el navegador lo pida.',
  'Apunta al piso y mueve el celular despacio hasta que el sistema detecte una superficie.',
  'Toca la pantalla para colocar el objeto y acércate o aléjate para verlo en su entorno.',
];

export default function Explora() {
  const [query, setQuery] = useState('');
  const [cat, setCat] = useState('todas');
  const { explored, visitedCategories, bestQuizScore, visitCategory, saveQuizScore } = useExploraProgress();

  const visible = useMemo(() => {
    const q = norm(query.trim());
    return exploraItems
      .filter((i) => cat === 'todas' || i.category === cat)
      .filter((i) => !q || norm(`${i.name} ${i.tagline} ${i.description}`).includes(q));
  }, [query, cat]);

  const featured = exploraItems.filter((i) => i.featured);
  const withModel = exploraItems.filter((i) => i.model).length;

  const pickCategory = (id) => {
    setCat(id);
    if (id !== 'todas') visitCategory(id);
    document.getElementById('explora-catalogo')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  const countOf = (id) => exploraItems.filter((i) => i.category === id).length;

  return (
    <>
      {/* ------------------------------- Encabezado ------------------------------- */}
      <section className="hero explora-hero">
        <div className="container">
          <p className="eyebrow">Sección educativa de EspacioAR</p>
          <h1>ExploraAR</h1>
          <p className="lead">Aprende, descubre y lleva el mundo digital a tu espacio</p>
          <p className="explora-intro">
            La <strong>realidad aumentada (AR)</strong> superpone contenido digital —modelos 3D, textos, animaciones—
            sobre el mundo real que ves por la cámara de tu celular. Aquí puedes estudiar ciencia, universo, historia
            y naturaleza girando cada modelo en 3D y, cuando tu dispositivo lo permite, colocándolo en tu espacio con
            la cámara.
          </p>
          <div className="hero-actions">
            <Link to="/explora/laboratorio" className="btn btn-primary">🧪 Abrir Laboratorio AR</Link>
            <button
              type="button"
              className="btn"
              onClick={() => document.getElementById('mini-reto')?.scrollIntoView({ behavior: 'smooth', block: 'start' })}
            >
              Hacer el mini reto
            </button>
            <span className="explora-stat-pill">{withModel} modelos en 3D · {exploraItems.length} fichas</span>
          </div>
        </div>
      </section>

      {/* --------------------------- Categorías de exploración --------------------- */}
      <section className="container section">
        <h2>Categorías</h2>
        <div className="cat-cards">
          {exploraCategories.map((c) => (
            <button
              key={c.id}
              type="button"
              className={`cat-card ${cat === c.id ? 'active' : ''}`}
              style={{ '--tint': c.tint }}
              onClick={() => pickCategory(c.id)}
              aria-pressed={cat === c.id}
            >
              <span className="cat-glyph" aria-hidden="true">{c.glyph}</span>
              <span className="cat-name">{c.name}</span>
              <span className="cat-desc">{c.description}</span>
              <span className="cat-count">{countOf(c.id)} elementos</span>
            </button>
          ))}
        </div>
      </section>

      {/* --------------------------- Modelos destacados --------------------------- */}
      <section className="container section">
        <h2>Modelos destacados</h2>
        <p className="muted">Una selección para empezar. Los que tienen badge «Modelo 3D · AR» se pueden girar y, desde un celular compatible, colocar en tu espacio.</p>
        <div className="grid">
          {featured.map((item) => (
            <ExploraCard
              key={item.id}
              item={item}
              categoryName={exploraCategories.find((c) => c.id === item.category)?.name}
            />
          ))}
        </div>
      </section>

      {/* ------------------------- Buscador, filtros y catálogo -------------------- */}
      <section className="container section" id="explora-catalogo">
        <h2>Explorar contenidos</h2>
        <div className="filters">
          <label className="field grow">
            <span>Buscar</span>
            <input
              type="search"
              placeholder="Ej: corazón, Marte, flores…"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
            />
          </label>
        </div>
        <div className="chip-row" role="group" aria-label="Filtrar por categoría">
          <button type="button" className={`chip ${cat === 'todas' ? 'active' : ''}`} onClick={() => setCat('todas')}>
            Todas
          </button>
          {exploraCategories.map((c) => (
            <button
              key={c.id}
              type="button"
              className={`chip ${cat === c.id ? 'active' : ''}`}
              onClick={() => setCat(c.id)}
              aria-pressed={cat === c.id}
            >
              <span aria-hidden="true">{c.glyph}</span> {c.name}
            </button>
          ))}
        </div>

        {visible.length ? (
          <div className="grid">
            {visible.map((item) => (
              <ExploraCard
                key={item.id}
                item={item}
                categoryName={exploraCategories.find((c) => c.id === item.category)?.name}
              />
            ))}
          </div>
        ) : (
          <div className="empty">
            <h3>Sin resultados</h3>
            <p>Prueba con otra palabra o cambia la categoría.</p>
            <button className="btn" onClick={() => { setQuery(''); setCat('todas'); }}>Limpiar filtros</button>
          </div>
        )}
      </section>

      {/* --------------------------------- Progreso ------------------------------- */}
      <section className="container section">
        <div className="progress-panel">
          <div>
            <h2>Tu progreso</h2>
            <p className="muted small">Se guarda en este navegador (LocalStorage); no requiere cuenta.</p>
          </div>
          <div className="progress-stats">
            <div className="stat">
              <strong>{explored.length}</strong>
              <span>de {exploraItems.length} modelos explorados</span>
            </div>
            <div className="stat">
              <strong>{visitedCategories.length}</strong>
              <span>de {exploraCategories.length} categorías visitadas</span>
            </div>
            <div className="stat">
              <strong>{bestQuizScore}</strong>
              <span>mejor puntuación (de {quizQuestions.length})</span>
            </div>
          </div>
        </div>
      </section>

      {/* ------------------------------ Laboratorio AR ---------------------------- */}
      <section className="container section">
        <div className="lab-banner">
          <div>
            <p className="eyebrow">Espacio libre</p>
            <h2>🧪 Laboratorio AR</h2>
            <p>
              Elige cualquier modelo disponible, obsérvalo en el visor interactivo y ábrelo en realidad aumentada.
              Incluye la actividad guiada «Mi primera experiencia AR» y una explicación clara de las limitaciones de
              compatibilidad.
            </p>
          </div>
          <Link to="/explora/laboratorio" className="btn btn-primary">Entrar al Laboratorio</Link>
        </div>
      </section>

      {/* ------------------------- Cómo usar AR desde el celular ------------------- */}
      <section className="container section">
        <h2>Cómo usar la realidad aumentada desde tu celular</h2>
        <div className="two-col">
          <div className="panel panel-green">
            <ol className="steps">
              {phoneSteps.map((s) => <li key={s}>{s}</li>)}
            </ol>
          </div>
          <div className="panel">
            <h3>Compatibilidad</h3>
            <ul className="list">
              <li><strong>Android:</strong> Chrome con ARCore instalado/compatible.</li>
              <li><strong>iPhone/iPad:</strong> Safari con iOS 12+ (Quick Look) o WebXR cuando esté habilitado.</li>
              <li><strong>Computador:</strong> no hay cámara AR; el visor 3D es la alternativa.</li>
            </ul>
            <p className="small muted">
              No todos los dispositivos permiten mover o escalar el objeto libremente: eso lo decide el sistema
              operativo. Si la sesión AR no inicia, sigue usando la vista 3D.
            </p>
          </div>
        </div>
      </section>

      {/* ------------------------------- Mini reto -------------------------------- */}
      <section className="container section" id="mini-reto">
        <h2>Mini reto educativo</h2>
        <p className="muted">
          {quizQuestions.length} preguntas sobre realidad aumentada, ciencia, universo y los modelos explorados.
        </p>
        <Quiz questions={quizQuestions} bestScore={bestQuizScore} onScore={saveQuizScore} />
      </section>
    </>
  );
}
