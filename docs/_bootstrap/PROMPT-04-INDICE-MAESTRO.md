# PROMPT 04 — INSTALAR EL ÍNDICE MAESTRO

> Pegar en Claude Code. Los cuatro archivos convertidos (`temario.yaml`, `remisiones.yaml`,
> `progreso.json`, `bibliografia.yaml`) tienen que estar en la raíz de `upome` antes de empezar.
> Este prompt \*\*reemplaza\*\* el temario provisorio por el índice maestro real de la autora.

\---

La autora produjo el índice maestro definitivo del proyecto: 316 documentos canónicos, 10 módulos, con bloque, estado, prioridad, remisiones, bibliografía ancla y contenido clave por tema. Reemplaza al temario provisorio que se cargó en el bootstrap.

## 1 · Sustituir el temario

* `temario/temario.yaml` ← el nuevo `temario.yaml` de la raíz (316 temas, versión 2).
* `temario/progreso.json` ← el nuevo `progreso.json`. Estados iniciales: `ultra\_plus` (16 ya validados por la autora), `pendiente\_renivelar` (227 existentes por debajo del estándar), `pendiente` (73 sin crear).
* **Ojo:** los 16 marcados `ultra\_plus` vienen del criterio de la autora, no de una medición. Marcalos `validado: false` y agregales a `pendiente` la entrada `"revalidar contra spec"`. El estado se confirma cuando corra la migración.

## 2 · Dos módulos nuevos

Agregá a `engine/spec.json` y a `CLAUDE.md`:

|MÓDULO|DENOMINACIÓN|COLOR|HEX|
|-|-|-|-|
|ART|Artroplastia y cirugía reconstructiva|Gris plata|`64748B`|
|PED|Ortopedia y traumatología pediátrica|Turquesa|`14B8A6`|

Verificá que `tpl.js` y `validar.py` los tomen igual que a los siete existentes. Corré el fixture con `--modulo ART` y `--modulo PED` para comprobar el borde de página.

## 3 · Reglas de asignación de módulo — al `CLAUDE.md`

Las ocho reglas están en `reglas\_de\_asignacion` dentro del temario. Copialas a `CLAUDE.md` en una sección propia. Son vinculantes y resuelven la mayoría de las decisiones de "¿dónde va este tema?". La primera es la que importa: **un tema = un solo archivo canónico en un solo módulo; los demás lo citan por código y nunca lo reescriben.**

## 4 · Remisiones — el mecanismo antiduplicación

* Guardá `remisiones.yaml` en `temario/`.
* Modificá el agente **`curador`**: antes de armar el brief de cualquier tema, consulta `remisiones.yaml`. Si el tema figura como conflicto:

  * Si el tema en curso **es** el canónico → desarrolla el contenido completo según la columna `desarrolla\_el\_canonico`.
  * Si el tema en curso **remite** → desarrolla únicamente lo indicado en `desarrollan\_los\_que\_remiten`, y en el resto **cita el código canónico** en vez de reescribir. Esto va explícito en el brief.
* Modificá **`auditor-formato`**: si un documento que debía remitir desarrolla contenido reservado al canónico, es un hallazgo. La duplicación es un defecto, no volumen extra.
* Modificá **`redactor-ultra`**: la remisión se escribe como referencia cruzada legible, por ejemplo `→ desarrollado en GEN-UR-03 (Síndrome compartimental)`.

Este es el mecanismo que evita que se repitan los 18 duplicados históricos de GEN.

## 5 · Bibliografía ampliada

Reemplazá `docs/BIBLIOGRAFIA.md` por el contenido de `bibliografia.yaml`. Incorpora cinco obras que no estaban en el mapa cerrado anterior:

* Morrey's The Elbow and Its Disorders, 6.ª ed. (2022)
* The Adult Hip, 4.ª ed. — cadera y artroplastia
* Tile, Fractures of the Pelvis and Acetabulum, 4.ª ed. + Letournel-Judet
* **Rockwood \& Wilkins' Fractures in Children, 10.ª ed. (2024)** — imprescindible para PED
* **Tachdjian's Pediatric Orthopaedics, 6.ª ed. (2022)** — imprescindible para PED

Además, el temario trae `bibliografia\_ancla` **por tema**. Hacé que el `curador` la lea y la use para dirigir la búsqueda en la biblioteca indexada, en vez de buscar en todos los libros.

## 6 · Dos agentes especialistas nuevos

Creá en `.claude/agents/`, con el mismo formato que los ocho existentes:

* **`esp-artroplastia`** — referencias: The Adult Hip 4.ª + Campbell's 15.ª. Controla: indicación por edad y demanda, pares de fricción y tribología, vías de abordaje (incluida la Hardinge/lateral directa, que es la que se usa en la institución de la autora), planificación digital, longitud y offset, clasificación de Vancouver y de Su para periprotésicas, estabilidad del vástago como eje de decisión, criterios ICM/EBJIS de infección periprotésica, DAIR vs. uno vs. dos tiempos, revisión y defectos óseos (Paprosky, AAOS).
* **`esp-pediatria`** — referencias: Rockwood \& Wilkins 10.ª + Tachdjian 6.ª. Controla: Salter-Harris y su pronóstico fisario, potencial de remodelación por edad y plano, supracondílea (Gartland, riesgo del interóseo anterior, pulseless hand), monteggia pediátrica, DDC (Graf, Tönnis, Pavlik), Perthes (Herring, Catterall), epifisiólisis (estable/inestable, riesgo de necrosis), pie bot (Pirani, Dimeglio, Ponseti), escoliosis (Risser, Lenke), y las diferencias pediátrico/adulto que el esquema de 12 puntos exige.

## 7 · Contenido clave por tema

El temario trae `contenido\_clave` en cada entrada: las siglas, clasificaciones y conceptos que ese documento tiene que cubrir sí o sí. El `curador` los incorpora al brief como **checklist obligatorio**, y el `auditor-formato` verifica que aparezcan en el texto final. Un tema sin su contenido clave no cumple, aunque las métricas den bien.

## 8 · Orden de generación

Guardá en `docs/PLAN.md` las nueve fases del plan de la autora. El comando `/siguiente` elige dentro de la fase activa, no globalmente. Fase activa inicial: **Fase 0**.

## 9 · Verificación

* `node engine/estado.js dashboard` debe mostrar 316 temas en 10 módulos.
* Los recuentos por módulo tienen que dar: GEN 83 · MSA 36 · MIC 32 · MIA 31 · MSC 30 · PED 30 · COL 25 · TUM 19 · TUMI 15 · ART 15.
* El fixture compila con borde ART y PED.
* Movés los cuatro archivos de la raíz. Commit: `feat: índice maestro 316 temas + remisiones + módulos ART/PED`.







10 · Extras



\- Movés PROMPT-03-BIBLIOTECA.md de la raíz a docs/\_bootstrap/.

\- En ese archivo, corregí la sección de requisitos previos y la Fase 2:

&#x20; el indexador procesa DE A UN LIBRO POR VEZ (copiar de G: a temporal,

&#x20; indexar, borrar la copia antes del siguiente) y NO requiere marcar

&#x20; nada como "Disponible sin conexión" en Drive. Nunca dos libros

&#x20; locales a la vez.

\- Una vez creados esp-artroplastia y esp-pediatria, agregalos también

&#x20; a docs/\_bootstrap/AGENTES.md para que siga siendo el espejo exacto

&#x20; de .claude/agents/ (quedan 19).



