'use strict';
/**
 * tpl.js — primitivas de documento .docx para UPOME.
 *
 * Encapsula el formato invariante (A4, Calibri, borde de módulo, encabezado/pie,
 * tablas con primera fila/columna en mayúscula-negrita-centrado + zebra, y los
 * tres callouts). Nadie fuera de este archivo debería tocar la API de `docx`.
 *
 * BUGS HISTÓRICOS YA RESUELTOS (no reintroducir):
 *  1. Borde de página: docx 9.6.1+ exige `page.borders.pageBorders` con
 *     `display` (PageBorderDisplay) y `offsetFrom` (PageBorderOffsetFrom).
 *     Sin ambos, el borde NO se dibuja y no hay error: falla en silencio.
 *  2. Orden de elementos de borde de párrafo en OOXML: se evita usando la
 *     opción de alto nivel `border:{top,bottom,left,right}` de Paragraph, que
 *     serializa los elementos en el orden que exige el esquema. Nunca emitir
 *     el XML de borde a mano.
 */
const docx = require('docx');
const {
  Paragraph, TextRun, Table, TableRow, TableCell,
  WidthType, BorderStyle, AlignmentType, ShadingType, VerticalAlign,
  PageBorderDisplay, PageBorderOffsetFrom, PageOrientation,
  Header, Footer, convertMillimetersToTwip, TableLayoutType, LineRuleType,
} = docx;

// ── Constantes de formato (medidas en unidades docx) ───────────────────────
const FONT = 'Calibri';
const SZ_BODY = 22;   // 11 pt (half-points)
const SZ_SUB = 24;    // 12 pt
const SZ_TITLE = 28;  // 14 pt
const SZ_H3 = 22;     // 11 pt (negrita cursiva)
const LINE = 276;     // interlineado 1,15  (240 × 1,15)
const AFTER = 100;    // espacio después de párrafo (twips)

const GRIS_ZEBRA = 'F2F2F2';
const BLANCO = 'FFFFFF';

/** Aclara un color hex de módulo mezclándolo con blanco (para fondos tenues). */
function tinte(hex, factor = 0.85) {
  const n = parseInt(hex, 16);
  const r = (n >> 16) & 0xff, g = (n >> 8) & 0xff, b = n & 0xff;
  const mez = (c) => Math.round(c + (255 - c) * factor);
  return [mez(r), mez(g), mez(b)]
    .map((c) => c.toString(16).padStart(2, '0'))
    .join('')
    .toUpperCase();
}

// ── Parseo inline de **negrita** → runs de docx ────────────────────────────
function runs(text, opts = {}) {
  const base = { font: FONT, size: opts.size || SZ_BODY, color: opts.color, italics: !!opts.italics };
  const out = [];
  const partes = String(text).split(/(\*\*[^*]+\*\*)/g);
  for (const p of partes) {
    if (p === '') continue;
    const m = /^\*\*(.+)\*\*$/.exec(p);
    if (m) out.push(new TextRun({ ...base, text: m[1], bold: true }));
    else out.push(new TextRun({ ...base, text: p, bold: !!opts.bold }));
  }
  if (out.length === 0) out.push(new TextRun({ ...base, text: '' }));
  return out;
}

// ── Párrafos ───────────────────────────────────────────────────────────────
function titulo(text, colorHex) {
  return new Paragraph({
    alignment: AlignmentType.LEFT,
    spacing: { before: 240, after: 120, line: LINE, lineRule: LineRuleType.AUTO },
    keepNext: true,
    border: { bottom: { style: BorderStyle.SINGLE, size: 8, color: colorHex, space: 4 } },
    children: [new TextRun({ text: text.toUpperCase(), bold: true, size: SZ_TITLE, font: FONT, color: colorHex })],
  });
}
function subtitulo(text, colorHex) {
  return new Paragraph({
    alignment: AlignmentType.LEFT,
    spacing: { before: 180, after: 80, line: LINE, lineRule: LineRuleType.AUTO },
    keepNext: true,
    children: [new TextRun({ text, bold: true, size: SZ_SUB, font: FONT, color: colorHex })],
  });
}
function subsub(text) {
  return new Paragraph({
    alignment: AlignmentType.LEFT,
    spacing: { before: 120, after: 60, line: LINE, lineRule: LineRuleType.AUTO },
    keepNext: true,
    children: [new TextRun({ text, bold: true, italics: true, size: SZ_H3, font: FONT })],
  });
}
function parrafo(text) {
  return new Paragraph({
    alignment: AlignmentType.JUSTIFIED,
    spacing: { after: AFTER, line: LINE, lineRule: LineRuleType.AUTO },
    children: runs(text),
  });
}
function vineta(text, ordered = false) {
  return new Paragraph({
    alignment: AlignmentType.JUSTIFIED,
    spacing: { after: 40, line: LINE, lineRule: LineRuleType.AUTO },
    bullet: ordered ? undefined : { level: 0 },
    indent: ordered ? { left: 360, hanging: 260 } : undefined,
    children: ordered ? [new TextRun({ text: '• ', font: FONT, size: SZ_BODY }), ...runs(text)] : runs(text),
  });
}
function paso(n, text) {
  return new Paragraph({
    alignment: AlignmentType.JUSTIFIED,
    spacing: { after: 40, line: LINE, lineRule: LineRuleType.AUTO },
    indent: { left: 360, hanging: 300 },
    children: [new TextRun({ text: `${n}.\t`, bold: true, font: FONT, size: SZ_BODY }), ...runs(text)],
  });
}
function cita(text) {
  return new Paragraph({
    alignment: AlignmentType.LEFT,
    spacing: { after: 40, line: LINE, lineRule: LineRuleType.AUTO },
    indent: { left: 360 },
    border: { left: { style: BorderStyle.SINGLE, size: 12, color: 'BFBFBF', space: 8 } },
    children: runs(text, { italics: true, size: SZ_BODY }),
  });
}

// ── Callouts (trick / warn / clave) ─────────────────────────────────────────
const CALLOUT_ESTILO = {
  trick: { etiqueta: 'TRUCO', icono: '🔑', barra: (m) => m, fondo: (m) => tinte(m, 0.88), completo: false },
  warn:  { etiqueta: 'OJO',   icono: '⚠', barra: () => 'C00000', fondo: () => 'FBE4E4', completo: false },
  clave: { etiqueta: 'CLAVE', icono: '★', barra: (m) => m, fondo: (m) => tinte(m, 0.82), completo: true },
};

/** Devuelve un array de párrafos (uno por línea) que forman el callout. */
function callout(kind, lines, colorHex) {
  const est = CALLOUT_ESTILO[kind] || CALLOUT_ESTILO.clave;
  const barra = est.barra(colorHex);
  const fondo = est.fondo(colorHex);
  const bordeLat = { style: BorderStyle.SINGLE, size: 24, color: barra, space: 6 };
  const bordeFino = { style: BorderStyle.SINGLE, size: 6, color: barra, space: 6 };
  const shading = { type: ShadingType.CLEAR, fill: fondo, color: 'auto' };

  return lines.map((linea, idx) => {
    const border = est.completo
      ? { top: idx === 0 ? bordeFino : undefined, bottom: idx === lines.length - 1 ? bordeFino : undefined, left: bordeLat, right: bordeFino }
      : { left: bordeLat };
    const children = [];
    if (idx === 0) {
      children.push(new TextRun({ text: `${est.icono} ${est.etiqueta} — `, bold: true, font: FONT, size: SZ_BODY, color: barra }));
    }
    children.push(...runs(linea));
    return new Paragraph({
      alignment: AlignmentType.JUSTIFIED,
      spacing: { before: idx === 0 ? 80 : 0, after: idx === lines.length - 1 ? 100 : 0, line: LINE, lineRule: LineRuleType.AUTO },
      indent: { left: 120 },
      shading,
      border,
      keepNext: idx < lines.length - 1,
      children,
    });
  });
}

// ── Bloque de pasos quirúrgicos ─────────────────────────────────────────────
function bloquePasos(title, steps, colorHex) {
  const out = [];
  out.push(new Paragraph({
    alignment: AlignmentType.LEFT,
    spacing: { before: 120, after: 60, line: LINE, lineRule: LineRuleType.AUTO },
    keepNext: true,
    shading: { type: ShadingType.CLEAR, fill: tinte(colorHex, 0.9), color: 'auto' },
    children: [new TextRun({ text: `▸ ${title || 'Técnica paso a paso'}`, bold: true, font: FONT, size: SZ_SUB, color: colorHex })],
  }));
  steps.forEach((s, i) => out.push(paso(i + 1, s)));
  return out;
}

// ── Tablas ───────────────────────────────────────────────────────────────
function celda(text, { header = false, first = false, fill, colorHex } = {}) {
  const upper = header || first;
  const bold = header || first;
  const color = header ? BLANCO : undefined;
  return new TableCell({
    verticalAlign: VerticalAlign.CENTER,
    shading: fill ? { type: ShadingType.CLEAR, fill, color: 'auto' } : undefined,
    margins: { top: 40, bottom: 40, left: 80, right: 80 },
    children: [new Paragraph({
      alignment: AlignmentType.CENTER,
      spacing: { after: 0, line: LINE, lineRule: LineRuleType.AUTO },
      children: runs(upper ? String(text).toUpperCase() : text, { bold, color }),
    })],
  });
}

function tabla(title, headers, rows, colorHex) {
  const bordes = {
    top:    { style: BorderStyle.SINGLE, size: 4, color: colorHex },
    bottom: { style: BorderStyle.SINGLE, size: 4, color: colorHex },
    left:   { style: BorderStyle.SINGLE, size: 4, color: colorHex },
    right:  { style: BorderStyle.SINGLE, size: 4, color: colorHex },
    insideHorizontal: { style: BorderStyle.SINGLE, size: 2, color: 'BFBFBF' },
    insideVertical:   { style: BorderStyle.SINGLE, size: 2, color: 'BFBFBF' },
  };
  const filas = [];
  if (headers && headers.length) {
    filas.push(new TableRow({
      tableHeader: true,
      children: headers.map((h) => celda(h, { header: true, fill: colorHex, colorHex })),
    }));
  }
  rows.forEach((r, ri) => {
    const zebra = ri % 2 === 1 ? GRIS_ZEBRA : undefined;
    filas.push(new TableRow({
      children: r.map((c, ci) => celda(c, {
        first: ci === 0,
        fill: ci === 0 ? tinte(colorHex, 0.9) : zebra,
        colorHex,
      })),
    }));
  });

  const t = new Table({
    width: { size: 100, type: WidthType.PERCENTAGE },
    layout: TableLayoutType.AUTOFIT,
    borders: bordes,
    rows: filas,
  });

  // Rótulo de la tabla (párrafo que NO se cuenta como cuerpo — es "de tabla").
  const rotulo = title
    ? new Paragraph({
        alignment: AlignmentType.LEFT,
        spacing: { before: 120, after: 40, line: LINE, lineRule: LineRuleType.AUTO },
        keepNext: true,
        children: [new TextRun({ text: `Tabla — ${title}`, bold: true, italics: true, font: FONT, size: SZ_H3, color: colorHex })],
      })
    : null;

  const espacio = new Paragraph({ spacing: { after: AFTER }, children: [] });
  return [rotulo, t, espacio].filter(Boolean);
}

// ── MCQ y preguntas cortas ─────────────────────────────────────────────────
function mcq(node, colorHex, numero) {
  const out = [];
  out.push(new Paragraph({
    alignment: AlignmentType.JUSTIFIED,
    spacing: { before: 100, after: 40, line: LINE, lineRule: LineRuleType.AUTO },
    keepNext: true,
    children: [new TextRun({ text: `P${numero != null ? ' ' + numero : ''}. `, bold: true, font: FONT, size: SZ_BODY, color: colorHex }), ...runs(node.question)],
  }));
  node.options.forEach((o) => {
    out.push(new Paragraph({
      alignment: AlignmentType.LEFT,
      spacing: { after: 20, line: LINE, lineRule: LineRuleType.AUTO },
      indent: { left: 360, hanging: 260 },
      children: [
        new TextRun({ text: `${o.label}) `, bold: o.correct, font: FONT, size: SZ_BODY }),
        ...runs(o.text, { bold: o.correct }),
        ...(o.correct ? [new TextRun({ text: '  ✓', bold: true, color: '2E7D32', font: FONT, size: SZ_BODY })] : []),
      ],
    }));
  });
  if (node.answer) {
    out.push(new Paragraph({
      alignment: AlignmentType.JUSTIFIED,
      spacing: { after: 100, line: LINE, lineRule: LineRuleType.AUTO },
      indent: { left: 360 },
      children: [new TextRun({ text: 'R. ', bold: true, font: FONT, size: SZ_BODY, color: colorHex }), ...runs(node.answer, { italics: true })],
    }));
  }
  return out;
}

function corta(node, colorHex, numero) {
  const out = [];
  out.push(new Paragraph({
    alignment: AlignmentType.JUSTIFIED,
    spacing: { before: 80, after: 20, line: LINE, lineRule: LineRuleType.AUTO },
    keepNext: !!node.answer,
    children: [new TextRun({ text: `${numero != null ? numero + '. ' : ''}`, bold: true, font: FONT, size: SZ_BODY, color: colorHex }), ...runs(node.prompt)],
  }));
  if (node.answer) {
    out.push(new Paragraph({
      alignment: AlignmentType.JUSTIFIED,
      spacing: { after: 80, line: LINE, lineRule: LineRuleType.AUTO },
      indent: { left: 360 },
      children: [new TextRun({ text: 'R. ', bold: true, font: FONT, size: SZ_BODY, color: colorHex }), ...runs(node.answer, { italics: true })],
    }));
  }
  return out;
}

// ── Encabezado, pie y propiedades de sección ───────────────────────────────
function encabezado() {
  return new Header({
    children: [new Paragraph({
      alignment: AlignmentType.CENTER,
      spacing: { after: 0 },
      children: [new TextRun({ text: 'TRAUMATOLOGÍA Y ORTOPEDIA', bold: true, font: FONT, size: SZ_BODY })],
    })],
  });
}
function pie() {
  return new Footer({
    children: [new Paragraph({
      alignment: AlignmentType.CENTER,
      spacing: { before: 0 },
      children: [new TextRun({ text: 'VZ – 2026', bold: true, font: FONT, size: SZ_BODY })],
    })],
  });
}

/** Propiedades de sección: A4, márgenes y borde de página del color del módulo. */
function propiedadesSeccion(colorHex) {
  const bordeLado = { style: BorderStyle.SINGLE, size: 12 /* 1,5 pt = 12/8 */, color: colorHex, space: 24 };
  return {
    page: {
      size: {
        orientation: PageOrientation.PORTRAIT,
        width: convertMillimetersToTwip(210),
        height: convertMillimetersToTwip(297),
      },
      margin: {
        top: convertMillimetersToTwip(22),
        bottom: convertMillimetersToTwip(22),
        left: convertMillimetersToTwip(22),
        right: convertMillimetersToTwip(22),
        header: convertMillimetersToTwip(12),
        footer: convertMillimetersToTwip(12),
      },
      borders: {
        // ── BUG HISTÓRICO 1: sin pageBorders{display,offsetFrom} el borde no se dibuja.
        pageBorders: { display: PageBorderDisplay.ALL_PAGES, offsetFrom: PageBorderOffsetFrom.PAGE },
        pageBorderTop: bordeLado,
        pageBorderBottom: bordeLado,
        pageBorderLeft: bordeLado,
        pageBorderRight: bordeLado,
      },
    },
  };
}

/** Estilos por defecto del documento (fuente, tamaño, interlineado, justificado). */
function estilosDefecto() {
  return {
    default: {
      document: {
        run: { font: FONT, size: SZ_BODY },
        paragraph: { spacing: { line: LINE, lineRule: LineRuleType.AUTO, after: AFTER } },
      },
    },
  };
}

module.exports = {
  FONT, SZ_BODY, SZ_SUB, SZ_TITLE, tinte,
  runs, titulo, subtitulo, subsub, parrafo, vineta, paso, cita,
  callout, bloquePasos, tabla, mcq, corta,
  encabezado, pie, propiedadesSeccion, estilosDefecto,
};
