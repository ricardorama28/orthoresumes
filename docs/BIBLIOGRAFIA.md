# BIBLIOGRAFÍA — Ediciones cerradas

Ediciones de referencia por área (fuente canónica: `temario/bibliografia.yaml`, versión 2). **No se usan ediciones anteriores.** `bibliografo` verifica que las citas de cada tema coincidan con la edición que le corresponde.

| ÁREA | OBRA | EDICIÓN |
|---|---|---|
| Trauma del adulto | *Rockwood & Green's Fractures in Adults* | **10.ª ed.** (2024) |
| Principios de osteosíntesis | *AO Principles of Fracture Management* + **AO Surgery Reference** | **3.ª ed.** + web vigente |
| Ortopedia general y reconstructiva | *Campbell's Operative Orthopaedics* | **15.ª ed.** (2026) — **nunca la 14.ª** |
| Hombro | *Rockwood & Matsen's The Shoulder* | **6.ª ed.** (2021) |
| Codo | *Morrey's The Elbow and Its Disorders* | **6.ª ed.** (2022) — **nueva** |
| Mano y muñeca | *Green's Operative Hand Surgery* | **8.ª ed.** (2022) |
| Cadera y artroplastia | *The Adult Hip* + *Campbell's* 15.ª | **4.ª ed.** + 15.ª ed. — *The Adult Hip* **nueva** |
| Rodilla y deporte | *Insall & Scott Surgery of the Knee* | **7.ª ed.** (2024) |
| Pie y tobillo | *Coughlin & Mann's Surgery of the Foot and Ankle* | **10.ª ed.** (2023) |
| Columna | *Rothman-Simeone & Herkowitz's The Spine* + **AOSpine** | **8.ª ed.** (2024) |
| Pelvis y acetábulo | *Tile, Fractures of the Pelvis and Acetabulum* + **Letournel-Judet** | **4.ª ed.** + clásico — **nueva** |
| Tumores | *WHO Classification of Tumours (Soft Tissue and Bone)* + *OKU Musculoskeletal Tumors* | **5.ª ed.** (2020) + **5.ª ed.** (2024) |
| Trauma pediátrico | *Rockwood & Wilkins' Fractures in Children* | **10.ª ed.** (2024) — **nueva, imprescindible para PED** |
| Ortopedia pediátrica | *Tachdjian's Pediatric Orthopaedics* | **6.ª ed.** (2022) — **nueva, imprescindible para PED** |
| Artículos | Revistas indexadas (últimos 10 años) vía **Portal Timbó (ANII)** | 2016 en adelante |

**Revistas de artículos:** JBJS, Bone & Joint J, JOT, CORR, AJSM, Spine, FAI, JSES, JHS.

## Cinco obras incorporadas en esta versión

Respecto del mapa cerrado anterior, se agregan:

1. *Morrey's The Elbow and Its Disorders*, **6.ª ed.** (2022) — codo.
2. *The Adult Hip*, **4.ª ed.** — cadera y artroplastia (módulo ART).
3. *Tile, Fractures of the Pelvis and Acetabulum*, **4.ª ed.** + **Letournel-Judet** — pelvis y acetábulo.
4. *Rockwood & Wilkins' Fractures in Children*, **10.ª ed.** (2024) — imprescindible para **PED**.
5. *Tachdjian's Pediatric Orthopaedics*, **6.ª ed.** (2022) — imprescindible para **PED**.

## Bibliografía ancla por tema

Cada entrada de `temario/temario.yaml` trae un campo `bibliografia_ancla`: la(s) obra(s) que ese documento debe usar como base. **El `curador` la lee y dirige con ella la búsqueda en la biblioteca indexada**, en lugar de buscar en todos los libros. Es el puntero que enfoca la investigación de fuentes.

## Artículos

- Preferentemente de los **últimos 10 años**, con **PMID o DOI**, vía Portal Timbó (ANII).
- Los **clásicos fundacionales** se citan por nombre y año sin límite temporal: Gustilo-Anderson 1976, Mirels 1989, Patchell 2005, Neer 1970, Garden 1961, Schatzker, Lauge-Hansen / Weber, Frykman / Fernández, Enneking, Campanacci (estos dos últimos hoy históricos, fuente secundaria en tumores).

## Regla operativa para el redactor

Cada afirmación cuantitativa citable (umbral, ángulo, plazo, tasa) debería poder rastrearse a la `bibliografia_ancla` del tema o a un artículo con PMID/DOI. Si una cifra no tiene respaldo, se marca como pendiente en `bibliografo` / `verificador-cifras`, no se inventa.
