---
description: Produce un tema específico por ID (ej. /tema MSA-11), ciclo completo.
argument-hint: <ID>  (ej. MSA-11)
allowed-tools: Bash, Read, Write, Edit, Task, Glob, Grep
---

Producí el tema **$ARGUMENTS** de punta a punta.

Antes que nada, verificá en `temario/progreso.json` que el ID exista y **no esté ya hecho** (regla: nunca dupliques un tema). Si ya está en `ultra`/`ultra_plus`, avisá y ofrecé `/expandir` en su lugar.

Ejecutá el mismo ciclo que `/siguiente` pero sobre `$ARGUMENTS`:

1. **curador** → carpeta `contenido/<MOD>/<ID>-<slug>/`, `meta.yaml`, `_brief.md` (clasificaciones, criterios cuantitativos, referencias con año, COT vs referencia cerrada del módulo).
2. **redactor-ultra** → escribe `NN-*.md` de a 2–3 secciones respetando el presupuesto de `docs/SPEC-ULTRA.md`; corré `node engine/contar.js $ARGUMENTS` tras cada tanda.
3. **esp-\<región\>** (especialista del módulo: `esp-trauma`/`esp-hombro`/`esp-mano-codo`/`esp-rodilla`/`esp-pie-tobillo`/`esp-columna`/`esp-tumores`/`esp-ortopedia-general`) → revisa el fondo clínico contra la referencia cerrada del módulo.
4. **ilustrador** → diagramas de algoritmos y clasificaciones.
5. **auditor-formato** → `node engine/contar.js $ARGUMENTS` y `python engine/validar.py $ARGUMENTS`; listá el delta exacto para ULTRA+, numérico **y estructural** (subaspectos de `docs/ESQUEMA-12.md`).
6. **bibliografo** + **verificador-cifras** → referencias con año/PMID/DOI según `docs/BIBLIOGRAFIA.md`, y auditoría de criterios cuantitativos.
7. **anki** → `anki.tsv`.
8. `node engine/build.js $ARGUMENTS --all` → `python engine/validar.py $ARGUMENTS`.
9. Si validó (numérico **y** estructural), `node engine/estado.js set $ARGUMENTS estado=ultra_plus validado=true`, `git add` de la carpeta y **un commit**: `feat($ARGUMENTS): <título> — ULTRA+ <N>p/<T>t`.
