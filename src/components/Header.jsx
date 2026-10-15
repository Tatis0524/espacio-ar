import { useState } from 'react';
import { NavLink, Link } from 'react-router-dom';
import { useFavorites } from '../hooks/FavoritesContext.jsx';

export default function Header() {
  const [open, setOpen] = useState(false);
  const { favorites } = useFavorites();
  const close = () => setOpen(false);
  const link = ({ isActive }) => (isActive ? 'nav-link active' : 'nav-link');

  return (
    <header className="site-header">
      <div className="container header-inner">
        <Link to="/" className="brand" onClick={close} aria-label="EspacioAR, inicio">
          <img src={`${import.meta.env.BASE_URL}favicon.svg`} alt="" width="34" height="34" />
          <span>Espacio<strong>AR</strong></span>
        </Link>
        <button
          className="menu-toggle"
          aria-expanded={open}
          aria-controls="main-nav"
          onClick={() => setOpen((v) => !v)}
        >
          {open ? 'Cerrar' : 'Menú'}
        </button>
        <nav id="main-nav" className={open ? 'nav open' : 'nav'} aria-label="Principal">
          <NavLink to="/" end className={link} onClick={close}>Inicio</NavLink>
          <NavLink to="/catalogo" className={link} onClick={close}>Catálogo</NavLink>
          <NavLink to="/explora" className={link} onClick={close}>ExploraAR</NavLink>
          <NavLink to="/favoritos" className={link} onClick={close}>
            Favoritos{favorites.length > 0 && <span className="count">{favorites.length}</span>}
          </NavLink>
          <NavLink to="/ayuda" className={link} onClick={close}>Ayuda</NavLink>
        </nav>
      </div>
    </header>
  );
}
