# ベースステージ: Node.jsをカスタムビルド
FROM node:22-alpine AS base

# 開発ステージ
FROM base AS dev

COPY ./front_myblog/package*.json ./
WORKDIR /workspace/front_myblog
RUN npm install
COPY ./front_myblog ./
RUN npm run build

# 本番ステージ
FROM base AS production

WORKDIR /workspace/front_myblog
RUN apk add --no-cache tree
# COPY --from=base /usr/local /usr/local
COPY --from=dev /workspace/front_myblog/dist ./dist
EXPOSE 3000
CMD ["tail", "-f", "/dev/null"]
