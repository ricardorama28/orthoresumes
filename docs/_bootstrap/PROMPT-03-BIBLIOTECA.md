# PROMPT 03 — BIBLIOTECA: indexar los libros alojados en Google Drive

> Pegar en Claude Code **después** del bootstrap. Puede correrse antes o después de la migración.
> Objetivo: que los agentes puedan citar las fuentes con capítulo y página, en vez de citarlas de memoria.

---

Vas a conectar al repositorio la biblioteca de referencia de la usuaria, que vive en Google Drive y se accede como una unidad local de Windows (habitualmente `G:`). Los libros **no se copian al repositorio**: se indexan una vez y los agentes consultan el índice.

## Requisitos previos (verificalos antes de empezar y detenete si fallan)

1. Google Drive para escritorio instalado y la unidad montada (habitualmente `G:`).
2. **NO marques nada como "Disponible sin conexion".** Drive en modo transmision entrega los archivos bajo demanda; el indexador los va a copiar de a uno.
3. Espacio libre en disco de al menos el tamano del libro mas grande x 1,3. Verificalo y reportalo.
4. Python con `pymupdf` disponible (instalalo si falta).

Pregunta a la usuaria la ruta exacta de la carpeta de libros. No la adivines.

## Fase 1 — Catálogo

1. Creá `fuentes/rutas.yaml`:

```yaml
biblioteca_drive: "G:/Mi unidad/.../Libros"   # ruta real, confirmada
articulos_drive:  "G:/Mi unidad/.../Articulos" # opcional
```

Este archivo va al `.gitignore`: es específico de esa máquina.

2. Recorré la carpeta y generá `biblioteca/libros.yaml`, un registro por archivo:

```yaml
- id: rockwood10
  titulo: "Rockwood and Green's Fractures in Adults"
  edicion: "10.ª"
  anio: 2024
  archivo: "Rockwood_Fractures_Adults_10e.pdf"
  paginas: 2418
  subespecialidad: [MIA, MSA, GEN]
  texto_extraible: true
  autoridad_para: ["trauma de miembros", "principios de fractura"]
```

Inferí título, edición y año del nombre del archivo y de las primeras páginas del PDF. **Contrastá cada libro contra `docs/BIBLIOGRAFIA.md`.** Si encontrás una edición distinta a la fijada (por ejemplo Campbell's 14.ª cuando la fijada es la 15.ª), marcalo con `conflicto_edicion: true` y avisá — no lo indexes como si fuera la referencia canónica.

3. Lo que no sea libro (artículos sueltos, apuntes, presentaciones) va a un catálogo aparte, `biblioteca/articulos.yaml`.

## Fase 2 — Indexador

Escribí `engine/indexar.py`. Para cada libro:

1. Extraé el texto página por página con PyMuPDF.
2. **Detectá si el PDF tiene capa de texto.** Si una muestra de 20 páginas devuelve casi nada, marcá `texto_extraible: false`, registralo en `biblioteca/PENDIENTES-OCR.md` y **no lo proceses**. No intentes OCR automático: avisá cuáles necesitan y dejá que la usuaria decida.
3. Extraé el índice interno del PDF (marcadores/outline) a `toc.json`: capítulo, título, página de inicio. Es lo que permite citar "capítulo 12" y no sólo un número de página.
4. Segmentá en fragmentos de ~1200 caracteres con solapamiento de ~200, sin cortar oraciones al medio.
5. Escribí `biblioteca/indice/<id>/indice.jsonl`, una línea por fragmento:

```json
{"libro":"rockwood10","cap":"12","cap_titulo":"Distal Humerus","pag":447,"texto":"…"}
```

6. Construí un índice invertido de términos para búsqueda rápida (`terminos.json`). Sin dependencias externas pesadas; búsqueda léxica simple con normalización (minúsculas, sin acentos) es suficiente y no requiere servicios.
7. Guardá `meta.json` con fecha de indexación, hash del archivo y número de fragmentos, para poder reindexar sólo lo que cambió.

Mostrá progreso: es un proceso largo la primera vez.

### Manejo de espacio en disco — regla estricta

El indexador procesa **ESTRICTAMENTE DE A UN LIBRO POR VEZ**, con este ciclo:

1. Verifica espacio libre. Necesitas el tamano del libro x 1,3. Si no alcanza, avisa y detenete.
2. Copia **ese unico libro** de `G:` a una carpeta temporal local.
3. Extrae el texto y escribi el indice.
4. **Borra la copia temporal antes de pasar al siguiente.** Sin excepcion.
5. Siguiente libro.

**Nunca tengas dos libros locales a la vez.** Reporta el pico de disco usado.

Si una copia falla o se corta (conexion, timeout), reintenta dos veces con espera creciente. Si sigue fallando, registralo en `biblioteca/FALLIDOS.md`, borra el parcial y segui con el proximo. **No abortes toda la indexacion por un libro.**

Al terminar: mostrame el espacio total que ocupa `biblioteca/indice/` y confirma que **no quedo ninguna copia de PDF en el disco local**.

## Fase 3 — Buscador

Escribí `engine/buscar.py`, pensado para que lo llamen los agentes vía Bash:

```bash
py engine/buscar.py "glenoid track off-track" --libro rockwood10 --n 5
py engine/buscar.py "Böhler angle normal range" --subesp pie-tobillo
py engine/buscar.py "Hawkins classification avascular necrosis" --todos
```

Salida en texto plano, un resultado por bloque:

```
[rockwood10 · cap 47 "Talus Fractures" · p. 2311]
…fragmento…
```

Filtros: `--libro`, `--subesp` (usa el campo del catálogo), `--todos`, `--n`.
Si no hay coincidencias, decilo explícitamente. **Nunca devuelvas un resultado aproximado presentándolo como exacto.**

## Fase 4 — Conectar los agentes

Actualizá `.claude/agents/`:

1. **`curador`** — al armar `_brief.md`, además de leer el PDF del COT, ahora **busca en la biblioteca** cada clasificación, umbral y técnica del tema. Cada dato que ponga en el brief lleva su procedencia: `[rockwood10 c.47 p.2311]`. Los datos que no encuentre quedan marcados `[NO HALLADO EN BIBLIOTECA]`.

2. **`bibliografo`** — cambia su alcance. Donde antes decía *"no puedo verificar que una página concreta afirme lo que el texto sostiene"*, ahora sí puede, para los libros indexados. Nuevo procedimiento: por cada afirmación atribuida a un libro de la biblioteca, buscá el pasaje y clasificá en **CONFIRMADO** (con capítulo y página), **NO HALLADO**, o **CONTRADICHO** (el libro dice otra cosa — reportá ambas versiones). Para libros no indexados o no disponibles, se mantiene la limitación anterior y hay que declararla.

3. **`verificador-cifras`** — cada número se busca en la biblioteca. Los umbrales discrepantes ahora se resuelven con la fuente en la mano: si Rockwood dice una cosa y Coughlin otra, se citan las dos con su procedencia, que es lo correcto y lo que pregunta un tribunal.

4. **Los ocho `esp-*`** — cada uno consulta con `--libro <su referencia>`. El `esp-hombro` contra Rockwood & Matsen, el `esp-pie-tobillo` contra Coughlin & Mann, y así. Sus hallazgos pasan a llevar página. Un hallazgo tipo **Error** sin cita de la fuente ya no es aceptable.

5. **`redactor-ultra`** — regla nueva: **toda afirmación con un número o una clasificación tiene que provenir de una búsqueda en la biblioteca**, no de memoria. Si el dato no está en el brief ni lo encontrás buscando, escribí `[VERIFICAR]` y seguí. Esta es la regla que convierte el material en algo confiable para rendir.

## Fase 5 — Higiene

1. Agregá al `.gitignore`: `biblioteca/indice/`, `fuentes/rutas.yaml`, `fuentes/legado/`, `fuentes/cot/`. **El índice contiene el texto de libros con derechos de autor y no debe subirse a GitHub** — es material de estudio personal y se queda en la máquina. Lo que sí se versiona es `biblioteca/libros.yaml` (el catálogo, sin texto).
2. Escribí `scripts/reindexar.sh`: detecta libros nuevos o modificados por hash y procesa sólo esos.
3. Documentá todo en `docs/BIBLIOTECA.md`: cómo agregar un libro, cómo reindexar, qué hacer con los escaneados sin texto.
4. Agregá una sección a `CLAUDE.md`: **"Regla de la biblioteca — ningún dato numérico ni clasificación se escribe de memoria; se busca en `engine/buscar.py` y se cita con capítulo y página."**

## Verificación antes de cerrar

Corré estas cuatro búsquedas y mostrame el resultado crudo. Si alguna devuelve algo que no corresponde al libro que dice, el índice está mal armado:

```bash
py engine/buscar.py "Hawkins classification talus" --todos --n 3
py engine/buscar.py "Bohler angle" --subesp pie-tobillo --n 3
py engine/buscar.py "glenoid bone loss Latarjet" --libro <id_del_hombro> --n 3
py engine/buscar.py "Cierny Mader osteomyelitis" --todos --n 3
```

Terminá con un informe: libros indexados, fragmentos totales, libros pendientes de OCR, conflictos de edición detectados, y tiempo de respuesta promedio de una búsqueda. Commit: `feat: biblioteca de referencia indexada desde Drive`.
