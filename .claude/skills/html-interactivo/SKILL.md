---
name: html-interactivo
description: Cómo producir el HTML interactivo de estudio de un tema — línea base determinística vs versión premium a mano. Usala al publicar HTML.
---

# Skill: html-interactivo

Hay **dos caminos** para el `.html` interactivo de un tema. Ambos parten del mismo Markdown; el HTML es una **vista** del contenido, no una versión abreviada (si el docx tiene 620 párrafos, el HTML tiene 620).

## 1) Línea base determinística (por defecto)
```
node engine/build.js <ID> --html      # o --all
```
- `engine/render-html.js` construye un modelo JSON del tema y lo inyecta en la shell `plantillas/interactivo.html`.
- La shell es una app vanilla autocontenida: abre con `file://`, funciona offline, persiste estado en `localStorage` (`upome:<ID>`), modo claro/oscuro, nav con checks de lectura, secciones colapsables, callouts diferenciados, tablas responsivas, checklist de pasos, quiz MCQ, cortas, flashcards (SM-2 reducido) desde el `anki.tsv`, repaso rápido con "números que hay que saber", buscador `Ctrl/⌘+K`, notas e impresión.
- Es reproducible y consistente. Usala siempre que no necesites algo hecho a mano.

## 2) Versión premium a mano
Cuando quieras una pieza cincelada más allá de la plantilla, seguí **`plantillas/prompt-html.md` al pie de la letra**. Ese prompt especifica identidad visual (acento = color de módulo), estructura obligatoria (13 bloques funcionales), extracción de criterios cuantitativos, y una checklist de verificación antes de entregar.

## Identidad visual (color de acento = color del módulo)
```
GEN #EAB308 · TUM #C55A11 · MSA #38BDF8 · MSC #2563EB
MIA #EC4899 · MIC #7C3AED · COL #16A34A
```

## Verificación antes de entregar
- Abre con `file://` sin servidor. Peso total < 1,5 MB.
- El conteo de párrafos coincide con el `.docx` del mismo tema; todas las tablas, pasos, MCQ y tarjetas del origen están presentes.
- Funciona a 375 px de ancho; el estado sobrevive a un refresh; modo oscuro legible.
