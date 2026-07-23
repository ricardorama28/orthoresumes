# PLAN — Orden de generación por fases

El proyecto se produce **por fases**, no globalmente. El comando `/siguiente` elige el próximo tema **dentro de la fase activa**, respetando prioridad y dependencias, en lugar de tomar el de mayor prioridad de todo el temario.

- **Fase activa inicial: Fase 0.**
- El estado de avance de cada tema sigue viviendo en `temario/progreso.json`; las fases son una capa de *orden de trabajo* por encima.

## ⚠ Pendiente de la autora: definición de las nueve fases

El prompt del índice maestro indica "guardar las nueve fases del plan de la autora", pero **el detalle de las fases no vino en ninguno de los cuatro archivos** entregados (`temario.yaml`, `remisiones.yaml`, `progreso.json`, `bibliografia.yaml`): el temario no trae un campo `fase` por tema ni una lista de fases. Para no inventar el plan, este archivo queda como andamiaje a completar.

Para activar el mecanismo hacen falta dos cosas de la autora:

1. **La lista de las 9 fases** (título y criterio de cada una: p. ej. "Fase 0 — cimientos transversales de GEN", etc.).
2. **La asignación de cada tema a su fase** — idealmente un campo `fase: N` en cada entrada de `temario/temario.yaml`, o una tabla `fase → [IDs]` en este archivo.

Cuando eso exista:
- `/siguiente` filtra los candidatos por `fase == fase_activa` antes de ordenar por prioridad.
- Al agotarse una fase (todos sus temas en `ultra`/`ultra_plus`), se avanza a la siguiente.

## Plantilla de fases (a completar)

```
Fase 0 — <título>   ·   criterio: <...>   ·   temas: <IDs o bloque>
Fase 1 — <título>   ·   criterio: <...>   ·   temas: <...>
Fase 2 — <título>   ·   ...
Fase 3 — ...
Fase 4 — ...
Fase 5 — ...
Fase 6 — ...
Fase 7 — ...
Fase 8 — ...
```

> Hasta que las fases estén definidas y asignadas, `/siguiente` opera en modo global (por prioridad sobre todo el temario), que es el comportamiento actual del dashboard.
