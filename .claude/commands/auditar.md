---
description: Reconstruye progreso.json desde la realidad del disco. Red de seguridad contra la deriva de estado.
argument-hint: [modulo]  (opcional, ej. MSA)
allowed-tools: Bash, Read, Glob, Task
---

Reconstruí el estado real desde el disco para **$ARGUMENTS** (si no se pasa módulo, para todo el repo). Es la red de seguridad contra la deriva entre `progreso.json` y lo que realmente hay compilado.

Para cada tema con carpeta en `contenido/` (filtrando por el módulo `$ARGUMENTS` si se indicó):

1. Compilá si hace falta: `node engine/build.js <ID> --all`.
2. Corré `python engine/validar.py <ID> --json` y leé el `nivel_alcanzado`.
3. Actualizá `progreso.json` con `node engine/estado.js set <ID> ...`:
   - `estado=ultra_plus validado=true` si alcanzó ULTRA+,
   - `estado=ultra validado=true` si alcanzó ULTRA,
   - `estado=borrador` si compila pero no llega a ULTRA (y anotá el delta en `pendiente`),
   - `estado=esqueleto` si la carpeta existe pero está casi vacía.
4. Los temas del temario **sin carpeta** quedan en `pendiente`.
5. Al terminar, corré `node engine/estado.js dashboard` y mostrá el resultado. Recordá: `estado.js` rechaza marcar `ultra`/`ultra_plus` sin `validado=true`, así que nunca fuerces un estado validado sin haber corrido `validar.py`.
