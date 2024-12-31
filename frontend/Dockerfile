# 開発用ステージ
FROM node:22-alpine AS dev


WORKDIR /workspace/front_myblog
# 必要なファイルをコピーして依存関係をインストール
# COPY ./front_myblog/package.json ./front_myblog/package-lock.json ./
COPY ./front_myblog/package.json ./
# RUN npm ci

RUN npm install 

# 本番用ステージ
FROM node:22-alpine AS production

WORKDIR /workspace/front_myblog

# 開発ステージからビルド成果物をコピー
# COPY --from=dev /frontend/front_myblog/dist ./dist

# 必要なポートを公開
EXPOSE 3000

# サーバーを起動
# CMD ["npx", "serve", "dist"]

CMD ["tail", "-f", "/dev/null"]