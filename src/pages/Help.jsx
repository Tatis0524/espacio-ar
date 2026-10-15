const faqs = [
  ['¿Necesito instalar una app?', 'No. La AR se abre desde el navegador: WebXR/Scene Viewer en Android y Quick Look en iPhone/iPad.'],
  ['¿Por qué no me aparece la AR?', 'Tu dispositivo o navegador puede no ser compatible, o la página no se abrió por HTTPS. La vista 3D sigue disponible.'],
  ['¿Por qué algunos productos no tienen 3D?', 'Solo incluimos modelos GLB gratuitos con licencia verificada. Los productos sin modelo lo indican de forma clara.'],
  ['¿Los precios son reales?', 'No. Son ficticios y demostrativos; la app no vende ni procesa pagos.'],
  ['¿Dónde se guardan mis favoritos?', 'En el LocalStorage de tu navegador. Si borras los datos del sitio o cambias de navegador, se pierden.'],
  ['¿Qué es ExploraAR?', 'La sección educativa de la app: fichas de ciencia, universo, historia y naturaleza con modelos 3D reales, un Laboratorio AR y un mini reto. Tu progreso se guarda también en LocalStorage.'],
  ['¿Por qué algunos elementos de ExploraAR dicen «modelo pendiente»?', 'Porque no encontramos un archivo GLB con licencia libre y de peso razonable. Preferimos ser honestos antes que mostrar modelos inventados; la guía docs/EXPLORA.md explica cómo agregarlos.'],
  ['¿El tamaño en AR es real?', 'Es una referencia: los modelos grandes aparecen reducidos para caber en tu espacio (tope de 1,5 m) y puedes ajustar el tamaño pellizcando con dos dedos. No lo uses como medida exacta.'],
];

const errors = [
  ['No se pudo cargar el modelo 3D', 'Revisa tu conexión y pulsa «Reintentar».'],
  ['No se pudo iniciar la sesión de realidad aumentada', 'Concede el permiso de cámara en el navegador y vuelve a intentarlo.'],
  ['Realidad aumentada no disponible', 'Tu dispositivo no es compatible. Usa la vista 3D o prueba desde otro celular.'],
];

export default function Help() {
  return (
    <section className="container section help">
      <h1>Ayuda</h1>

      <h2>Cómo usar EspacioAR</h2>
      <ol className="list">
        <li>Entra al <strong>Catálogo</strong> y filtra, busca u ordena los productos.</li>
        <li>Abre un producto. Si tiene modelo 3D, gíralo y acércalo; si tiene variantes, cambia el color.</li>
        <li>Pulsa <strong>Probar en mi espacio</strong> desde un celular compatible.</li>
        <li>Guarda tus preferidos con el corazón; los verás en <strong>Favoritos</strong>.</li>
      </ol>

      <h2>Requisitos para usar la cámara y la AR</h2>
      <ul className="list">
        <li><strong>Android:</strong> Chrome actualizado y un teléfono compatible con ARCore (Google Play Services para AR).</li>
        <li><strong>iPhone/iPad:</strong> iOS/iPadOS 12 o superior con Safari.</li>
        <li>Abrir la página por <strong>HTTPS</strong> (la versión publicada en GitHub Pages lo cumple).</li>
        <li>Aceptar el permiso de cámara cuando el sistema lo solicite. La app no accede a la cámara por su cuenta.</li>
        <li>Buena iluminación y un piso con textura (evita superficies muy lisas o brillantes).</li>
      </ul>
      <p className="notice">En computador no hay AR: verás la vista 3D interactiva.</p>

      <h2>Preguntas frecuentes</h2>
      {faqs.map(([q, a]) => (
        <details key={q} className="faq"><summary>{q}</summary><p>{a}</p></details>
      ))}

      <h2>Mensajes de error</h2>
      <dl className="errors">
        {errors.map(([t, d]) => (<div key={t}><dt>{t}</dt><dd>{d}</dd></div>))}
      </dl>
    </section>
  );
}
