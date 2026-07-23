'use strict';
/**
 * build.js — compila un tema desde su Markdown único a las salidas.
 *
 * Uso:  node engine/build.js <ID> [--docx] [--html] [--pdf] [--anki] [--all]
 *       (sin flags = sólo .docx, el formato por defecto)
 *
 * Una fuente, varias salidas. El .docx es obligatorio; el PDF depende de
 * LibreOffice (soffice) y degrada con aviso si no está disponible.
 */
const fs = require('fs');
const path = require('path');
const cp = require('child_process');
const yaml = require('js-yaml');

const { parseTema, metricas } = require('./md');
const renderDocx = require('./render-docx');
const renderHtml = require('./render-html');
const estado = require('./estado');
const { PATHS, carpetaTema, colorDe, moduloDe } = require('./config');

function slugTitulo(id, dir) {
  // 1) meta.yaml, 2) temario.yaml, 3) primer # del 00, 4) el ID
  const metaPath = path.join(dir, 'meta.yaml');
  if (fs.existsSync(metaPath)) {
    const meta = yaml.load(fs.readFileSync(metaPath, 'utf8')) || {};
    if (meta.titulo) return meta.titulo;
  }
  try {
    const tem = yaml.load(fs.readFileSync(PATHS.temarioYaml, 'utf8'));
    const t = (tem.temas || []).find((x) => x.id === id);
    if (t && t.t) return t.t;
  } catch (e) { /* sin temario */ }
  return id;
}

function leerAnki(dir) {
  const p = path.join(dir, 'anki.tsv');
  if (!fs.existsSync(p)) return [];
  const out = [];
  for (const linea of fs.readFileSync(p, 'utf8').split(/\r?\n/)) {
    if (!linea.trim() || linea.startsWith('#')) continue;
    const cols = linea.split('\t');
    out.push({ front: cols[0] || '', back: cols[1] || '', tags: cols[2] || '' });
  }
  return out;
}

function buscarSoffice() {
  const cands = [
    process.env.SOFFICE_PATH,
    'C:/Program Files/LibreOffice/program/soffice.exe',
    'C:/Program Files (x86)/LibreOffice/program/soffice.exe',
    '/usr/bin/soffice', '/usr/local/bin/soffice', '/opt/libreoffice/program/soffice',
  ].filter(Boolean);
  for (const c of cands) { try { if (fs.existsSync(c)) return c; } catch (e) {} }
  // buscar en PATH
  try {
    const cmd = process.platform === 'win32' ? 'where soffice' : 'which soffice';
    const out = cp.execSync(cmd, { stdio: ['ignore', 'pipe', 'ignore'] }).toString().trim().split(/\r?\n/)[0];
    if (out && fs.existsSync(out)) return out;
  } catch (e) {}
  return null;
}

async function build(id, opts) {
  const dir = carpetaTema(id);
  if (!dir) throw new Error(`No existe la carpeta de contenido de ${id} (contenido/${moduloDe(id)}/${id}-*/).`);
  const mod = moduloDe(id);
  const color = colorDe(id);
  const titulo = slugTitulo(id, dir);

  const tema = parseTema(dir);
  const m = tema.metricas;
  const anki = leerAnki(dir);

  // Rutas de salida
  const outDocx = path.join(PATHS.salida, 'docx', `${id}.docx`);
  const outHtml = path.join(PATHS.salida, 'html', `${id}.html`);
  const outPdfDir = path.join(PATHS.salida, 'pdf');
  const outAnki = path.join(PATHS.salida, 'anki', `${id}.tsv`);
  const outMetrics = path.join(PATHS.salida, `${id}.metrics.json`);

  const hechos = [];

  // .docx (siempre)
  const buf = await renderDocx.render(tema.allNodes, color);
  fs.writeFileSync(outDocx, buf);
  hechos.push(`docx  → ${path.relative(PATHS.root, outDocx)} (${(buf.length / 1024).toFixed(0)} KB)`);

  // .html
  if (opts.html) {
    const html = renderHtml.render({
      id, titulo, modulo: mod, color,
      secciones: tema.secciones, anki,
    });
    fs.writeFileSync(outHtml, html, 'utf8');
    hechos.push(`html  → ${path.relative(PATHS.root, outHtml)}`);
  }

  // .tsv Anki
  if (opts.anki) {
    const src = path.join(dir, 'anki.tsv');
    if (fs.existsSync(src)) { fs.copyFileSync(src, outAnki); hechos.push(`anki  → ${path.relative(PATHS.root, outAnki)} (${anki.length} tarjetas)`); }
    else hechos.push('anki  → (sin anki.tsv en la carpeta del tema)');
  }

  // .pdf (degradado si no hay soffice)
  if (opts.pdf) {
    const soffice = buscarSoffice();
    if (!soffice) {
      hechos.push('pdf   → OMITIDO: no se encontró LibreOffice (soffice). Instalalo o exportá el .docx a mano.');
    } else {
      try {
        cp.execSync(`"${soffice}" --headless --convert-to pdf --outdir "${outPdfDir}" "${outDocx}"`, { stdio: 'ignore' });
        hechos.push(`pdf   → ${path.relative(PATHS.root, path.join(outPdfDir, id + '.pdf'))}`);
      } catch (e) {
        hechos.push('pdf   → ERROR al convertir con soffice: ' + e.message.split('\n')[0]);
      }
    }
  }

  // metrics.json (transparencia; validar.py no depende de él)
  const densidad = m.negritaDen ? m.negritaNum / m.negritaDen : 0;
  const metricsOut = {
    id, titulo, modulo: mod, generado: estado.hoy(),
    parrafos: m.parrafos, caracteres: m.caracteres, tablas: m.tablas, pasos: m.pasos,
    callouts: m.callouts, mcq: m.mcq, cortas: m.cortas, cuantitativos: m.cuantitativos,
    referencias: m.referencias, anki: anki.length, densidad_negrita: Number(densidad.toFixed(3)),
    porSeccion: tema.secciones.map((s) => ({ id: s.id, parrafos: s.metricas.parrafos })),
  };
  fs.writeFileSync(outMetrics, JSON.stringify(metricsOut, null, 2) + '\n', 'utf8');

  // progreso.json — sólo campos numéricos (sin tocar el estado validado)
  try {
    estado.actualizarTema(id, {
      titulo, modulo: mod,
      parrafos: m.parrafos, tablas: m.tablas, caracteres: m.caracteres, anki: anki.length,
    });
  } catch (e) { /* no bloquear el build por progreso */ }

  return { hechos, metrics: metricsOut };
}

if (require.main === module) {
  const args = process.argv.slice(2);
  const id = args.find((a) => !a.startsWith('--'));
  if (!id) { console.error('uso: node engine/build.js <ID> [--html] [--pdf] [--anki] [--all]'); process.exit(1); }
  const all = args.includes('--all');
  const opts = {
    docx: true,
    html: all || args.includes('--html'),
    pdf: all || args.includes('--pdf'),
    anki: all || args.includes('--anki'),
  };
  build(id, opts).then((r) => {
    console.log(`\n🏗️  Build ${id}`);
    for (const h of r.hechos) console.log('   ' + h);
    console.log(`\n   ${r.metrics.parrafos} párrafos · ${r.metrics.caracteres} caracteres · ${r.metrics.tablas} tablas · ${r.metrics.pasos} pasos · densidad negrita ${(r.metrics.densidad_negrita * 100).toFixed(0)}%\n`);
  }).catch((e) => { console.error('ERROR:', e.message); process.exit(1); });
}

module.exports = { build };
