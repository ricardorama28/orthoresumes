# ESQUEMA-12 — El encare de 12 puntos (contrato de contenido)

Todo tema sigue este encare, en este orden, con estos subaspectos obligatorios. Es **vinculante**: `revisor-clinico` verifica que ningún subaspecto marcado como obligatorio falte. La numeración de archivos va de `00` a `13` (el punto 13 es el cierre).

El cierre siempre responde cuatro preguntas: **qué define la gravedad**, **qué determina el tratamiento**, **cuáles son las complicaciones más importantes**, **cuáles son los factores pronósticos**.

---

## 00 · Definición y marco general — `00-definicion.md`

- Definición precisa de la entidad (qué es, qué no es).
- Ubicación nosológica y relevancia para el examen.
- Epónimos y terminología (con autor/año cuando aplique).
- Panorama de lo que el tema va a cubrir. Correlación mecanismo → patrón → tratamiento anticipada.

## 01 · Presentación clínica — `01-presentacion.md`

- **Mecanismo lesional** (alta vs baja energía; directo vs indirecto).
- **Edad y contexto** (pico etario, bimodalidad, sexo).
- **Síntomas** referidos por el paciente.
- **Signos** al examen.
- **Examen físico sistemático**: inspección, palpación, movilidad, maniobras específicas con su sensibilidad/especificidad.
- **Banderas rojas y urgencias**: compromiso vascular, nervioso, síndrome compartimental, exposición, luxación irreductible. Qué obliga a quirófano ya.
- Diferencias pediátrico/adulto cuando corresponda.

## 02 · Imágenes — `02-imagenes.md`

- **Radiografía**: proyecciones obligatorias, cuándo pedir cada una.
- **Análisis radiográfico sistemático**: líneas, ángulos, índices con sus valores normales (mm/°).
- **TC**: indicaciones, qué agrega, reconstrucciones.
- **RM**: indicaciones, secuencias, hallazgos.
- **Angio-TC / otros** cuando el compromiso vascular lo exija.
- Errores de interpretación frecuentes (pitfalls radiológicos).

## 03 · Diagnóstico — `03-diagnostico.md`

- **Diagnóstico presuntivo** (sospecha clínica).
- **Diagnóstico positivo** (qué lo confirma).
- **Diagnósticos diferenciales** con los criterios que los separan.

## 04 · Clasificación — `04-clasificacion.md`

- **AO/OTA** (código alfanumérico) siempre que exista.
- **Clasificaciones específicas** con **autor y año**.
- **Implicancia terapéutica** de cada tipo: la clasificación que no cambia la conducta no se incluye.
- Incluye **≥ 2 tablas** (esta sección concentra el grueso de las tablas del tema).

## 05 · Epidemiología — `05-epidemiologia.md`

- Incidencia y prevalencia (con cifras y fuente).
- Distribución por edad, sexo, mecanismo.
- Tendencias temporales relevantes.

## 06 · Etiología y factores de riesgo — `06-etiologia.md`

- Causas y mecanismos.
- Factores de riesgo modificables y no modificables.
- Asociaciones lesionales (qué buscar cuando aparece esta lesión).

## 07 · Anatomía y anatomía patológica — `07-anatomia.md`

- **Anatomía descriptiva** relevante (osteología, inserciones, vascularización, inervación).
- **Anatomía quirúrgica** (vías de abordaje, estructuras en riesgo).
- **Anatomía patológica**: qué le pasa al tejido (macro y micro cuando aplique).

## 08 · Fisiopatología — `08-fisiopatologia.md`

- Cadena de eventos desde el insulto hasta la disfunción.
- Por qué el patrón lesional es el que es (biomecánica).
- Base de las complicaciones y del pronóstico.

## 09 · Historia natural / pronóstico sin tratamiento — `09-historia-natural.md`

- Evolución espontánea sin intervención.
- Qué justifica tratar (y qué justifica no tratar).
- Factores que modifican la evolución.

## 10 · Tratamiento — `10-tratamiento.md`

- **Objetivos** del tratamiento.
- **Algoritmo terapéutico** explícito (idealmente con diagrama en el HTML).
- **Tratamiento ortopédico**: indicaciones, método, umbrales de aceptabilidad de la reducción (mm/°), tiempos.
- **Tratamiento quirúrgico**: indicaciones, timing, elección del implante.
- **Técnica paso a paso** (≥ 40 pasos numerados en bloques `:::pasos`): posición, abordaje, reducción, fijación, cierre.
- Diferencias por tipo/estabilidad y por edad.

## 11 · Rehabilitación y cuidados postoperatorios — `11-rehabilitacion.md`

- Protocolo por fases (inmovilización, movilidad, carga).
- Criterios de progresión.
- Retorno a la actividad / deporte / trabajo (con plazos).

## 12 · Complicaciones — `12-complicaciones.md`

- **Inmediatas** (intraoperatorias y perioperatorias).
- **Mediatas** (primeras semanas).
- **Tardías** (consolidación viciosa, seudoartrosis, artrosis, rigidez, necrosis).
- Para cada una: **prevención** y **manejo**.

## 13 · Cierre — `13-cierre.md`

- **Perlas UDELAR**: lo de alto rendimiento para el oral.
- **Algoritmo** resumido.
- **MCQ** con clave (≥ 14 para ULTRA+).
- **Preguntas de respuesta corta** (≥ 10 para ULTRA+).
- **Bibliografía** con año, según `docs/BIBLIOGRAFIA.md`.
- Cierre con las **cuatro preguntas**: gravedad, tratamiento, complicaciones importantes, factores pronósticos.

---

**Regla transversal**: los *tricks and pitfalls* se distribuyen por todo el texto (callouts `:::trick` y `:::warn` en cada sección), no se agrupan al final. El razonamiento clínico es explícito: siempre el **por qué**, no sólo el qué.
