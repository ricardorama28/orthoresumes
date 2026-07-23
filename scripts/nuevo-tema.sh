#!/usr/bin/env bash
# nuevo-tema.sh — scaffolding de la carpeta de un tema.
# Uso:  bash scripts/nuevo-tema.sh <ID> "<título>"
#   ej. bash scripts/nuevo-tema.sh MSA-11 "Fracturas del húmero distal"
set -euo pipefail
cd "$(dirname "$0")/.."

ID="${1:-}"; TITULO="${2:-}"
if [ -z "$ID" ] || [ -z "$TITULO" ]; then
  echo "uso: bash scripts/nuevo-tema.sh <ID> \"<título>\""; exit 1
fi

MOD="${ID%%-*}"
# slug: minúsculas, sin tildes, espacios→guiones, sólo [a-z0-9-]
SLUG="$(printf '%s' "$TITULO" \
  | tr '[:upper:]' '[:lower:]' \
  | sed 's/á/a/g; s/é/e/g; s/í/i/g; s/ó/o/g; s/ú/u/g; s/ü/u/g; s/ñ/n/g' \
  | sed 's/[^a-z0-9]\+/-/g; s/^-\+//; s/-\+$//' \
  | cut -c1-40)"

DIR="contenido/$MOD/$ID-$SLUG"
if [ -d "$DIR" ]; then echo "⚠ Ya existe $DIR — no se sobrescribe (regla: no duplicar)."; exit 0; fi
mkdir -p "$DIR/tablas"

cat > "$DIR/meta.yaml" <<YAML
id: $ID
titulo: "$TITULO"
modulo: $MOD
slug: $SLUG
nivel_objetivo: ultra_plus
referencias: []   # completar según docs/BIBLIOGRAFIA.md
YAML

secciones=(
  "00-definicion:Definición y marco general"
  "01-presentacion:Presentación clínica"
  "02-imagenes:Imágenes"
  "03-diagnostico:Diagnóstico"
  "04-clasificacion:Clasificación"
  "05-epidemiologia:Epidemiología"
  "06-etiologia:Etiología y factores de riesgo"
  "07-anatomia:Anatomía y anatomía patológica"
  "08-fisiopatologia:Fisiopatología"
  "09-historia-natural:Historia natural / pronóstico"
  "10-tratamiento:Tratamiento"
  "11-rehabilitacion:Rehabilitación y cuidados posoperatorios"
  "12-complicaciones:Complicaciones"
  "13-cierre:Cierre"
)
for s in "${secciones[@]}"; do
  f="${s%%:*}"; t="${s#*:}"
  printf '# %s\n\n' "$t" > "$DIR/$f.md"
done

cat > "$DIR/anki.tsv" <<'TSV'
#separator:tab
#html:false
#tags column:3
TSV

cat > "$DIR/_brief.md" <<MD
# Brief de fuentes — $ID · $TITULO

_(Lo completa el curador: clasificaciones con autor/año, criterios cuantitativos,
referencias con año, COT vs referencia cerrada del módulo, presupuesto por sección.)_
MD

echo "✓ Creado $DIR"
echo "  Siguiente: el curador completa _brief.md y meta.yaml; luego el redactor escribe las secciones."
echo "  Presupuesto:  node engine/contar.js $ID"
