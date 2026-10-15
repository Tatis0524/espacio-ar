import { Routes, Route, Navigate } from 'react-router-dom';
import { FavoritesProvider } from './hooks/FavoritesContext.jsx';
import Header from './components/Header.jsx';
import Footer from './components/Footer.jsx';
import Home from './pages/Home.jsx';
import Catalog from './pages/Catalog.jsx';
import ProductDetail from './pages/ProductDetail.jsx';
import Favorites from './pages/Favorites.jsx';
import Help from './pages/Help.jsx';
import Explora from './pages/Explora.jsx';
import ExploraItem from './pages/ExploraItem.jsx';
import ExploraLab from './pages/ExploraLab.jsx';

export default function App() {
  return (
    <FavoritesProvider>
      <Header />
      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/catalogo" element={<Catalog />} />
          <Route path="/producto/:id" element={<ProductDetail />} />
          <Route path="/favoritos" element={<Favorites />} />
          <Route path="/ayuda" element={<Help />} />
          <Route path="/explora" element={<Explora />} />
          {/* /laboratorio debe ir antes que /:id para no capturarlo como un id */}
          <Route path="/explora/laboratorio" element={<ExploraLab />} />
          <Route path="/explora/:id" element={<ExploraItem />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </main>
      <Footer />
    </FavoritesProvider>
  );
}
