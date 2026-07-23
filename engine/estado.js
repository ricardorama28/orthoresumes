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
const yaml = require('js-yaml');
const { PATHS } = require('./config');

const ESTADOS = ['pendiente', 'pendiente_renivelar', 'esqueleto', 'borrador', 'ultra', 'ultra_plus', 'obsoleto'];
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

// ── Fases (orden de generación) ─────────────────────────────────────────────
/** Lee temario/fases.yaml (definición de las 9 fases + puntero fase_activa). */
function leerFases() {
  if (!fs.existsSync(PATHS.fasesYaml)) return null;
  return yaml.load(fs.readFileSync(PATHS.fasesYaml, 'utf8'));
}

/** Cambia el puntero `fase_activa` en fases.yaml (edición mínima, sin re-dump). */
function setFaseActiva(n) {
  const f = leerFases();
  if (!f) throw new Error('No existe temario/fases.yaml');
  const num = Number(n);
  if (!f.fases || f.fases[num] === undefined) {
    throw new Error(`Fase ${n} inexistente. Disponibles: ${Object.keys(f.fases || {}).join(', ')}`);
  }
  const txt = fs.readFileSync(PATHS.fasesYaml, 'utf8');
  fs.writeFileSync(PATHS.fasesYaml, txt.replace(/^fase_activa:\s*\d+\s*$/m, `fase_activa: ${num}`), 'utf8');
  return num;
}

/** Mapa id → fase. Lo toma del temario (autosuficiente); cae a fases.yaml. */
function mapaFases() {
  const m = {};
  try {
    const tem = yaml.load(fs.readFileSync(PATHS.temarioYaml, 'utf8'));
    for (const t of tem.temas || []) if (t.fase !== undefined && t.fase !== null) m[t.id] = t.fase;
  } catch (e) { /* sin temario */ }
  if (Object.keys(m).length === 0) {
    const f = leerFases();
    if (f && f.asignacion) Object.assign(m, f.asignacion);
  }
  return m;
}

/** CERRADO = alcanzó ultra/ultra_plus **y** está validado contra el spec. */
function cerrado(t) {
  return ESTADOS_VALIDADOS.includes(t.estado) && t.validado === true;
}

/** Distancia al nivel objetivo: más alto = más lejos → se ataca primero. */
const DISTANCIA = { pendiente: 5, obsoleto: 5, pendiente_renivelar: 4, esqueleto: 3, borrador: 2, ultra: 1, ultra_plus: 0 };
const distancia = (t) => (DISTANCIA[t.estado] !== undefined ? DISTANCIA[t.estado] : 3);
const prioridad = (t) => t.pri || t.prioridad || 2;

/**
 * Temas SIN CERRAR de una fase, ordenados por prioridad y, a igual prioridad,
 * por distancia al nivel objetivo (primero los que más faltan).
 */
function candidatosDeFase(fase) {
  const temas = leer().temas || {};
  const mapa = mapaFases();
  return Object.keys(temas)
    .filter((id) => mapa[id] === fase && !cerrado(temas[id]))
    .map((id) => ({ id, titulo: temas[id].titulo, estado: temas[id].estado, pri: prioridad(temas[id]), dist: distancia(temas[id]) }))
    .sort((a, b) => a.pri - b.pri || b.dist - a.dist || a.id.localeCompare(b.id));
}

/** Resumen de una fase: total, cerrados, sin cerrar y candidatos ordenados. */
function resumenFase(fase) {
  const temas = leer().temas || {};
  const mapa = mapaFases();
  const ids = Object.keys(temas).filter((id) => mapa[id] === fase);
  const cerrados = ids.filter((id) => cerrado(temas[id])).length;
  const f = leerFases();
  const def = (f && f.fases && f.fases[fase]) || {};
  return {
    fase, nombre: def.nombre || '—', criterio: def.criterio || '',
    total: ids.length, cerrados, sinCerrar: ids.length - cerrados,
    candidatos: candidatosDeFase(fase),
  };
}

/** El próximo tema a producir dentro de la fase activa. */
function siguienteTema() {
  const f = leerFases();
  if (!f) return { error: 'No existe temario/fases.yaml' };
  const fase = f.fase_activa;
  const r = resumenFase(fase);
  if (r.candidatos.length === 0) {
    const siguiente = Object.keys(f.fases || {}).map(Number).sort((a, b) => a - b).find((n) => n > fase);
    return { fase, completa: true, resumen: r, proximaFase: siguiente !== undefined ? siguiente : null };
  }
  return { fase, completa: false, resumen: r, elegido: r.candidatos[0] };
}

const ORDEN_ESTADO = ['pendiente', 'pendiente_renivelar', 'esqueleto', 'borrador', 'ultra', 'ultra_plus', 'obsoleto'];

/** Dashboard textual del avance global, por módulo, con deudas y próximo tema. */
function dashboard() {
  const prog = leer();
  const temas = prog.temas || {};
  const ids = Object.keys(temas);
  const porMod = {};
  const conteo = { pendiente: 0, pendiente_renivelar: 0, esqueleto: 0, borrador: 0, ultra: 0, ultra_plus: 0, obsoleto: 0 };
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
  const validados = ids.filter((id) => cerrado(temas[id])).length;
  out.push(`   Avance global: ${hechos}/${ids.length} en ultra/ultra_plus (${pct}%)  ·  ${validados} validados contra spec`);
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

  // ── Fase activa ──
  const f = leerFases();
  if (f) {
    const r = resumenFase(f.fase_activa);
    const pctF = r.total ? Math.round((100 * r.cerrados) / r.total) : 0;
    const barraF = '█'.repeat(Math.round((r.cerrados / Math.max(r.total, 1)) * 20)).padEnd(20, '·');
    out.push('');
    out.push(`   🎯 FASE ACTIVA ${r.fase} — ${r.nombre}`);
    out.push(`      ${barraF}  ${r.cerrados}/${r.total} cerrados (${pctF}%)  ·  ${r.sinCerrar} sin cerrar`);
    if (r.criterio) out.push(`      criterio: ${r.criterio}`);

    if (r.candidatos.length === 0) {
      const prox = Object.keys(f.fases || {}).map(Number).sort((a, b) => a - b).find((n) => n > r.fase);
      out.push('');
      out.push(`   ✔ Fase ${r.fase} COMPLETA.` + (prox !== undefined ? `  Proponé avanzar:  /fase ${prox}` : '  No hay fases posteriores.'));
    } else {
      const e = r.candidatos[0];
      out.push('');
      out.push(`   ▶ Próximo (dentro de la fase ${r.fase}): ${e.id} — ${e.titulo}`);
      out.push(`     prioridad ${e.pri} · estado ${e.estado}`);
      out.push(`     Producilo con:  /tema ${e.id}   ·   o  /siguiente`);
    }
  } else {
    out.push('\n   (sin temario/fases.yaml: /siguiente opera en modo global)');
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
    } else if (cmd === 'fase') {
      const f = leerFases();
      if (!f) throw new Error('No existe temario/fases.yaml');
      if (id === undefined) {
        const r = resumenFase(f.fase_activa);
        console.log(`\n🎯 Fase activa: ${r.fase} — ${r.nombre}`);
        console.log(`   ${r.cerrados}/${r.total} cerrados · ${r.sinCerrar} sin cerrar`);
        if (r.criterio) console.log(`   criterio: ${r.criterio}`);
        console.log('\n   FASE   CERRADOS/TOTAL   NOMBRE');
        for (const n of Object.keys(f.fases).map(Number).sort((a, b) => a - b)) {
          const rr = resumenFase(n);
          const marca = n === r.fase ? '▶' : ' ';
          console.log(`   ${marca} ${n}      ${String(rr.cerrados).padStart(3)}/${String(rr.total).padEnd(3)}        ${rr.nombre}`);
        }
        console.log('');
      } else {
        const n = setFaseActiva(id);
        const r = resumenFase(n);
        console.log(`Fase activa → ${n} — ${r.nombre}  (${r.cerrados}/${r.total} cerrados, ${r.sinCerrar} sin cerrar)`);
      }
    } else if (cmd === 'siguiente') {
      const s = siguienteTema();
      if (s.error) throw new Error(s.error);
      if (s.completa) {
        console.log(`✔ Fase ${s.fase} COMPLETA — no quedan temas sin cerrar.`);
        if (s.proximaFase !== null) console.log(`  Proponé avanzar:  node engine/estado.js fase ${s.proximaFase}`);
        else console.log('  No hay fases posteriores.');
      } else {
        const e = s.elegido;
        console.log(`${e.id}\t${e.titulo}\t(fase ${s.fase} · pri ${e.pri} · ${e.estado})`);
        console.log(`sin cerrar en la fase ${s.fase}: ${s.resumen.sinCerrar}/${s.resumen.total}`);
      }
    } else {
      console.log('uso: node estado.js dashboard | fase [N] | siguiente | get <ID> | set <ID> clave=valor ...');
      process.exit(1);
    }
  } catch (e) {
    console.error('ERROR:', e.message);
    process.exit(1);
  }
}

module.exports = {
  ESTADOS, ESTADOS_VALIDADOS, leer, guardar, actualizarTema, tema, hoy, dashboard,
  leerFases, setFaseActiva, mapaFases, cerrado, candidatosDeFase, resumenFase, siguienteTema,
};
