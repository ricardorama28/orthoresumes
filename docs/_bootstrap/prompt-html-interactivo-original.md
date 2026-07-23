# Prompt reutilizable — HTML interactivo de estudio

Guardar en `plantillas/prompt-html.md`. Se invoca con `/publicar <ID> --html` o pegándolo con el contenido de un tema.

---

## Uso

```
Generá el HTML interactivo del tema <ID> a partir de contenido/<MOD>/<ID>-<slug>/*.md,
siguiendo plantillas/prompt-html.md al pie de la letra.
```

---

## PROMPT

Convertí el contenido del tema en **un único archivo HTML autocontenido** (sin build, sin dependencias externas salvo CDN, abre con doble clic y funciona offline salvo tipografías). Es una **herramienta de estudio activo**, no un documento maquetado: si el resultado se puede imprimir y perder nada, fallaste.

### Restricciones técnicas

- Un solo `.html`. CSS y JS embebidos.
- Sin frameworks pesados. Vanilla JS. Se permite CDN sólo para Mermaid (diagramas) y KaTeX si hiciera falta.
- Debe funcionar en móvil (la residente estudia en el celular). Diseño mobile-first, área táctil ≥ 44 px.
- Estado persistido en `localStorage` con clave `upome:<ID>`: progreso de lectura, tarjetas ya respondidas, respuestas del quiz, notas propias.
- Modo claro y oscuro, con detección de `prefers-color-scheme` y toggle manual.
- Accesible: contraste AA, navegación por teclado, `aria-label` en controles.

### Identidad visual

Color de acento = color del módulo del tema:

```
GEN #EAB308 · TUM #C55A11 · MSA #38BDF8 · MSC #2563EB
MIA #EC4899 · MIC #7C3AED · COL #16A34A
```

Tipografía de sistema o Inter. Encabezado fijo con el título del tema, el módulo y una barra de progreso de lectura. Pie discreto: **VZ – 2026**.

Nada de gradientes decorativos ni sombras genéricas de plantilla. Superficie limpia, jerarquía por tamaño y peso, el color sólo donde significa algo.

### Estructura obligatoria

1. **Barra lateral / drawer de navegación** con los 12 puntos + cierre. Marca con un check las secciones ya leídas (scroll spy + `localStorage`). En móvil, drawer deslizable.

2. **Cuerpo por secciones colapsables.** Cada una arranca colapsada salvo la primera. Botón global "expandir todo / colapsar todo".

3. **Callouts diferenciados visualmente**, no sólo por color:
   - `trick` → borde izquierdo, icono de llave, fondo tenue del acento
   - `warn` → borde izquierdo ámbar/rojo, icono de alerta — **son los pitfalls, tienen que saltar a la vista**
   - `clave` → recuadro con borde completo, icono de estrella

4. **Tablas responsivas.** En viewport angosto, colapsan a formato tarjeta (cada fila = una tarjeta con etiqueta-valor). Primera columna siempre visible / sticky en scroll horizontal. Botón de ordenar por columna donde tenga sentido.

5. **Bloque de técnica quirúrgica como checklist ejecutable.** Cada paso numerado es un ítem tildable, con contador "12 / 47 pasos". Sirve para repasar la técnica mentalmente antes de entrar a quirófano.

6. **Modo tarjetas (flashcards).** Toma el `anki.tsv` del tema. Un botón "Estudiar" abre un panel a pantalla completa: pregunta → tap para revelar → autoevaluación en tres botones (Mal / Bien / Fácil). Repetición espaciada simple (SM-2 reducido) persistida en `localStorage`. Contador de tarjetas pendientes hoy.

7. **Quiz de MCQ.** Todas las preguntas del tema. Feedback inmediato con la explicación completa. Al terminar: puntaje, tiempo, y lista de las falladas con enlace directo a la sección del texto que las cubre. Botón "repetir sólo las falladas".

8. **Preguntas de respuesta corta.** Textarea con la consigna; al enviar se despliega la respuesta modelo para autocorrección. Se guarda lo escrito.

9. **Diagramas Mermaid** para los algoritmos de decisión (algoritmo terapéutico, algoritmo diagnóstico). Renderizado con el tema de color del módulo.

10. **Buscador `Ctrl/⌘ + K`.** Filtra en vivo sobre todo el texto del tema, resalta coincidencias, salta a la sección. Es lo que se usa en la guardia.

11. **Panel "Repaso rápido"** fijo o accesible con un botón: sólo las perlas, los criterios numéricos (mm, grados, %, meses) y los pitfalls, extraídos automáticamente. Es la vista de 3 minutos antes del oral.

12. **Notas propias.** Un bloc por sección, persistido, exportable a `.md` con un botón.

13. **Botón de impresión** con `@media print` que colapse la interactividad y produzca algo legible en papel.

### Extracción de criterios cuantitativos

Escaneá el texto buscando patrones numéricos con unidad (`\d+([.,]\d+)?\s?(mm|cm|°|%|grados|semanas|meses|años|mg|Gy)`) y armá con ellos una tabla "Números que hay que saber" dentro del panel de repaso rápido, con el contexto de la frase donde aparecen. Esto es lo que más se pregunta en el oral y lo que más se olvida.

### Lo que NO quiero

- Un PDF disfrazado de web.
- Animaciones que no aporten información.
- Que el contenido médico se modifique, resuma o reordene al convertir. **El HTML es una vista del mismo contenido, no una versión abreviada.** Si el docx tiene 620 párrafos, el HTML tiene 620 párrafos.
- Dependencia de conexión para leer el texto.

### Verificación antes de entregar

- [ ] Abre sin servidor local, con `file://`
- [ ] El conteo de párrafos coincide con el `.docx` del mismo tema
- [ ] Todas las tablas, pasos, MCQ y tarjetas del origen están presentes
- [ ] Funciona en un viewport de 375 px de ancho
- [ ] El estado sobrevive a un refresh
- [ ] Modo oscuro legible
- [ ] Peso total < 1,5 MB
