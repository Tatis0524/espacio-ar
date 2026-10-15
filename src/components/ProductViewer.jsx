import { useCallback, useEffect, useRef, useState } from 'react';
import { explainNoAR } from '../utils/helpers.js';

// Visor 3D real con <model-viewer>. La AR solo se activa mediante sesiones reales
// (WebXR en Android/Chrome, Scene Viewer en Android, Quick Look en iOS). No se simula nada.
export default function ProductViewer({ src, alt, variantName, label, arPlacement = 'floor' }) {
  const ref = useRef(null);
  const [status, setStatus] = useState('loading'); // loading | ready | error
  const [progress, setProgress] = useState(0);
  const [canAR, setCanAR] = useState(false);
  const [arMessage, setArMessage] = useState('');
  const [attempt, setAttempt] = useState(0);
  const [copied, setCopied] = useState(false);

  // Eventos reales del elemento model-viewer.
  useEffect(() => {
    const el = ref.current;
    if (!el) return undefined;
    setStatus('loading');
    setProgress(0);
    setCanAR(false);
    setArMessage('');

    const onLoad = () => {
      setStatus('ready');
      setCanAR(Boolean(el.canActivateAR));
    };
    const onError = () => setStatus('error');
    const onProgress = (e) => setProgress(Math.round((e.detail?.totalProgress ?? 0) * 100));
    const onArStatus = (e) => {
      if (e.detail?.status === 'failed') {
        setArMessage('No se pudo iniciar la sesión de realidad aumentada. Revisa los permisos de cámara e inténtalo de nuevo.');
      } else if (e.detail?.status === 'session-started') {
        setArMessage('');
      }
    };

    el.addEventListener('load', onLoad);
    el.addEventListener('error', onError);
    el.addEventListener('progress', onProgress);
    el.addEventListener('ar-status', onArStatus);
    return () => {
      el.removeEventListener('load', onLoad);
      el.removeEventListener('error', onError);
      el.removeEventListener('progress', onProgress);
      el.removeEventListener('ar-status', onArStatus);
    };
  }, [src, attempt]);

  // Cambio de color: variantes reales definidas dentro del archivo GLB.
  useEffect(() => {
    const el = ref.current;
    if (!el || status !== 'ready') return;
    if (variantName && el.availableVariants?.includes(variantName)) {
      el.variantName = variantName;
    }
  }, [variantName, status]);

  // Al reintentar se vuelve a montar el visor (status 'loading') y se evita una respuesta fallida en caché.
  const retry = () => {
    setStatus('loading');
    setAttempt((n) => n + 1);
  };

  const tryAR = useCallback(() => {
    const el = ref.current;
    setArMessage('');
    if (status !== 'ready') {
      setArMessage('Espera a que el modelo termine de cargar.');
      return;
    }
    if (el?.canActivateAR) {
      el.activateAR();
    } else {
      setArMessage(explainNoAR());
    }
  }, [status]);

  // Devuelve la cámara a su posición inicial por si el usuario la aleja o se sale de cuadro.
  const resetView = () => {
    const el = ref.current;
    if (!el || status !== 'ready') return;
    el.cameraOrbit = 'auto auto auto';
    el.cameraTarget = 'auto auto auto';
  };

  const copyLink = async () => {
    try {
      await navigator.clipboard.writeText(window.location.href);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      setArMessage('No se pudo copiar el enlace. Cópialo manualmente desde la barra de direcciones.');
    }
  };

  return (
    <div className="viewer">
      <div className="viewer-stage">
        {status === 'error' ? (
          <div className="viewer-error" role="alert">
            <h3>No se pudo cargar el modelo 3D</h3>
            <p>
              Puede ser un problema de conexión o que el archivo no esté disponible. Revisa tu internet e inténtalo de nuevo.
            </p>
            <button className="btn" onClick={retry}>Reintentar</button>
          </div>
        ) : (
          <model-viewer
            key={`${src}-${attempt}`}
            ref={ref}
            src={attempt > 0 ? `${src}?r=${attempt}` : src}
            alt={alt}
            ar
            ar-modes="webxr scene-viewer quick-look"
            ar-scale="fixed"
            ar-placement={arPlacement}
            camera-controls
            touch-action="pan-y"
            auto-rotate
            min-camera-orbit="auto auto 70%"
            max-camera-orbit="auto auto 140%"
            shadow-intensity="1"
            exposure="1"
            interaction-prompt="auto"
          >
            {/* Botón AR propio: el de model-viewer se oculta para controlar nosotros los mensajes. */}
            <button slot="ar-button" style={{ display: 'none' }} aria-hidden="true" tabIndex={-1} />
          </model-viewer>
        )}
        {status === 'loading' && (
          <div className="viewer-loading" aria-live="polite">
            <div className="bar"><span style={{ width: `${progress}%` }} /></div>
            <p>Cargando modelo 3D… {progress}%</p>
          </div>
        )}
      </div>

      {label && <p className="viewer-label">{label}</p>}

      <p className="viewer-help small muted">
        Arrastra para rotar · pellizca para acercar o alejar · dos dedos para mover. Si el modelo se sale de cuadro, pulsa «Restablecer vista».
      </p>

      <div className="viewer-actions">
        <button className="btn btn-primary" onClick={tryAR} disabled={status === 'error'}>
          Probar en mi espacio
        </button>
        <button className="btn" onClick={copyLink}>{copied ? '¡Enlace copiado!' : 'Copiar enlace para el celular'}</button>
        {status === 'ready' && (
          <button className="btn" onClick={resetView}>Restablecer vista</button>
        )}
      </div>

      {status === 'ready' && (
        <p className={canAR ? 'notice ok' : 'notice'} role="status">
          {canAR
            ? 'Tu dispositivo es compatible con realidad aumentada. Se te pedirá permiso para usar la cámara.'
            : 'Realidad aumentada no disponible en este dispositivo o navegador. Puedes explorar el modelo en 3D.'}
        </p>
      )}
      {arMessage && <p className="notice warn" role="alert">{arMessage}</p>}

      <details className="ar-steps">
        <summary>¿Cómo usar la realidad aumentada?</summary>
        <ol>
          <li>Pulsa «Probar en mi espacio» y acepta el permiso de cámara.</li>
          <li>Apunta el celular a la superficie (piso o pared, según el producto) y muévelo despacio para que la detecte.</li>
          <li>Toca para colocar el mueble a su tamaño real. Arrástralo para moverlo y usa dos dedos para rotarlo.</li>
          <li>Si el objeto se desliza o pierde el seguimiento, muévete despacio alrededor o vuelve a colocarlo: el seguimiento es menos estable con poca luz o en superficies lisas y sin textura.</li>
        </ol>
      </details>
    </div>
  );
}
