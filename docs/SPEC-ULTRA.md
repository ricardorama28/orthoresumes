# SPEC-ULTRA — El estándar, en números

Este documento es la **especificación ejecutable** de calidad. Lo que dice acá lo verifica `engine/validar.py`, que devuelve exit code ≠ 0 si un tema no alcanza el nivel solicitado. Si la prosa y el número se contradicen, **gana el número**.

Hay dos niveles. El validador reporta el nivel alcanzado y falla si está por debajo del objetivo. Nivel por defecto de todo tema nuevo: **ULTRA+**.

## Umbrales por nivel

| MÉTRICA | ULTRA | ULTRA+ |
|---|---|---|
| Párrafos de cuerpo (no vacíos) | ≥ 300 | ≥ 560 · objetivo 600–650 |
| Caracteres | ≥ 38.000 | ≥ 64.000 |
| Tablas | ≥ 2 | ≥ 3 |
| Pasos quirúrgicos numerados | ≥ 20 | ≥ 40 |
| Callouts (`trick`/`warn`/`clave`) | ≥ 12, distribuidos | ≥ 25, ≥ 1 por sección |
| Densidad de negrita | 35–55 % de párrafos con negrita | ídem |
| MCQ con clave | ≥ 10 | ≥ 14 |
| Preguntas de respuesta corta | ≥ 6 | ≥ 10 |
| Tarjetas Anki | ≥ 20 | ≥ 25 |
| Criterios cuantitativos (mm/°/%/meses) | ≥ 15 ocurrencias | ≥ 25 |
| Referencias con año | ≥ 10, ninguna > 10 años salvo clásicos | ≥ 15 |

**Densidad de negrita**: se mide como fracción de *párrafos de cuerpo* (prosa y listas) que contienen al menos una marca `**…**`. Fuera de rango en cualquier dirección es defecto: si todo está en negrita, nada lo está. Los títulos no cuentan para el denominador.

**Referencias con año**: líneas de cita (`> …`) que contengan un año de 4 dígitos. Se admite `> 10 años` de antigüedad sólo para clásicos fundacionales citados por nombre y año (Mirels 1989, Patchell 2005, Gustilo-Anderson 1976, etc.). Ver `docs/BIBLIOGRAFIA.md`.

## Presupuesto de párrafos

Es el mecanismo central que elimina los 3–5 pases de expansión: se entrega al redactor **antes** de escribir, y `engine/contar.js` lo verifica sobre el Markdown crudo **sin compilar**, sección por sección.

| ARCHIVO | SECCIÓN | PÁRRAFOS |
|---|---|---|
| `00-definicion.md` | Definición y marco general | 25 |
| `01-presentacion.md` | Presentación clínica | 65 |
| `02-imagenes.md` | Imágenes | 55 |
| `03-diagnostico.md` | Diagnóstico | 30 |
| `04-clasificacion.md` | Clasificación (incluye ≥ 2 tablas) | 50 |
| `05-epidemiologia.md` | Epidemiología | 18 |
| `06-etiologia.md` | Etiología y factores de riesgo | 22 |
| `07-anatomia.md` | Anatomía y anatomía patológica | 50 |
| `08-fisiopatologia.md` | Fisiopatología | 28 |
| `09-historia-natural.md` | Historia natural / pronóstico | 22 |
| `10-tratamiento.md` | Tratamiento (≥ 40 pasos) | 150 |
| `11-rehabilitacion.md` | Rehabilitación y cuidados posoperatorios | 30 |
| `12-complicaciones.md` | Complicaciones | 50 |
| `13-cierre.md` | Perlas + algoritmo + MCQ + cortas + biblio | 50 |
| | **TOTAL** | **645** |

`contar.js` imprime, por sección: objetivo, real, delta y un semáforo (🟢 ≥ objetivo · 🟡 dentro del 15 % por debajo · 🔴 más del 15 % por debajo). El redactor lo corre después de cada tanda de 2–3 secciones, **nunca** al final.

## Reglas de conteo (contrato entre `contar.js` y `validar.py`)

Cada **línea de contenido = 1 párrafo** del `.docx`, con estas excepciones históricas ya resueltas (no reintroducir):

- **`:::tabla` aporta 0 párrafos.** Ni el título ni las filas cuentan (igual que `make_table()` en el motor viejo). Las tablas se cuentan aparte, en su propia métrica.
- **Bibliografía de *n* entradas aporta *n + 1* párrafos**: el subtítulo de la sección más las *n* citas.
- **Prosa densa subestima el piso.** Los párrafos largos de prosa quedan 15–30 % por debajo del conteo esperado. Se compensa con secciones de **lista** y contenido clínico real (clasificaciones, umbrales numéricos, manejo de complicaciones), **nunca con relleno**.

Nodos que **sí** cuentan como párrafo: títulos (`#`/`##`/`###`), prosa, ítems de lista, cada línea de callout, cada paso numerado y el rótulo del bloque de pasos, cada opción y la explicación de un MCQ, cada pregunta corta, cada cita `> …`.

## Formato de salida (invariante, no negociable)

- **Página**: A4, márgenes estándar, borde de página **1,5 pt** del color del módulo (requiere `PageBorderDisplay` + `PageBorderOffsetFrom` en `docx@9.6.1`).
- **Tipografía**: Calibri — cuerpo 11, subtítulos 12, títulos 14. Interlineado **1,15**, texto **justificado**.
- **Encabezado**: `TRAUMATOLOGÍA Y ORTOPEDIA`, negrita, centrado.
- **Pie**: `VZ – 2026`, negrita, centrado.
- **Tablas**: primera fila y primera columna en **MAYÚSCULA + negrita + centrado**; *zebra striping*.

## Colores de módulo

| MÓDULO | NOMBRE | COLOR |
|---|---|---|
| GEN | Generales | `EAB308` |
| TUM | Tumores | `C55A11` |
| MSA | Miembro superior agudo | `38BDF8` |
| MSC | Miembro superior crónico | `2563EB` |
| MIA | Miembro inferior agudo | `EC4899` |
| MIC | Miembro inferior crónico | `7C3AED` |
| COL | Columna | `16A34A` |
