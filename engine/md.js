'use strict';
/**
 * md.js — parser del dialecto Markdown de UPOME → AST de bloques.
 *
 * Cada línea de contenido = 1 párrafo del docx, salvo :::tabla (0 párrafos).
 * El AST que produce este archivo es la ÚNICA definición de qué cuenta y cómo,
 * consumida por contar.js, render-docx.js y render-html.js. validar.py replica
 * estas reglas en Python de forma independiente (es el gate, no confía en el build).
 *
 * Tipos de nodo:
 *   { type:'h1'|'h2'|'h3', text }
 *   { type:'p', text, bold:Boolean }
 *   { type:'li', text, ordered:Boolean, bold:Boolean }
 *   { type:'quote', text }
 *   { type:'callout', kind:'trick'|'warn'|'clave', lines:[String] }
 *   { type:'pasos', title, steps:[String] }
 *   { type:'tabla', title, headers:[String], rows:[[String]] }
 *   { type:'mcq', question, options:[{label,text,correct}], answer }
 *   { type:'corta', prompt, answer }
 */
const fs = require('fs');
const path = require('path');
const { QUANT_RE, seccionesDe } = require('./config');

const CALLOUT_KINDS = ['trick', 'warn', 'clave'];

/** Quita los marcadores **…** dejando el texto plano (para conteo de caracteres). */
function plano(s) {
  return String(s).replace(/\*\*(.+?)\*\*/g, '$1');
}
function tieneNegrita(s) {
  return /\*\*(.+?)\*\*/.test(s);
}

/** Parsea una cadena Markdown del dialecto UPOME a un array de nodos. */
function parse(md) {
  const lines = md.replace(/\r\n/g, '\n').split('\n');
  const nodes = [];
  let i = 0;

  const dirOpen = /^:::(\w+)(?:\s+"([^"]*)")?\s*$/;

  while (i < lines.length) {
    let line = lines[i];
    const raw = line;
    line = line.replace(/\s+$/, '');

    // Línea en blanco: separador, no es nodo.
    if (line.trim() === '') { i++; continue; }

    // Directiva de bloque :::nombre
    const m = dirOpen.exec(line);
    if (m) {
      const kind = m[1];
      const title = m[2] || '';
      const body = [];
      i++;
      while (i < lines.length && lines[i].replace(/\s+$/, '') !== ':::') {
        body.push(lines[i]);
        i++;
      }
      i++; // consumir el ::: de cierre
      nodes.push(parseDirectiva(kind, title, body));
      continue;
    }

    // Títulos
    if (/^### /.test(line)) { nodes.push({ type: 'h3', text: line.slice(4).trim() }); i++; continue; }
    if (/^## /.test(line))  { nodes.push({ type: 'h2', text: line.slice(3).trim() }); i++; continue; }
    if (/^# /.test(line))   { nodes.push({ type: 'h1', text: line.slice(2).trim() }); i++; continue; }

    // Cita / referencia
    if (/^> /.test(line)) { nodes.push({ type: 'quote', text: line.slice(2).trim() }); i++; continue; }

    // Lista con viñeta
    if (/^[-*] /.test(line)) {
      const t = line.slice(2).trim();
      nodes.push({ type: 'li', ordered: false, text: t, bold: tieneNegrita(t) });
      i++; continue;
    }
    // Lista numerada suelta (fuera de :::pasos)
    if (/^\d+\.\s+/.test(line)) {
      const t = line.replace(/^\d+\.\s+/, '').trim();
      nodes.push({ type: 'li', ordered: true, text: t, bold: tieneNegrita(t) });
      i++; continue;
    }

    // Párrafo normal
    nodes.push({ type: 'p', text: line.trim(), bold: tieneNegrita(line) });
    i++;
  }

  return nodes;
}

function parseDirectiva(kind, title, body) {
  if (CALLOUT_KINDS.includes(kind)) {
    const linesOut = body.map((l) => l.trim()).filter((l) => l !== '');
    return { type: 'callout', kind, lines: linesOut };
  }

  if (kind === 'pasos') {
    const steps = [];
    for (const l of body) {
      const s = l.trim();
      if (s === '') continue;
      const mm = /^\d+\.\s+(.*)$/.exec(s);
      steps.push(mm ? mm[1].trim() : s);
    }
    return { type: 'pasos', title, steps };
  }

  if (kind === 'tabla') {
    const rows = [];
    for (const l of body) {
      const s = l.trim();
      if (s === '' || /^\|?\s*:?-{2,}/.test(s.replace(/\|/g, '')) || /^\|[\s:|-]+\|?$/.test(s)) {
        // separador de cabecera markdown | --- | --- |
        if (/^\|?[\s:|-]+$/.test(s) && s.includes('-')) continue;
      }
      if (!s.includes('|')) continue;
      const cells = s.replace(/^\|/, '').replace(/\|$/, '').split('|').map((c) => c.trim());
      // saltar filas separadoras
      if (cells.every((c) => /^:?-{2,}:?$/.test(c) || c === '')) continue;
      rows.push(cells);
    }
    const headers = rows.length ? rows[0] : [];
    const dataRows = rows.slice(1);
    return { type: 'tabla', title, headers, rows: dataRows };
  }

  if (kind === 'mcq') {
    let question = '';
    const options = [];
    let answer = '';
    for (const l of body) {
      const s = l.trim();
      if (s === '') continue;
      if (/^P:\s*/.test(s)) { question = s.replace(/^P:\s*/, '').trim(); continue; }
      if (/^R:\s*/.test(s)) { answer = s.replace(/^R:\s*/, '').trim(); continue; }
      const mo = /^([a-hA-H])\)\s*(.*)$/.exec(s);
      if (mo) {
        let txt = mo[2].trim();
        const correct = /[✓✔]\s*$/.test(txt) || /\s\(correcta\)\s*$/i.test(txt);
        txt = txt.replace(/\s*[✓✔]\s*$/, '').replace(/\s*\(correcta\)\s*$/i, '').trim();
        options.push({ label: mo[1].toLowerCase(), text: txt, correct });
        continue;
      }
      // continuación de la explicación
      if (answer) answer += ' ' + s;
      else if (question) question += ' ' + s;
    }
    return { type: 'mcq', question, options, answer };
  }

  if (kind === 'corta') {
    const nonEmpty = body.map((l) => l.trim()).filter((l) => l !== '');
    let prompt = '', answer = '';
    for (const s of nonEmpty) {
      if (/^R:\s*/.test(s)) { answer = s.replace(/^R:\s*/, '').trim(); }
      else if (!prompt) { prompt = s; }
      else if (answer) { answer += ' ' + s; }
      else { prompt += ' ' + s; }
    }
    return { type: 'corta', prompt, answer };
  }

  // Directiva desconocida → tratarla como callout genérico "clave" para no perder texto.
  const linesOut = body.map((l) => l.trim()).filter((l) => l !== '');
  return { type: 'callout', kind: 'clave', lines: linesOut, unknown: kind };
}

/**
 * Cuenta párrafos de un nodo según el contrato de conteo.
 * :::tabla = 0. Todo lo demás cuenta 1 por línea/ítem renderizado.
 */
function parrafosDeNodo(n) {
  switch (n.type) {
    case 'h1': case 'h2': case 'h3': case 'p': case 'li': case 'quote':
      return 1;
    case 'callout':
      return n.lines.length;
    case 'pasos':
      return 1 /* rótulo */ + n.steps.length;
    case 'mcq':
      return 1 /* pregunta */ + n.options.length + (n.answer ? 1 : 0);
    case 'corta':
      return 1 /* consigna */ + (n.answer ? 1 : 0);
    case 'tabla':
      return 0;
    default:
      return 0;
  }
}

/** Texto plano concatenado de un nodo, EXCLUYENDO tablas (para conteo de caracteres). */
function textoDeNodo(n) {
  switch (n.type) {
    case 'h1': case 'h2': case 'h3': case 'quote':
      return plano(n.text);
    case 'p': case 'li':
      return plano(n.text);
    case 'callout':
      return n.lines.map(plano).join(' ');
    case 'pasos':
      return [n.title, ...n.steps].map(plano).join(' ');
    case 'mcq':
      return [n.question, ...n.options.map((o) => o.text), n.answer].map(plano).join(' ');
    case 'corta':
      return [n.prompt, n.answer].map(plano).join(' ');
    case 'tabla':
      return ''; // las tablas no cuentan caracteres (igual que no cuentan párrafos)
    default:
      return '';
  }
}

/**
 * Calcula métricas sobre un array de nodos.
 * @returns { parrafos, caracteres, tablas, pasos, callouts, mcq, cortas,
 *            cuantitativos, referencias, negritaNum, negritaDen }
 */
function metricas(nodes) {
  const m = {
    parrafos: 0, caracteres: 0, tablas: 0, pasos: 0, callouts: 0,
    mcq: 0, cortas: 0, cuantitativos: 0, referencias: 0,
    negritaNum: 0, negritaDen: 0,
  };
  let quantText = '';
  for (const n of nodes) {
    m.parrafos += parrafosDeNodo(n);
    const txt = textoDeNodo(n);
    m.caracteres += txt.length;
    quantText += ' ' + txt;

    if (n.type === 'tabla') m.tablas++;
    if (n.type === 'pasos') m.pasos += n.steps.length;
    if (n.type === 'callout') m.callouts++;
    if (n.type === 'mcq') m.mcq++;
    if (n.type === 'corta') m.cortas++;
    if (n.type === 'quote' && /\b(19|20)\d{2}\b/.test(n.text)) m.referencias++;
    if (n.type === 'p' || n.type === 'li') {
      m.negritaDen++;
      if (n.bold) m.negritaNum++;
    }
  }
  const qm = quantText.match(QUANT_RE);
  m.cuantitativos = qm ? qm.length : 0;
  return m;
}

/** Lee y parsea todas las secciones NN-*.md de una carpeta de tema. */
function parseTema(dir) {
  const archivos = seccionesDe(dir);
  const secciones = archivos.map((f) => {
    const md = fs.readFileSync(path.join(dir, f), 'utf8');
    const nodes = parse(md);
    return { file: f, id: f.slice(0, 2), nodes, metricas: metricas(nodes) };
  });
  const allNodes = secciones.flatMap((s) => s.nodes);
  return { dir, secciones, allNodes, metricas: metricas(allNodes) };
}

module.exports = {
  parse, parseTema, metricas, parrafosDeNodo, textoDeNodo, plano, tieneNegrita,
  CALLOUT_KINDS,
};
