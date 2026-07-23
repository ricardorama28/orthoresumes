# UPOME

Biblioteca de monografías de **Traumatología y Ortopedia** en español, nivel examen de especialista (COT/UDELAR). Una sola fuente Markdown por tema → `.docx`, `.pdf`, `.html` interactivo y mazo `.tsv` de Anki. Autora: VZ · 2026.

## Cómo se usa (en 10 líneas)

```bash
bash scripts/setup.sh              # instala dependencias (node + python) y verifica soffice
/estado                            # SIEMPRE lo primero: dónde estamos (lee temario/progreso.json)
/siguiente                         # produce el próximo tema por prioridad
/tema MSA-11                       # produce un tema específico
/expandir COL-04                   # lleva un tema existente al nivel objetivo
/publicar MSA-11                   # docx + pdf + html + anki a salida/
node engine/contar.js MSA-11       # presupuesto de párrafos por sección, SIN compilar
node engine/build.js MSA-11 --all  # compila todas las salidas
python engine/validar.py MSA-11    # gate de calidad (exit ≠ 0 si no cumple el nivel)
```

## Reglas de oro

1. **El estado vive en `temario/progreso.json`**, no en tu cabeza ni en el chat. Toda sesión empieza leyéndolo (`/estado`).
2. **Una fuente, tres salidas.** El contenido se escribe una sola vez en `contenido/<MOD>/<ID>-<slug>/*.md`. Nunca se escribe en formato de salida.
3. **El estándar es numérico** y lo verifica `engine/validar.py`. Ningún tema pasa a `ultra`/`ultra_plus` con el validador en rojo.
4. **Presupuesto antes de escribir.** Mirá `docs/SPEC-ULTRA.md` y corré `node engine/contar.js <ID>` cada 2–3 secciones.

## Mapa del repo

| Ruta | Qué es |
|---|---|
| `CLAUDE.md` | Constitución del repositorio (contrato de contenido y formato). |
| `docs/` | `SPEC-ULTRA.md` (estándar numérico), `ESQUEMA-12.md` (encare de 12 puntos), `BIBLIOGRAFIA.md` (ediciones cerradas), `WORKFLOW.md` (ciclo por tema). |
| `temario/` | `temario.yaml` (índice canónico) · `progreso.json` (**única fuente de verdad del estado**). |
| `contenido/` | Markdown por tema: `<MOD>/<ID>-<slug>/00-…13-*.md`, `tablas/`, `anki.tsv`. |
| `engine/` | Motor de compilación: `tpl.js`, `md.js`, `render-docx.js`, `render-html.js`, `build.js`, `contar.js`, `estado.js`, `validar.py`. |
| `plantillas/` | Shell del HTML interactivo y prompt reutilizable. |
| `.claude/` | Agentes, skills y slash-commands. |
| `scripts/` | `setup.sh`, `nuevo-tema.sh`. |
| `salida/` | Compilados (git-ignored). |

## Requisitos

- **Node ≥ 18** (motor de compilación; `docx@^9.6.1`, `js-yaml`, `marked`).
- **Python 3** con `python-docx` (validador). Ver `engine/requirements.txt`.
- **LibreOffice** (`soffice`) opcional, para el PDF. Si falta, el build degrada con aviso y omite el PDF.
