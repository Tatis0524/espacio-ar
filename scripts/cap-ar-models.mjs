#!/usr/bin/env node
/**
 * cap-ar-models.mjs — Limita la dimensión máxima de los modelos 3D de AR.
 *
 * Motivo: en AR el modelo se coloca en el piso a su tamaño real (un sofá de
 * 2,19 m ocupa toda la cámara, se sale del plano detectado y es difícil de
 * mover). Este script envuelve la escena de cada modelo cuya mayor dimensión
 * supera `CAP` metros en un nodo raíz con escala uniforme (`ar-cap-root`),
 * para que aparezca más pequeño y quede contenido en la superficie detectada.
 *
 * - Solo se toca el JSON del glTF (chunk JSON de los .glb); los .bin y las
 *   texturas no cambian. Los offsets internos se conservan correctamente.
 * - El visor 3D de la página se reencuadra solo al modelo, así que en la web
 *   no cambia nada visual (tamaño en pantalla idéntico). Solo cambia el
 *   tamaño en AR.
 * - Escala uniforme en la raíz: animaciones, esqueletos (Fox) y variantes
 *   siguen funcionando porque la escala se compone por encima de todo.
 * - Idempotente: si vuelve a ejecutarse, mide ya con el wrapper y no duplica.
 *
 * Uso:
 *   node scripts/cap-ar-models.mjs          # solo informe (dry-run)
 *   node scripts/cap-ar-models.mjs --apply  # aplica y verifica
 */

import { readFileSync, writeFileSync, readdirSync, statSync } from 'node:fs';
import { join, dirname, relative, sep } from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..');
const MODELS_DIR = join(ROOT, 'public', 'models');
const CAP = 1.5; // metros: mayor dimensión permitida (en AR)
const WRAPPER_NAME = 'ar-cap-root';
const APPLY = process.argv.includes('--apply');

// ---------------------------------------------------------------------------
// Matemática mínima de matrices 4x4 en column-major (como glTF)
// ---------------------------------------------------------------------------

const IDENTITY = [1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1];

function mulMat(a, b) {
  const o = new Array(16);
  for (let c = 0; c < 4; c++) {
    for (let r = 0; r < 4; r++) {
      o[c * 4 + r] =
        a[r] * b[c * 4] +
        a[4 + r] * b[c * 4 + 1] +
        a[8 + r] * b[c * 4 + 2] +
        a[12 + r] * b[c * 4 + 3];
    }
  }
  return o;
}

function composeTRS(translation = [0, 0, 0], rotation = [0, 0, 0, 1], scale = [1, 1, 1]) {
  const [x, y, z, w] = rotation;
  const m00 = 1 - 2 * (y * y + z * z);
  const m10 = 2 * (x * y + z * w);
  const m20 = 2 * (x * z - y * w);
  const m01 = 2 * (x * y - z * w);
  const m11 = 1 - 2 * (x * x + z * z);
  const m21 = 2 * (y * z + x * w);
  const m02 = 2 * (x * z + y * w);
  const m12 = 2 * (y * z - x * w);
  const m22 = 1 - 2 * (x * x + y * y);
  const [sx, sy, sz] = scale;
  return [
    m00 * sx, m10 * sx, m20 * sx, 0,
    m01 * sy, m11 * sy, m21 * sy, 0,
    m02 * sz, m12 * sz, m22 * sz, 0,
    translation[0], translation[1], translation[2], 1,
  ];
}

function nodeLocalMatrix(node) {
  if (Array.isArray(node.matrix) && node.matrix.length === 16) return node.matrix.slice();
  return composeTRS(node.translation, node.rotation, node.scale);
}

function transformPoint(m, p) {
  return [
    m[0] * p[0] + m[4] * p[1] + m[8] * p[2] + m[12],
    m[1] * p[0] + m[5] * p[1] + m[9] * p[2] + m[13],
    m[2] * p[0] + m[6] * p[1] + m[10] * p[2] + m[14],
  ];
}

const round6 = (v) => Number(v.toFixed(6));

// ---------------------------------------------------------------------------
// Lectura de glTF
// ---------------------------------------------------------------------------

function isGLB(path) {
  return path.toLowerCase().endsWith('.glb');
}

function readModel(path) {
  if (!isGLB(path)) {
    return { json: JSON.parse(readFileSync(path, 'utf8')), rest: null };
  }
  const buf = readFileSync(path);
  if (buf.length < 20 || buf.readUInt32LE(0) !== 0x46546c67) {
    throw new Error('no es un GLB válido (magic)');
  }
  const jsonLen = buf.readUInt32LE(12);
  const jsonType = buf.readUInt32LE(16);
  if (jsonType !== 0x4e4f534a) {
    throw new Error('el primer chunk no es JSON');
  }
  const json = JSON.parse(buf.subarray(20, 20 + jsonLen).toString('utf8'));
  const rest = Buffer.from(buf.subarray(20 + jsonLen)); // chunk BIN u otros, intactos
  return { json, rest };
}

function writeModel(path, json, rest) {
  const text = JSON.stringify(json);
  if (isGLB(path)) {
    let jsonBuf = Buffer.from(text, 'utf8');
    const pad = (4 - (jsonBuf.length % 4)) % 4;
    if (pad) jsonBuf = Buffer.concat([jsonBuf, Buffer.alloc(pad, 0x20)]);
    const total = 12 + 8 + jsonBuf.length + rest.length;
    const header = Buffer.alloc(12);
    header.writeUInt32LE(0x46546c67, 0); // magic 'glTF'
    header.writeUInt32LE(2, 4); // version
    header.writeUInt32LE(total, 8); // longitud total
    const chunkHeader = Buffer.alloc(8);
    chunkHeader.writeUInt32LE(jsonBuf.length, 0);
    chunkHeader.writeUInt32LE(0x4e4f534a, 4); // 'JSON'
    writeFileSync(path, Buffer.concat([header, chunkHeader, jsonBuf, rest]));
  } else {
    // Los .gltf externos se mantienen legibles (2 espacios) para diffs útiles.
    writeFileSync(path, JSON.stringify(json, null, 2));
  }
}

// ---------------------------------------------------------------------------
// Medición de la caja envolvente (AABB) de la escena por defecto
// ---------------------------------------------------------------------------

function defaultSceneRoots(gltf) {
  if (gltf.scenes?.length) {
    const idx = gltf.scene ?? 0;
    return gltf.scenes[idx]?.nodes ?? [];
  }
  if (!gltf.nodes?.length) return [];
  const hasParent = new Set();
  for (const n of gltf.nodes) for (const c of n.children ?? []) hasParent.add(c);
  return gltf.nodes.map((_, i) => i).filter((i) => !hasParent.has(i));
}

function measureAABB(gltf) {
  const warnings = [];
  const min = [Infinity, Infinity, Infinity];
  const max = [-Infinity, -Infinity, -Infinity];
  let measured = false;

  const usesInstancing = (gltf.extensionsUsed ?? []).includes('EXT_mesh_gpu_instancing');

  const visit = (nodeIdx, parentWorld) => {
    const node = gltf.nodes?.[nodeIdx];
    if (!node) return;
    const world = mulMat(parentWorld, nodeLocalMatrix(node));
    if (node.mesh != null && gltf.meshes?.[node.mesh]) {
      if (node.extensions?.EXT_mesh_gpu_instancing) {
        warnings.push('EXT_mesh_gpu_instancing: no se puede medir con precisión');
        return;
      }
      for (const prim of gltf.meshes[node.mesh].primitives ?? []) {
        const accIdx = prim.attributes?.POSITION;
        if (accIdx == null) continue;
        const acc = gltf.accessors?.[accIdx];
        if (!acc?.min || !acc?.max) {
          warnings.push(`accessor POSITION ${accIdx} sin min/max`);
          continue;
        }
        for (let cx = 0; cx < 2; cx++) {
          for (let cy = 0; cy < 2; cy++) {
            for (let cz = 0; cz < 2; cz++) {
              const p = transformPoint(world, [
                cx ? acc.max[0] : acc.min[0],
                cy ? acc.max[1] : acc.min[1],
                cz ? acc.max[2] : acc.min[2],
              ]);
              for (let i = 0; i < 3; i++) {
                if (p[i] < min[i]) min[i] = p[i];
                if (p[i] > max[i]) max[i] = p[i];
              }
              measured = true;
            }
          }
        }
      }
    }
    for (const c of node.children ?? []) visit(c, world);
  };

  for (const root of defaultSceneRoots(gltf)) visit(root, IDENTITY);

  if (!measured) return { empty: true, warnings };
  const dims = [max[0] - min[0], max[1] - min[1], max[2] - min[2]];
  return { dims, maxDim: Math.max(...dims), warnings, usesInstancing };
}

// ---------------------------------------------------------------------------
// Aplicar el tope: envolver la escena por defecto en un nodo con escala
// ---------------------------------------------------------------------------

function applyCap(gltf, factor) {
  if (!gltf.nodes?.length || !gltf.scenes?.length) {
    return { ok: false, reason: 'sin escenas/nodos, se omite' };
  }
  const sceneIdx = gltf.scene ?? 0;
  const scene = gltf.scenes[sceneIdx];
  if (!scene?.nodes?.length) return { ok: false, reason: 'escena por defecto vacía' };

  const existing = gltf.nodes.findIndex((n) => n.name === WRAPPER_NAME);
  if (existing >= 0) {
    const w = gltf.nodes[existing];
    const cur = w.scale ?? [1, 1, 1];
    w.scale = cur.map((v) => round6(v * factor));
    if (scene.nodes.length === 1 && scene.nodes[0] === existing) {
      return { ok: true, action: `re-escalado del wrapper existente (x${round6(factor)})` };
    }
    // Por seguridad, si el wrapper no es raíz, recolocarlo como raíz.
    scene.nodes = [existing];
    return { ok: true, action: `re-escalado y re-colocado el wrapper (x${round6(factor)})` };
  }

  const roots = [...scene.nodes];
  gltf.nodes.push({ name: WRAPPER_NAME, scale: [round6(factor), round6(factor), round6(factor)], children: roots });
  const wrapperIdx = gltf.nodes.length - 1;
  scene.nodes = [wrapperIdx];
  return { ok: true, action: `wrapper creado con escala x${round6(factor)}` };
}

// ---------------------------------------------------------------------------
// Recorrido de archivos
// ---------------------------------------------------------------------------

function listModels(dir) {
  const out = [];
  for (const entry of readdirSync(dir)) {
    const full = join(dir, entry);
    const st = statSync(full);
    if (st.isDirectory()) out.push(...listModels(full));
    else if (/\.glb$/i.test(entry) || /\.gltf$/i.test(entry)) out.push(full);
  }
  return out.sort();
}

// ---------------------------------------------------------------------------
// Main
// ---------------------------------------------------------------------------

const files = listModels(MODELS_DIR);
const results = [];
let applyErrors = 0;

console.log(`Tope de tamaño en AR: ${CAP} m (mayor dimensión). Modo: ${APPLY ? 'APLICAR' : 'dry-run'}\n`);

for (const file of files) {
  const rel = relative(ROOT, file).split(sep).join('/');
  try {
    const { json, rest } = readModel(file);
    const before = measureAABB(json);

    if (before.empty) {
      results.push({ rel, status: 'SIN DATOS', detail: before.warnings.join('; ') || 'sin primitivas POSITION' });
      continue;
    }
    // Con instancing u otros casos no medibles mejor no tocar nada.
    if (before.usesInstancing || before.warnings.some((w) => w.includes('sin min/max'))) {
      results.push({ rel, status: 'ADVERTENCIA', detail: `no medible con seguridad: ${before.warnings.join('; ')}` });
      continue;
    }
    const warn = before.warnings.length ? ` [${before.warnings.join('; ')}]` : '';

    const dims = before.dims.map((v) => v.toFixed(2)).join(' x ');
    // Tolerancia igual a la de verificación post-apply (0,01 m): evita falsos
    // positivos por el redondeo de la escala a 6 decimales.
    if (before.maxDim <= CAP + 0.01) {
      results.push({ rel, status: 'OK', dims, maxDim: before.maxDim, detail: `≤ ${CAP} m, sin cambios${warn}` });
      continue;
    }

    const factor = CAP / before.maxDim;
    if (!APPLY) {
      results.push({ rel, status: 'TOCARÍA', dims, maxDim: before.maxDim, detail: `escala x${round6(factor)}${warn}` });
      continue;
    }

    const applied = applyCap(json, factor);
    if (!applied.ok) {
      applyErrors++;
      results.push({ rel, status: 'OMITIDO', dims, maxDim: before.maxDim, detail: applied.reason });
      continue;
    }
    writeModel(file, json, rest);

    // Verificación: releer y comprobar que la nueva medida ≤ CAP (+ tolerancia)
    const check = readModel(file);
    const after = measureAABB(check.json);
    if (after.empty || after.maxDim > CAP + 0.01) {
      applyErrors++;
      results.push({ rel, status: 'ERROR', dims, maxDim: before.maxDim, detail: `verificación falló (ahora ${after.maxDim?.toFixed(3)} m)` });
      continue;
    }
    results.push({ rel, status: 'APLICADO', dims, maxDim: before.maxDim, detail: `${applied.action} → ahora ${after.maxDim.toFixed(2)} m${warn}` });
  } catch (err) {
    applyErrors++;
    results.push({ rel, status: 'ERROR', detail: err.message });
  }
}

const pad = (s, n) => String(s).padEnd(n);
console.log(pad('archivo', 58), pad('estado', 11), pad('dims (m)', 24), 'detalle');
console.log('-'.repeat(120));
for (const r of results) {
  const dims = r.dims ? `${r.dims} (max ${r.maxDim.toFixed(2)})` : '';
  console.log(pad(r.rel, 58), pad(r.status, 11), pad(dims, 24), r.detail);
}

const touched = results.filter((r) => r.status === 'APLICADO').length;
const pending = results.filter((r) => r.status === 'TOCARÍA').length;
console.log(`\n${results.length} archivos · ${touched} modificados · ${pending} por modificar · ${applyErrors} errores`);
if (!APPLY && pending > 0) console.log('Ejecuta con --apply para aplicar los cambios.');
process.exit(applyErrors > 0 ? 1 : 0);
