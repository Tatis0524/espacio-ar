# ExploraAR — Fuentes, licencias y modelos pendientes

Sección educativa de **EspacioAR**: fichas de ciencia, universo, historia y
naturaleza con modelos 3D reales, Laboratorio AR y mini reto.

Todos los archivos están en `public/models/explora/` y se referencian desde
`src/data/explora.js`. **No se ha inventado ninguna URL**: cada modelo listado
aquí existe en disco y su licencia fue verificada en la fuente oficial.

## Modelos utilizados (y sus licencias)

| Modelo | Categoría | Archivo | Licencia | Fuente |
|---|---|---|---|---|
| Zorro rojo (animado) | Naturaleza | `Fox.glb` (163 KB) | CC0 (modelo) + CC BY 4.0 (rigging/animación) | [Khronos glTF Sample Assets — Fox](https://github.com/KhronosGroup/glTF-Sample-Assets/tree/main/Models/Fox) |
| Flores en jarrón de vidrio | Naturaleza | `GlassVaseFlowers.glb` (1,8 MB) | CC0 | [Khronos — GlassVaseFlowers](https://github.com/KhronosGroup/glTF-Sample-Assets/tree/main/Models/GlassVaseFlowers) |
| Planta en maceta | Naturaleza | `DiffuseTransmissionPlant.glb` (5,8 MB) | CC BY 4.0 + CC0 | [Khronos — DiffuseTransmissionPlant](https://github.com/KhronosGroup/glTF-Sample-Assets/tree/main/Models/DiffuseTransmissionPlant) |
| Farol antiguo de calle | Historia | `Lantern.glb` (9,6 MB) | CC0 | [Khronos — Lantern](https://github.com/KhronosGroup/glTF-Sample-Assets/tree/main/Models/Lantern) |
| Ingenuity (helicóptero de Marte) | Universo | `Ingenuity.glb` (1,8 MB) | Apache-2.0 (repositorio CesiumJS); diseño de NASA/JPL-Caltech | [CesiumGS/cesium — Mars](https://github.com/CesiumGS/cesium/tree/main/Apps/SampleData/models/Mars) |
| Set de laboratorio de química | Ciencia | `chemistry_set/` (gltf + bin + 3 texturas 1K, ≈3,2 MB) | CC0 | [Poly Haven — chemistry set](https://polyhaven.com/a/chemistry_set) |
| Microscopio antiguo | Ciencia | `vintage_microscope/` (≈2,3 MB) | CC0 | [Poly Haven — vintage microscope](https://polyhaven.com/a/vintage_microscope) |
| Cañón de época colonial | Historia | `cannon_01/` (≈4,2 MB) | CC0 | [Poly Haven — cannon](https://polyhaven.com/a/cannon_01) |

Atribuciones completas se muestran en la ficha de cada elemento dentro de la app.

### Criterios aplicados

- Solo **CC0, CC BY y Apache-2.0** (licencias compatibles con un proyecto
  académico y con atribución visible).
- Archivos verificados (`magic = glTF`, tamaño razonable). Se descartaron
  modelos de 11–23 MB por mal rendimiento en celular.
- **Carga perezosa**: cada GLB solo se descarga cuando el usuario abre su
  ficha o lo selecciona en el Laboratorio. No se precargan todos a la vez.

## Elementos con "modelo pendiente"

Estos elementos existen como fichas educativas verificadas, **sin modelo 3D**,
con el motivo documentado en su campo `modelNote`:

| Elemento | Motivo |
|---|---|
| Corazón humano, Esqueleto humano, Cerebro, Volcán | No se encontró un modelo anatómico/volcánico con licencia libre (CC0/CC BY) y descarga directa verificable. |
| Tierra, Luna, Marte, Sistema solar | No existe un GLB planetario con licencia clara de fuente oficial (NASA/Sketchfab exigen API o tienen licencias no verificables sin cuenta). |
| Mosquito en ámbar | Existe en Khronos (`MosquitoInAmber`, CC BY 4.0) pero pesa **23 MB**. Pendiente optimizar (Draco + texturas menores). |
| Cámara antigua | Existe (`AntiqueCamera`, CC0) pero pesa **16,7 MB**. Pendiente optimizar. |
| Corsé histórico | Existe (`Corset`, CC0) pero pesa **12,9 MB**. Pendiente optimizar. |
| Pez barramundi | Existe (`BarramundiFish`, CC0, 11,9 MB) pero el CDN no lo entregó de forma estable y pesa demasiado para móvil. |
| Mariposa, Tortuga | Sin modelo con licencia verificada. |
| La Balsa Muisca | Pieza auténtica del Museo del Oro: **no** mostramos una reproducción digital inventada (la ficha lo indica explícitamente). |

## Cómo agregar un modelo pendiente

1. Consigue un archivo **GLB** con licencia CC0 o CC BY (verifica la licencia en
   la página de origen; guarda la URL y el autor).
2. Copia el archivo a `public/models/explora/` (si es multiarchivo, respeta las
   rutas relativas del `.gltf`, como los modelos de Poly Haven).
   - Consejo: comprime antes de subir. `npx gltf-pipeline -i entrada.glb -o salida.glb --draco` reduce mucho el tamaño.
3. Edita `src/data/explora.js` y, en el elemento correspondiente, reemplaza
   `model: null` por un objeto como:

   ```js
   model: {
     src: asset('models/explora/TuModelo.glb'),
     alt: 'Descripción accesible del modelo',
     license: 'CC BY 4.0',
     licenseUrl: 'https://creativecommons.org/licenses/by/4.0/deed.es',
     source: 'Nombre de la fuente',
     sourceUrl: 'https://… (página oficial del modelo)',
     attribution: 'Autor del modelo (licencia)',
   },
   ```

4. (Opcional) borra el campo `modelNote`.
5. Ejecuta `npm run build` y comprueba que la ficha muestra el visor 3D.

## Probar la AR desde un celular

1. Despliega (`npm run deploy`) o sirve la app por **HTTPS**; la AR no funciona en HTTP.
2. Abre la página en el celular (Android con Chrome/ARCore o iPhone/iPad con Safari).
3. Entra a un elemento con modelo y pulsa **«Probar en mi espacio»**.
4. Acepta el permiso de cámara, apunta al piso, mueve el celular despacio hasta
   detectar la superficie y toca para colocar el objeto (`ar-scale="fixed"` =
   tamaño real).
