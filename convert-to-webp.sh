#!/bin/bash
# ============================================================
# convert-to-webp.sh
# Convierte las imágenes PNG del proyecto a WebP y actualiza
# las referencias en el código fuente.
#
# Requisitos: cwebp (parte de libwebp)
#   macOS:   brew install webp
#   Ubuntu:  sudo apt install webp
# ============================================================

set -euo pipefail

IMAGES_DIR="$(cd "$(dirname "$0")" && pwd)/public/images"
SRC_DIR="$(cd "$(dirname "$0")" && pwd)"

QUALITY=80  # Calidad WebP (0-100). 80 es buen balance calidad/tamaño.

# --- Colores para output ---
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
RED='\033[0;31m'
NC='\033[0m'

# --- Verificar que cwebp está instalado ---
if ! command -v cwebp &> /dev/null; then
  echo -e "${RED}Error: cwebp no está instalado.${NC}"
  echo "Instálalo con:"
  echo "  macOS:  brew install webp"
  echo "  Ubuntu: sudo apt install webp"
  exit 1
fi

echo -e "${GREEN}=== Conversión de imágenes a WebP ===${NC}"
echo "Directorio de imágenes: $IMAGES_DIR"
echo "Calidad: $QUALITY"
echo ""

converted=0
skipped=0
total_saved=0

# --- Convertir cada PNG a WebP ---
for png_file in "$IMAGES_DIR"/*.png; do
  [ -f "$png_file" ] || continue

  filename=$(basename "$png_file")
  name_no_ext="${filename%.png}"
  webp_file="$IMAGES_DIR/${name_no_ext}.webp"

  if [ -f "$webp_file" ]; then
    echo -e "${YELLOW}  Omitido (ya existe): ${filename}${NC}"
    skipped=$((skipped + 1))
    continue
  fi

  # Convertir
  cwebp -q "$QUALITY" "$png_file" -o "$webp_file" 2>/dev/null

  # Calcular ahorro
  png_size=$(stat -f%z "$png_file" 2>/dev/null || stat -c%s "$png_file" 2>/dev/null)
  webp_size=$(stat -f%z "$webp_file" 2>/dev/null || stat -c%s "$webp_file" 2>/dev/null)
  saved=$((png_size - webp_size))
  total_saved=$((total_saved + saved))
  pct=$((saved * 100 / png_size))

  echo -e "${GREEN}  Convertido: ${filename} → ${name_no_ext}.webp  (${pct}% más liviano)${NC}"
  converted=$((converted + 1))
done

echo ""

# --- Actualizar referencias en código fuente (.tsx, .ts, .html) ---
echo -e "${GREEN}=== Actualizando referencias en código fuente ===${NC}"

# Archivos de código a actualizar (excluye node_modules y este script)
src_files=$(find "$SRC_DIR" \
  -type f \( -name "*.ts" -o -name "*.tsx" -o -name "*.html" -o -name "*.css" \) \
  ! -path "*/node_modules/*" \
  ! -path "*/.git/*" \
  ! -name "convert-to-webp.sh")

updated_files=0

for src_file in $src_files; do
  # Verificar si el archivo contiene alguna referencia .png a imágenes del directorio
  if grep -q '\.png' "$src_file" 2>/dev/null; then
    # Solo reemplazar referencias a archivos que efectivamente se convirtieron
    changed=false
    for png_file in "$IMAGES_DIR"/*.png; do
      [ -f "$png_file" ] || continue
      filename=$(basename "$png_file")
      name_no_ext="${filename%.png}"
      webp_file="$IMAGES_DIR/${name_no_ext}.webp"

      # Solo actualizar si el webp existe (fue convertido)
      if [ -f "$webp_file" ]; then
        if grep -q "$filename" "$src_file" 2>/dev/null; then
          # Usar sed para reemplazar .png por .webp en las referencias
          if [[ "$OSTYPE" == "darwin"* ]]; then
            sed -i '' "s|${filename}|${name_no_ext}.webp|g" "$src_file"
          else
            sed -i "s|${filename}|${name_no_ext}.webp|g" "$src_file"
          fi
          changed=true
        fi
      fi
    done

    if [ "$changed" = true ]; then
      relative=$(echo "$src_file" | sed "s|$SRC_DIR/||")
      echo -e "${GREEN}  Actualizado: ${relative}${NC}"
      updated_files=$((updated_files + 1))
    fi
  fi
done

echo ""

# --- Resumen ---
total_saved_mb=$(echo "scale=2; $total_saved / 1048576" | bc 2>/dev/null || echo "$((total_saved / 1048576))")
echo -e "${GREEN}=== Resumen ===${NC}"
echo "  Imágenes convertidas: $converted"
echo "  Imágenes omitidas:    $skipped"
echo "  Archivos actualizados: $updated_files"
echo "  Espacio ahorrado:     ~${total_saved_mb} MB"
echo ""
echo -e "${YELLOW}NOTA: Los archivos .png originales NO se eliminaron.${NC}"
echo -e "${YELLOW}Una vez verificado que todo funciona, puedes eliminarlos manualmente con:${NC}"
echo -e "  rm \"$IMAGES_DIR\"/*.png"
echo ""
echo -e "${GREEN}¡Listo!${NC}"
