// Colores disponibles de un producto: variantes reales del modelo o color único declarado.
export function getColors(product) {
  if (product.model?.variants?.length) return product.model.variants;
  return product.colors ?? [];
}

// Detecta el motivo más probable por el que la AR no está disponible (solo para mostrar un mensaje útil).
export function explainNoAR() {
  if (!window.isSecureContext) {
    return 'La realidad aumentada requiere una conexión segura (HTTPS). Abre la versión publicada de la app.';
  }
  const ua = navigator.userAgent || '';
  const isMobile = /Android|iPhone|iPad|iPod/i.test(ua) || (navigator.maxTouchPoints > 1 && /Mac/.test(ua));
  if (!isMobile) {
    return 'La realidad aumentada funciona en celulares y tabletas compatibles. Abre esta página desde tu celular para probarla.';
  }
  return 'Tu navegador o dispositivo no ofrece una sesión AR compatible (se necesita ARCore en Android o iOS 12+ con Safari). Puedes seguir usando la vista 3D.';
}
