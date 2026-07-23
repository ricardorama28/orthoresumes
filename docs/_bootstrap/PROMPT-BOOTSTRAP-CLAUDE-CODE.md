# PROMPT DE BOOTSTRAP — pegar en Claude Code sobre el repositorio vacío

> Uso: `cd upome && claude` y pegar todo lo que sigue como primer mensaje.
> Claude Code va a crear la estructura completa, el motor, los agentes, los skills y los slash-commands.
> No genera contenido médico en este paso: sólo la infraestructura.

---

Estás inicializando **UPOME**, un repositorio que produce una biblioteca de monografías de Traumatología y Ortopedia en español para el examen de especialista de UDELAR (Uruguay). El repositorio está vacío. Tu tarea en esta sesión es **construir toda la infraestructura**, no el contenido.

## Contexto del problema que este repo resuelve

Este proyecto se venía haciendo dentro de conversaciones de chat. Fallaba por seis razones concretas que el diseño debe corregir explícitamente:

1. El estado (qué tema está hecho, a qué nivel) vivía en la memoria del chat → **el estado debe vivir en `temario/progreso.json`, versionado en git.**
2. El motor de plantilla (`tpl.js`) se perdía en cada reinicio de entorno y se reconstruía a mano → **el motor debe estar committeado en `engine/`.**
3. El estándar de calidad estaba en prosa y se interpretaba distinto cada vez → **debe ser numérico y verificado por un validador que hace fallar el build.**
4. El conteo de párrafos se conocía sólo tras compilar, forzando 3–5 pases de expansión por documento → **debe existir un presupuesto de párrafos por sección, entregado al redactor antes de escribir, y un contador que se ejecute sobre el Markdown sin compilar.**
5. El contenido vivía dentro de strings de JavaScript → **el contenido debe ser Markdown puro con directivas, y el renderizado un paso separado.**
6. Todo se hacía en un solo hilo de razonamiento → **debe haber subagentes con roles separados.**

Corregí las seis. Si alguna decisión de diseño tuya entra en conflicto con estos seis puntos, gana la lista.

## Principio arquitectónico central

**Una fuente, tres salidas.** El contenido se escribe una sola vez en Markdown y se compila a `.docx` (por defecto), `.pdf` y `.html` interactivo. Nunca se escribe contenido dos veces para dos formatos.

```
contenido/*.md  ──►  engine/build.js  ──┬──►  salida/docx/*.docx
                                        ├──►  salida/pdf/*.pdf
                                        ├──►  salida/html/*.html
                                        └──►  salida/anki/*.tsv
```

## Estructura a crear

```
upome/
├─ CLAUDE.md                      # constitución del repo (te la paso aparte; si no está, generala según este prompt)
├─ README.md                      # cómo usar el repo en 10 líneas
├─ .gitignore                     # node_modules, salida/, fuentes/*.pdf, .venv
├─ docs/
│  ├─ SPEC-ULTRA.md               # el estándar, en números
│  ├─ ESQUEMA-12.md               # el encare de 12 puntos con subaspectos obligatorios
│  ├─ BIBLIOGRAFIA.md             # ediciones cerradas por subespecialidad
│  └─ WORKFLOW.md                 # ciclo de trabajo por tema
├─ temario/
│  ├─ temario.yaml                # índice canónico de temas (te lo paso; si no, dejá el esqueleto)
│  └─ progreso.json               # ÚNICA fuente de verdad del estado
├─ fuentes/
│  ├─ cot/                        # PDFs Temas COT/UDELAR
│  └─ notas/                      # apuntes propios
├─ contenido/
│  └─ <MOD>/<ID>-<slug>/
│      ├─ meta.yaml
│      ├─ 00-definicion.md … 12-complicaciones.md
│      ├─ 13-cierre.md
│      ├─ tablas/*.md
│      └─ anki.tsv
├─ engine/
│  ├─ package.json                # dependencia: docx@^9.6.1, js-yaml, marked
│  ├─ tpl.js                      # primitivas de documento
│  ├─ md.js                       # parser de Markdown + directivas → AST
│  ├─ render-docx.js
│  ├─ render-html.js
│  ├─ build.js                    # CLI: node build.js MSA-11 [--pdf] [--html] [--all]
│  ├─ contar.js                   # presupuesto de párrafos SIN compilar
│  ├─ estado.js                   # lee/escribe progreso.json
│  └─ validar.py                  # gate de calidad, exit code ≠ 0 si no cumple
├─ plantillas/
│  ├─ interactivo.html            # shell del HTML interactivo
│  └─ prompt-html.md              # prompt reutilizable para generar HTML de cualquier tema
├─ .claude/
│  ├─ settings.json
│  ├─ agents/{curador,redactor-ultra,revisor-clinico,auditor-formato,anki}.md
│  ├─ skills/{ultra-docx,encare-12,anki-tsv,html-interactivo}/SKILL.md
│  └─ commands/{estado,siguiente,tema,expandir,auditar,publicar}.md
├─ scripts/
│  ├─ setup.sh                    # npm ci + venv + verificación de soffice
│  └─ nuevo-tema.sh               # scaffolding de una carpeta de tema
└─ salida/{docx,pdf,html,anki}/   # .gitignore excepto .gitkeep
```

## SPEC-ULTRA (grabalo en `docs/SPEC-ULTRA.md` y usalo en `validar.py`)

Dos niveles. El validador debe reportar el nivel alcanzado y fallar si está por debajo del solicitado.

| MÉTRICA | ULTRA | ULTRA+ |
|---|---|---|
| Párrafos de cuerpo (no vacíos) | ≥ 300 | ≥ 560, objetivo 600–650 |
| Caracteres | ≥ 38.000 | ≥ 64.000 |
| Tablas | ≥ 2 | ≥ 3 |
| Pasos quirúrgicos numerados | ≥ 20 | ≥ 40 |
| Callouts (trick/warn/clave) | ≥ 12, distribuidos | ≥ 25, ≥ 1 por sección |
| Densidad de negrita | 35–55 % de párrafos con negrita | ídem |
| MCQ con clave | ≥ 10 | ≥ 14 |
| Preguntas de respuesta corta | ≥ 6 | ≥ 10 |
| Tarjetas Anki | ≥ 20 | ≥ 25 |
| Criterios cuantitativos (mm/°/%) | ≥ 15 ocurrencias | ≥ 25 |
| Referencias con año | ≥ 10, ninguna > 10 años salvo clásicos | ≥ 15 |

Formato fijo, no negociable: A4, Calibri 11 cuerpo / 12 subtítulos / 14 títulos, interlineado 1,15, justificado. Encabezado **TRAUMATOLOGÍA Y ORTOPEDIA** negrita centrado. Pie **VZ – 2026** negrita centrado. Borde de página 1,5 pt del color del módulo. Tablas: primera fila y primera columna en MAYÚSCULA + negrita + centrado, zebra striping.

Colores de módulo:
```
GEN Generales              EAB308
TUM Tumores                C55A11
MSA Miembro superior agudo 38BDF8
MSC Miembro superior crón. 2563EB
MIA Miembro inferior agudo EC4899
MIC Miembro inferior crón. 7C3AED
COL Columna                16A34A
```

## Presupuesto de párrafos (el mecanismo que evita los 5 pases de expansión)

Grabalo en `docs/SPEC-ULTRA.md` y hacé que `engine/contar.js` lo verifique **por sección** sobre el Markdown crudo, antes de compilar:

| ARCHIVO | SECCIÓN | PÁRRAFOS |
|---|---|---|
| 00 | Definición y marco general | 25 |
| 01 | Presentación clínica | 65 |
| 02 | Imágenes | 55 |
| 03 | Diagnóstico | 30 |
| 04 | Clasificación (incluye ≥2 tablas) | 50 |
| 05 | Epidemiología | 18 |
| 06 | Etiología y factores de riesgo | 22 |
| 07 | Anatomía y anatomía patológica | 50 |
| 08 | Fisiopatología | 28 |
| 09 | Historia natural | 22 |
| 10 | Tratamiento (≥40 pasos) | 150 |
| 11 | Rehabilitación | 30 |
| 12 | Complicaciones | 50 |
| 13 | Cierre: perlas + algoritmo + MCQ + cortas + biblio | 50 |
| | **TOTAL** | **645** |

`contar.js` debe imprimir una tabla sección por sección con: objetivo, real, delta, y un semáforo. El redactor lo corre antes de pedir compilación.

## Dialecto Markdown (definilo en `engine/md.js`)

Markdown estándar más estas directivas. Cada línea de contenido = 1 párrafo del docx.

```markdown
# Título de sección          → título 14 negrita, color de módulo
## Subtítulo                 → subtítulo 12 negrita
### Sub-subtítulo            → 11 negrita cursiva
Párrafo normal con **negrita selectiva**.
- item de lista              → viñeta, 1 párrafo
1. paso                      → dentro de :::pasos, numerado, 1 párrafo

:::trick
Truco intraoperatorio o mnemotecnia.
:::

:::warn
Pitfall. Error frecuente. Qué NO hacer.
:::

:::clave
Concepto de alto rendimiento para el examen.
:::

:::pasos "Osteosíntesis con placa lateral"
1. Paciente en decúbito supino...
2. ...
:::

:::tabla "Clasificación de Weber"
| TIPO | NIVEL | SINDESMOSIS | TRATAMIENTO |
|---|---|---|---|
| A | Infrasindesmal | Íntegra | Ortopédico |
:::

:::mcq
P: ¿Cuál es el ángulo de Böhler normal?
a) 10–20°
b) 20–40°   ✓
c) 40–60°
R: El ángulo de Böhler normal es 20–40°...
:::

:::corta
Enunciá los criterios de reducción aceptable en fractura de meseta tibial.
:::

> Cita bibliográfica / referencia
```

Regla dura: `:::tabla` no cuenta como párrafo en el conteo (igual que hoy con `make_table()`); todo lo demás sí.

## `temario/progreso.json` — la pieza más importante

Esquema:

```json
{
  "version": 1,
  "actualizado": "2026-07-22",
  "temas": {
    "MSA-10": {
      "titulo": "Fractura diafisaria de húmero + parálisis radial",
      "modulo": "MSA",
      "estado": "ultra_plus",
      "parrafos": 195,
      "tablas": 4,
      "caracteres": 61200,
      "anki": 32,
      "validado": true,
      "fecha": "2026-07-20",
      "commit": "a1b2c3d",
      "notas": "Sarmiento, Holstein-Lewis, algoritmo parálisis primaria vs secundaria",
      "pendiente": []
    }
  }
}
```

`estado` ∈ `pendiente | esqueleto | borrador | ultra | ultra_plus | obsoleto`.

Reglas que debés implementar:
- **Ningún tema puede marcarse `ultra` o `ultra_plus` sin que `validar.py` haya devuelto 0.** `estado.js` debe rechazar la escritura manual de ese estado.
- Cada build exitoso actualiza `progreso.json` y hace `git add` de la carpeta del tema.
- El campo `pendiente` es una lista de deudas concretas ("faltan 2 tablas", "densidad de negrita 22 %").

## Subagentes (`.claude/agents/`)

Cinco, con responsabilidad estrictamente separada. Cada uno con su propio contexto.

1. **`curador`** — Lee `temario.yaml`, `progreso.json` y `fuentes/`. No escribe contenido. Decide el próximo tema por prioridad (peso en examen × relevancia clínica × dificultad conceptual), arma el `meta.yaml` del tema, extrae de `fuentes/cot/Tema_NN_*.pdf` el material relevante y produce un **brief de fuentes** (`contenido/<ID>/_brief.md`) con: clasificaciones a incluir, criterios cuantitativos hallados, referencias con año, y qué dice el COT vs qué dice Rockwood. Herramientas: Read, Grep, Glob, Bash.

2. **`redactor-ultra`** — Recibe el brief y el presupuesto de párrafos. Escribe los archivos `NN-*.md`. **Escribe de a 2–3 secciones por invocación, nunca el documento entero**, y corre `node engine/contar.js <ID>` después de cada tanda. Regla: prosa densa con `bi()` subestima el piso; si una sección queda corta, se agrega contenido clínico real (clasificaciones, criterios numéricos, manejo de complicaciones), **nunca relleno**. Herramientas: Read, Write, Edit, Bash.

3. **`revisor-clinico`** — No mira formato. Verifica: que cada clasificación tenga autor y año, que los criterios cuantitativos sean correctos y citables, que las indicaciones quirúrgicas se correspondan con el patrón lesional, que no haya afirmaciones sin respaldo, que las ediciones bibliográficas coincidan con `docs/BIBLIOGRAFIA.md`. Produce un informe con hallazgos accionables. Herramientas: Read, Grep, WebSearch.

4. **`auditor-formato`** — Corre `contar.js` y `validar.py`, interpreta la salida y lista exactamente qué falta para el nivel objetivo. No arregla: reporta. Herramientas: Bash, Read.

5. **`anki`** — Genera `anki.tsv` a partir del contenido ya validado. Cabeceras `#separator:tab` / `#html:false` / `#tags column:3`. Tag `<MOD> <entidad>`. Tarjetas atómicas, nunca párrafos enteros; prioriza criterios numéricos, clasificaciones y tricks/pitfalls. Herramientas: Read, Write.

## Slash-commands (`.claude/commands/`)

- **`/estado`** → dashboard: por módulo, cuántos temas en cada estado, % de avance global, los 5 con más deuda en `pendiente`, y el próximo recomendado. Es lo primero que corre cualquier sesión nueva. **Sustituye por completo a "¿dónde habíamos quedado?".**
- **`/siguiente`** → invoca `curador` → `redactor-ultra` → `auditor-formato` → `revisor-clinico` → `anki` sobre el próximo tema, y compila.
- **`/tema <ID>`** → lo mismo para un tema específico.
- **`/expandir <ID>`** → toma un tema por debajo del spec y lo lleva al nivel objetivo usando el informe de `auditor-formato`. Este es el comando que resuelve los 18 duplicados GEN y los COL cortos.
- **`/auditar [modulo]`** → corre el validador sobre todo lo compilado y reconstruye `progreso.json` desde la realidad del disco. Es la red de seguridad contra la deriva de estado.
- **`/publicar <ID>`** → docx + pdf + html + tsv a `salida/`.

## Skills (`.claude/skills/`)

- `ultra-docx` — cómo usar `engine/` correctamente, la API de `tpl.js`, los dos bugs históricos ya resueltos (borde de página en docx 9.6.1; orden de elementos de borde en OOXML dentro de los callouts) documentados para que nadie los reintroduzca.
- `encare-12` — el esquema de 12 puntos con todos los subaspectos obligatorios de cada punto. Es el contrato de contenido.
- `anki-tsv` — formato y criterios de tarjeta.
- `html-interactivo` — ver `plantillas/prompt-html.md`.

## Tareas concretas de esta sesión

Ejecutá en este orden y no avances si algo falla:

1. `git init` si hace falta, `.gitignore`, `README.md`.
2. Creá `docs/SPEC-ULTRA.md`, `docs/ESQUEMA-12.md`, `docs/BIBLIOGRAFIA.md`, `docs/WORKFLOW.md` con el contenido de arriba.
3. Creá `engine/` completo. `tpl.js` debe implementar: A4, márgenes, Calibri, borde de página por módulo, encabezado/pie, tablas con primera fila y columna en mayúscula-negrita-centrado y zebra, y los tres tipos de callout. Instalá `docx@^9.6.1`.
4. Creá `engine/md.js` con el parser de directivas, `render-docx.js`, `render-html.js`, `build.js`, `contar.js`, `estado.js`, `validar.py`.
5. **Test de humo obligatorio:** creá `contenido/_demo/DEMO-01-prueba/` con las 14 secciones y contenido dummy que cumpla el presupuesto, compilalo a docx, pdf y html, y corré `validar.py`. No sigas hasta ver `TODAS LAS VALIDACIONES OK`. Después borrá el demo.
6. Creá `.claude/` completo: settings, 5 agentes, 4 skills, 6 comandos.
7. Creá `temario/temario.yaml` (si te paso el archivo, usalo; si no, generá el esqueleto con los 7 módulos) y `temario/progreso.json` inicializado con todos los temas en `pendiente`.
8. Creá `plantillas/interactivo.html` y `plantillas/prompt-html.md`.
9. `scripts/setup.sh` y `scripts/nuevo-tema.sh`.
10. Commit inicial: `chore: infraestructura UPOME v1`.
11. Imprimí un resumen de qué quedó creado y cuál es el comando exacto para producir el primer tema real.

## Restricciones

- Español rioplatense en toda la documentación y el contenido generado.
- Nada de contenido médico en esta sesión salvo el dummy del test de humo.
- Todo comando debe funcionar desde la raíz del repo.
- `validar.py` con Python 3 estándar + `python-docx`. Creá un `requirements.txt`.
- Si `soffice` no está disponible para el PDF, degradá con aviso claro en vez de fallar el build entero.
