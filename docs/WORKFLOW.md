# WORKFLOW — Ciclo de trabajo por tema

Toda sesión empieza con `/estado`. El estado vive en `temario/progreso.json`, no en el contexto del chat.

## Estados de un tema

`pendiente → esqueleto → borrador → ultra → ultra_plus` (y `obsoleto` para lo que hay que rehacer).

| ESTADO | SIGNIFICADO |
|---|---|
| `pendiente` | Existe en el temario, no se empezó. |
| `esqueleto` | Carpeta creada, `meta.yaml` y `_brief.md`, secciones vacías o mínimas. |
| `borrador` | Contenido incompleto o sin validar. Se commitea con la deuda concreta en `pendiente`. |
| `ultra` | Compila y `validar.py` devuelve 0 al nivel ULTRA. |
| `ultra_plus` | Compila y `validar.py` devuelve 0 al nivel ULTRA+. |
| `obsoleto` | Necesita rehacerse (edición bibliográfica vieja, duplicado, error de fondo). |

**Regla dura**: `estado.js` rechaza escribir `ultra`/`ultra_plus` si `validar.py` no devolvió 0 para ese tema.

## Ciclo completo (lo que hace `/siguiente` y `/tema <ID>`)

```
curador → redactor-ultra → esp-<región> → ilustrador → auditor-formato → bibliografo → verificador-cifras → anki → build → estado
```

1. **`curador`** — Lee `temario.yaml`, `progreso.json` y `fuentes/`. Elige el próximo tema por prioridad (peso en examen × relevancia clínica × dificultad). Crea la carpeta del tema, `meta.yaml` y un **brief de fuentes** (`_brief.md`): clasificaciones a incluir, criterios cuantitativos hallados, referencias con año, y qué dice el COT vs qué dice la referencia cerrada del módulo. **No escribe contenido.**

2. **`redactor-ultra`** — Recibe el brief y el **presupuesto de párrafos** (`docs/SPEC-ULTRA.md`). Escribe los `NN-*.md` **de a 2–3 secciones** y corre `node engine/contar.js <ID>` después de cada tanda. Si una sección queda corta, agrega **contenido clínico real** (clasificaciones, umbrales, manejo de complicaciones), nunca relleno.

3. **`auditor-formato`** — Corre `contar.js` y `validar.py`, interpreta la salida y lista **exactamente qué falta** para el nivel objetivo. No arregla: reporta.

4. **`esp-<región>`** (especialista del módulo) — Verifica el fondo clínico contra la referencia cerrada del módulo: clasificaciones con autor/año, criterios cuantitativos correctos, indicaciones quirúrgicas coherentes con el patrón. Luego **`bibliografo`** (referencias con año/PMID/DOI vs `docs/BIBLIOGRAFIA.md`) y **`verificador-cifras`** (auditoría de mm/°/%/plazos) producen sus informes accionables.

5. **`anki`** — Genera `anki.tsv` a partir del contenido ya validado. Tarjetas atómicas (criterios numéricos, clasificaciones, tricks/pitfalls), nunca párrafos enteros.

6. **build + estado** — `node engine/build.js <ID> --all` compila; si `validar.py` devuelve 0, `estado.js` actualiza `progreso.json` y se hace `git add` de la carpeta del tema.

## Comando `/expandir <ID>`

Toma un tema por debajo del spec y lo lleva al nivel objetivo usando el informe de `auditor-formato`. Es el que resuelve duplicados y temas cortos. No reescribe lo bueno: agrega lo que falta según el delta por sección.

## Comando `/auditar [modulo]`

Corre el validador sobre todo lo compilado y **reconstruye `progreso.json` desde la realidad del disco**. Red de seguridad contra la deriva de estado. Úsalo si hay dudas de que el JSON refleje lo que hay.

## Reglas de disciplina

1. Ningún tema pasa a `ultra`/`ultra_plus` sin `validar.py` en 0.
2. **Un commit por tema terminado.** Mensaje: `feat(MSA-11): fractura de húmero distal — ULTRA+ 612p/4t`.
3. Si un tema queda a medias, se commitea igual con estado `borrador` y la deuda concreta en `pendiente`.
4. **Nunca dupliques un tema.** Antes de crear, buscá el ID en `progreso.json`.
5. **Contenido y formato son cosas distintas.** Si te encontrás editando el renderizador para arreglar un texto, algo está mal.
6. **Un archivo `.docx` por tema.** Sin excepciones.

## Anatomía de una carpeta de tema

```
contenido/<MOD>/<ID>-<slug>/
├─ meta.yaml            # id, titulo, modulo, slug, nivel_objetivo, referencias
├─ _brief.md           # brief de fuentes del curador (insumo, no salida)
├─ 00-definicion.md
├─ 01-presentacion.md
│  … (hasta)
├─ 12-complicaciones.md
├─ 13-cierre.md
├─ tablas/*.md         # tablas reutilizables si se separan del cuerpo
└─ anki.tsv
```
