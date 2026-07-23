# PROMPT 05 — Cerrar los dos ítems bloqueados del PROMPT 04

> Copiar antes a la raíz de `upome`: `fases.yaml` y `PROMPT-03-BIBLIOTECA.md`.

---

Los dos ítems que quedaron bloqueados en el PROMPT 04 ya tienen sus insumos.

## Ítem 8 — Las 9 fases

En la raíz está `fases.yaml`, derivado de la hoja ORDEN DE GENERACIÓN del índice maestro. Trae la definición de las nueve fases y la asignación de fase para los 316 temas.

1. Movelo a `temario/fases.yaml`.
2. Volcá el campo `fase` a cada entrada de `temario/temario.yaml`, para que el temario sea autosuficiente y no haya que cruzar dos archivos en cada consulta. `fases.yaml` queda como definición de las fases y del puntero `fase_activa`.
3. Reescribí `docs/PLAN.md` con las nueve fases, su criterio y el recuento real de documentos:

| FASE | CONTENIDO | DOCS | CRITERIO |
|---|---|---|---|
| 0 | Cerrar series abiertas: MSA completo y TUMI completo | 51 | Ya iniciadas; no dejar series a medio camino |
| 1 | GEN de alto rendimiento: GEN-PT, GEN-UR, GEN-BM y GEN-IN-05 (TBC) | 29 | Se preguntan siempre y alimentan por remisión a todos los módulos |
| 2 | MIA completo | 31 | Módulo de guardia; máximo rendimiento clínico y de examen |
| 3 | COL completo | 25 | Mayor brecha entre lo que existe y lo que se exige |
| 4 | MIC y MSC | 62 | Volumen alto, menor densidad quirúrgica por documento |
| 5 | ART completo | 15 | Módulo nuevo; alta rentabilidad en oral y ateneo |
| 6 | GEN restante: ciencias básicas, metabólicas, artropatías, perioperatorio, rehabilitación, médico-legal | 54 | Completa el bloque de generalidades |
| 7 | TUM completo | 19 | Serie ya estructurada, avanza sola |
| 8 | PED completo | 30 | Requiere Rockwood & Wilkins 10.ª y Tachdjian 6.ª en la biblioteca |

Total 316. **Fase activa inicial: 0.**

4. Modificá `/siguiente`: elige **dentro de la fase activa**, ordenando por prioridad y, a igual prioridad, por distancia al nivel objetivo. Cuando no quede ningún tema sin cerrar en la fase activa, avisa y propone avanzar a la siguiente — **no avanza solo**.
5. Agregá `/fase` para consultar y cambiar la fase activa (`/fase` muestra el estado, `/fase 2` la cambia). `/tema <ID>` sigue funcionando para cualquier tema de cualquier fase: la fase ordena el trabajo, no lo restringe.
6. Ampliá `/estado` para que muestre el avance **de la fase activa** además del global.

Nota de trazabilidad: la fase 0 del Excel decía "MSA-09 a MSA-36 y TUMI-11 + restantes". Acá se asignaron los módulos MSA y TUMI completos a la fase 0, porque los ya cerrados igual necesitan revalidación contra el spec (los 16 `ultra_plus` están con `validado: false`). El orden por prioridad y por deuda pone primero los que faltan.

## Ítem 10 — PROMPT-03-BIBLIOTECA

En la raíz está `PROMPT-03-BIBLIOTECA.md`, **ya con la corrección aplicada**: el indexador procesa de a un libro por vez (copiar de `G:` a temporal, indexar, borrar la copia antes del siguiente) y no requiere marcar nada como "Disponible sin conexión". No hay que corregir nada.

Movelo a `docs/_bootstrap/`.

## Cierre

- Corré el test de regresión del motor.
- Verificá que `progreso.json` siga en 316 y que el dashboard muestre la fase activa.
- Commit y push: `feat: plan de 9 fases + asignación por tema + prompt de biblioteca`.
- Decime cuántos temas quedan sin cerrar en la fase 0 y cuál elegiría `/siguiente`.
