#!/bin/sh

case "$1" in
  "runr")
    npm run dev
    ;;
  "build")
    npm run build
    ;;
  "test")
    npm run preview -- --host 0.0.0.0 --port 3000
    ;;
  *)
    echo "Usage: $0 {runr|build|test}"
    exit 1
    ;;
esac
