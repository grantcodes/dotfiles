#!/bin/sh

WORKDIR="$HOME/.config/ags/v2"

function _ags() {
  ags quit
  # ags --inspector &
  ags run $WORKDIR/app.ts &
}

_ags
inotifywait --quiet --monitor --event create,modify,delete --recursive $WORKDIR | while read DIRECTORY EVENT FILE; do
  file_extension=${FILE##*.}
  case $file_extension in
    js|jsx|ts|tsx)
      echo "reload JS..."
      _ags
      ;;
    css)
      echo "reload CSS..."
      ags request reload-css
      ;;
  esac
done