#!/usr/bin/env bash
# ─────────────────────────────────────────────────────────────────────────────
# verificar-motor.sh — test de regresión del motor UPOME.
#
# Compila y valida el documento fixture permanente (tests/fixture/DEMO-01-fixture)
# y exige que pase LOS DOS veredictos: numérico (ULTRA+) y estructural (subaspectos
# de docs/ESQUEMA-12.md). Si falla, hay una regresión en engine/ o en
# engine/esquema.json (o el fixture necesita regenerarse a propósito).
#
# Uso:  bash tests/verificar-motor.sh
# Exit: 0 si todo pasa; != 0 si algo falla.
#
# No deja basura: copia el fixture a contenido/DEMO/ sólo durante la corrida y
# lo borra al final, y restaura temario/progreso.json.
# ─────────────────────────────────────────────────────────────────────────────
set -uo pipefail
cd "$(dirname "$0")/.."
ROOT="$(pwd)"

FIXTURE="tests/fixture/DEMO-01-fixture"
ID="DEMO-01"
DEST="contenido/DEMO/DEMO-01-fixture"
PROG="temario/progreso.json"
PROG_BAK="temario/.progreso.json.motorbak"

# ── Localizar Node (Windows suele no exponerlo en Git Bash) ──────────────────
NODE=""
if command -v node >/dev/null 2>&1; then
  NODE="node"
elif [ -x "/c/Program Files/nodejs/node.exe" ]; then
  NODE="/c/Program Files/nodejs/node.exe"
elif [ -x "/c/Program Files (x86)/nodejs/node.exe" ]; then
  NODE="/c/Program Files (x86)/nodejs/node.exe"
else
  echo "✗ No se encontró Node. Instalalo o ajustá la ruta en el script."; exit 3
fi

# ── Localizar Python (en esta máquina es 'py'; ver CLAUDE.md) ────────────────
PY=""
for c in py python3 python; do command -v "$c" >/dev/null 2>&1 && { PY="$c"; break; }; done
if [ -z "$PY" ]; then echo "✗ No se encontró Python 3 (necesario para validar.py)."; exit 3; fi

echo "▶ verificar-motor — Node: $NODE · Python: $PY"

if [ ! -d "$FIXTURE" ]; then echo "✗ Falta el fixture $FIXTURE"; exit 3; fi

# ── Preparar: copiar fixture a contenido/ y respaldar progreso.json ──────────
cp "$PROG" "$PROG_BAK" 2>/dev/null || true
mkdir -p contenido/DEMO
rm -rf "$DEST"
cp -r "$FIXTURE" "$DEST"

limpiar() {
  rm -rf "$DEST"
  rmdir contenido/DEMO 2>/dev/null || true
  rm -f "salida/docx/${ID}.docx" "salida/html/${ID}.html" "salida/anki/${ID}.tsv" "salida/${ID}.metrics.json"
  if [ -f "$PROG_BAK" ]; then mv -f "$PROG_BAK" "$PROG"; fi
}
trap limpiar EXIT

FALLOS=0

# ── 1) Presupuesto por sección (informativo) ─────────────────────────────────
echo ""
echo "── contar.js (presupuesto de párrafos) ──"
"$NODE" engine/contar.js "$ID" | tail -4 || true

# ── 2) Build de todas las salidas ────────────────────────────────────────────
echo ""
echo "── build.js --all ──"
if "$NODE" engine/build.js "$ID" --all; then
  echo "✓ build OK"
else
  echo "✗ build FALLÓ"; FALLOS=$((FALLOS+1))
fi

# El .docx es obligatorio
if [ ! -f "salida/docx/${ID}.docx" ]; then
  echo "✗ no se generó salida/docx/${ID}.docx"; FALLOS=$((FALLOS+1))
fi

# ── 3) Validación numérica + estructural (el gate) ───────────────────────────
echo ""
echo "── validar.py (numérico + estructural) ──"
if "$PY" engine/validar.py "$ID"; then
  echo "✓ validar.py = 0 (numérico Y estructural en verde)"
else
  echo "✗ validar.py != 0"; FALLOS=$((FALLOS+1))
fi

# ── Veredicto ────────────────────────────────────────────────────────────────
echo ""
if [ "$FALLOS" -eq 0 ]; then
  echo "✅ MOTOR OK — el fixture compila y valida en ULTRA+ (numérico + estructural)."
  exit 0
else
  echo "❌ MOTOR CON $FALLOS FALLO(S) — revisá el cambio en engine/ (o regenerá el fixture si fue a propósito)."
  exit 1
fi
