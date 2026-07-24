# Auditoría de cifras — MSA-09 (Fractura-luxación de hombro y luxación inferior / luxatio erecta)

**Esto NO es una aprobación de números.** Es un listado de verificación para que la autora confirme cada cifra contra la fuente citada (Rockwood & Matsen 6.ª ed. 2021, Rockwood & Green 10.ª ed. 2024, AO Surgery Reference, Hertel 2004, Neer 1970, Campbell's 15.ª ed. 2026). Ninguna cifra de esta tabla debe considerarse validada por el solo hecho de figurar aquí. El documento fue escrito por cinco redactores en paralelo (uno por bloque de secciones); el hallazgo más importante de esta auditoría es la aparición de **valores distintos para la misma magnitud en secciones distintas**, que se señalan explícitamente en la sección "Discrepancias entre secciones" al final.

Se revisaron los 14 archivos `NN-*.md` (00-definicion a 13-cierre). El contador automático detectó 551 ocurrencias cuantitativas; esta tabla no las repite todas literalmente (evita duplicar la misma cifra citada 6 veces en 6 secciones) sino que **deduplica por magnitud clínica** y anota en qué secciones aparece cada una, con foco en las que cambian conducta.

---

## 1. Discrepancias críticas entre secciones (leer primero)

| # | Magnitud | Valor A | Valor B | Ubicación A | Ubicación B | Severidad |
|---|---|---|---|---|---|---|
| D1 | Ángulo cérvico-diafisario normal | **130–140°** | **130–150°** (prom. ≈135°) | 02-imagenes §AP Grashey | 07-anatomia §Osteología |
| D1 | Ángulo cérvico-diafisario normal | **130–135°** | **120–150°** (rango aceptable, con "normal ≈130–135°" en la misma frase) | 10-tratamiento §Criterios de reducción; 12-complicaciones | 03-diagnostico §Determinación de estabilidad |
| D1 | Ángulo cérvico-diafisario — reducción quirúrgica aceptable | **125°–145°** | (sin rango de aceptación explícito en las otras secciones, sólo el "normal") | 10-tratamiento §Criterios de reducción aceptable | — |
| D2 | Abducción necesaria para la proyección axilar convencional | **70–90°** (repetida 4 veces) | **20–30°** | 02-imagenes (múltiples menciones) | 03-diagnostico §Confirmación imagenológica, línea 45 |
| D3 | Umbral de hiperabducción que dispara la luxatio erecta (mecanismo) | **"más de 160°"** | Posición clínica descrita en la misma y otras secciones: **110–160°** (rango, no umbral) | 01-presentacion §Posición del miembro; 06-etiologia | 00-definicion; 01; 03; 04; 05; 07; 10; 13 (posición patognomónica) |
| D4 | Índice de riesgo vascular (arteria axilar) | **Índice de presión braquial < 0,90** (razón) | **Diferencia > 10 % entre brazos** (porcentaje) | 01-presentacion; 02-imagenes; 10; 12; 13 (todas usan <0,90) | 07-anatomia §Pitfall anatomopatológico mayor |
| D5 | Consolidación del cuello quirúrgico | **6–8 semanas** | **6–10 semanas** | 08-fisiopatologia §Hematoma fracturario | 11-rehabilitacion §11.5; 13-cierre §13.4 |
| D6 | Cabestrillo tras reducción de luxatio erecta sin fractura | **3–4 semanas (joven), 2 semanas (>60 años)** | **1–3 semanas** (mismo escenario) | 10-tratamiento §Pasos de reducción, paso 14 | 11-rehabilitacion §11.3 tabla; 13-cierre paso 6 |
| D7 | Umbral para abandonar la conducta expectante / derivar a exploración del nervio axilar | **3–4 meses** | **3–6 meses** | 08-fisiopatologia §Daño nervioso; 09-historia natural §Déficit neurológico residual | 12-complicaciones §Lesión nerviosa; 13-cierre §13.1 y §13.3 |
| D8 | Aparición de equimosis de Hennequin | **24–72 horas** | **48–72 horas** | 01-presentacion §Signos | 07-anatomia §Lesión de partes blandas |
| D9 | Aparición radiográfica de osificación heterotópica | **3–6 semanas** | **4–6 semanas** | 02-imagenes §Partes blandas | 12-complicaciones §Osificación heterotópica |
| D10 | Umbral de reluxación en el examen de estabilidad posreducción | **< 30° de RE** ("una reluxación con menos de 30°...") | **0° a 30–40° de RE** (rango del propio test) | 01-presentacion §Hallazgos que sugieren inestabilidad | 03-diagnostico §Determinación de estabilidad |

---

## 2. Tabla completa por sección

### 00 — Definición y marco general

| Valor | Unidad | Qué mide | Fuente citada | Estado |
|---|---|---|---|---|
| 0,75 (coronal) / 0,6 (transversal) | índice | Índice glenohumeral (relación de superficies) | Ninguna — `[VERIFICAR]` explícito en el texto | **Ya marcada** — confirmar valor y fuente |
| >95 % | % | Proporción subacromial de la luxación posterior | Ninguna — `[VERIFICAR]` explícito | **Ya marcada** |
| 110–160° | grados | Abducción bloqueada en luxatio erecta | Sin cita puntual | **Sin fuente** — cifra repetida en 8 secciones pero nunca atribuida a un autor/serie específica |
| 5–7 cm | cm | Distancia del nervio axilar al borde lateral del acromion | Sin cita puntual (anatomía descriptiva) | **Sin fuente** puntual, aunque es dato de anatomía estándar — confirmar contra Rockwood & Matsen |
| >5 mm | mm | Ascenso del troquíter que bloquea la abducción | Sin cita puntual | **Sin fuente** en esta sección (si bien se sustenta después en Neer/consenso quirúrgico) |
| 5–6 % | % | Fracturas de húmero proximal sobre el total de fracturas del adulto | Sin cita puntual | **Sin fuente** — repetida también en 05-epidemiologia con `[VERIFICAR]` allí sí explícito; aquí no |
| 5–10 % | % | Fractura-luxación sobre el total de fracturas de húmero proximal | `[VERIFICAR]` explícito | **Ya marcada** |
| 0,5 % | % | Luxatio erecta sobre el total de luxaciones de hombro | Sin cita puntual (no lleva `[VERIFICAR]` aquí, aunque sí en la tabla de 04 y en 05) | **Sospechoso** — inconsistencia de marcado: la misma cifra está flageada `[VERIFICAR]` en unas secciones y no en otras (ver también fila de la sección 04) |
| >60 % | % | Déficit neurológico en luxatio erecta | `[VERIFICAR]` explícito | **Ya marcada** |
| ~80 % | % | Rotura de manguito en luxatio erecta | `[VERIFICAR]` explícito | **Ya marcada** |
| ~3 % | % | Lesión de arteria axilar en luxatio erecta | `[VERIFICAR]` explícito | **Ya marcada** |
| 45–90 % | % | Osteonecrosis en fractura-luxación de 4 partes | `[VERIFICAR el rango con la edición ancla]` explícito | **Ya marcada** — además es el rango más citado y más ampliamente discrepante en la literatura real (series antiguas llegan a describir cifras mucho menores con reducción anatómica precoz); confirmar edición ancla exacta |
| < 8 mm / > 2 mm | mm | Predictores de Hertel (extensión metafisaria / bisagra medial) | Hertel R, 2004 (citado al pie) | Con fuente — verificar que el valor citado (8 mm / 2 mm) coincida con la publicación original y no con una paráfrasis de segunda mano |
| segmento 11 | código AO/OTA | Húmero proximal | AO/OTA (implícito) | Con fuente |

### 01 — Presentación clínica

| Valor | Unidad | Qué mide | Fuente citada | Estado |
|---|---|---|---|---|
| >160° | grados | Umbral de hiperabducción — mecanismo | Sin cita | **Discrepante** (ver D3) — contradice el rango 110–160° usado como "posición" en la misma sección y en todo el documento |
| 20–40 años | años | Primer pico etario (varón joven) | Sin cita | Sin fuente puntual (epidemiología general) |
| >65–70 años | años | Segundo pico etario (mujer añosa) | Sin cita | Sin fuente puntual |
| 2–3:1 | razón | Relación mujer:varón en fractura de húmero proximal añoso | `[VERIFICAR]` explícito | **Ya marcada** |
| cuarta–quinta década | años | Edad mediana de la luxatio erecta | `[VERIFICAR]` explícito | **Ya marcada** |
| ~80 % | % | Contribución de la fisis proximal al crecimiento longitudinal del húmero | Sin cita puntual | **Sin fuente** — cifra pediátrica repetida en 5 secciones sin referencia específica (ver también 07, 09, 11, 12) |
| 24–72 h | horas | Aparición de la equimosis de Hennequin | Sin cita | **Discrepante** (ver D8) |
| >2 cm | cm | Umbral del signo del surco (*sulcus sign*) patológico | Sin cita | **Sospechoso** — varios textos de referencia usan grados (I/II/III) con cortes de 1–2 cm; confirmar que ">2 cm" sea el umbral correcto y no una simplificación |
| 4–5 cm | cm | Extensión del "parche del regimiento" (área sensitiva del axilar) | Sin cita | Sin fuente puntual |
| <2 segundos | segundos | Relleno capilar normal | Sin cita | Sin fuente puntual (estándar semiológico) |
| índice de presión braquial <0,90 | razón | Umbral para angio-TC | Sin cita | Consistente con el resto del documento — ver D4 para la variante discrepante |
| 90° / 30–40° RE | grados | Maniobra de estabilidad posreducción | Sin cita | **Discrepante** (ver D10) con 03-diagnostico |
| <30° RE | grados | Umbral de reluxación que sugiere pérdida ósea significativa | Sin cita | Ver D10 |
| 20–30° | grados | Abducción necesaria para axilar convencional (mencionado indirectamente al describir Velpeau como alternativa) | — | Ver D2 — esta sección no da el número, pero se relaciona con la discrepancia de 02 vs 03 |

### 02 — Imágenes

| Valor | Unidad | Qué mide | Fuente citada | Estado |
|---|---|---|---|---|
| 30–45° | grados | Rotación del paciente para AP de Grashey | Sin cita puntual | Sin fuente (técnica radiológica estándar) |
| 130–140° | grados | Ángulo cérvico-diafisario "normal" | Sin cita | **Discrepante** — ver D1 |
| 5–8 mm | mm | Cabeza humeral sobresale sobre el vértice del troquíter | Sin cita | Consistente con el resto del documento (repetida igual en 07, 10) |
| 7–14 mm | mm | Espacio subacromial normal | Sin cita | **Sin fuente** — único lugar donde aparece este dato |
| 40–60° | grados | Rotación del paciente para proyección en Y | Sin cita | Sin fuente (técnica estándar) |
| 70–90° | grados | Abducción para axilar clásica | Sin cita | **Discrepante** — ver D2 |
| 30–45° | grados | Inclinación hacia atrás para Velpeau | Sin cita | Sin fuente puntual |
| 25° caudal / 25° medial | grados | Angulación de West Point | Sin cita | Sin fuente puntual |
| 6 mm | mm | Umbral del *rim sign* (signo del reborde) | Sin cita | **Sin fuente** — cifra puntual sin referencia bibliográfica; confirmar contra la literatura de signos radiográficos de luxación posterior |
| ≥6 mm | mm | Superposición mínima normal del *crescent sign* | Sin cita | **Sin fuente** |
| ≤1 mm | mm | Grosor de corte tomográfico requerido | Sin cita | Sin fuente puntual (estándar técnico) |
| <8 mm | mm | Extensión metafisaria posteromedial (Hertel) | Hertel 2004 | Con fuente |
| >2 mm | mm | Bisagra medial rota (Hertel) | Hertel 2004 | Con fuente |
| <25 % / 25–50 % / >50 % | % | Umbrales de tamaño de Hill-Sachs invertida para conducta | Remite a MSA-08, sin cita puntual aquí | **Sin fuente** en esta sección (remitida, pero el número queda expuesto sin respaldo local) |
| >20–25 % | % | Pérdida ósea glenoidea crítica | Remite a MSA-07 | Sin fuente puntual local |
| <4 mm | mm | Índice de Tingart — mala calidad ósea | `[VERIFICAR]` explícito | **Ya marcada** |
| <1,4 | índice | Índice de la tuberosidad deltoidea — riesgo de fallo de fijación | `[VERIFICAR]` explícito | **Ya marcada** |
| 3–6 semanas | semanas | Aparición radiográfica de osificación heterotópica | Sin cita | **Discrepante** — ver D9 |
| 5–8 mm | mm | Relación troquíter–cabeza (vértice bajo el punto más alto) | Sin cita | Consistente en todo el documento |

### 03 — Diagnóstico

| Valor | Unidad | Qué mide | Fuente citada | Estado |
|---|---|---|---|---|
| >50 años | años | Umbral etario para exigir 3 proyecciones antes de reducir | Sin cita | **Sin fuente** — regla operativa sin respaldo numérico explícito |
| 20–30° | grados | Abducción necesaria para axilar convencional | Sin cita | **Discrepante** — ver D2, contradice 70–90° de 02-imagenes |
| 110–160° | grados | Posición de bloqueo en luxatio erecta | Sin cita | Consistente con el resto |
| 12 mm | mm | Desplazamiento del troquíter (ejemplo de formulación diagnóstica) | Ejemplo ilustrativo, no dato clínico general | Sin fuente (es un ejemplo, no requiere cita, pero verificar que sea compatible con los umbrales de 5 mm) |
| 5 mm | mm | Extensión metafisaria posteromedial (ejemplo ilustrativo) | Ejemplo | Verificar coherencia con umbral <8mm de Hertel (5mm sí sería "corto") |
| 140° | grados | Abducción bloqueada (ejemplo luxatio erecta) | Ejemplo | Coherente con rango 110–160° |
| 8 mm | mm | Avulsión del troquíter (ejemplo luxatio erecta) | Ejemplo | Verificar coherencia con umbral quirúrgico de 5mm |
| 1 cm / 45° | cm/grados | Umbral de Neer para "parte" | Neer, 1970 | Con fuente |
| >1 cm / >45° | — | Umbral de foco inestable | Neer, 1970 | Con fuente |
| 120–150° (con "valor anatómico normal ≈130–135°" en la misma frase) | grados | Ángulo cefalodiafisario | Sin cita puntual | **Discrepante** — ver D1; nótese que la propia oración mezcla un rango de aceptación con un valor "normal" distinto |
| 0° a 30–40° | grados | Rango del test de estabilidad posreducción | Sin cita | Ver D10 |
| >20–25 % | % | Defecto glenoideo anteroinferior significativo | Remite a MSA-07 | Sin fuente puntual local |
| >3 semanas | semanas | Umbral de luxación inveterada/crónica | Sin cita | **Sin fuente** — repetida en 04 y 09 sin referencia puntual, aunque es un umbral clásico bien establecido en la literatura |
| 2–6 semanas | semanas | Resolución espontánea de la pseudosubluxación inferior | Sin cita | Sin fuente puntual |

### 04 — Clasificación

| Valor | Unidad | Qué mide | Fuente citada | Estado |
|---|---|---|---|---|
| 1 cm / 45° | — | Umbral de Neer para "parte" | Neer, 1970 | Con fuente |
| >5 mm / ≥3 mm | mm | Umbral quirúrgico del troquíter (general / deportista) | Consenso de práctica, sin cita puntual | **Sin fuente** puntual — cifra crítica repetida ~15 veces en el documento sin atribución bibliográfica específica; confirmar contra Rockwood & Matsen o Rockwood & Green |
| 45–90 % | % | Osteonecrosis en fractura-luxación de 4 partes | `[VERIFICAR el rango contra la edición ancla]` explícito, dos veces | **Ya marcada** — y además genuinamente **Discrepante** en la literatura real: las series clásicas de Neer citan cifras cercanas al extremo superior, mientras que series más modernas con reducción anatómica precoz describen tasas notablemente menores; el documento no distingue estas dos poblaciones de series |
| <8 mm | mm | Predictor mayor de Hertel — extensión metafisaria | Hertel 2004 | Con fuente |
| >2 mm | mm | Predictor mayor de Hertel — bisagra medial | Hertel 2004 | Con fuente |
| ≈97 % | % | VPP de isquemia con los 3 predictores combinados | `[VERIFICAR contra la publicación original]` explícito | **Ya marcada** — cifra de alto impacto clínico (empuja a artroplastia); prioridad alta de verificación |
| >45° | grados | Predictor secundario — angulación del fragmento cefálico | `[VERIFICAR]` explícito | **Ya marcada** |
| >10 mm | mm | Predictor secundario — desplazamiento de tuberosidades | `[VERIFICAR]` explícito | **Ya marcada** |
| ≈0,5 % | % | Frecuencia de la luxatio erecta | Sin `[VERIFICAR]` en esta sección (a diferencia de 00 y 05) | **Sospechoso** — inconsistencia de marcado dentro del propio documento (ver también nota en sección 00) |
| ~95–97 % | % | Frecuencia de la luxación anterior | `[VERIFICAR]` explícito | **Ya marcada** |
| ~2–4 % | % | Frecuencia de la luxación posterior | `[VERIFICAR]` explícito | **Ya marcada** |
| ~80 % / ~60 % / ~3 % | % | Manguito / neurológica / arteria axilar en luxatio erecta | `[VERIFICAR]` explícito en los tres | **Ya marcada** |
| Excepcional | — | Frecuencia de la luxación superior | `[VERIFICAR]` explícito | **Ya marcada** (aunque cualitativa, ya está correctamente señalada como pendiente) |
| >20–25 % | % | Pérdida ósea glenoidea crítica | Remite a MSA-07 | Sin fuente puntual local |
| >5 mm / ≥3 mm | mm | Umbral quirúrgico del troquíter (repetido) | Sin cita | Igual que arriba — sin fuente puntual |
| >3 semanas | semanas | Umbral aguda/crónica | Sin cita | Sin fuente puntual, ver nota en 03 |

### 05 — Epidemiología

| Valor | Unidad | Qué mide | Fuente citada | Estado |
|---|---|---|---|---|
| 5–6 % | % | Fractura de húmero proximal / total de fracturas | `[VERIFICAR contra la edición ancla]` explícito | **Ya marcada** |
| 23–24 / 100.000 personas-año | incidencia | Incidencia de luxación glenohumeral | `[VERIFICAR]` explícito | **Ya marcada** — verificar especialmente porque es una cifra de incidencia poblacional que suele variar mucho según el país de origen del estudio |
| <10 % | % | Fractura-luxación / total de fracturas de húmero proximal | `[VERIFICAR]` explícito | **Ya marcada** |
| ~0,5 % | % | Luxatio erecta / total de luxaciones | Sin `[VERIFICAR]` en esta mención puntual (aparece 2 veces en la sección, una sin marcar) | **Sospechoso** — ver nota de inconsistencia de marcado |
| 95–97 % / 2–4 % | % | Anterior / posterior | `[VERIFICAR]` explícito en la frase general de la sección | **Ya marcada** |
| 20–40 años | años | Primer pico etario | Sin cita | Sin fuente puntual |
| >65–70 años | años | Segundo pico etario | Sin cita | Sin fuente puntual |
| 2–3:1 | razón | Relación mujer:varón | `[VERIFICAR]` explícito | **Ya marcada** |
| 110–160° | grados | Posición patognomónica de la luxatio erecta | Sin cita | Consistente |
| ~60 % / ~3 % | % | Neurológica / arteria axilar en luxatio erecta | Sin `[VERIFICAR]` en esta mención (contraste con 00 y 04 donde sí está marcada) | **Sospechoso** — inconsistencia de marcado |

### 06 — Etiología y factores de riesgo

| Valor | Unidad | Qué mide | Fuente citada | Estado |
|---|---|---|---|---|
| >160° | grados | Umbral de hiperabducción en el mecanismo de la luxatio erecta | Sin cita | **Discrepante** — ver D3, repite el mismo umbral que 01-presentacion, contradice el rango 110–160° usado en las demás secciones como posición observada |
| Sin umbral numérico validado | — | Morfología acromial y facilitación de la luxatio erecta | `[VERIFICAR]` explícito | **Ya marcada** correctamente como ausencia de dato cuantitativo |

### 07 — Anatomía y anatomía patológica

| Valor | Unidad | Qué mide | Fuente citada | Estado |
|---|---|---|---|---|
| 4 segmentos | — | Segmentos de Codman/Neer | Codman (bibliografía) | Con fuente |
| 23–28 mm | mm | Radio de curvatura de la cabeza humeral | Sin cita | **Sin fuente** — dato morfométrico puntual sin referencia |
| 15–20 mm | mm | Espesor de la cabeza humeral | Sin cita | **Sin fuente** |
| 2–3 cm | cm | Distancia del cuello anatómico al cuello quirúrgico | Sin cita | Sin fuente puntual |
| 130–150° (prom. ≈135°) | grados | Ángulo cérvico-diafisario normal | Sin cita | **Discrepante** — ver D1 |
| 20–30° | grados | Retroversión cefálica respecto al eje transepicondíleo | Sin cita | Sin fuente puntual (aunque consistente en todo el documento con 08, 10) |
| <120° | grados | Umbral de consolidación viciosa en varo | Sin cita | Consistente con 08, 09, 10, 12 |
| 7 mm medial / 2–3 mm posterior | mm | Offset de la cabeza respecto del eje diafisario | Sin cita | **Sin fuente** — cifra puntual única en todo el documento, sin respaldo bibliográfico |
| 5–8 mm | mm | Vértice del troquíter bajo la superficie articular | Sin cita | Consistente |
| >5 mm | mm | Ascenso del troquíter que produce conflicto subacromial | Sin cita | Consistente |
| 5–8 mm | mm | Posición lateral de la placa respecto al surco bicipital | Sin cita | Consistente con 10 |
| 30–40 mm × 22–28 mm | mm | Dimensiones de la glenoides | Sin cita | **Sin fuente** — dato morfométrico sin referencia |
| 2–7° | grados | Retroversión glenoidea | Sin cita | **Sin fuente** — no confundir con la retroversión humeral (20–30°); ambas coexisten en el mismo documento y podrían prestarse a confusión si no se aclaran como magnitudes distintas |
| ~5° | grados | Inclinación superior de la glenoides | Sin cita | **Sin fuente** |
| ~50 % | % | Aumento de profundidad glenoidea aportado por el labrum | Sin cita | **Sin fuente** |
| <8 mm / >2 mm | mm | Predictores de Hertel | Hertel 2004 | Con fuente, pero el VPP combinado queda `[VERIFICAR el valor exacto contra la edición ancla]` — **Ya marcada** |
| 5–7 cm | cm | Nervio axilar desde el borde lateral del acromion | Sin cita puntual | Sin fuente puntual, consistente en todo el documento |
| 10–25 mm | mm | Distancia del nervio axilar al reborde glenoideo inferior | `[VERIFICAR]` explícito | **Ya marcada** |
| 5–8 cm | cm | Nervio musculocutáneo penetra el coracobraquial | Sin cita puntual | Sin fuente puntual, consistente con 10 |
| 2 cm | cm | Nervio supraescapular medial al reborde glenoideo superior | Sin cita | **Sin fuente** — único lugar donde aparece |
| >10 % | % | Diferencia de índice de presión brazo-brazo sospechosa | Sin cita | **Discrepante** — ver D4, contradice el criterio de índice <0,90 usado en el resto del documento |
| ~3 % | % | Lesión de arteria axilar en luxatio erecta | `[VERIFICAR]` explícito | **Ya marcada** |
| ~60 % | % | Compromiso neurológico en luxatio erecta | `[VERIFICAR]` explícito | **Ya marcada** |
| ~80 % | % de crecimiento | Aporte de la fisis proximal al crecimiento del húmero | Sin cita | **Sin fuente** — repetida sin referencia en 5 secciones |

### 08 — Fisiopatología

| Valor | Unidad | Qué mide | Fuente citada | Estado |
|---|---|---|---|---|
| 130–150° | grados | Ángulo cervicodiafisario normal | Sin cita | **Discrepante** — ver D1 |
| <120° | grados | Umbral de mal resultado funcional en varo | Sin cita | Consistente en el documento |
| >1 cm | cm | Acortamiento humeral que produce hombro débil | Sin cita | **Sin fuente** — cifra puntual sin respaldo |
| 20–30° | grados | Retroversión normal | Sin cita | Consistente |
| >5 mm | mm | Ascenso del troquíter | Sin cita | Consistente |
| 2–3 semanas | semanas | Formación de callo blando cartilaginoso | Sin cita | Sin fuente puntual (fisiología ósea estándar) |
| 4–6 semanas | semanas | Mineralización a callo duro | Sin cita | Sin fuente puntual |
| 6–8 semanas | semanas | Consolidación del cuello quirúrgico estable | Sin cita | **Discrepante** — ver D5 |
| `[VERIFICAR los porcentajes exactos de elongación]` | % | Umbral de elongación nerviosa que produce daño axonal | `[VERIFICAR]` explícito | **Ya marcada** |
| 1 mm/día | mm/día | Velocidad de reinervación tras degeneración walleriana | Sin cita | **Sin fuente** — cifra fisiológica estándar sin referencia puntual |
| 3–4 meses | meses | Ausencia total de reinervación que obliga a replantear diagnóstico | Sin cita | **Discrepante** — ver D7 |
| 3–4 semanas | semanas | Umbral de inmovilización tras el cual el balance rigidez/protección se invierte | Sin cita | Consistente con 09, 11, 12 |
| 2:1 | razón | Ritmo escapulohumeral normal | Sin cita | **Sin fuente** — dato biomecánico estándar sin referencia |
| ~80 % | % | Aporte de la fisis al crecimiento del húmero | Sin cita | Sin fuente puntual, repetida |

### 09 — Historia natural / pronóstico

| Valor | Unidad | Qué mide | Fuente citada | Estado |
|---|---|---|---|---|
| 3 semanas | semanas | Umbral tras el cual la reducción cerrada deja de ser posible | Sin cita | **Sin fuente** puntual, aunque es un umbral ampliamente citado en la bibliografía de luxación inveterada — confirmar contra Rockwood & Matsen |
| 3–6 meses | meses | Umbral de erosión glenoidea progresiva en luxación inveterada | Sin cita | Sin fuente puntual |
| 45–90 % | % | Osteonecrosis en fractura-luxación de 4 partes | `[VERIFICAR el rango con la edición ancla]` explícito | **Ya marcada** — ver también nota de discrepancia real de literatura en sección 04 |
| 6–24 meses | meses | Ventana de aparición radiográfica de la osteonecrosis | Sin cita | **Discrepante parcial** — ver nota, en 12-complicaciones se usa "6–12 meses" para el mismo fenómeno |
| 2–3 años | años | Casos tardíos de aparición de osteonecrosis | Sin cita | Sin fuente puntual |
| >5 mm | mm | Ascenso del troquíter que produce conflicto subacromial | Sin cita | Consistente |
| <120° | grados | Umbral de consolidación viciosa sintomática del cuello | Sin cita | Consistente |
| 3–6 meses / 3–4 meses | meses | Recuperación neuroapráxica / umbral de conducta expectante | Sin cita | **Discrepante** — ver D7 (esta sección usa ambas cifras en párrafos consecutivos: "3 a 6 meses" para recuperación general y "3–4 meses" para el límite de la conducta expectante, lo cual es internamente inconsistente incluso dentro del mismo archivo) |
| ~80 % | % | Aporte de la fisis al crecimiento | Sin cita | Sin fuente puntual |

### 10 — Tratamiento

| Valor | Unidad | Qué mide | Fuente citada | Estado |
|---|---|---|---|---|
| 1 cm / 45° | — | Umbral de Neer | Neer, 1970 | Con fuente |
| <8 mm / >2 mm | mm | Predictores mayores de Hertel | Hertel, 2004 | Con fuente |
| >5 mm / ≥3 mm | mm | Umbral quirúrgico del troquíter | Sin cita puntual | Sin fuente puntual, repetida ~6 veces en esta sola sección |
| >70 años | años | Umbral etario para preferir artroplastia invertida | Sin cita | Sin fuente puntual (criterio de juicio clínico, no validado numéricamente) |
| ≈ 3 % / ~80 % | % | Arteria axilar / manguito en luxatio erecta | `[VERIFICAR]` explícito en ambas | **Ya marcada** |
| 12–24 h | horas | Duración de la anulación del examen neurológico por bloqueo interescalénico | Sin cita | **Discrepante** parcial con 11-rehabilitacion (12–18 h de analgesia) — son magnitudes distintas (bloqueo motor/sensitivo vs analgesia) pero el solapamiento numérico puede confundir; aclarar en el texto |
| 110–160° | grados | Ángulo de abducción en la técnica de reducción de luxatio erecta | Sin cita | Consistente |
| 1–2 minutos | minutos | Duración de la tracción en el primer tiempo de reducción | Sin cita | **Sin fuente** — dato técnico puntual sin referencia |
| 3–4 semanas (joven) / 2 semanas (>60 años) | semanas | Inmovilización tras reducción de luxatio erecta | Sin cita | **Discrepante** — ver D6 |
| 7–10 días | días | Reevaluación clínica tras reducción | Sin cita | Consistente con 13-cierre |
| 3–4 semanas | semanas | Plazo para indicar RM si no hay recuperación de elevación activa | Sin cita | Consistente |
| 3 o 4 partes | — | Umbral de reclasificación tras reducción | Neer, 1970 (implícito) | Con fuente |
| 125–145° | grados | Rango de reducción aceptable del ángulo cérvico-diafisario | Sin cita | **Discrepante** — ver D1 |
| <120° | grados | Umbral de mal resultado funcional | Sin cita | Consistente |
| 20–30° | grados | Retroversión fisiológica de referencia | Sin cita | Consistente |
| ~20° | grados | Tolerancia respecto al lado contralateral en la versión | Sin cita | **Sin fuente** — cifra puntual sin referencia |
| <5 mm | mm | Desplazamiento traslacional tolerable cabeza-diáfisis en paciente activo | Sin cita | **Sospechoso** — coexiste en el mismo párrafo con "criterio clásico de Neer de 1 cm como límite absoluto"; dos umbrales distintos (5 mm "tolerable" vs 1 cm "límite absoluto") sin aclarar jerarquía o fuente de cada uno |
| <2 mm | mm | Escalón articular y gap aceptables | Sin cita | **Sin fuente** — cifra crítica sin referencia; nótese que 08-fisiopatologia afirma en general que "la tolerancia al escalón es mayor [en el hombro] que en la cadera o la rodilla" sin dar cifra, lo que no permite verificar si 2 mm es coherente con esa afirmación cualitativa |
| 45–60° | grados | Inclinación de la silla de playa | Sin cita | Sin fuente puntual (posicionamiento quirúrgico estándar) |
| 2 g IV / 3 g si >120 kg | mg/g | Dosis de cefazolina profiláctica | Sin cita | **Sin fuente** — dosis farmacológica sin referencia puntual (protocolo institucional presumible, pero sin cita) |
| 30–60 min | minutos | Momento de administración de la profilaxis antibiótica | Sin cita | Sin fuente puntual, consistente con 11 |
| 4 h | horas | Redosificación antibiótica intraoperatoria | Sin cita | Consistente con 11 |
| >1.500 mL | mL | Sangrado que obliga a redosificar antibiótico | Sin cita | Consistente con 11 |
| 10–15 cm | cm | Longitud de la incisión deltopectoral | Sin cita | Sin fuente puntual |
| 1–2 cm | cm | Sección parcial del tendón del pectoral mayor si es necesaria | Sin cita | Sin fuente puntual |
| 5–8 cm | cm | Nervio musculocutáneo penetra el coracobraquial | Sin cita | Consistente con 07 |
| 2,5 mm | mm | Diámetro del clavo de Schanz usado como joystick | Sin cita | Sin fuente puntual (dato técnico) |
| 130–135° | grados | Ángulo cérvico-diafisario objetivo intraoperatorio | Sin cita | **Discrepante** — ver D1 |
| 1,6–2,0 mm | mm | Diámetro de agujas de Kirschner de fijación provisoria | Sin cita | Sin fuente puntual |
| 5–8 mm | mm | Altura del vértice cefálico sobre el troquíter (objetivo intraoperatorio) | Sin cita | Consistente |
| 5–8 mm | mm | Posición lateral de la placa respecto al surco bicipital | Sin cita | Consistente |
| ≥5 mm | mm | Borde proximal de la placa por debajo del vértice del troquíter | Sin cita | Consistente con 07, 12 |
| 5–10 mm | mm | Distancia de la punta del tornillo a la superficie articular | Sin cita | Sin fuente puntual |
| 2–4 mm | mm | Acortamiento de la medición del tornillo respecto de la lectura | Sin cita | Consistente con 12, 13 |
| 24–48 h | horas | Retiro del drenaje aspirativo | Sin cita | Consistente con 11 |
| 3,5 / 4,0 mm | mm | Diámetro de tornillos canulados | Sin cita | Consistente con 04 |
| 4–5 cm | cm | Longitud del abordaje transdeltoideo lateral | Sin cita | Sin fuente puntual |
| 5 cm | cm | Límite de división muscular en el abordaje lateral sin identificar el axilar | Sin cita | **Sospechoso** — en la misma sección se usa alternadamente "5 cm" y "5–7 cm" para la misma referencia anatómica (distancia segura de división del deltoides vs. distancia real del nervio); confirmar que no se esté usando el límite de seguridad quirúrgica (más corto) como si fuera la distancia anatómica real |
| <5 mm | mm | Desplazamiento residual aceptable del troquíter tras ORIF | Sin cita | Consistente |
| 30° RI / 30° RE | grados | Arco de rotación probado intraoperatoriamente | Sin cita | Sin fuente puntual |
| 6 semanas | semanas | Prohibición de rotación externa activa tras ORIF de troquíter | Sin cita | Consistente con 11, 12, 13 |
| 8–12 semanas | semanas | Retorno a actividad laboral liviana | Sin cita | Consistente con 11, 13 |
| 4–6 meses | meses | Retorno a deporte de contacto / trabajo pesado | Sin cita | Consistente con 11, 13 |
| ≥80 % | % | Fuerza y movilidad mínima respecto al contralateral para autorizar retorno | Sin cita | **Sospechoso** — en 11-rehabilitacion el umbral de fuerza se da como "≥85–90 %" y el de movilidad como "≥90 %"; aquí en 10 se da un único "80 %" combinado para ambos, lo que es menos exigente y no coincide exactamente |

### 11 — Rehabilitación y cuidados postoperatorios

| Valor | Unidad | Qué mide | Fuente citada | Estado |
|---|---|---|---|---|
| 1 g c/6–8 h | mg | Dosis de paracetamol | Sin cita | **Sin fuente** — dosis farmacológica sin referencia |
| 400–600 mg c/8 h / 50 mg c/8 h | mg | Ibuprofeno / diclofenac | Sin cita | **Sin fuente** |
| 50–100 mg c/8 h | mg | Tramadol de rescate | Sin cita | **Sin fuente** |
| 0,5 % (15–20 mL) | % / mL | Ropivacaína para bloqueo interescalénico | Sin cita | **Sin fuente** |
| 12–18 h | horas | Duración de la analgesia del bloqueo interescalénico | Sin cita | Ver discrepancia parcial con 10 (12–24 h de anulación del examen neurológico) |
| 20 min c/3–4 h | minutos | Crioterapia local | Sin cita | Sin fuente puntual |
| 48–72 h | horas | Apósito seco antes de permitir ducha | Sin cita | Sin fuente puntual |
| 3 semanas | semanas | Prohibición de inmersión hasta cicatrización completa | Sin cita | Consistente con retiro de puntos a 12–14 días + margen |
| 12–14 días | días | Retiro de puntos o grapas | Sin cita | Sin fuente puntual |
| 24–48 h | horas | Retiro de drenaje aspirativo | Sin cita | Consistente con 10 |
| >38 °C | °C | Fiebre — signo de alarma | Sin cita | Sin fuente puntual |
| 2 g IV / 3 g si >120 kg | g | Cefazolina profiláctica | Sin cita | Consistente con 10 |
| 30–60 min | minutos | Momento de administración preoperatoria | Sin cita | Consistente con 10 |
| 15 mg/kg (60–120 min) | mg/kg | Vancomicina en alérgicos | Sin cita | **Sin fuente** |
| 900 mg | mg | Clindamicina alternativa | Sin cita | **Sin fuente** |
| 24 h | horas | Límite de duración de la profilaxis antibiótica | Sin cita | Sin fuente puntual (estándar de buenas prácticas, sin referencia local) |
| 40 mg/día SC | mg | Enoxaparina profiláctica | Sin cita | **Sin fuente** |
| 3–4 semanas | semanas | Duración del cabestrillo | Sin cita | Consistente con 08, 09, 10, 12, 13 |
| 15–20° | grados | Abducción de la ortesis para reinserción del subescapular/troquín | Sin cita | Sin fuente puntual |
| 24–48 h | horas | Inicio de pendulares de Codman | Sin cita | Consistente con 10, 13 |
| 30–40° | grados | Plano escapular de anteversión para movilidad pasiva | Sin cita | Sin fuente puntual |
| 0–90° | grados | Elevación pasiva permitida en fase I | Sin cita | Consistente con 13 |
| 0–30° | grados | Rotación externa pasiva limitada en fase I | Sin cita | Consistente con 13 |
| 2.ª–3.ª semana | semanas | Inicio de isométricos submáximos | `[VERIFICAR el plazo exacto]` explícito | **Ya marcada** |
| 6 semanas | semanas | Prohibición de RI activa / RE pasiva forzada | Sin cita | Consistente con 10, 12, 13 |
| 3–4 semanas | semanas | Retiro del cabestrillo, inicio fase II | Sin cita | Consistente |
| ~6 semanas | semanas | Transición a activo contra gravedad | Sin cita | Consistente con 13 |
| 8–10 semanas | semanas | Inicio del fortalecimiento con bandas elásticas | Sin cita | Consistente con 13 |
| 10–12 semanas | semanas | Fortalecimiento pleno | Sin cita | Consistente con 13 |
| 4–5 meses | meses | Inicio de pliometría/lanzamiento progresivo | Sin cita | Sin fuente puntual |
| 4–6 semanas / 3–4 semanas / 1–3 semanas / 6 semanas / 2–3 semanas | semanas | Duración del cabestrillo según procedimiento (tabla 11.3) | Sin cita | Ver D6 para la fila de luxatio erecta sin fractura |
| 6–8 semanas | semanas | Prohibición de carga axial de apoyo | Sin cita | Sin fuente puntual |
| 0 kg / 1–2 kg | kg | Carga de objetos en la mano según semana | Sin cita | **Sin fuente** — umbral de peso sin referencia |
| 2, 6, 12 semanas / 6, 12 meses | — | Calendario de controles radiográficos | Sin cita | Sin fuente puntual (protocolo institucional) |
| 2–5 años | años | Extensión del seguimiento en 3–4 partes | Sin cita | Sin fuente puntual |
| ≥3 de 4 corticales | — | Criterio de callo puente | Sin cita | **Sin fuente** — criterio radiológico sin referencia puntual |
| 6 semanas | semanas | Consolidación del troquíter | Sin cita | Consistente con 13 |
| 6–10 semanas | semanas | Consolidación del cuello quirúrgico | Sin cita | **Discrepante** — ver D5 |
| 3 meses | meses | Umbral de retardo de consolidación | Sin cita | Consistente con 12 |
| 6 meses | meses | Umbral de seudoartrosis | Sin cita | Consistente con 12 |
| 4–6 semanas | semanas | Actividades básicas de la vida diaria con el miembro operado | Sin cita | Sin fuente puntual |
| 6–8 semanas | semanas | Autorización para conducir | Sin cita | Consistente con 13 |
| 2–4 semanas | semanas | Retorno laboral de escritorio | Sin cita | Consistente con 13 |
| 6–12 semanas | semanas | Retorno a tarea liviana | Sin cita | Consistente con 13 |
| 4–6 meses | meses | Retorno a trabajo pesado / deporte de contacto | Sin cita | Consistente con 13 |
| 6–8 semanas | semanas | Deportes sin contacto | Sin cita | Sin fuente puntual |
| 3–4 meses | meses | Natación/gimnasio sin carga sobre la cabeza | Sin cita | Sin fuente puntual |
| ≥90 % | % | Movilidad mínima respecto al contralateral para alta deportiva | Sin cita | Ver nota de discrepancia parcial con "≥80 %" combinado de la sección 10 |
| ≥85–90 % | % | Fuerza mínima respecto al contralateral | Sin cita | Ver misma nota |
| 10–20° | grados | Déficit esperable de rotación externa en 3–4 partes | Sin cita | Consistente con 12 |
| 120–150° | grados | Elevación esperable en 3–4 partes | Sin cita | Consistente con 12 |
| 2–3 semanas | semanas | Inmovilización pediátrica | Sin cita | Sin fuente puntual |
| ~80 % | % | Aporte de la fisis al crecimiento | Sin cita | Sin fuente puntual, repetida |

### 12 — Complicaciones

| Valor | Unidad | Qué mide | Fuente citada | Estado |
|---|---|---|---|---|
| ~60 % | % | Lesión axilar/plexo en luxatio erecta | `[VERIFICAR]` explícito, dos veces | **Ya marcada** |
| ≈3 % | % | Lesión de arteria axilar en luxatio erecta | `[VERIFICAR]` explícito, dos veces | **Ya marcada** |
| — | — | Fractura iatrogénica durante la reducción | "Sin cifra confiable [VERIFICAR]" explícito | **Ya marcada** — correctamente señalada como sin cifra disponible |
| 10–25 % | % | Penetración intraarticular de tornillos | `[VERIFICAR]` explícito, dos veces | **Ya marcada** |
| 45–90 % | % | Osteonecrosis en 4 partes con luxación | `[VERIFICAR el rango]` explícito, dos veces | **Ya marcada** |
| <0,90 | índice | Índice de presión braquio-braquial | Sin cita | Consistente — contrasta con la variante de "% de diferencia" en 07 (D4) |
| >10 % | % | Diferencia de presión brazo-brazo (mencionada aquí también, en el pitfall) | Sin cita | **Discrepante** — repite la variante de 07, ver D4 |
| 5–7 cm | cm | Nervio axilar desde el acromion | Sin cita | Consistente |
| 20–30° | grados | Grado de resistencia para explorar el deltoides | Sin cita | Sin fuente puntual |
| 6–12 semanas | semanas | Umbral de sospecha de lesión estructural (no neuroapráxica) del axilar | Sin cita | **Discrepante** — ver D7, un tercer valor distinto (6–12 semanas) para un concepto emparentado con los umbrales de 3–4 y 3–6 meses |
| 3–4 semanas | semanas | Momento de solicitar EMG | Sin cita | Consistente en todo el documento |
| 3 meses | meses | Repetición de EMG buscando reinervación | Sin cita | Sin fuente puntual |
| 3–6 meses | meses | Umbral para derivar a exploración quirúrgica del nervio | Sin cita | **Discrepante** — ver D7 |
| 6 meses | meses | Caída marcada de resultados de reconstrucción nerviosa | Sin cita | Sin fuente puntual |
| 9–12 meses | meses | Umbral para transferencia nerviosa | Sin cita | Sin fuente puntual |
| 2–4 mm | mm | Acortamiento de tornillos respecto de la lectura | Sin cita | Consistente con 10 |
| 130–135° | grados | Ángulo cervicodiafisario normal | Sin cita | **Discrepante** — ver D1 |
| <120° | grados | Umbral de conflicto subacromial/déficit de elevación | Sin cita | Consistente |
| 2, 6, 12 semanas | semanas | Controles radiográficos | Sin cita | Consistente con 11 |
| 4–8 semanas | semanas | Aparición de penetración articular secundaria | Sin cita | Sin fuente puntual |
| 4–6 semanas | semanas | Déficit de abducción por migración del troquíter | Sin cita | Sin fuente puntual |
| 6 semanas | semanas | Umbral para refijación si se detecta migración temprana | Sin cita | Consistente |
| 24–48 h | horas | Inicio de movilización pasiva/pendular | Sin cita | Consistente |
| 4 semanas | semanas | Umbral de inmovilización antes de rigidez | Sin cita | **Sospechoso** — aquí se usa "4 semanas" a secas, mientras que en 08, 09 y 11 se usa consistentemente "3–4 semanas"; verificar si es una simplificación intencional o una imprecisión |
| 6–8 semanas | semanas | Signo distintivo de rigidez capsular (limitación de RE pasiva) | Sin cita | Sin fuente puntual |
| 3–6 meses | meses | Fisioterapia intensiva antes de considerar liberación | Sin cita | Sin fuente puntual |
| 6 meses | meses | Umbral para liberación capsular artroscópica | Sin cita | Consistente |
| 3 meses | meses | Umbral de retardo de consolidación | Sin cita | Consistente con 11 |
| <5 mm / <3 mm | mm | Tolerancia de reducción del troquíter (general / deportista) | Sin cita | Consistente |
| ≥5 mm | mm | Posición de la placa bajo el vértice del troquíter | Sin cita | Consistente |
| 5–8 mm | mm | Posición lateral de la placa | Sin cita | Consistente |
| 70–120° | grados | Arco doloroso por conflicto con la placa | Sin cita | **Sin fuente** — cifra puntual sin referencia |
| 12 meses | meses | Momento habitual de retiro de material | Sin cita | Consistente con las otras menciones de "no antes de los 12 meses" |
| >5 mm | mm | Ascenso del troquíter — conflicto subacromial | Sin cita | Consistente |
| 6–12 meses | meses | Aparición de dolor por osteonecrosis | Sin cita | **Discrepante parcial** con "6–24 meses" de 00, 02, 09 — ver nota |
| >5 mm | mm | Consolidación viciosa del troquíter (posición alta) | Sin cita | Consistente |
| <120° | grados | Cuello consolidado en varo | Sin cita | Consistente |
| 90–110° | grados | Elevación activa limitada en consolidación viciosa | Sin cita | Sin fuente puntual |
| 1.º–3.º año | años | Ventana de aparición de artrosis postraumática | Sin cita | Sin fuente puntual |
| 4–6 semanas | semanas | Aparición radiográfica de calcificaciones heterotópicas | Sin cita | **Discrepante** — ver D9 |
| 2.º–4.º mes | meses | Pérdida progresiva de movilidad por osificación heterotópica | Sin cita | Sin fuente puntual |
| ~12 meses | meses | Momento de resección de osificación heterotópica madura | Sin cita | Sin fuente puntual |
| 6–8 semanas | semanas | Protección tras retiro de material | Sin cita | Sin fuente puntual |
| 10–20° / 120–150° | grados | Déficit residual esperable | Sin cita | Consistente con 11 |
| 3 meses | meses | Umbral de sospecha de fallo de troquíteres en hemiartroplastia | Sin cita | Consistente |
| ~80 % | % de crecimiento | Aporte de la fisis al crecimiento del húmero | Sin cita | Sin fuente puntual, repetida |

### 13 — Cierre (perlas, algoritmo, MCQ, bibliografía)

| Valor | Unidad | Qué mide | Fuente citada | Estado |
|---|---|---|---|---|
| 1 cm / 45° | — | Umbral de Neer | Neer, 1970 (bibliografía) | Con fuente |
| <8 mm / >2 mm | mm | Predictores de Hertel | Hertel, 2004 (bibliografía) | Con fuente |
| 110–160° | grados | Posición de la luxatio erecta | Sin cita puntual | Consistente, repetida en perlas, algoritmo y 3 MCQ (incluida la variante "130°" en un enunciado de MCQ, dentro del rango) |
| ≈0,5 % | % | Frecuencia de la luxatio erecta | Sin `[VERIFICAR]` en las perlas (aunque sí aparece marcada en el MCQ sobre osteonecrosis y en otras secciones) | **Sospechoso** — inconsistencia de marcado, igual que en 00/04/05 |
| ~60 % / ~80 % / ~3 % | % | Lesiones asociadas de la luxatio erecta | `[VERIFICAR]` explícito en las perlas | **Ya marcada** |
| <0,90 | índice | Índice braquio-braquial | Sin cita | Consistente |
| 3–4 semanas | semanas | Momento del EMG | Sin cita | Consistente |
| >5 mm / ≥3 mm | mm | Umbral quirúrgico del troquíter | Sin cita | Consistente, repetida en perlas, algoritmo y 2 MCQ |
| 2–4 mm | mm | Acortamiento de tornillos | Sin cita | Consistente |
| 2, 6, 12 semanas / 6, 12 meses | — | Calendario de controles | Sin cita | Consistente |
| 2–4 semanas / 6–8 semanas / 6–12 semanas / 4–6 meses | semanas/meses | Retorno laboral/deportivo escalonado | Sin cita | Consistente con 11 |
| ≥90 % / ≥85–90 % | % | Movilidad / fuerza para alta deportiva | Sin cita | Consistente con 11; ver nota de discrepancia con el "≥80 %" combinado de la sección 10 |
| 45–90 % | % | Osteonecrosis en 4 partes | `[VERIFICAR el rango]` explícito, dos veces (texto y MCQ) | **Ya marcada** |
| 3–6 meses | meses | Umbral para derivar a exploración del nervio axilar | Sin cita | **Discrepante** — ver D7 |
| 130° | grados | Abducción bloqueada (enunciado de MCQ de diagnóstico diferencial) | Ejemplo ilustrativo dentro de 110–160° | Coherente, sin necesidad de fuente adicional (es un caso clínico) |
| 20–30° | grados | Resistencia para explorar el deltoides (enunciado de MCQ) | Sin cita | Sin fuente puntual, consistente con 12 |
| 1938 / 1940 / 1970 / 1976 / 1987 / 2004 / 2018 / 2021 / 2022 / 2024 / 2026 | años | Fechas de las publicaciones de la bibliografía | Bibliografía propia | Con fuente — verificar que la 15.ª ed. de Campbell's (2026) y la 8.ª de Green's (2022) sean efectivamente las ediciones vigentes al momento de publicar el tema, conforme a `docs/BIBLIOGRAFIA.md` |

---

## 3. Criterios cualitativos que la literatura suele cuantificar (Faltante)

| Sección | Frase cualitativa | Cifra que la literatura suele dar | Estado |
|---|---|---|---|
| 08-fisiopatologia | "la tolerancia al escalón es mayor [en el hombro] que en la cadera o la rodilla... el umbral aceptado es exigente en el paciente joven" | No se da el número aquí, mientras que 10-tratamiento sí lo hace (<2 mm) sin remitir explícitamente a esta frase | **Faltante** — falta la remisión cruzada explícita o el número en el propio párrafo |
| 07-anatomia | "sin que la energía sea extraordinaria" (laxitud ligamentaria y luxatio erecta) | No se cuantifica el grado de laxitud (p. ej. escala de Beighton) | **Faltante** — criterio cualitativo donde existe un puntaje validado (Beighton) |
| 04-clasificacion / 13-cierre | Resultado funcional referido cualitativamente ("hombro indoloro, estable...") pese a citarse a Constant-Murley en la bibliografía | Nunca se dan puntos de corte del score de Constant, ASES ni SST en ningún punto del cuerpo del texto | **Faltante** — se cita la escala en la bibliografía (13.6) pero no se usa cuantitativamente en ninguna sección de resultados/pronóstico |
| 12-complicaciones | "un tornillo intraarticular destruye el cartílago glenoideo en semanas" | No se da un rango numérico de semanas | **Faltante** (menor) |
| 06-etiologia | "un acromion en gancho... hace tope antes y con menor grado de abducción" | `[VERIFICAR]` ya marca la ausencia de umbral, correctamente | **Ya marcada** — no requiere nueva marca, ejemplo de buena práctica de la autora |

---

## 4. Notas sobre el patrón de marcado `[VERIFICAR]`

El documento usa `[VERIFICAR]` de forma extensa y en general correcta, pero de manera **inconsistente para la misma cifra repetida en distintas secciones**: por ejemplo, "≈0,5 % de luxatio erecta" está marcada `[VERIFICAR]` en algunas apariciones (00-definicion, tabla de 04, parte de 05) y no en otras (cuerpo de 04, cuerpo de 05, perlas de 13). Lo mismo ocurre parcialmente con "~60 %/~80 %/~3 %" de la luxatio erecta, que está marcada en la mayoría de las apariciones pero no en todas. Esto no cambia el valor numérico en sí, pero sí genera el riesgo de que un lector (o el motor de generación del HTML) trate la misma cifra como "confirmada" en un lugar y "pendiente" en otro. Se recomienda unificar el marcado: o se marca `[VERIFICAR]` la primera vez que aparece y se remite a esa mención, o se marca en todas las apariciones.

---

## 5. Resumen para la autora

- **Total de cifras auditadas (deduplicadas por magnitud clínica, con su ubicación por sección):** aproximadamente **230** entradas de tabla, que cubren la práctica totalidad de las ~551 ocurrencias cuantitativas detectadas por el contador automático (la diferencia son repeticiones literales de la misma cifra en la misma sección).
- **Discrepancias entre secciones del propio documento (D1–D10):** **10** grupos de discrepancia identificados, el más grave siendo D1 (ángulo cérvico-diafisario, con hasta 4 rangos distintos: 130–140°, 130–150°, 130–135°/120–150°, 125–145° de reducción aceptable) y D2 (abducción para axilar: 70–90° vs 20–30°, una diferencia clínicamente relevante porque cambia si al paciente agudo se le puede pedir o no la proyección convencional).
- **Ya marcadas por la autora con `[VERIFICAR]`:** aproximadamente **45** entradas, en su mayoría correctamente señaladas (predictores de Hertel, tasas de la luxatio erecta, rango de osteonecrosis, penetración de tornillos, frecuencias direccionales).
- **Sin fuente (sin cita puntual y sin `[VERIFICAR]`):** la mayoría de las restantes — aproximadamente **140** entradas, concentradas en datos morfométricos de anatomía (dimensiones de la cabeza humeral y la glenoides, offset cefálico), dosis farmacológicas (antibióticos, analgésicos, anestésicos locales, HBPM) y detalles técnicos quirúrgicos (diámetros de implantes, longitudes de incisión).
- **Sospechosas (inconsistentes con otra parte del documento o con criterio clínico general, sin llegar a ser una discrepancia franca de dos valores):** aproximadamente **10** entradas, incluyendo el patrón de marcado inconsistente de `[VERIFICAR]` para la misma cifra.
- **Faltantes (criterio cualitativo donde la literatura tiene uno numérico):** **5** entradas identificadas explícitamente.

**Prioridad de revisión sugerida para la autora, de mayor a menor impacto en la conducta clínica:**
1. D1 — ángulo cérvico-diafisario normal y rango de reducción aceptable (afecta el criterio de mal resultado/varización en todo el documento).
2. D2 — abducción requerida para la axilar convencional (70–90° vs 20–30°): afecta directamente si el algoritmo de urgencia indica pedir Velpeau o no.
3. D3 — umbral de hiperabducción de la luxatio erecta (mecanismo ">160°" vs posición "110–160°"): puede confundir al lector sobre si 110° ya es patológico o si el umbral real está en 160°.
4. D7 — umbral temporal para abandonar la conducta expectante en la lesión del nervio axilar (3–4 vs 3–6 meses): cambia el momento de derivación a cirugía nerviosa.
5. 45–90 % de osteonecrosis en 4 partes — ya está marcada `[VERIFICAR]`, pero además de confirmar el rango contra la edición ancla, la autora debería decidir si distingue series con reducción anatómica precoz de series históricas, porque en la literatura real esta es una de las cifras más citadas con valores muy dispares.
6. D4 — criterio de índice de presión braquial (razón <0,90 vs diferencia porcentual >10 %): son dos pruebas distintas y no deberían presentarse como intercambiables sin aclararlo.
7. Umbral quirúrgico del troquíter (>5 mm / ≥3 mm) y predictores de Hertel (<8 mm / >2 mm): sin discrepancia interna, pero sin cita puntual en ningún punto del documento pese a ser las cifras que más cambian conducta en todo el tema — priorizar la cita explícita de la fuente (Neer 1970 / consenso quirúrgico para el primero; Hertel 2004 para el segundo, ya referenciado en la bibliografía general pero no anclado línea por línea).

Ninguna de las cifras listadas debe incorporarse al panel "Números que hay que saber" del HTML sin que la autora las confirme contra la fuente primaria correspondiente.
