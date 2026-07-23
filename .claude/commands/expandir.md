---
description: Lleva un tema por debajo del spec a su nivel objetivo usando el delta del auditor.
argument-hint: <ID>  (ej. COL-04)
allowed-tools: Bash, Read, Write, Edit, Task, Glob, Grep
---

Expandí el tema **$ARGUMENTS** hasta el nivel objetivo (ULTRA+ por defecto). Este comando resuelve temas cortos y duplicados; **no reescribe lo que ya está bien**: agrega sólo lo que falta según el delta por sección.

1. Diagnóstico: corré `node engine/contar.js $ARGUMENTS` y `python engine/validar.py $ARGUMENTS`, o invocá **auditor-formato** para que liste, sección por sección, el delta de párrafos y qué métricas están por debajo (tablas, pasos, callouts, MCQ, cuantitativos, referencias, densidad de negrita).
2. Invocá **redactor-ultra** con ese informe. Regla de oro: si una sección queda corta, se agrega **contenido clínico real** (clasificaciones, umbrales numéricos mm/°/%, manejo de complicaciones, matices de técnica), **nunca relleno**. La prosa densa subestima el piso: compensá con secciones de lista.
3. Tras cada tanda, `node engine/contar.js $ARGUMENTS` para ver el semáforo por sección.
4. Cuando el semáforo esté en verde, `node engine/build.js $ARGUMENTS --all` y `python engine/validar.py $ARGUMENTS`.
5. Si valida a ULTRA+, actualizá el estado (`node engine/estado.js set $ARGUMENTS estado=ultra_plus validado=true`), limpiá el campo `pendiente`, `git add` y commit: `feat($ARGUMENTS): expansión a ULTRA+ <N>p/<T>t`.
