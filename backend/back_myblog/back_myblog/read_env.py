import os
import environ
from pathlib import Path

BASE_DIR = Path(__file__).resolve().parent.parent

# .envファイルを読み込む
env = environ.Env()
env.read_env(os.path.join(BASE_DIR, '.env'))

SECRET_KEY = env('SECRET_KEY')
DEBUG = env.bool('DEBUG')
ALLOWED_HOSTS = env.list('ALLOWED_HOSTS')
ENGINE=env('ENGINE')
CORS_ALLOW_ALL_ORIGINS = env('CORS_ALLOW_ALL_ORIGINS') 
CORS_ALLOWED_ORIGINS = env.list('CORS_ALLOWED_ORIGINS')

print(f'SECRET_KEY:{SECRET_KEY}')
print(f'DEBUG:{DEBUG}')
print(f'ALLOWED_HOSTS:{ALLOWED_HOSTS}')
print(f'ENGINE:{ENGINE}')
print(f'CORS_ALLOW_ALL_ORIGINS:{CORS_ALLOW_ALL_ORIGINS}')
print(f'CORS_ALLOWED_ORIGINS:{CORS_ALLOWED_ORIGINS}')