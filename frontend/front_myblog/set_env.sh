#!/bin/sh

case "$1" in
  "build")
    docker compose build 
    docker compose up -d
    ;;
  "runr")
    npm run dev
    ;;
  *)
    echo "Usage: $0 {build|runr}"
    exit 1
    ;;
esac
