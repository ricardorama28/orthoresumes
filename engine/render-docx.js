'use strict';
/**
 * render-docx.js — AST de md.js → Buffer .docx, usando las primitivas de tpl.js.
 * Mantiene la paridad de conteo: 1 párrafo docx por nodo-línea contado; las
 * tablas se emiten como Table (0 párrafos de cuerpo).
 */
const docx = require('docx');
const { Document, Packer } = docx;
const tpl = require('./tpl');

function nodoAParrafos(n, colorHex, ctx) {
  switch (n.type) {
    case 'h1': return [tpl.titulo(n.text, colorHex)];
    case 'h2': return [tpl.subtitulo(n.text, colorHex)];
    case 'h3': return [tpl.subsub(n.text)];
    case 'p':  return [tpl.parrafo(n.text)];
    case 'li': return [tpl.vineta(n.text, n.ordered)];
    case 'quote': return [tpl.cita(n.text)];
    case 'callout': return tpl.callout(n.kind, n.lines, colorHex);
    case 'pasos': return tpl.bloquePasos(n.title, n.steps, colorHex);
    case 'tabla': return tpl.tabla(n.title, n.headers, n.rows, colorHex);
    case 'mcq': return tpl.mcq(n, colorHex, ++ctx.mcq);
    case 'corta': return tpl.corta(n, colorHex, ++ctx.corta);
    default: return [];
  }
}

/**
 * @param {Array} nodes  AST (allNodes de md.parseTema)
 * @param {string} colorHex  color del módulo sin '#'
 * @returns {Promise<Buffer>}
 */
async function render(nodes, colorHex) {
  const ctx = { mcq: 0, corta: 0 };
  const children = [];
  for (const n of nodes) {
    for (const p of nodoAParrafos(n, colorHex, ctx)) children.push(p);
  }

  const doc = new Document({
    creator: 'UPOME',
    title: 'Monografía UPOME',
    styles: tpl.estilosDefecto(),
    sections: [{
      properties: tpl.propiedadesSeccion(colorHex),
      headers: { default: tpl.encabezado() },
      footers: { default: tpl.pie() },
      children,
    }],
  });

  return Packer.toBuffer(doc);
}

module.exports = { render };
