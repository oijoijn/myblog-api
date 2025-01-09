#!/bin/bash

case "$1" in
  "mks")
    python manage.py makemigrations
    python manage.py makemigrations accounts
    python manage.py makemigrations blogs
    python manage.py migrate
    python manage.py migrate accounts
    python manage.py migrate blogs
    ;;
  "rms")
    rm -rf db.sqlite3
    rm -rf accounts/migrations/
    rm -rf blogs/migrations/
    ;;
  "rund")
    python ./manage.py runserver 0.0.0.0:8000
    # python -m uvicorn back_myblog.asgi:application --host 0.0.0.0 --port 8000
    ;;
  "sc")
    python manage.py collectstatic
    ;;
  "c")
    python manage.py createsuperuser
    ;;
  *)
    echo "Usage: $0 {mks|rms|rund|sc|c}"
    exit 1
    ;;
esac
