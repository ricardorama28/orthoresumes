---
description: Produce el próximo tema por prioridad, ciclo completo curador→redactor→auditor→revisor→anki→build.
allowed-tools: Bash, Read, Write, Edit, Task, Glob, Grep
---

Producí el **próximo tema** del temario, de punta a punta.

1. Corré `node engine/estado.js dashboard` y tomá el **próximo recomendado** (o dejá que el subagente `curador` afine la prioridad por peso en examen × relevancia clínica × dificultad).
2. Ejecutá el ciclo completo del `docs/WORKFLOW.md` invocando los subagentes en orden:
   - **curador** → crea la carpeta del tema, `meta.yaml` y `_brief.md`.
   - **redactor-ultra** → escribe los `NN-*.md` de a 2–3 secciones, corriendo `node engine/contar.js <ID>` tras cada tanda.
   - **auditor-formato** → `contar.js` + `validar.py`, lista lo que falta.
   - **revisor-clinico** → verifica el fondo clínico y bibliográfico.
   - **anki** → genera `anki.tsv`.
3. Compilá: `node engine/build.js <ID> --all` y validá: `python engine/validar.py <ID>` (en Windows, `py engine/validar.py <ID>`).
4. Si `validar.py` devuelve 0, actualizá el estado a `ultra_plus` (validado) con `node engine/estado.js set <ID> estado=ultra_plus validado=true` y hacé `git add` de la carpeta del tema.
5. Un **commit por tema**: `feat(<ID>): <título corto> — ULTRA+ <N>p/<T>t`.

Si el tema queda a medias, commiteá igual con estado `borrador` y la deuda concreta en el campo `pendiente`.
