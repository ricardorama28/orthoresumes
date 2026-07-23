---
description: Produce el próximo tema por prioridad, ciclo completo curador→redactor→auditor→revisor→anki→build.
allowed-tools: Bash, Read, Write, Edit, Task, Glob, Grep
---

Producí el **próximo tema de la fase activa**, de punta a punta.

1. Elegí el tema **dentro de la fase activa** (no globalmente):
   ```
   node engine/estado.js siguiente
   ```
   Devuelve el ID elegido, ordenando entre los temas **sin cerrar** de la fase activa por **prioridad** y, a igual prioridad, por **distancia al nivel objetivo** (primero los que más faltan: `pendiente` → `pendiente_renivelar` → `esqueleto` → `borrador` → `ultra` → `ultra_plus` sin validar).

   **Si la fase está completa** (ningún tema sin cerrar), el comando lo avisa y propone la fase siguiente. **No avances solo**: informá a la usuaria y esperá que confirme con `/fase <N>`.

   El detalle del plan está en `docs/PLAN.md`; la definición de fases en `temario/fases.yaml`.
2. Ejecutá el ciclo completo del `docs/WORKFLOW.md` invocando los subagentes en orden:
   - **curador** → crea la carpeta del tema, `meta.yaml` y `_brief.md`.
   - **redactor-ultra** → escribe los `NN-*.md` de a 2–3 secciones, corriendo `node engine/contar.js <ID>` tras cada tanda.
   - **esp-\<región\>** (el especialista del módulo: `esp-trauma`, `esp-hombro`, `esp-mano-codo`, `esp-rodilla`, `esp-pie-tobillo`, `esp-columna`, `esp-tumores` o `esp-ortopedia-general`) → revisa el fondo clínico contra la referencia cerrada del módulo.
   - **ilustrador** → diagramas Mermaid/SVG de los algoritmos y clasificaciones.
   - **auditor-formato** → `contar.js` + `validar.py` (numérico **y** estructural), lista lo que falta.
   - **bibliografo** → verifica que cada referencia exista con año/PMID/DOI y coincida con `docs/BIBLIOGRAFIA.md`.
   - **verificador-cifras** → audita todo criterio cuantitativo (mm/°/%/plazos) y arma `_cifras.md`.
   - **anki** → genera `anki.tsv`.
3. Compilá: `node engine/build.js <ID> --all` y validá: `python engine/validar.py <ID>` (en Windows, `py engine/validar.py <ID>`).
4. Si `validar.py` devuelve 0, actualizá el estado a `ultra_plus` (validado) con `node engine/estado.js set <ID> estado=ultra_plus validado=true` y hacé `git add` de la carpeta del tema.
5. Un **commit por tema**: `feat(<ID>): <título corto> — ULTRA+ <N>p/<T>t`.

Si el tema queda a medias, commiteá igual con estado `borrador` y la deuda concreta en el campo `pendiente`.
