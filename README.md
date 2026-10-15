# EspacioAR — MVP académico

Aplicación web para explorar muebles en 3D y probarlos en tu espacio con realidad aumentada (AR).
Stack: React + Vite, JavaScript/CSS, Google `<model-viewer>`, modelos GLB, LocalStorage. Sin backend, sin servicios de pago.

## Estructura

```
espacioar/
├─ index.html
├─ package.json · vite.config.js
├─ public/
│  ├─ models/      5 archivos .glb reales (ver tabla de licencias)
│  ├─ posters/     fotos de producto (renderizadas desde los GLB) e ilustraciones
│  └─ favicon.svg
└─ src/
   ├─ main.jsx · App.jsx · styles.css
   ├─ data/products.js            catálogo (6 productos)
   ├─ hooks/                      useLocalStorage, FavoritesContext
   ├─ utils/helpers.js
   ├─ components/                 Header, Footer, ProductCard, ProductViewer (3D+AR),
   │                              ColorSelector, FavoriteButton, NoModel
   └─ pages/                      Home, Catalog, ProductDetail, Favorites, Help
```

## Instalar y ejecutar en VS Code

Requisitos: Node.js 20 o superior (`node -v`).

```bash
cd espacioar
npm install
npm run dev        # http://localhost:5173
npm run build      # genera /dist y comprueba que compila
npm run preview    # sirve /dist en http://localhost:4173
```

## Probar en el celular

La AR **exige HTTPS** (o `localhost`). Un enlace `http://192.168.x.x:5173` abre la app y el visor 3D, pero la AR no estará disponible. Opciones:

1. **Recomendada:** publicar en GitHub Pages (abajo) y abrir esa URL en el celular.
2. **Túnel HTTPS gratuito:** con `npm run dev` activo, ejecuta `npx localtunnel --port 5173` y abre en el celular la URL `https://…` que imprime.
3. **Android con cable USB:** activa la depuración USB, abre `chrome://inspect/#devices` en Chrome de escritorio, configura *Port forwarding* 5173 → `localhost:5173` y abre `http://localhost:5173` en el celular.

Compatibilidad: Android con ARCore + Chrome (WebXR / Scene Viewer) · iPhone/iPad con iOS 12+ y Safari (Quick Look).
El permiso de cámara lo solicita el propio sistema al iniciar la AR; la app no accede a la cámara por su cuenta.

## Publicar gratis en GitHub Pages

1. Crea un repositorio en GitHub y sube el proyecto (`git init`, `git add .`, `git commit -m "EspacioAR"`, `git remote add origin <URL>`, `git push -u origin main`).
2. Ejecuta `npm run deploy` (compila y publica `dist/` en la rama `gh-pages`).
3. En GitHub: *Settings → Pages → Source: Deploy from a branch → `gh-pages` / root*.
4. Tu app quedará en `https://<usuario>.github.io/<repositorio>/`.

`vite.config.js` usa `base: './'` y la app usa `HashRouter`, así que funciona sin importar el nombre del repo.

## Modelos 3D y licencias

Fuente: [KhronosGroup/glTF-Sample-Assets](https://github.com/KhronosGroup/glTF-Sample-Assets) (licencias leídas del README de cada modelo). Ya están incluidos en `public/models/`; no hay que descargar nada.

| Archivo | Modelo original | Autoría | Licencia |
|---|---|---|---|
| `sofa-glam.glb` | GlamVelvetSofa | © 2021 Wayfair, LLC · Eric Chadwick | CC BY 4.0 |
| `silla-sheen.glb` | SheenChair | © 2020 Wayfair, LLC · Eric Chadwick | CC0 1.0 |
| `lampara-granero.glb` | AnisotropyBarnLamp | © 2023 Wayfair, LLC · Eric Chadwick | CC BY 4.0 |
| `planta-hojas.glb` | DiffuseTransmissionPlant | © 2024 Darmstadt Graphics Group GmbH · Eric Chadwick (materiales); activo original de Rico Cilliers (CC0) | CC BY 4.0 |
| `demo-silla-damasco.glb` | ChairDamaskPurplegold | © 2021 Wayfair · Eric Chadwick | CC BY 4.0 |

Los modelos CC BY 4.0 exigen atribución: manténla (esta tabla y el pie de página). Las fotos de `public/posters/*.jpg` son capturas de esos mismos modelos.

**Productos sin modelo:** la *mesa auxiliar* y la *estantería* no tienen GLB gratuito verificado. La app lo indica y ofrece un modelo de demostración (una silla) rotulado como «no es este producto». Para añadir uno: guarda el `.glb` en `public/models/` y pon su ruta en `model` dentro de `src/data/products.js`.

## ExploraAR (sección educativa)

Sección nativa de la app (menú **ExploraAR**, ruta `#/explora`) con:

- **4 categorías**: Ciencia en 3D, Universo AR, Historia y cultura, Naturaleza y animales.
- **22 fichas educativas** con buscador, filtros por categoría, favoritos y progreso local (LocalStorage).
- **8 modelos 3D reales con AR** (Khronos CC0/CC BY, Poly Haven CC0, NASA/JPL vía Cesium); el resto indica honestamente «modelo pendiente» con su motivo.
- **Laboratorio AR** (`#/explora/laboratorio`): catálogo visual, visor, ficha y actividad guiada «Mi primera experiencia AR».
- **Mini reto**: 7 preguntas con retroalimentación, puntuación y mejor puntaje guardado.

Fuentes, licencias y **cómo agregar un modelo pendiente**: [`docs/EXPLORA.md`](docs/EXPLORA.md).

## Pruebas manuales

| # | Acción | Resultado esperado |
|---|---|---|
| 1 | Abrir `/` | Logo, menú, problema/solución, pasos de AR, 3 destacados |
| 2 | Catálogo → buscar «lampara» | 1 resultado (ignora tildes) |
| 3 | Filtrar por *Sillas*; recargar | 1 producto; el filtro se conserva |
| 4 | Ordenar por precio | Orden ascendente/descendente correcto |
| 5 | Abrir *Sofá Glam* | Visor 3D carga; arrastrar rota; rueda/pellizco acerca |
| 6 | Elegir otro color | El sofá cambia a la variante real del GLB |
| 7 | Corazón en 2 productos; recargar; ir a Favoritos | Siguen guardados; quitar uno lo elimina |
| 8 | *Mesa auxiliar* | Aviso «aún no tiene modelo 3D»; el botón de demostración abre una silla rotulada |
| 9 | «Probar en mi espacio» en computador | Mensaje claro de que la AR no está disponible; el 3D sigue activo |
| 10 | Mismo botón en celular compatible (HTTPS) | El sistema pide cámara; puedes colocar el mueble en el piso |
| 11 | Lámpara en AR | Se coloca sobre una pared (`ar-placement="wall"`) si la plataforma lo admite |
| 12 | Bloquear red y abrir un producto 3D | Panel de error con «Reintentar» |
| 13 | Reducir la ventana a 390 px | Menú «Menú», sin scroll horizontal |
| 14 | Abrir `#/explora` | Encabezado, 4 categorías, destacados, buscador, progreso, Laboratorio y mini reto |
| 15 | Filtros o buscador en ExploraAR | La cuadrícula filtra; «sin resultados» ofrece limpiar |
| 16 | Abrir un elemento con modelo | Visor 3D + AR + licencia; queda marcado «Explorado ✓» y suma al progreso |
| 17 | Abrir «Corazón humano» | Panel «Modelo pendiente» con motivo; sin archivos inventados |
| 18 | Completar el mini reto | Retroalimentación por pregunta, resultados, reintentar y mejor puntaje persistente |
| 19 | Favoritar un elemento de ExploraAR | Aparece en Favoritos bajo «ExploraAR» y persiste al recargar |
| 20 | AR en celular: mover y redimensionar | Arrastrar **dentro** del objeto lo mueve (fuera, gira); pellizcar con dos dedos cambia su tamaño; todo modelo aparece ≤1,5 m |

## Limitaciones conocidas

- La AR real solo puede comprobarse en un celular físico; en computador la app muestra el 3D y avisa.
- Al activar AR en Android/iOS (Scene Viewer / Quick Look), el sistema puede no conservar la variante de color elegida; depende de la plataforma.
- El tamaño en AR es de referencia: los modelos grandes aparecen limitados a 1,5 m (`scripts/cap-ar-models.mjs`) y puedes redimensionarlos pellizcando con dos dedos; no es una medida exacta.
- Dos productos son solo ilustraciones por falta de modelo 3D gratuito.
