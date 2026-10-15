// Panel honesto para items sin modelo 3D: explica por qué no hay modelo y
// cómo agregarlo, en lugar de inventar un archivo o fingir una vista 3D.
export default function PendingModel({ item }) {
  return (
    <div className="pending-model">
      <div className="pending-tile" style={{ '--tint': item.visual.tint }}>
        <span aria-hidden="true">{item.visual.glyph}</span>
        <span className="badge badge-no3d">Modelo pendiente</span>
      </div>
      <div className="pending-model-text">
        <h3>Modelo 3D pendiente</h3>
        <p>
          Todavía no incluimos un archivo GLB con licencia libre y de peso razonable para «{item.name}». Preferimos
          decirlo con honestidad antes que mostrar un sustituto inventado: la ficha de esta página sí contiene
          información verificada.
        </p>
        {item.modelNote && <p className="small muted">{item.modelNote}</p>}
        <p className="small muted">
          Si tienes un GLB con licencia CC0 o CC BY, los pasos para agregarlo están en <code>docs/EXPLORA.md</code>.
        </p>
      </div>
    </div>
  );
}
