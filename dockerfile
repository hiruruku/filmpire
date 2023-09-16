# 基本イメージの指定
FROM node:18-alpine

# コンテナ内の作業ディレクトリの設定
WORKDIR /app

# 環境変数の設定
ENV LANG=C.UTF-8 \
    TZ=Asia/Tokyo
RUN npm install -g pnpm

# ファイルシステムの変更を監視するためのパッケージのインストール
RUN apk add --no-cache make gcc g++ python3 && \
    yarn global add node-gyp

# 依存関係のファイルをコピー
COPY filmpire/package.json filmpire/pnpm-lock.yaml ./

# 依存関係のインストール
RUN pnpm install

# node_modulesへのダミーフォルダ作成 (後でオーバーライド用)
RUN mkdir -p /app/node_modules && chown -R node:node /app/node_modules

# viteコンテナを公開
EXPOSE 5173

# コンテナをnodeユーザとして実行 (セキュリティのためのベストプラクティス)
USER node