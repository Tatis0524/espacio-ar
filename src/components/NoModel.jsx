export default function NoModel({ product, onDemo }) {
  return (
    <div className="no-model">
      <img src={product.image} alt={product.name} />
      <div className="no-model-text">
        <h3>Este producto aún no tiene modelo 3D</h3>
        <p>
          No contamos con un archivo GLB gratuito y con licencia para «{product.name}», así que no podemos mostrarlo en 3D ni en realidad
          aumentada. La imagen de arriba es solo una ilustración.
        </p>
        <button className="btn" onClick={onDemo}>Ver modelo de demostración</button>
        <p className="small muted">
          La demostración usa una silla de otro producto para que puedas probar cómo funciona el visor y la AR.
        </p>
      </div>
    </div>
  );
}
