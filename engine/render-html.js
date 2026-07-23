'use strict';
/**
 * render-html.js — AST → HTML interactivo autocontenido.
 *
 * Construye un modelo JSON del tema y lo inyecta en la shell
 * plantillas/interactivo.html (una app vanilla que renderiza el modelo,
 * persiste estado en localStorage y funciona offline con file://).
 *
 * Para versiones "premium" hechas a mano ver plantillas/prompt-html.md; este
 * renderer es la línea base determinística que produce `build.js --html`.
 */
const fs = require('fs');
const path = require('path');
const { QUANT_RE } = require('./config');

const SHELL = path.join(__dirname, '..', 'plantillas', 'interactivo.html');

function extraerNumeros(texto) {
  const out = [];
  const re = new RegExp(QUANT_RE.source, 'gi');
  let m;
  while ((m = re.exec(texto)) !== null) {
    const ini = Math.max(0, m.index - 60);
    const fin = Math.min(texto.length, m.index + m[0].length + 60);
    out.push({ valor: m[0].trim(), contexto: texto.slice(ini, fin).replace(/\s+/g, ' ').trim() });
  }
  return out;
}

/** Convierte un array de nodos-sección (de md.parseTema) al modelo del modelo HTML. */
function construirModelo({ id, titulo, modulo, color, secciones, anki }) {
  const modelo = {
    id, titulo, modulo, color,
    secciones: [], mcq: [], cortas: [], pasos: [],
    perlas: [], pitfalls: [], numeros: [], anki: anki || [],
  };

  const seen = new Set();
  secciones.forEach((sec, idx) => {
    const nodes = sec.nodes;
    let secTitulo = null;
    const bloques = [];
    for (const n of nodes) {
      if (n.type === 'h1' && secTitulo === null) { secTitulo = n.text; continue; }
      bloques.push(n);

      // Índices transversales
      const txt = textoNodo(n);
      for (const num of extraerNumeros(txt)) {
        const k = num.valor + '|' + num.contexto;
        if (!seen.has(k)) { seen.add(k); modelo.numeros.push(num); }
      }
      if (n.type === 'callout' && (n.kind === 'clave' || n.kind === 'trick')) modelo.perlas.push(...n.lines);
      if (n.type === 'callout' && n.kind === 'warn') modelo.pitfalls.push(...n.lines);
      if (n.type === 'mcq') modelo.mcq.push({ q: n.question, opciones: n.options, r: n.answer });
      if (n.type === 'corta') modelo.cortas.push({ prompt: n.prompt, answer: n.answer });
      if (n.type === 'pasos') modelo.pasos.push({ title: n.title, steps: n.steps });
    }
    modelo.secciones.push({
      sid: `sec-${sec.id}`,
      idx,
      titulo: secTitulo || `Sección ${sec.id}`,
      bloques,
    });
  });

  return modelo;
}

function textoNodo(n) {
  switch (n.type) {
    case 'h1': case 'h2': case 'h3': case 'p': case 'li': case 'quote': return n.text || '';
    case 'callout': return (n.lines || []).join(' ');
    case 'pasos': return [n.title, ...(n.steps || [])].join(' ');
    case 'mcq': return [n.question, ...(n.options || []).map((o) => o.text), n.answer].join(' ');
    case 'corta': return [n.prompt, n.answer].join(' ');
    case 'tabla': return '';
    default: return '';
  }
}

function esc(s) {
  return String(s).replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
}

/** @returns {string} HTML completo. */
function render({ id, titulo, modulo, color, secciones, anki }) {
  const modelo = construirModelo({ id, titulo, modulo, color, secciones, anki });
  let shell;
  try {
    shell = fs.readFileSync(SHELL, 'utf8');
  } catch (e) {
    throw new Error(`No se encontró la shell del HTML interactivo en ${SHELL}. Créala (plantillas/interactivo.html).`);
  }
  const datos = JSON.stringify(modelo).replace(/</g, '\\u003c');
  return shell
    .replace(/\{\{TITULO\}\}/g, esc(titulo))
    .replace(/\{\{ID\}\}/g, esc(id))
    .replace(/\{\{MODULO\}\}/g, esc(modulo))
    .replace(/\{\{COLOR\}\}/g, esc('#' + color))
    .replace('/*__UPOME_DATA__*/null', datos);
}

module.exports = { render, construirModelo };
