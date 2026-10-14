#!/usr/bin/env bash
# Capture 660×1434 WebP landing screens from the iOS Simulator.
# Run on macOS from the Flok app repo (e.g. ~/development/Flok - Main).
#
# Prereqs: Flutter, Simulator booted, app built for the same device class as
# iphone-17-pro-max-silver.webp (1320×2868 logical → export 660×1434).
#
# Discover dart-defines first:
#   rg 'FLOK_' --glob '*.dart' --glob '*.sh' --glob '*.yaml'
#
# Then run the repo's own capture entrypoint if one exists, or loop screens with
# --dart-define=FLOK_LANDING_SCREEN=<key> (adjust to your app's define names).

set -euo pipefail

APP_ROOT="${FLOK_APP_ROOT:-$HOME/development/Flok - Main}"
LANDING_ROOT="${FLOK_LANDING_ROOT:-$HOME/development/flok-site}"
OUT="$LANDING_ROOT/source/public/images/screens"
DEVICE="${FLOK_SIM_DEVICE:-booted}"

mkdir -p "$OUT"

screens=(
  welcome discover map detail qr my-events chat profile
  organizer-create organizer-published organizer-info organizer organizer-chat
)

echo "App: $APP_ROOT"
echo "Out: $OUT"
echo "Define names must match the Flutter app — search FLOK_ in $APP_ROOT"
echo "Screens to export: ${screens[*]}"
echo ""
echo "After each screen is visible in Simulator:"
echo '  xcrun simctl io '"$DEVICE"' screenshot /tmp/flok-screen.png'
echo '  sips -z 1434 660 /tmp/flok-screen.png --out "$OUT/<name>.webp"'
