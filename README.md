## 1 myblog-api
#### 1 目的
        面白そうな技術や触ったことのある技術を紹介するサイト
        元のサイトhttps://github.com/oijoijn/myblog
        myblogをフロントエンド、バックエンドに分ける.
#### 2 URL
        https://tech-exploration.com/

#### 4 機能要件
- **ユーザー管理**
  - ユーザー登録、ログイン、ログアウト機能
- **記事管理**
  - 記事の作成、編集、削除、一覧表示、詳細表示（CRUD）
- **コメント管理**
  - 記事へのコメント投稿、編集、削除、一覧表示（CRUD）
- **認証・認可**
  - ユーザー認証（JWTトークン）
  - 管理者権限と一般ユーザー権限の区別

#### 5 非機能要件
- **可用性**
  - 99.9%の稼働率を目指す。
- **スケーラビリティ**
  - ユーザー数が増加してもスムーズに動作するよう、スケールアップ/スケールアウトが可能な設計。
- **セキュリティ**
  - ユーザーデータを保護するため、通信をHTTPSで暗号化。
- **デプロイ**
  - AWSを利用したクラウド環境でのデプロイ。


#### 6 ドキュメント
        http://localhost:8000/blogs/docs/ REST APIの定義
        http://localhost:8000/schema/ スキーマの定義

## 2 主要技術
|使用言語・フレームワーク|バージョン|
|------------------------|----------|
|React                  |  18.3.1     |
|Django                  | 4.2.17   |
|Django REST freamework    | 3.15.2   |
|PostgreSQL                   | 15      |


|インフラ       |バージョン     |
|---------------|---------------|
|AWS |               |
|Docker         |      27.2.0    |

## 3 管理コマンド
|myblog-api 内       |    bash set_env.sh <コマンド> |
|---------------|---------------|
| buildno |キャッシュを使用せずにDockerイメージを再ビルドし、コンテナをバックグラウンドで起動 |
|build| キャッシュを使用してDockerイメージをビルドし、コンテナをバックグラウンドで起動|
|up |既存のDockerイメージを使用して、コンテナをバックグラウンドで起動|
|execd| バックエンドコンテナ（myblog-api-backend-1）に/bin/bashでアクセスする|
|execr| フロントエンドコンテナ（myblog-api-frontend-1）に/bin/shでアクセスする|
|down|すべてのコンテナを停止し、削除| 

| backend コンテナ内     |    bash set_env.sh <コマンド> |
|---------------|---------------|
| mks |マイグレーションファイルを作成し、データベースを最新の状態に更新|
| rms |データベースとマイグレーションファイルを削除|
| rund |開発サーバーを起動|
| sc |静的ファイルを収集してSTATIC_ROOTに保存|
| c |管理者ユーザーを作成|

| frontend コンテナ内   |    sh set_env.sh <コマンド> |
|---------------|---------------|
| runr |開発サーバーを起動|
| build |デプロイ用にファイルを収集|

## **4 AWS**

本プロジェクトでは、AWSを活用してインフラを構築する。

### **1. ドメインの取得**
- **サービス**: お名前ドットコム  
- **概要**: ドメインを取得し、AWS Route 53で管理。  

---

### **2. DNS**
- **サービス**: AWS Route 53  
- **概要**: DNSサーバーとして、ドメインを管理。  

---

### **3. 証明書**
- **サービス**: AWS Certificate Manager  
- **概要**: HTTPS通信を行うためのSSL/TLS証明書を取得。  

---

### **4. CDN**
- **サービス**: AWS CloudFront  
- **概要**: Reactの静的ファイルを効率的に配信するため、CDNを構築。  

---

### **5. フロントエンド**
- **サービス**: AWS S3  
- **概要**: Reactアプリケーションのビルド成果物を保存・配信。  

---

### **6. バックエンド**
- **サービス**: Amazon API Gateway
- **概要**: S3とEC2の通信の窓口。  

---

### **7. バックエンド**
- **サービス**: Amazon EC2
- **概要**: Django REST Frameworkのアプリケーションをデプロイ。  
---
