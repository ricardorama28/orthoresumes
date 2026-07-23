---
name: ultra-docx
description: Cómo usar el motor engine/ correctamente — API de tpl.js, dialecto Markdown, reglas de conteo y los dos bugs históricos ya resueltos (borde de página y orden OOXML de callouts). Usala al tocar el renderizador o al depurar un build.
---

# Skill: ultra-docx

El motor convierte **una fuente Markdown** en `.docx` / `.pdf` / `.html` / `.tsv`. Nunca escribas contenido en formato de salida; nunca edites el renderizador para arreglar un texto (si te encontrás haciéndolo, el problema está en el `.md`).

## Flujo del motor
```
contenido/*.md → engine/md.js (AST) → render-docx.js → salida/docx/*.docx
                                     → render-html.js → salida/html/*.html
                 engine/build.js orquesta (--docx por defecto, --html --pdf --anki --all)
```
- `engine/contar.js <ID>` — presupuesto de párrafos por sección, **sin compilar**.
- `python engine/validar.py <ID>` — gate de calidad (exit ≠ 0 si no cumple).
- `engine/spec.json` — fuente única de umbrales, presupuesto y colores (la leen config.js y validar.py).

## Dialecto Markdown (definido en engine/md.js)
`# / ## / ###` títulos · `- ` viñeta · `> ` cita · y directivas de bloque:
`:::trick` · `:::warn` · `:::clave` · `:::pasos "Título"` (1. 2. 3…) · `:::tabla "Título"` (tabla markdown) · `:::mcq` (`P:` / `a) … ✓` / `R:`) · `:::corta` (consigna + `R:`).

## Reglas de conteo (contrato contar.js ↔ validar.py)
- Cada línea de contenido = 1 párrafo. **`:::tabla` = 0 párrafos** (se cuenta como tabla aparte).
- Bibliografía de *n* entradas = *n+1* párrafos (subtítulo + n citas).
- `:::pasos` = 1 (rótulo) + N pasos. `:::mcq` = 1 (pregunta) + opciones + 1 (respuesta). Callout = N líneas.
- Densidad de negrita = fracción de párrafos de prosa/lista con `**…**` (35–55 %).

## API de tpl.js (primitivas de documento)
`titulo/subtitulo/subsub`, `parrafo` (parsea `**negrita**`), `vineta`, `paso`, `cita`, `callout(kind,lines,color)`, `bloquePasos`, `tabla`, `mcq`, `corta`, `encabezado`, `pie`, `propiedadesSeccion(color)`, `estilosDefecto()`. Formato invariante: A4, Calibri 11/12/14, interlineado 1,15, justificado, borde 1,5 pt del color del módulo, encabezado «TRAUMATOLOGÍA Y ORTOPEDIA», pie «VZ – 2026», tablas con 1.ª fila/columna en mayúscula-negrita-centrado + zebra.

## ⚠ BUGS HISTÓRICOS YA RESUELTOS — no reintroducir
1. **Borde de página (docx 9.6.1+)**: exige `page.borders.pageBorders` con `display: PageBorderDisplay.ALL_PAGES` **y** `offsetFrom: PageBorderOffsetFrom.PAGE`, además de `pageBorderTop/Left/Bottom/Right`. Si falta el bloque `pageBorders`, el borde **no se dibuja y no hay error** (falla en silencio). `validar.py` lo comprueba explícitamente leyendo `w:pgBorders` del `.docx`.
2. **Orden de elementos de borde en OOXML (callouts)**: los sub-elementos de borde de párrafo tienen orden obligatorio en el esquema. Se evita **usando la opción de alto nivel `border:{top,bottom,left,right}` de `Paragraph`** (que serializa en el orden correcto). Nunca emitas el XML de borde a mano.

## Depurar un build
- ¿Conteo no coincide con lo esperado? Revisá que no haya `:::tabla` contándose como párrafo, o prosa densa subestimando (compensá con listas).
- ¿PDF omitido? Es esperado si no hay `soffice`: el build degrada con aviso, no falla.
- ¿`validar.py` marca formato? Casi siempre es el borde de página (bug 1) o el color del módulo mal pasado.
