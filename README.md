# myblog-api
#### 1 目的
        面白そうな技術や触ったことのある技術を紹介するサイト
        myblogをフロントエンド、バックエンドに分ける.
#### 2 URL
        https://technologicalexploration.pythonanywhere.com/blog/

#### 4 機能要件(CRUD処理◦会員機能)
        会員機能
        コメント機能 C,R
        コメント編集機能 U,D

#### 5 非機能要件
        検索機能
        AWS

#### 6 ドキュメント
        http://localhost:8000/blogs/docs/ REST APIの定義
        http://localhost:8000/schema/ スキーマの定義

## 3 主要技術
|使用言語・フレームワーク|バージョン|
|------------------------|----------|
|React                  |       |
|Django                  |    |
|Django REST freamework                 |    |
|Mysql                   |       |


|インフラ       |バージョン     |
|---------------|---------------|
|Pythonanywhere |               |
|Docker         |         |
|Shell Script   |               |

## 4 SQL
データベースで保存するもの
        accounts:
        ニックネーム
        パスワードをハッシュ化したものを保存
        blog:
        ブログのタイトル
        ブログのpath
        ブログのイメージ画像