---
name: anki-tsv
description: Formato y criterios de tarjeta para los mazos anki.tsv de UPOME. Usala al generar o revisar un mazo.
---

# Skill: anki-tsv

El mazo de un tema vive en `contenido/<MOD>/<ID>-<slug>/anki.tsv` y se copia a `salida/anki/<ID>.tsv` al publicar.

## Cabecera obligatoria (tres primeras líneas)
```
#separator:tab
#html:false
#tags column:3
```

## Estructura de cada tarjeta
Una tarjeta por línea, **tres columnas separadas por TAB**:
```
frente<TAB>dorso<TAB>tags
```
- **tags**: `<MOD> <entidad>`, minúsculas y guiones. Ej.: `mia fractura-calcaneo`.
- No uses HTML (está en `#html:false`); texto plano. Evitá tabs internos.

## Cuántas
- ULTRA: **≥20** tarjetas. ULTRA+: **≥25**. `validar.py` cuenta las líneas no-comentario.

## Criterios de buena tarjeta
- **Atómica**: una sola idea. **Nunca** un párrafo entero como dorso.
- Prioridad de contenido: **números** (ángulos, mm, %, plazos) → **clasificaciones** (tipo → implicancia) → **tricks/pitfalls** → indicaciones quirúrgicas → diferenciales.
- Frente unívoco (una respuesta correcta posible); dorso breve.
- Reformulá a pregunta-respuesta; no copies literal el docx.

## Ejemplos
```
¿Ángulo de Böhler normal?	20–40°	mia fractura-calcaneo
Weber C — ¿estado de la sindesmosis?	Rota; suele requerir fijación	mia fractura-tobillo
Mirels ≥ 9 — ¿conducta?	Fijación profiláctica antes de irradiar	tum metastasis-osea
Gustilo IIIB — ¿qué la define?	Exposición con pérdida de cobertura que exige colgajo	gen fractura-expuesta
```

## Antipatrones
- Dorsos-párrafo, tarjetas con dos preguntas, frentes ambiguos, cifras sin unidad, tags genéricos (`trauma`).
