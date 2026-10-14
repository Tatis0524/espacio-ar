import { Link } from 'react-router-dom';
import { products } from '../data/products.js';
import ProductCard from '../components/ProductCard.jsx';

export default function Home() {
  const featured = products.filter((p) => p.featured);
  return (
    <>
      <section className="hero">
        <div className="container hero-grid">
          <div>
            <p className="eyebrow">Decoración + realidad aumentada</p>
            <h1>Mira cómo quedará el mueble en tu espacio antes de comprarlo</h1>
            <p className="lead">
              Explora un catálogo, gira los muebles en 3D y, desde tu celular compatible, colócalos en tu habitación con la cámara.
            </p>
            <div className="hero-actions">
              <Link to="/catalogo" className="btn btn-primary">Explorar muebles</Link>
              <Link to="/ayuda" className="btn">Cómo funciona</Link>
            </div>
          </div>
          <img className="hero-img" src={products[0].image} alt="Sofá Glam de terciopelo renderizado en 3D" />
        </div>
      </section>

      <section className="container section two-col">
        <div className="panel">
          <h2>El problema</h2>
          <p>
            Es difícil imaginar cómo se verá un mueble en tu cuarto. Eso lleva a compras equivocadas, colores que no combinan o
            distribuciones incómodas.
          </p>
        </div>
        <div className="panel panel-green">
          <h2>La solución</h2>
          <p>
            EspacioAR te deja ver cada pieza en 3D, cambiar su color cuando existen variantes y probarla en tu espacio con realidad
            aumentada antes de decidir.
          </p>
        </div>
      </section>

      <section className="container section">
        <h2>¿Cómo funciona la realidad aumentada?</h2>
        <ol className="steps">
          <li><span>1</span><div><h3>Elige un mueble</h3><p>Entra al detalle de un producto con modelo 3D.</p></div></li>
          <li><span>2</span><div><h3>Abre la AR en tu celular</h3><p>Pulsa «Probar en mi espacio» y acepta el permiso de cámara.</p></div></li>
          <li><span>3</span><div><h3>Colócalo en tu habitación</h3><p>Apunta al piso, toca para colocarlo y muévelo a tu gusto.</p></div></li>
        </ol>
        <p className="notice">
          La AR depende de tu dispositivo: funciona en Android con ARCore (Chrome) y en iPhone/iPad con Safari. Si no es compatible, verás
          el modelo en 3D y un aviso claro.
        </p>
      </section>

      <section className="container section">
        <div className="section-head">
          <h2>Productos destacados</h2>
          <Link to="/catalogo">Ver todo el catálogo →</Link>
        </div>
        <div className="grid">
          {featured.map((p) => <ProductCard key={p.id} product={p} />)}
        </div>
      </section>
    </>
  );
}
