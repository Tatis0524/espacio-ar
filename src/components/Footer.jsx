import { Link } from 'react-router-dom';

export default function Footer() {
  return (
    <footer className="site-footer">
      <div className="container">
        <p><strong>EspacioAR</strong> · MVP académico. Los precios son <em>ficticios y demostrativos</em>; no se realizan compras.</p>
        <p className="muted">
          Modelos 3D: Khronos glTF Sample Assets (CC0 / CC BY 4.0), Poly Haven (CC0) y NASA/JPL vía Cesium
          (Apache-2.0); créditos y licencias en cada ficha. <Link to="/ayuda">Ayuda</Link>
        </p>
      </div>
    </footer>
  );
}
