---
description: Dashboard de avance — SIEMPRE lo primero de la sesión. Lee temario/progreso.json.
allowed-tools: Bash(node engine/*), Read
---

Corré el dashboard de estado del proyecto:

```
node engine/estado.js dashboard
```

Mostrá la salida tal cual. El estado del proyecto vive en `temario/progreso.json`, **no** en tu contexto: esto sustituye por completo a "¿dónde habíamos quedado?".

El dashboard muestra, además del avance global por módulo, el **avance de la fase activa** (cerrados/total, sin cerrar y el próximo tema dentro de esa fase). Para ver o cambiar la fase, usá `/fase`.

Si el usuario quiere detalle de un tema puntual, corré `node engine/estado.js get <ID>`.

No escribas contenido ni compiles nada en este comando: es sólo lectura de estado.
