---
layout: post
title: "CocoonJS Launcher の使い方"
date: 2014-1-5
comments: true
categories: CocoonJS
written-language: "ja"
author: Shindeok Kang
author-url: https://twitter.com/heavymery
published: true
---

CocoonJS Launcher は CocoonJS 用に開発してアプリやゲームを、簡単に実機でテスト・デバッグできるアプリです。
現在 iOS 版と Android 版があります。

<span class="block-center">
&nbsp;
[![CocoonJS Launcher - iOS 版](/images/post/cocoonjs-launcher/app-store.png =172x60)](https://itunes.apple.com/en/app/cocoonjs-by-ludei/id519623307?mt=8)
&nbsp;
[![CocoonJS Launcher - Android 版](/images/post/cocoonjs-launcher/google-play.png =172x60)](https://play.google.com/store/apps/details?id=com.ideateca.cocoonjslauncher&hl=en)
&nbsp;
</span>

<!-- more -->

# メインメニュー

CocoonJS Launcher アプリを立ち上げると、スプラッシュスクリーンの後にメインメニュー画面が表示されます。
メニューには DEMOS, YOUR APP ２つのオプションがあります。

<span class="block-center">
![メインメニュー](/images/post/cocoonjs-launcher/main-menu.png =320x)
</span>

# DEMOS

メインメニューで DEMOS を選択すると、 CocoonJS の素敵なところを拝見できるデモ一覧が表示されます。

<span class="block-center">
![DEMOS](/images/post/cocoonjs-launcher/demos.png =320x)
</span>

## 使い方

一覧からデモを選択すると、デモの説明と実行環境の選択ボタンが表示されます。

<span class="block-center">
![デモ選択画面](/images/post/cocoonjs-launcher/demo-selected-screen.png =320x)
</span>

選択できる実行環境は CANVAS+ / WEBVIEW+ / WEBVIEW の３種類があります。
CANVAS+ / WEBVIEW+ は CocoonJS の実行環境、WEBVIEW はシステム WebView です。（参照：[爆速の HTML5 クロス・プラットフォーム CocoonJS](http://front-core.org/ja/blog/2014/12/16/about-cocoonjs/)）

iOS 8 未満の iOS では WEBVIEW+ は表示されません。
またデモに対応しない実行環境はグレーアウトされ選択できません。

<span class="block-center">
![デモ選択画面（非対応実行環境のグレーアウト）](/images/post/cocoonjs-launcher/runtime-gray-out.png =320x)
</span>

実行環境を１つ選択すると、デモのソースコードがダウンロードされた後、実行画面に切り替わります。

<span class="block-center">
![デモ実行画面](/images/post/cocoonjs-launcher/demo-running-screen.png =569x)
</span>

CANVAS+ を選択した場合は画面の端っこに表示される「FPS(frames per second)」から動作パフォーマンスを確認できます。

描画パフォーマンスは CANVAS+ が端然早いです！
違う実行環境を選択してパフォーマンスを比較してみてください。

実行中のデモを終了したい場合は「FPS」表示をタップしてデバッグコンソールにアクセスし、「Actions」をタップして表示されるメニューから「Exit」を選択すると終了します。

<span class="block-center">
![Actions メニュー](/images/post/cocoonjs-launcher/debug-console-actions.png =569x)
</span>


## デモ一覧

ここでは iOS 版 v2.1.1.1 に載っているデモをいくつか紹介します。

### Ads

CocoonJS 拡張機能の「アプリ内広告」を使ったデモです。バナー広告とフルスクリーン広告の表示を確認できます。

<span class="block-center">↓バナー広告↓</span>
<span class="block-center">![Ads デモ - バーナー広告](/images/post/cocoonjs-launcher/demo-ads-1.png =569x)</span>

<span class="block-center">↓フルスクリーン広告↓</span>
<span class="block-center">![Ads デモ - フルスクリーン広告](/images/post/cocoonjs-launcher/demo-ads-2.png =569x)</span>

### Box2D 

CocoonJS には Box2D がネイティヴで実装されており、JS から box2dweb API を通じて制御する事ができます。
このデモではネイティヴパフォーマンスで動く 2D 物理演算処理のシミュレーションを確認できます。

<span class="block-center">
![Box2D デモ](/images/post/cocoonjs-launcher/demo-box2d.png =569x)
</span>

* ＋ ボタン： 小惑星（らしい）が20個ずつ落ちて来きます。
* ー ボタン： 逆に20個ずつ消えます。

<!--
### Facebook 

Facebook login and friend images

![Facebook デモ](/images/post/cocoonjs-launcher/demo-facebook.png)

### Google Play Games 

Google Play Games demo
-->

### Keyboard 

CocoonJS 実行環境の CANVAS+ / WEBVIEW+ から OS のネイティヴキーボードを呼び出す事ができます。

<span class="block-center">![Keyboard デモ](/images/post/cocoonjs-launcher/demo-keyboard.png =569x)</span>

<span class="block-center">↓URL入力の例↓</span>
<span class="block-center">![Keyboard デモ - URL入力](/images/post/cocoonjs-launcher/demo-keyboard-url.png =569x)</span>

### Location 

CocoonJS では端末の位置情報システムにアクセスする事ができます。このデモでは現在の経緯度や高度などの位置情報を確認できます。

<span class="block-center">
![Location デモ](/images/post/cocoonjs-launcher/demo-location.png =569x)
</span>

### Multichannel Sound

CocoonJS はモバイルブラウザの HTML5 オーディオ要素に関する制約をすべて解消してくれます。
このデモではマルチチャンネルのオーディオ再生を確認できます。

<span class="block-center">
![Multichannel Sound デモ](/images/post/cocoonjs-launcher/demo-multichannel-sound.png =569x)
</span>

### Multiplayer 

CocoonJS の「マルチプレイヤー」サポート機能のデモです。

<span class="block-center">
![Multiplayer デモ](/images/post/cocoonjs-launcher/demo-multiplayer.png =569x)
</span>

* **Multiplayer Match:** CocoonJS 拡張機能の「iOS ゲームセンター連携」を使ったマルチプレイヤーマッチのデモ（現在 iOS ゲームセンターのみ対応）

* **Local Match:** １つの端末でターン制によるマルチプレイができる様にする「Loopback モード」のデモ

<span class="block-center">↓Multiplayer Match↓</span>
<span class="block-center">
![Multiplayer デモ](/images/post/cocoonjs-launcher/demo-multiplayer-match.png =569x)
</span>

<span class="block-center">↓Local Match↓</span>
<span class="block-center">
![Multiplayer デモ](/images/post/cocoonjs-launcher/demo-multiplayer-local-match.png =569x)
</span>

<!--
### Notifications 

Push and Local notifications
-->

### Rate 

CocoonJS の「レーティング」サポート機能のデモです。
これにより CocoonJS で開発したアプリから App Store や Google Play のレビューページに簡単に遷移する事ができます。

<span class="block-center">
![Rate デモ](/images/post/cocoonjs-launcher/demo-rate.png =569x)
</span>

<span class="block-center">↓ストアのレビューページ↓</span>
<span class="block-center">
![Rate デモ](/images/post/cocoonjs-launcher/demo-rate-store-screen.png =569x)
</span>

### Sumon 

実際にストアで配信中の CocoonJS で作られた「Sumon」と言うゲームのサンプルです。

* [Sumon - iOS 版](https://itunes.apple.com/app/id470147794)
* [Sumon - Android 版](https://play.google.com/store/apps/details?id=com.ideateca.sumon&hl=en)

<span class="block-center">
![Sumon デモ](/images/post/cocoonjs-launcher/demo-sumon.png =569x)
</span>

<!--
### Vibration 

Test for the device vibration capability
-->

### WebGL

CocoonJS の売りは何よりも WebGL 対応による爆速の描画パフォーマンスです。
それを裏付けるように、WebGL のデモが沢山載っています。

<!--
* 3D horse - A poligonal 3D horse running in place
* Ludei Logo - Ludei logo with falling drops of water
* NeHe cube - Textured 3D Cube rotating in mid-air
* PlayCanvas Doom3 Gangnam - Demo created using PlayCanvas. Three monsters from Doom3 dancing to the sound of Gangnam Style まさかのカンナム・スタイル！
* Striped Tunnel - An endless dizzying striped tunnel
* Three.js Cubemap - Three heads illuminated with a cubemap
* Watery texture - A texture distorted to look like rippling water
-->

<span class="block-center">↓走る 3D 馬↓</span>
<span class="block-center">![WebGL - 3D horse デモ](/images/post/cocoonjs-launcher/demo-webgl-3d-horse.png =569x)</span>

<span class="block-center">↓Ludei社の 3D ロゴ↓</span>
<span class="block-center">![WebGL - Ludei Logo デモ](/images/post/cocoonjs-launcher/demo-webgl-ludei-logo.png =569x)</span>

<span class="block-center">↓ぬるぬる回転する 3D キューブ↓</span>
<span class="block-center">![WebGL - NeHe cube デモ](/images/post/cocoonjs-launcher/demo-webgl-nehe-cube.png =569x)</span>

<span class="block-center">↓まさかのカンナムスタイル↓</span>
<span class="block-center">（Doom3 のモンスター達がカンナムスタイルを踊る）</span>
<span class="block-center">![WebGL - PlayCanvas Doom3 Gangnam デモ](/images/post/cocoonjs-launcher/demo-webgl-playcanvas-doom3-gangnam.png =569x)</span>

<span class="block-center">↓シェーダベースのねじれトンネル↓</span>
<span class="block-center">![WebGL - Striped Tunnel デモ](/images/post/cocoonjs-launcher/demo-webgl-striped-tunnel.png =569x)</span>

<span class="block-center">↓シェーダベースの水波↓</span>
<span class="block-center">![WebGL - Watery texture デモ](/images/post/cocoonjs-launcher/demo-webgl-watery-texture.png =569x)</span>

<!--
### WebView 

WebView support in Canvas+
-->

## その他のデモ

CocoonJS Launcher には載っていないデモもあります。
すべてのデモ一覧は[こちら](http://cocoonjsservice.ludei.com/cocoonjslaunchersvr/demo-list/)のページで確認できます。

<span class="block-center" style="border: 1px solid #9b9b9b">
[![デモ一覧](/images/post/cocoonjs-launcher/demo-list.png)](https://cocoonjsservice.ludei.com/cocoonjslaunchersvr/demo-list/)
</span>
<span class="block-center">（TRY OUT THE DEMOS - [Ludei](https://www.ludei.com/) サイトより）</span>

デモ一覧ではソースコードをダウンロードできるので、「DEMOS」に乗っていなくても後述の「YOUR APP」で動かす事ができます。


# YOUR APP

YOUR APP では自作コードや外部デモコードを直接 CocoonJS Launcher で動かす事ができます。
やり方は ZIP ファイルを伝送して実行する方法と URL を指定して実行する方法の２通りあります。

## ログイン

YOUR APP を使うためには、まず CocoonJS Cloud サービスへの登録が必要です。

https://sso.ludei.com/signup

登録が完了したら、登録したメールアドレスとパスワードでログインできます。

<span class="block-center">
![ログイン画面](/images/post/cocoonjs-launcher/your-app-login.png =320x)
</span>

## ZIP ファイル伝送して実行

ZIP ファイルで伝送して置くと、オフラインでも CocoonJS Launcher で自分のコードを実行する事ができます。
注意点として index.html は ZIP フォルダーのルートパスにある必要があります。

### iOS の場合

1. iOS デバイスを PC に繋ぎ、iTunes を立ち上げます。
2. デバイスを選択して、APP のファイル共有画面を開きます。
<span class="block-center">
![iTune ファイル共有](/images/post/cocoonjs-launcher/itune-file-share-1.png)
</span>

3. CocoonJS を選択して、伝送するファイルをドラッグまたは「追加...」ボタンで追加します。
<span class="block-center">
![iTune ファイル共有](/images/post/cocoonjs-launcher/itune-file-share-2.png)
</span>

4. YOUR APP の DOCUMENTS に追加された ZIP ファイルが表示されます。
5. ZIP ファイルをアイテムを選択状態にして、実行環境を選択すると実行画面に切り替わります。
<span class="block-center">
![ログイン画面](/images/post/cocoonjs-launcher/your-app-documents.png =320x)
</span>

### Android の場合

Android の場合は SD カードに ZIP ファイルを伝送します。

SD カードへのファイル伝送には色んな方法がありますが、ここでは Android SDK を使う場合のファイル伝送コマンドを記載します。

```
adb push <ZIPファイルのパス> /sdcard/
```

ファイル伝送が完了したら、同じく YOUR APP の DOCUMENTS に追加された ZIP ファイルが表示されます。


## URL を指定して実行

HTML ページの URL を指定するとウェブサーバーに上のコードを直接実行できます。（index.html は省略可）

また、[デモ一覧](https://cocoonjsservice.ludei.com/cocoonjslaunchersvr/demo-list/)の
ダウンロードリンクのように ZIP ファイルの URL を指定すると、その ZIP ファイルがダウンロードされ実行されます。

<span class="block-center">
![ログイン画面](/images/post/cocoonjs-launcher/your-app-url.png =320x)
</span>


# デバッグツール

デモ・アプリ実行画面の「FPS」表示をタップするとデバッグコンソールにアクセスできます。

## ログ出力

デバッグコンソールには CocoonJS 既定のログと JavaScript の `console` 出力が表示されます。

<span class="block-center">
![デバッグコンソール](/images/post/cocoonjs-launcher/debug-console.png =320x)
</span>

下端の All / Console / Warnings / Errors タブでログの種類毎にフィルタリングして表示する事ができます。

* All: すべてのログ
* Console: デバッグ・情報ログ（console.debug, console.log, console.info）
* Warnings: 警告ログ（console.warn）
* Errors: エラーログ（console.error）

## Actions メニュー

「Actions」をタップすると以下のメニューが表示されます。

<span class="block-center">
![Actions メニュー](/images/post/cocoonjs-launcher/debug-console-actions-menu.png =320x)
</span>

* Exit:  実行中のデモ・アプリを終了します。
* Reload: 実行中のデモ・アプリを再読み込みします。
* Profile: 実行パフォーマンスを計測して、プロファイルデータを出力します。
* MemoryLog: デバッグコンソールに現在のメモリログを出力します。

<span class="block-center">↓Profile 開始↓</span>
<span class="block-center">
![Actions メニュー](/images/post/cocoonjs-launcher/debug-console-profile-start.png =320x)
</span>

<span class="block-center">↓MemoryLog 出力↓</span>
<span class="block-center">
![Actions メニュー](/images/post/cocoonjs-launcher/debug-console-memory-log.png =320x)
</span>


# 設定

CocoonJS Launcher の設定画面では、デモ・アプリを実行する際のカスタマイズ可能ないくつかのオプションが用意されています。

## 設定ボタンの場所

設定画面は「DEMOS」ではデモ選択画面の右上「・・・」から、「YOUR APP」では下端の「SETTINGS」ボタンからアクセスできます。

<span class="block-center">↓DEMOS↓</span>
<span class="block-center">
![DEMOS の設定ボタン](/images/post/cocoonjs-launcher/demos-settings-button.png =320x)
</span>

<span class="block-center">↓YOUR APP↓</span>
<span class="block-center">
![YOUR APP の設定ボタン](/images/post/cocoonjs-launcher/your-app-settings-button.png =320x)
</span>

## 設定画面

主に以下のオプションが変更可能です。

* Orientation mode: デモ・アプリの実行中の端末向きを設定できます。
* Debug enabled: デバッグ機能をアクティブ/非アクティブできます。
* Debug position: デバッグボタン（FPS 表示）の位置を変更できます。

<span class="block-center">
![設定画面](/images/post/cocoonjs-launcher/settings.png =320x)
</span>

設定可能なオプションは OS によって異なる場合があります。



