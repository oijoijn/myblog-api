#!/bin/bash

case "$1" in
  "buildno")
    docker compose build --no-cache 
    docker compose up -d
    ;;
  "build")
    docker compose build 
    docker compose up -d
    ;;
  "up")
    docker compose up -d
    ;;
  "execd")
    docker exec -it myblog-api-backend-1 /bin/bash
    ;;
  "execr")
    docker exec -it myblog-api-frontend-1 /bin/sh
    ;;
  "down")
    docker compose down
    ;;
  *)
    echo "Usage: $0 {buildno|build|up|execd|execr|down}"
    exit 1
    ;;
esac
