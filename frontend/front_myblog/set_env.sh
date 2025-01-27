#!/bin/sh

case "$1" in
  "runr")
    npm run dev
    ;;
  "build")
    npm run build
    ;;
  *)
    echo "Usage: $0 {runr|build}"
    exit 1
    ;;
esac
