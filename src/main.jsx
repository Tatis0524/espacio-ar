import React from 'react';
import { createRoot } from 'react-dom/client';
import { HashRouter } from 'react-router-dom';
import '@google/model-viewer';
import App from './App.jsx';
import './styles.css';

// HashRouter: funciona en GitHub Pages sin configurar redirecciones del servidor.
createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <HashRouter>
      <App />
    </HashRouter>
  </React.StrictMode>
);
