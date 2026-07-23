'use strict';
/**
 * estado.js — lee y escribe temario/progreso.json, la ÚNICA fuente de verdad
 * del estado del proyecto.
 *
 * Regla dura: ningún tema puede quedar en 'ultra' o 'ultra_plus' sin que el
 * campo `validado` sea true (lo pone build/validar tras validar.py === 0).
 * La escritura manual de esos estados sin validación se rechaza.
 */
const fs = require('fs');
const { PATHS } = require('./config');

const ESTADOS = ['pendiente', 'esqueleto', 'borrador', 'ultra', 'ultra_plus', 'obsoleto'];
const ESTADOS_VALIDADOS = ['ultra', 'ultra_plus'];

function hoy() {
  return new Date().toISOString().slice(0, 10);
}

function leer() {
  if (!fs.existsSync(PATHS.progreso)) {
    return { version: 1, actualizado: hoy(), temas: {} };
  }
  return JSON.parse(fs.readFileSync(PATHS.progreso, 'utf8'));
}

function guardar(prog) {
  prog.actualizado = hoy();
  fs.writeFileSync(PATHS.progreso, JSON.stringify(prog, null, 2) + '\n', 'utf8');
  return prog;
}

/**
 * Actualiza (o crea) la entrada de un tema.
 * @param {string} id
 * @param {object} patch  campos a mezclar (estado, parrafos, tablas, ...)
 * @throws si se intenta fijar un estado validado sin patch.validado === true
 */
function actualizarTema(id, patch = {}) {
  if (patch.estado && !ESTADOS.includes(patch.estado)) {
    throw new Error(`Estado inválido "${patch.estado}". Válidos: ${ESTADOS.join(', ')}`);
  }
  if (patch.estado && ESTADOS_VALIDADOS.includes(patch.estado) && patch.validado !== true) {
    throw new Error(
      `No se puede marcar ${id} como "${patch.estado}" sin validado:true. ` +
      `Corré primero: python engine/validar.py ${id}`
    );
  }
  const prog = leer();
  const prev = prog.temas[id] || {};
  prog.temas[id] = { ...prev, ...patch, fecha: patch.fecha || hoy() };
  return guardar(prog);
}

/** Devuelve la entrada de un tema o un objeto pendiente por defecto. */
function tema(id) {
  const prog = leer();
  return prog.temas[id] || { estado: 'pendiente' };
}

const ORDEN_ESTADO = ['pendiente', 'esqueleto', 'borrador', 'ultra', 'ultra_plus', 'obsoleto'];

/** Dashboard textual del avance global, por módulo, con deudas y próximo tema. */
function dashboard() {
  const prog = leer();
  const temas = prog.temas || {};
  const ids = Object.keys(temas);
  const porMod = {};
  const conteo = { pendiente: 0, esqueleto: 0, borrador: 0, ultra: 0, ultra_plus: 0, obsoleto: 0 };
  for (const id of ids) {
    const t = temas[id];
    const mod = t.modulo || id.split('-')[0];
    porMod[mod] = porMod[mod] || { total: 0, hechos: 0 };
    porMod[mod].total++;
    conteo[t.estado] = (conteo[t.estado] || 0) + 1;
    if (t.estado === 'ultra' || t.estado === 'ultra_plus') porMod[mod].hechos++;
  }
  const hechos = conteo.ultra + conteo.ultra_plus;
  const pct = ids.length ? Math.round((100 * hechos) / ids.length) : 0;

  const out = [];
  out.push(`\n📊 ESTADO UPOME   ·   actualizado ${prog.actualizado || '—'}`);
  out.push(`   Avance global: ${hechos}/${ids.length} temas terminados (${pct}%)`);
  out.push('');
  out.push('   MÓDULO   TERMINADOS / TOTAL');
  for (const m of Object.keys(porMod).filter((k) => k !== 'DEMO')) {
    const p = porMod[m];
    const barra = '█'.repeat(Math.round((p.hechos / Math.max(p.total, 1)) * 12)).padEnd(12, '·');
    out.push(`   ${m.padEnd(6)}  ${barra}  ${p.hechos}/${p.total}`);
  }
  out.push('');
  out.push('   POR ESTADO:  ' + ORDEN_ESTADO.map((e) => `${e}=${conteo[e] || 0}`).join('  '));

  // 5 con más deuda
  const conDeuda = ids
    .map((id) => ({ id, n: (temas[id].pendiente || []).length, d: temas[id].pendiente || [] }))
    .filter((x) => x.n > 0)
    .sort((a, b) => b.n - a.n)
    .slice(0, 5);
  if (conDeuda.length) {
    out.push('');
    out.push('   ⚠ 5 con más deuda (campo pendiente):');
    for (const x of conDeuda) out.push(`      ${x.id}: ${x.d.join('; ')}`);
  }

  // próximo recomendado: pendiente con mayor prioridad (pri menor = más alta)
  const pendientes = ids
    .filter((id) => temas[id].estado === 'pendiente')
    .map((id) => ({ id, pri: temas[id].prioridad || 2, titulo: temas[id].titulo }))
    .sort((a, b) => a.pri - b.pri || a.id.localeCompare(b.id));
  if (pendientes.length) {
    out.push('');
    out.push(`   ▶ Próximo recomendado: ${pendientes[0].id} — ${pendientes[0].titulo} (prioridad ${pendientes[0].pri})`);
    out.push(`     Producilo con:  /tema ${pendientes[0].id}   ·   o  /siguiente`);
  } else {
    out.push('\n   ▶ No quedan temas en «pendiente».');
  }
  out.push('');
  return out.join('\n');
}

// ── CLI ─────────────────────────────────────────────────────────────────────
if (require.main === module) {
  const [cmd, id, ...rest] = process.argv.slice(2);
  try {
    if (cmd === 'dashboard') {
      console.log(dashboard());
    } else if (cmd === 'get') {
      console.log(JSON.stringify(tema(id), null, 2));
    } else if (cmd === 'set') {
      // uso: node estado.js set MSA-11 estado=borrador parrafos=195
      const patch = {};
      for (const kv of rest) {
        const [k, v] = kv.split('=');
        patch[k] = /^\d+$/.test(v) ? Number(v) : v === 'true' ? true : v === 'false' ? false : v;
      }
      actualizarTema(id, patch);
      console.log(`OK ${id} →`, JSON.stringify(tema(id)));
    } else {
      console.log('uso: node estado.js dashboard | get <ID> | set <ID> clave=valor ...');
      process.exit(1);
    }
  } catch (e) {
    console.error('ERROR:', e.message);
    process.exit(1);
  }
}

module.exports = { ESTADOS, ESTADOS_VALIDADOS, leer, guardar, actualizarTema, tema, hoy, dashboard };
