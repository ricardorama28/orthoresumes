---
description: Muestra o cambia la fase activa del plan de generación (9 fases).
argument-hint: [N]  — sin argumento muestra el estado; /fase 2 cambia la fase activa
allowed-tools: Bash(node engine/*), Read
---

Gestioná la **fase activa** del plan de generación.

- Si **$ARGUMENTS está vacío**, mostrá el estado de las fases:
  ```
  node engine/estado.js fase
  ```
  Devuelve la fase activa (nombre, criterio, cerrados/total, sin cerrar) y la tabla de las nueve fases.

- Si **$ARGUMENTS trae un número**, cambiá la fase activa:
  ```
  node engine/estado.js fase $ARGUMENTS
  ```
  Esto reescribe el puntero `fase_activa` en `temario/fases.yaml`.

Mostrá la salida tal cual.

Contexto: la definición de las nueve fases vive en `temario/fases.yaml` y el detalle (contenido, docs y criterio de cada una) en `docs/PLAN.md`. Cada tema del temario trae su campo `fase`.

**La fase ordena el trabajo, no lo restringe**: `/tema <ID>` sigue produciendo cualquier tema de cualquier fase. Lo que cambia con la fase activa es a quién elige `/siguiente`.
