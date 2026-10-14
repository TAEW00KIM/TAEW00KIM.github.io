#!/bin/bash
# Renders the link preview images (public/og.png, public/og-en.png) from card.html with headless Chrome.
set -euo pipefail
cd "$(dirname "$0")/../.."
chrome="/Applications/Google Chrome.app/Contents/MacOS/Google Chrome"
for lang in ko en; do
  out="public/og.png"; [ "$lang" = en ] && out="public/og-en.png"
  "$chrome" --headless --disable-gpu --hide-scrollbars --force-device-scale-factor=1 \
    --window-size=1200,630 --virtual-time-budget=8000 \
    --screenshot="$PWD/$out" "file://$PWD/scripts/og/card.html?lang=$lang" 2>/dev/null
  echo "$out"
done
