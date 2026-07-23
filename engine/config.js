'use strict';
/**
 * config.js — configuración compartida del motor UPOME.
 * Carga engine/spec.json (fuente única de números) y expone helpers.
 */
const fs = require('fs');
const path = require('path');

const ROOT = path.resolve(__dirname, '..');
const SPEC = JSON.parse(fs.readFileSync(path.join(__dirname, 'spec.json'), 'utf8'));

const MODULOS = SPEC.modulos;
const NIVELES = SPEC.niveles;
const NEGRITA = SPEC.negrita;
const PRESUPUESTO = SPEC.presupuesto;

// Regex de criterios cuantitativos (mm/°/%/plazos/dosis). Debe coincidir con validar.py.
const QUANT_RE = /\d+(?:[.,]\d+)?\s?(?:mm|cm|°|%|grados?|semanas?|sem\b|meses|mes\b|años?|día?s?|dias?|mg|Gy|ml|kg|min|N·?m?|puntos?)/gi;

// Rutas del repo
const PATHS = {
  root: ROOT,
  contenido: path.join(ROOT, 'contenido'),
  temario: path.join(ROOT, 'temario'),
  progreso: path.join(ROOT, 'temario', 'progreso.json'),
  temarioYaml: path.join(ROOT, 'temario', 'temario.yaml'),
  salida: path.join(ROOT, 'salida'),
  plantillas: path.join(ROOT, 'plantillas'),
};

/** Devuelve el módulo (GEN/MSA/…) a partir de un ID de tema como "MSA-11". */
function moduloDe(id) {
  const m = String(id).split('-')[0].toUpperCase();
  if (!MODULOS[m]) throw new Error(`Módulo desconocido en el ID "${id}" (esperaba uno de: ${Object.keys(MODULOS).join(', ')})`);
  return m;
}

/** Color hex (sin #) del módulo de un ID. */
function colorDe(id) {
  return MODULOS[moduloDe(id)].color;
}

/**
 * Localiza la carpeta de contenido de un tema por su ID.
 * Estructura: contenido/<MOD>/<ID>-<slug>/
 * Devuelve la ruta absoluta o null si no existe.
 */
function carpetaTema(id) {
  const mod = moduloDe(id);
  const base = path.join(PATHS.contenido, mod);
  if (!fs.existsSync(base)) return null;
  const hit = fs.readdirSync(base).find((d) => d === id || d.startsWith(id + '-'));
  return hit ? path.join(base, hit) : null;
}

/** Lista ordenada de archivos NN-*.md de un tema (00..13). */
function seccionesDe(dir) {
  return fs
    .readdirSync(dir)
    .filter((f) => /^\d{2}-.*\.md$/.test(f))
    .sort();
}

module.exports = {
  SPEC, MODULOS, NIVELES, NEGRITA, PRESUPUESTO, QUANT_RE, PATHS,
  moduloDe, colorDe, carpetaTema, seccionesDe,
};
