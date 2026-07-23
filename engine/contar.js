'use strict';
/**
 * contar.js — presupuesto de párrafos por sección, SIN compilar.
 *
 * Uso:  node engine/contar.js <ID> [--json]
 *
 * Lee contenido/<MOD>/<ID>-<slug>/NN-*.md, cuenta párrafos por sección con las
 * reglas de md.js (:::tabla = 0) y las compara con el presupuesto de spec.json.
 * Imprime objetivo, real, delta y semáforo por sección. Es lo que corre el
 * redactor después de cada tanda de 2–3 secciones.
 */
const fs = require('fs');
const path = require('path');
const { parse, metricas } = require('./md');
const { PRESUPUESTO, carpetaTema, moduloDe } = require('./config');

function semaforo(real, obj) {
  if (obj === 0) return '⚪';
  if (real >= obj) return '🟢';
  if (real >= obj * 0.85) return '🟡';
  return '🔴';
}

function contar(id) {
  const dir = carpetaTema(id);
  if (!dir) throw new Error(`No existe la carpeta de contenido de ${id} (contenido/${moduloDe(id)}/${id}-*/).`);

  const filas = [];
  let totalReal = 0, totalObj = 0;
  const agg = { tablas: 0, pasos: 0, callouts: 0, mcq: 0, cortas: 0, cuantitativos: 0, referencias: 0, caracteres: 0, negritaNum: 0, negritaDen: 0 };

  for (const pre of PRESUPUESTO) {
    const archivo = fs.readdirSync(dir).find((f) => f.startsWith(pre.file + '-') && f.endsWith('.md'));
    let real = 0, m = null;
    if (archivo) {
      const md = fs.readFileSync(path.join(dir, archivo), 'utf8');
      m = metricas(parse(md));
      real = m.parrafos;
      for (const k of ['tablas', 'pasos', 'callouts', 'mcq', 'cortas', 'cuantitativos', 'referencias', 'caracteres', 'negritaNum', 'negritaDen']) agg[k] += m[k];
    }
    filas.push({ file: pre.file, seccion: pre.seccion, objetivo: pre.parrafos, real, delta: real - pre.parrafos, sem: semaforo(real, pre.parrafos), falta: !archivo });
    totalReal += real; totalObj += pre.parrafos;
  }

  const densidad = agg.negritaDen ? agg.negritaNum / agg.negritaDen : 0;
  return { id, dir, filas, totalReal, totalObj, agg, densidad };
}

function imprimir(r) {
  const pad = (s, n) => String(s).padEnd(n);
  const padl = (s, n) => String(s).padStart(n);
  console.log(`\n📐 Presupuesto de párrafos — ${r.id}\n`);
  console.log(pad('  ', 4) + pad('SECCIÓN', 44) + padl('OBJ', 5) + padl('REAL', 6) + padl('Δ', 6) + '  ');
  console.log('  ' + '─'.repeat(63));
  for (const f of r.filas) {
    const nombre = (f.falta ? '(falta) ' : '') + f.seccion;
    console.log('  ' + pad(f.file, 4) + pad(nombre.slice(0, 42), 44) + padl(f.objetivo, 5) + padl(f.real, 6) + padl((f.delta >= 0 ? '+' : '') + f.delta, 6) + '  ' + f.sem);
  }
  console.log('  ' + '─'.repeat(63));
  console.log('  ' + pad('', 4) + pad('TOTAL', 44) + padl(r.totalObj, 5) + padl(r.totalReal, 6) + padl((r.totalReal - r.totalObj >= 0 ? '+' : '') + (r.totalReal - r.totalObj), 6) + '  ' + semaforo(r.totalReal, r.totalObj));
  console.log('');
  console.log(`  Tablas: ${r.agg.tablas}   Pasos: ${r.agg.pasos}   Callouts: ${r.agg.callouts}   MCQ: ${r.agg.mcq}   Cortas: ${r.agg.cortas}`);
  console.log(`  Caracteres: ${r.agg.caracteres}   Cuantitativos: ${r.agg.cuantitativos}   Referencias c/año: ${r.agg.referencias}   Densidad negrita: ${(r.densidad * 100).toFixed(0)}%`);
  console.log('');
}

if (require.main === module) {
  const args = process.argv.slice(2);
  const id = args.find((a) => !a.startsWith('--'));
  if (!id) { console.error('uso: node engine/contar.js <ID> [--json]'); process.exit(1); }
  try {
    const r = contar(id);
    if (args.includes('--json')) console.log(JSON.stringify(r, null, 2));
    else imprimir(r);
  } catch (e) {
    console.error('ERROR:', e.message);
    process.exit(1);
  }
}

module.exports = { contar };
