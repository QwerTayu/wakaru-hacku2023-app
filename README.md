# WAKARU

<img src="public/wakaru-icon-144x144.png" width="180px">

## 📚このプロジェクトについて

これは[Open Hack U 2023 NAGOYA](https://hacku.yahoo.co.jp/hacku2023_nagoya/)に出展する作品です。
 
## 🖥デモ
 
Coming soon...
 
## 🎯特徴
 
1. チームメンバーの位置情報を知ることができます。
2. 活動時間外になると自動的に共有がオフになります。
 
## 🛠バージョン情報
 
- react
  - ver18.2.0
- next.js
  - ver13.4.13
- firebase
  - ver^10.1.0
 
## 💾始め方・インストール方法
 
### 方法1
1. https://wakaru-hacku2023-app.vercel.app/ にアクセスします。
2. 利用登録を行います。（ユーザー情報はFirebase Authenticationで管理しています。）
3. メール認証を行ったのち、ログインします。
4. いろいろ使ってみましょう

### 方法2
1. git clone などで自PCに持ってきます。

    ```
    git clone https://github.com/QwerTayu/wakaru-hacku2023-app.git
    ```

2. npm install で必要なパッケージをインストールします。

    ```
    npm i
    ```

3. 環境変数の設定ファイルを作成します。プロジェクト直下に以下ファイルを作成してください。（API keyなどは各自で取得してください。）

    ```
    ファイル名 .env.local で作成しています。
    ```
    ```
    # Google Map API Key
    NEXT_PUBLIC_GOOGLE_MAP_KEY=

    # Firebase Config
    NEXT_PUBLIC_FIREBASE_API_KEY=
    NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=
    NEXT_PUBLIC_FIREBASE_PROJECT_ID=
    NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=
    NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=
    NEXT_PUBLIC_FIREBASE_APP_ID=
    ```

4. ローカルサーバを立ち上げます。
    ```
    npm run dev
    ```
5. あとは **方法1-2**からの手順と同じです。
 
## 🔎使い方
 
- 「Home」ページの使い方
  1. 位置情報共有をON/OFFで切り替えることができます。
  2. 退勤時刻を変更することができます。
  3. 設定した時刻より遅い時刻では位置情報共有をONにすることができません。
- 「Status」ページの使い方
  1. 他ユーザの出欠状況・退勤時刻を確認することができます。
- 「Map」ページの使い方
  1. 他のユーザの位置情報を知ることができます。
  2. 退勤済み(位置情報共有がOFF)のユーザの位置情報を確認することはできません。
- 「Header」の使い方
  1. 「LogOut」をクリックするとログアウトします。
  2. アイコンをクリックすると、アカウント・データを削除するページ遷移します。
     - アカウントの削除を行うことができます。
 
## 🗒ノート
 
Our [website](https://wakaru-hacku2023-app.vercel.app) is hosted on the Vercel platform.

Built with Firebase.
 
## 🧑‍💻製作メンバー

<table>
  <tr>
    <th>
      <a href="https://github.com/QwerTayu">
        <img src="https://github.com/QwerTayu.png" width="50px;">
      </a>
    </th>
    <td>Qwert -システム担当-
      <br>
      <a href="http://twitter.com/tayu99_qwert">
        <img height="20" src="https://img.shields.io/twitter/follow/tayu99_qwert?label=Twitter&logo=twitter&style=flat">
      </a>
      <a href="https://github.com/QwerTayu">
        <img height="20" src="https://img.shields.io/github/followers/QwerTayu?label=follow&logo=github&style=flat">
      </a>
    </td>
  </tr>
  <tr>
    <th>
      <a href="https://github.com/e2137">
        <img src="https://github.com/e2137.png" width="50px;">
      </a>
    </th>
    <td>e2137 -デザイン担当-
      <br>
      <a href="https://github.com/e2137">
        <img height="20" src="https://img.shields.io/github/followers/e2137?label=follow&logo=github&style=flat">
      </a>
    </td>
  </tr>
</table>

 
## 🔐License
"WAKARU" is under [MIT license](https://en.wikipedia.org/wiki/MIT_License).