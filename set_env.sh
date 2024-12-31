#!/bin/bash

case "$1" in
  "build")
    docker compose build --no-cache
    docker compose up -d
    ;;
  "up")
    docker compose up -d
    ;;
  "execd")
    docker exec -it myblog-api-backend-1 /bin/bash
    ;;
  "execs")
    docker exec -it fastapi-mysql-1 mysql -u root -p
    ;;
  "execr")
    docker exec -it myblog-api-frontend-1 /bin/sh
    ;;
  "rund")
    python -m uvicorn back_myblog.asgi:application --host 0.0.0.0 --port 8000
    ;;
  "runr")
    npm run dev
    ;;
  "down")
    docker compose down
    ;;
  *)
    echo "Usage: $0 {build|up|exec|run|down}"
    exit 1
    ;;
esac
