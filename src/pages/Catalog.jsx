import { useMemo, useState } from 'react';
import { products, categories } from '../data/products.js';
import ProductCard from '../components/ProductCard.jsx';
import { useLocalStorage } from '../hooks/useLocalStorage.js';

const sorters = {
  destacados: (a, b) => Number(b.featured) - Number(a.featured) || a.name.localeCompare(b.name, 'es'),
  'precio-asc': (a, b) => a.price - b.price,
  'precio-desc': (a, b) => b.price - a.price,
  nombre: (a, b) => a.name.localeCompare(b.name, 'es'),
};

const norm = (s) => s.normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase();

export default function Catalog() {
  // Preferencias persistentes en LocalStorage.
  const [category, setCategory] = useLocalStorage('espacioar:category', 'Todas');
  const [sort, setSort] = useLocalStorage('espacioar:sort', 'destacados');
  const [query, setQuery] = useState('');

  const visible = useMemo(() => {
    const q = norm(query.trim());
    const cat = categories.includes(category) ? category : 'Todas';
    const sortFn = sorters[sort] ?? sorters.destacados;
    return products
      .filter((p) => cat === 'Todas' || p.category === cat)
      .filter((p) => !q || norm(`${p.name} ${p.description} ${p.category}`).includes(q))
      .sort(sortFn);
  }, [query, category, sort]);

  const reset = () => { setQuery(''); setCategory('Todas'); setSort('destacados'); };

  return (
    <section className="container section">
      <h1>Catálogo</h1>
      <p className="muted">Todos los precios son ficticios y solo sirven para la demostración.</p>

      <div className="filters">
        <label className="field grow">
          <span>Buscar</span>
          <input type="search" placeholder="Ej: lámpara, sofá…" value={query} onChange={(e) => setQuery(e.target.value)} />
        </label>
        <label className="field">
          <span>Categoría</span>
          <select value={categories.includes(category) ? category : 'Todas'} onChange={(e) => setCategory(e.target.value)}>
            {categories.map((c) => <option key={c}>{c}</option>)}
          </select>
        </label>
        <label className="field">
          <span>Ordenar por</span>
          <select value={sort} onChange={(e) => setSort(e.target.value)}>
            <option value="destacados">Destacados</option>
            <option value="precio-asc">Precio: menor a mayor</option>
            <option value="precio-desc">Precio: mayor a menor</option>
            <option value="nombre">Nombre (A-Z)</option>
          </select>
        </label>
      </div>

      <p className="small muted" role="status">{visible.length} producto{visible.length === 1 ? '' : 's'}</p>

      {visible.length ? (
        <div className="grid">{visible.map((p) => <ProductCard key={p.id} product={p} />)}</div>
      ) : (
        <div className="empty">
          <h3>No encontramos productos</h3>
          <p>Prueba con otra búsqueda o limpia los filtros.</p>
          <button className="btn" onClick={reset}>Limpiar filtros</button>
        </div>
      )}
    </section>
  );
}
