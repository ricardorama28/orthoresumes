---
description: Dashboard de avance — SIEMPRE lo primero de la sesión. Lee temario/progreso.json.
allowed-tools: Bash(node engine/*), Read
---

Corré el dashboard de estado del proyecto:

```
node engine/estado.js dashboard
```

Mostrá la salida tal cual. El estado del proyecto vive en `temario/progreso.json`, **no** en tu contexto: esto sustituye por completo a "¿dónde habíamos quedado?".

Si el usuario quiere detalle de un tema puntual, corré `node engine/estado.js get <ID>`.

No escribas contenido ni compiles nada en este comando: es sólo lectura de estado.
