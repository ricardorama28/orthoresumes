# UPOME — Constitución del repositorio

Biblioteca de monografías de Traumatología y Ortopedia en español, nivel examen de especialista UDELAR (Uruguay). Autora: VZ. Año: 2026.

## Regla cero

**El estado del proyecto vive en `temario/progreso.json`, no en tu contexto.**
Toda sesión empieza leyendo ese archivo. Si vas a decir "creo que quedamos en...", parate y leelo. Si vas a marcar un tema como terminado, primero corré el validador.

## Qué produce este repo

Por cada tema: un `.docx` (formato por defecto), un `.pdf`, un `.html` interactivo y un mazo `.tsv` de Anki. Todos se compilan desde **una única fuente Markdown** en `contenido/<MOD>/<ID>-<slug>/`. Nunca escribas contenido directamente en formato de salida.

## Los 12 puntos (contrato de contenido)

Todo tema sigue este encare. El detalle completo de subaspectos obligatorios está en `docs/ESQUEMA-12.md` y es vinculante.

```
00  Definición y marco general
01  Presentación clínica      (mecanismo, edad, síntomas, signos, examen físico, urgencias)
02  Imágenes                  (Rx obligatorias, TC, RM, angio-TC, análisis radiográfico sistemático)
03  Diagnóstico               (presuntivo, positivo, diferenciales)
04  Clasificación             (AO/OTA + específicas + implicancia terapéutica)
05  Epidemiología
06  Etiología y factores de riesgo
07  Anatomía y anatomía patológica
08  Fisiopatología
09  Historia natural / pronóstico sin tratamiento
10  Tratamiento               (objetivos, algoritmo, ortopédico, quirúrgico, técnica paso a paso)
11  Rehabilitación y cuidados postoperatorios
12  Complicaciones            (inmediatas, mediatas, tardías, prevención y manejo)
13  Cierre                    (perlas UDELAR, algoritmo, MCQ, preguntas cortas, bibliografía)
```

El cierre siempre responde cuatro preguntas: qué define la gravedad, qué determina el tratamiento, cuáles son las complicaciones más importantes, cuáles son los factores pronósticos.

## Estándar de calidad

Está en `docs/SPEC-ULTRA.md` y lo verifica `engine/validar.py`. Resumen operativo:

- **ULTRA**: ≥300 párrafos, ≥2 tablas, ≥20 pasos quirúrgicos, ≥10 MCQ.
- **ULTRA+**: ≥560 párrafos (objetivo 600–650), ≥3 tablas, ≥40 pasos, ≥14 MCQ, ≥64.000 caracteres.

Nivel por defecto de todo tema nuevo: **ULTRA+**.

Densidad de negrita 35–55 %. La negrita marca lo que hay que recordar; si todo está en negrita, nada lo está.

## Presupuesto de párrafos

Antes de escribir, mirá la tabla de presupuesto en `docs/SPEC-ULTRA.md`. Después de cada tanda de 2–3 secciones, corré:

```bash
node engine/contar.js <ID>
```

Escribir el documento entero y recién ahí contar es el antipatrón que este repo existe para eliminar.

## Bibliografía cerrada

Ediciones fijas por subespecialidad (`docs/BIBLIOGRAFIA.md`). No uses ediciones anteriores.

| SUBESPECIALIDAD | REFERENCIA |
|---|---|
| Trauma MS/MI agudo | Rockwood & Green's Fractures in Adults, 10.ª ed. (2024/25) + AO Surgery Reference |
| Mano, muñeca, codo | Green's Operative Hand Surgery, 8.ª ed. (2022) |
| Pie y tobillo | Coughlin & Mann's Surgery of the Foot and Ankle, 10.ª ed. (2023) |
| Hombro | Rockwood & Matsen's The Shoulder, 6.ª ed. (2021) |
| Columna | Rothman-Simeone & Herkowitz's The Spine, 8.ª ed. (2024) + AOSpine |
| Ortopedia general | Campbell's Operative Orthopaedics, 15.ª ed. (2026) — **nunca la 14.ª** |
| Rodilla y deporte | Insall & Scott Surgery of the Knee, 7.ª ed. (2024) |
| Tumores | WHO Classification of Tumours, 5.ª ed. (2020) + OKU Musculoskeletal Tumors, 5.ª ed. (2024) |
| Currículo base | Temas COT/UDELAR 7.ª edición (en `fuentes/cot/`) |

Artículos: preferentemente de los últimos 10 años, con PMID o DOI. Los clásicos fundacionales (Mirels 1989, Patchell 2005, Gustilo-Anderson 1976) se citan por nombre y año sin límite temporal.

## Estilo de escritura

- Español rioplatense, lenguaje médico académico.
- Razonamiento clínico explícito: siempre explicar **por qué**, no sólo qué.
- Correlacionar mecanismo → patrón → imagen → clasificación → tratamiento.
- Criterios cuantitativos siempre que existan (mm, grados, %, meses).
- Marcar diferencias pediátrico/adulto y estable/inestable cuando corresponda.
- Énfasis explícito en **tricks and pitfalls**, distribuidos por todo el texto, no agrupados al final.
- Cero relleno. Si falta densidad, se agrega contenido clínico real: clasificaciones, umbrales numéricos, manejo de complicaciones, matices de técnica.

## Formato de salida (invariante)

A4 · Calibri 11 cuerpo / 12 subtítulos / 14 títulos · interlineado 1,15 · justificado
Encabezado: **TRAUMATOLOGÍA Y ORTOPEDIA** — negrita, centrado
Pie: **VZ – 2026** — negrita, centrado
Borde de página: 1,5 pt, color del módulo
Tablas: primera fila y primera columna en MAYÚSCULA, negrita, centradas; zebra striping

| MÓDULO | NOMBRE | COLOR |
|---|---|---|
| GEN | Generales | `EAB308` |
| TUM | Tumores | `C55A11` |
| MSA | Miembro superior agudo | `38BDF8` |
| MSC | Miembro superior crónico | `2563EB` |
| MIA | Miembro inferior agudo | `EC4899` |
| MIC | Miembro inferior crónico | `7C3AED` |
| COL | Columna | `16A34A` |

## Flujo de trabajo

```bash
/estado                 # dónde estamos — SIEMPRE lo primero de la sesión
/siguiente              # produce el próximo tema por prioridad
/tema MSA-11            # produce un tema específico
/expandir COL-04        # lleva un tema existente al nivel objetivo
/auditar MSA            # reconstruye el estado desde el disco
/publicar MSA-11        # docx + pdf + html + anki
```

## Reglas de disciplina

1. Ningún tema pasa a `ultra` / `ultra_plus` sin `validar.py` en 0.
2. Un commit por tema terminado. Mensaje: `feat(MSA-11): fractura de húmero distal — ULTRA+ 612p/4t`.
3. Si un tema queda a medias, se commitea igual con estado `borrador` y la deuda concreta en `pendiente`.
4. Nunca dupliques un tema. Antes de crear, buscá el ID en `progreso.json`.
5. Contenido y formato son cosas distintas. Si te encontrás editando el renderizador para arreglar un texto, algo está mal.
6. Un archivo `.docx` por tema. Sin excepciones.

## Errores históricos ya resueltos — no reintroducir

- **Borde de página**: la API de `docx@9.6.1` requiere `PageBorderDisplay` / `PageBorderOffsetFrom`; la sintaxis anterior falla silenciosamente.
- **Callouts**: los elementos de borde de párrafo tienen orden obligatorio en el esquema OOXML; si se emiten desordenados, el `.docx` no valida.
- **Conteo**: `:::tabla` aporta 0 párrafos al conteo de python-docx. La bibliografía de n entradas aporta n+1.
- **Subconteo de prosa densa**: párrafos largos de prosa quedan 15–30 % por debajo del piso. Se compensa con secciones de lista, no con relleno.

## Entorno de esta máquina

- **SO**: **Windows 11**. Shell primaria PowerShell; también hay Git Bash para scripts POSIX (cada uno con su sintaxis).
- **Node**: instalado en **`C:\Program Files\nodejs`**. No siempre está en el PATH de Git Bash: si `node` no resuelve, invocalo por ruta completa — `"/c/Program Files/nodejs/node.exe"`.
- **Validador**: se corre con **`py engine/validar.py <ID>`** (el launcher `py` de Windows, **no** `python` ni `python3`). `validar.py` fuerza salida UTF-8, así que funciona igual en PowerShell y en Git Bash.
- **Analizador de seguridad de permisos**: pide aprobación manual (te frena) ante comandos con construcciones dinámicas: **`$(...)`**, **`export PATH=...`** (expansión de `$PATH`) y **`node -e "..."` / `py -c "..."`** con comillas complejas. Para no trancar: **usá comandos simples**, invocá Node por ruta completa en vez de exportar PATH, y para editar/crear archivos preferí las herramientas de edición antes que heredocs largos. Los cambios en `.claude/settings.json` recién toman efecto al reiniciar la sesión.
- **Test de regresión del motor**: **`bash tests/verificar-motor.sh`** compila y valida el fixture permanente `tests/fixture/DEMO-01-fixture` en ULTRA+ (numérico + estructural). Corrélo tras tocar `engine/` o `engine/esquema.json`.
- **LibreOffice / `soffice`**: no instalado. El PDF se omite con aviso; `docx`, `html` y `anki` salen igual.
