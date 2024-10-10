#!/bin/bash

## Check if optimizt is installed
if ! command -v optimizt &> /dev/null
then
  echo "Warning: optimizt is not installed. Please install it with npm i -g @funboxteam/optimizt to use the optimization feature."
  exit 1
fi

## Set directory (default to current directory)
DIRECTORY=${1:-.}
OPTIMIZE=true
DELETE_ORIGINAL=true

## Function to display help
usage() {
  echo "Usage: $0 [-d directory_path] [-n] [-k] [--help]"
  echo
  echo "Options:"
  echo "  -d directory_path  Specify a different directory."
  echo "  -n                 Disable image optimization and conversion with optimizt."
  echo "  -k                 Keep the original images after conversion (do not delete)."
  echo "  --help             Display this help message."
}

## Parse options
while getopts "d:nk-:" opt; do
  case $opt in
    d) DIRECTORY="$OPTARG" ;;
    n) OPTIMIZE=false ;;
    k) DELETE_ORIGINAL=false ;;
    -)
      case "${OPTARG}" in
        help) usage; exit 0 ;;
        *) echo "Invalid option"; usage; exit 1 ;;
      esac ;;
    *) echo "Invalid option"; usage; exit 1 ;;
  esac
done

## Perform operations on image files
shopt -s nullglob # Enable nullglob to handle no match case
for FILEPATH in "$DIRECTORY"/*.{jpg,jpeg,png,gif}; do
  [ -e "$FILEPATH" ] || continue

  FILENAME=$(basename "$FILEPATH")
  DIRNAME=$(dirname "$FILEPATH")

  # Update filename to lowercase and replace spaces with hyphens
  NEW_FILENAME=$(echo "$FILENAME" | tr '[:upper:]' '[:lower:]' | tr ' ' '-')
  
  # Remove non URL-safe characters
  NEW_FILENAME=$(echo "$NEW_FILENAME" | sed 's/[^a-zA-Z0-9._-]//g')

  NEW_FILEPATH="$DIRNAME/$NEW_FILENAME"

  if [ "$FILEPATH" != "$NEW_FILEPATH" ]; then
    echo "Renaming \"$FILENAME\" to \"$NEW_FILENAME\""
    mv "$FILEPATH" "$NEW_FILEPATH"
  fi
  
  if $OPTIMIZE && [ "${NEW_FILENAME##*.}" != "webp" ]; then
    # Optimize and convert image to webp format
    echo "Optimizing and converting $NEW_FILENAME"
    optimizt "$NEW_FILEPATH" --webp

    if $DELETE_ORIGINAL && [ "${NEW_FILENAME##*.}" != "svg" ] && [ -e "${NEW_FILEPATH%.*}.webp" ]; then
        echo "Deleting original file: $NEW_FILENAME"
        rm "$NEW_FILEPATH"
    fi
  fi
done
