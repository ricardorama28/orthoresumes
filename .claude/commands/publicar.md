---
description: Compila un tema a todas las salidas (docx + pdf + html + anki) en salida/.
argument-hint: <ID> [--html|--pdf|--anki]
allowed-tools: Bash, Read
---

Publicá el tema **$ARGUMENTS** a `salida/`.

1. Compilá todas las salidas:
   ```
   node engine/build.js $ARGUMENTS --all
   ```
   Esto produce `salida/docx/<ID>.docx` (siempre), `salida/html/<ID>.html`, `salida/anki/<ID>.tsv` y, si LibreOffice (`soffice`) está disponible, `salida/pdf/<ID>.pdf`. Si `soffice` falta, el build lo informa y omite sólo el PDF (no falla).
2. Validá antes de dar por publicado: `python engine/validar.py $ARGUMENTS` (Windows: `py engine/validar.py $ARGUMENTS`). Si no da 0, avisá qué falta; no marques el tema como terminado.
3. Para una versión HTML **premium** hecha a mano (más allá de la línea base determinística de `build.js --html`), seguí `plantillas/prompt-html.md` al pie de la letra.

Reportá las rutas exactas de lo que quedó en `salida/`.
