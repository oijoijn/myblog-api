# ベースイメージ
FROM python:3.11-slim AS base

# 必要なパッケージをインストール
RUN apt-get update && apt-get install -y --no-install-recommends \
    build-essential \
    libc-dev \
    gcc \
    tzdata \
    sudo \
    && apt-get clean \
    && rm -rf /var/lib/apt/lists/*

# アプリケーションの依存関係をインストール
WORKDIR /workspace/back_myblog 
COPY ./back_myblog/requirements.txt .
RUN pip install --upgrade pip setuptools
RUN pip install -r requirements.txt

# ビルドステージ
FROM base AS build
WORKDIR /workspace/back_myblog 
COPY . .

# ランタイムステージ
FROM python:3.11-slim AS runtime

# 作業ディレクトリを設定
WORKDIR /workspace/back_myblog

# ベース環境の Python ライブラリをコピー
COPY --from=base /usr/local /usr/local

# # ユーザー作成と権限設定
# RUN groupadd -r backend-django && useradd -r -g backend-django -m backend-django

# # backend-django ユーザーに sudo 権限を付与
# RUN echo "backend-django ALL=(ALL) NOPASSWD:ALL" >> /etc/sudoers

# # 明示的にディレクトリを作成し、所有者を設定
# RUN mkdir -p /workspace/back_myblog && chown backend-django:backend-django /workspace/back_myblog

# # ビルドされたコードをコピー
# COPY --chown=backend-django:backend-django --from=build /workspace/back_myblog /workspace/back_myblog

# # backend-django ユーザーに切り替え
# USER backend-django