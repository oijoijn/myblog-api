# ベースイメージ
FROM python:3.11-slim AS base

# 必要なパッケージをインストール
RUN apt-get update && apt-get install -y --no-install-recommends \
    build-essential \
    libc-dev \
    gcc \
    tzdata \
    sudo \
    tree \
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
