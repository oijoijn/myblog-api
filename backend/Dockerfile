FROM python:3.11-slim AS base

# 必要なパッケージをインストール
RUN apt-get update && apt-get install -y --no-install-recommends \
    build-essential \
    libc-dev \
    gcc \
    tzdata \
    sudo \
    tree \
    nginx \
    vim \
    && apt-get clean \
    && rm -rf /var/lib/apt/lists/*

# アプリケーションの依存関係をインストール
WORKDIR /workspace
COPY ./back_myblog/requirements.txt .
RUN pip install --upgrade pip setuptools && \
    pip install -r requirements.txt

# ビルドステージ
FROM base AS build
WORKDIR /workspace
COPY . .

# ランタイムステージ
FROM base AS runtime 

# 作業ディレクトリを設定
WORKDIR /workspace

COPY --from=build /workspace/back_myblog /workspace/back_myblog



