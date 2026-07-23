# PROMPT 02 — MIGRACIÓN: cargar todo el contexto existente al repo

> Pegar en Claude Code **después** de que el bootstrap haya terminado y el test de humo haya pasado.
> Este prompt no genera contenido médico nuevo: importa, mide y ordena lo que ya existe.

---

Vas a migrar al repositorio una biblioteca de monografías de Traumatología y Ortopedia que hasta ahora se producía dentro de conversaciones de chat. El material existe pero está disperso y su estado real se desconoce. Tu trabajo es **importarlo, medirlo y dejar `temario/progreso.json` reflejando la realidad**, no lo que creemos recordar.

## Materiales de entrada

La usuaria va a colocar, antes de que empieces:

```
fuentes/
├─ cot/            # ~34 PDFs "Tema_NN_*.pdf" del programa COT/UDELAR (currículo base)
├─ legado/docx/    # todos los .docx ya generados (MSA, MIA, MSC, MIC, COL, TUM, GEN, encares)
├─ legado/anki/    # los .tsv ya generados
└─ notas/          # apuntes propios, tablas de referencia, capturas
```

Si alguna carpeta está vacía, decilo y seguí con las demás. No inventes contenido faltante.

---

## Fase 1 — Inventario

1. Listá todos los `.docx` de `fuentes/legado/docx/` con: nombre, tamaño, fecha.
2. Para cada uno, extraé con `python-docx`: párrafos no vacíos, caracteres, número de tablas, número de pasos numerados, número de callouts (párrafos con borde o sombreado), MCQ detectadas, densidad de negrita, y el color del borde de página.
3. Producí `docs/INVENTARIO.md`: una tabla con todo eso, ordenada por módulo.
4. **Detectá duplicados**: archivos que traten el mismo tema (por similitud de título y de contenido). Listalos aparte en una sección "Duplicados a resolver", con la métrica de cada versión, para que la usuaria elija la canónica. No borres nada.

## Fase 2 — Mapeo contra el temario

1. Asociá cada `.docx` a un `id` de `temario/temario.yaml`. Usá similitud de título; ante duda, preguntá en vez de adivinar.
2. Los que no mapeen a ningún `id` van a `docs/INVENTARIO.md` bajo "Sin ID asignado" — pueden ser temas legítimos que faltan en el temario (proponé el `id` nuevo) o material de otro tipo (los "encares clínicos" de 12 pasos, que van a `contenido/_encares/`).
3. Los PDFs de `fuentes/cot/` se mapean también: cada `Tema_NN` se asocia a uno o varios `id`. Guardá ese mapa en `temario/mapa-cot.yaml`. Es lo que le permite al agente `curador` encontrar el material curricular de UDELAR sin buscarlo cada vez.

## Fase 3 — Importador inverso (docx → Markdown)

Escribí `engine/importar-docx.js` (o `.py`, elegí lo que dé mejor fidelidad con `python-docx`). Debe convertir un `.docx` del formato UPOME a la fuente Markdown con directivas del repo, detectando:

| ELEMENTO EN EL DOCX | SALIDA EN MARKDOWN |
|---|---|
| Párrafo tamaño 14 negrita color de módulo | `# Título` |
| Párrafo tamaño 12 negrita | `## Subtítulo` |
| Párrafo 11 negrita cursiva | `### Sub-subtítulo` |
| Runs en negrita | `**texto**` |
| Párrafo con viñeta | `- item` |
| Párrafo con numeración dentro de bloque de técnica | `:::pasos` + lista numerada |
| Párrafo con borde izquierdo / sombreado (callout) | `:::trick` / `:::warn` / `:::clave` según el color |
| Tabla | `:::tabla "Título"` + tabla Markdown |
| Bloque de pregunta con opciones y clave | `:::mcq` |
| Bloque de pregunta abierta | `:::corta` |
| Cita bibliográfica al final | `> referencia` |

Reglas:
- **Preservación total.** El importador no resume, no reordena, no corrige. Si un párrafo es feo, se importa feo. La mejora es un paso posterior y explícito.
- **Round-trip test obligatorio.** Antes de importar en masa: tomá 3 `.docx` representativos (uno corto, uno largo, uno con muchas tablas), convertilos a Markdown, recompilalos con `engine/build.js`, y compará métricas contra el original. Diferencia aceptable: ±2 % en párrafos, 0 en tablas y en pasos. Si no da, arreglá el importador antes de seguir. Informá el resultado.
- Lo que no se pueda mapear se conserva como párrafo plano y se registra en `_import-warnings.md` dentro de la carpeta del tema.

Distribuí el resultado en `contenido/<MOD>/<ID>-<slug>/` con la partición en archivos `00-…` a `13-…`. Si el docx no tiene las 14 secciones identificables, creá las que haya y dejá las faltantes como archivo vacío con un `<!-- FALTA: … -->`.

## Fase 4 — Medición y estado real

1. Corré `engine/validar.py` sobre cada tema importado.
2. Escribí `temario/progreso.json` con los datos **medidos**: `parrafos`, `tablas`, `caracteres`, `anki`, y el `estado` que corresponda por spec (`borrador` < 300p, `ultra` ≥ 300p + 2 tablas, `ultra_plus` ≥ 560p + 3 tablas + resto del spec).
3. En `pendiente` de cada tema, poné la deuda concreta y accionable: `["faltan 2 tablas", "densidad negrita 22% (spec 35-55%)", "sin MCQ", "sección 10 con 61 párrafos de 150"]`.
4. Los temas de `temario.yaml` sin ningún docx quedan en `pendiente` con métricas en cero.

## Fase 5 — Informe

Generá `docs/ESTADO-INICIAL.md` con:

- Avance global y por módulo: cuántos temas en cada estado, en tabla.
- **Los 20 temas con más deuda**, ordenados por cuánto falta para llegar al nivel objetivo.
- **Cobertura**: temas del temario sin ningún archivo.
- **Duplicados** pendientes de resolución.
- **Una recomendación de orden de trabajo** que combine: prioridad de examen (`pri` en el temario) × distancia al objetivo. Un tema `pri: 1` a 40 párrafos del piso vale más que un `pri: 3` desde cero.

Terminá con un commit: `chore: migración de biblioteca legada + estado inicial medido`.

---

## Estado conocido al 22-07-2026 (aproximado — usalo sólo como control cruzado)

Esto viene de la memoria de las sesiones de chat. **No es autoritativo.** Si lo que medís difiere, gana la medición; anotá la discrepancia en el informe, porque cada discrepancia es evidencia de por qué existe este repo.

- **MSA** — 36 entidades generadas; MSA-01 a MSA-10 llevadas a ULTRA+ (la 10 en 195 p / 4 tablas / 32 Anki). Siguiente en la serie: MSA-11 húmero distal.
- **MIA** — 31 entidades generadas, pendientes de regeneración a ULTRA+.
- **MIC** — 23 · **MSC** — 20 · **COL** — entre 8 y 15 según la fuente (verificar; se sabe que ~10 quedaron por debajo de 300 p).
- **TUM** — 11 documentos base + serie de sarcomas de partes blandas: UPS, liposarcoma, sinovial, leiomiosarcoma, fibrosarcoma/mixofibrosarcoma y rabdomiosarcoma cerrados a ULTRA+. Siguiente: MPNST de partes blandas.
- **GEN** — 20 canónicos por encima de 110 p, más ~18 duplicados históricos por debajo de ese umbral, sin resolver.
- **Encares clínicos** (formato oficial UDELAR de 12 pasos) — 10 documentos producidos: miembro inferior agudo, general/urgencia y miembro superior agudo. Faltaban pelvis/acetábulo y trauma raquídeo.

Punto de atención: hay evidencia de que en una sesión se dieron por cerrados 15 documentos de COL y en la revisión posterior sólo 2 cumplían el estándar completo. Tratá todo estado heredado como hipótesis a verificar.
