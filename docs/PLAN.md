# PLAN — Orden de generación por fases

El proyecto se produce **por fases**, no globalmente. `/siguiente` elige el próximo tema **dentro de la fase activa**; `/tema <ID>` sigue funcionando para cualquier tema de cualquier fase. **La fase ordena el trabajo, no lo restringe.**

- **Fase activa inicial: 0.**
- Definición de las fases y puntero `fase_activa`: `temario/fases.yaml`.
- Cada entrada de `temario/temario.yaml` trae su campo `fase`, para que el temario sea autosuficiente y no haya que cruzar dos archivos en cada consulta.
- Derivado de la hoja **ORDEN DE GENERACIÓN** del Índice Maestro 2026.

## Las nueve fases

| FASE | CONTENIDO | DOCS | CRITERIO |
|---|---|---|---|
| **0** | Cerrar series abiertas: **MSA** completo y **TUMI** completo | **51** | Ya iniciadas; no dejar series a medio camino |
| **1** | GEN de alto rendimiento: `GEN-PT`, `GEN-UR`, `GEN-BM` y `GEN-IN-05` (TBC) | **29** | Se preguntan siempre y alimentan por remisión a todos los módulos |
| **2** | **MIA** completo | **31** | Módulo de guardia; máximo rendimiento clínico y de examen |
| **3** | **COL** completo | **25** | Mayor brecha entre lo que existe y lo que se exige |
| **4** | **MIC** y **MSC** | **62** | Volumen alto, menor densidad quirúrgica por documento |
| **5** | **ART** completo | **15** | Módulo nuevo; alta rentabilidad en oral y ateneo |
| **6** | GEN restante: ciencias básicas, metabólicas, artropatías, perioperatorio, rehabilitación, médico-legal | **54** | Completa el bloque de generalidades |
| **7** | **TUM** completo | **19** | Serie ya estructurada, avanza sola |
| **8** | **PED** completo | **30** | Requiere Rockwood & Wilkins 10.ª y Tachdjian 6.ª en la biblioteca |

**Total: 316.**

## Cómo elige `/siguiente`

Dentro de la **fase activa**, entre los temas **sin cerrar**:

1. Por **prioridad** (`pri` 1 → 2 → 3).
2. A igual prioridad, por **distancia al nivel objetivo** — primero los que más faltan:
   `pendiente` (5) → `pendiente_renivelar` (4) → `esqueleto` (3) → `borrador` (2) → `ultra` (1) → `ultra_plus` sin validar (0).
3. A igual prioridad y distancia, por ID.

**Cerrado** = estado `ultra`/`ultra_plus` **y** `validado: true`. Los 16 `ultra_plus` heredados están con `validado: false` (vienen del criterio de la autora, no de una medición), así que cuentan como **sin cerrar** hasta que `validar.py` los confirme — pero ordenan últimos, porque son los que menos deuda tienen.

Cuando **no queda ningún tema sin cerrar** en la fase activa, `/siguiente` avisa y **propone** avanzar a la siguiente: **no avanza solo**.

## Comandos

```bash
/fase                 # muestra la fase activa, su avance y el de todas las fases
/fase 2               # cambia la fase activa a 2
/siguiente            # produce el próximo tema DENTRO de la fase activa
/tema ART-05          # produce un tema puntual de cualquier fase
/estado               # dashboard global + avance de la fase activa
```

Bajo el capó: `node engine/estado.js fase [N]`, `node engine/estado.js siguiente`, `node engine/estado.js dashboard`.

## Nota de trazabilidad

La fase 0 del Excel decía "MSA-09 a MSA-36 y TUMI-11 + restantes". Acá se asignaron los módulos **MSA y TUMI completos** a la fase 0, porque los ya cerrados igual necesitan **revalidación contra el spec** (los 16 `ultra_plus` están con `validado: false`). El orden por prioridad y por deuda pone primero los que faltan.
