#!/usr/bin/env bash
# setup.sh — instala dependencias del motor (Node + Python) y verifica soffice.
# Idempotente. Corré desde la raíz del repo:  bash scripts/setup.sh
set -uo pipefail
cd "$(dirname "$0")/.."
ROOT="$(pwd)"
echo "▶ UPOME setup — raíz: $ROOT"

# ── Node en PATH (Windows suele no exponerlo en Git Bash) ───────────────────
if ! command -v node >/dev/null 2>&1; then
  for p in "/c/Program Files/nodejs" "/c/Program Files (x86)/nodejs" "$HOME/.nvm/current/bin"; do
    [ -x "$p/node.exe" ] || [ -x "$p/node" ] && export PATH="$p:$PATH"
  done
fi

echo "── Node ─────────────────────────────"
if command -v node >/dev/null 2>&1; then
  echo "node $(node --version)   npm $(npm --version 2>/dev/null || echo '?')"
  ( cd engine && (npm ci --no-fund --no-audit 2>/dev/null || npm install --no-fund --no-audit) )
  echo "✓ dependencias de engine/ instaladas (docx, js-yaml, marked)"
else
  echo "✗ Node no encontrado. Instalalo (≥18): https://nodejs.org  —  o 'winget install OpenJS.NodeJS.LTS'"
fi

echo "── Python ───────────────────────────"
PY=""
for c in py python3 python; do command -v "$c" >/dev/null 2>&1 && { PY="$c"; break; }; done
if [ -n "$PY" ]; then
  echo "python: $($PY --version 2>&1)"
  "$PY" -m pip install --user -r engine/requirements.txt --disable-pip-version-check \
    && echo "✓ python-docx + PyYAML instalados" \
    || echo "✗ falló pip install de engine/requirements.txt"
else
  echo "✗ Python 3 no encontrado. Instalalo para poder correr engine/validar.py"
fi

echo "── LibreOffice (PDF) ────────────────"
if command -v soffice >/dev/null 2>&1; then
  echo "✓ soffice en PATH — el PDF se generará en el build."
elif [ -x "/c/Program Files/LibreOffice/program/soffice.exe" ]; then
  echo "✓ soffice en 'C:\\Program Files\\LibreOffice' — el build lo detecta solo."
else
  echo "⚠ soffice no encontrado. El build DEGRADA con aviso y omite sólo el PDF (docx/html/anki igual salen)."
  echo "  Para PDF: instalá LibreOffice o exportá el .docx a mano."
fi

echo "── Verificación rápida ──────────────"
command -v node >/dev/null 2>&1 && node engine/estado.js dashboard | head -3 || true
echo "✔ setup terminado."
