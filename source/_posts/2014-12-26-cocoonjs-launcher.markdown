---
layout: post
title: "CocoonJS Launcher の使い方"
date: 2014-12-26
comments: true
categories: CocoonJS
written-language: "ja"
author: Shindeok Kang
author-url: https://twitter.com/heavymery
published: true
---

CocoonJS Launcher は CocoonJS 用に開発してアプリやゲームを、簡単に実機でテスト・デバッグできるアプリです。

現在 iOS 版と Android 版が用意されています。

* [CocoonJS Launcher - iOS 版](https://itunes.apple.com/en/app/cocoonjs-by-ludei/id519623307?mt=8)
* [CocoonJS Launcher - Android 版](https://play.google.com/store/apps/details?id=com.ideateca.cocoonjslauncher&hl=en)

<!--
# メイン・メニュー

## DEMOS

## YOUR APP
-->

メイン・メニューは DEMOS, YOUR APP ２つ

  DEMOS では

  YOUR APP では


DEMOS

  DEMOS には、いくつか CocoonJS の素敵なところを拝見できるデモが掲載されています。

  使い方

    一覧からデモを選択すると、デモの説明と実行環境の選択ボタンが表示されます。

    ![デモ選択画面](/images/post/cocoonjs-launcher/demo-selected-screen.png)

    選択できる実行環境は CANVAS+, WEBVIEW+, WEBVIEW ３種類があります。（iOS 8 未満の iOS では WEBVIEW+ は表示されません）

    実行環境を１つ選択すると、デモのソースコードがダウンロードされ、実行画面に切り替わります。

    ![デモ実行画面](/images/post/cocoonjs-launcher/demo-running-screen.png)

    デモに合った実行環境を選択した方がパフォーマンスが良いです。
    例えば、Canvas 系のデモは CANVAS+ が端然早いです！

  デモ一覧

    ここでは iOS 版 v2.1.1.1 に載っているデモをいくつか簡単に紹介します。

    Ads (Ads extension)

      ![Ads デモ](/images/post/cocoonjs-launcher/demo-ads.png)

    Box2D (Test for HTML5 Box2D implementation)

      ![Box2D デモ](/images/post/cocoonjs-launcher/demo-box2d.png)

    Facebook (Facebook login and friend images)

      ![Facebook デモ](/images/post/cocoonjs-launcher/demo-facebook.png)

    Gamepad (Test for HTML5 Gamepad implementation)

      ![Gamepad デモ](/images/post/cocoonjs-launcher/demo-gamepad.png)

    Google Play Games (Google Play Games demo)

    In-App Purchases (In-App purchases support)

    Keyboard (CocoonJS Keyboard)

    Location (Location support using the platform location systems)

    Multichannel Sound (Multichannel Sound)

    Multiplayer (Multiplayer support in CocoonJS)

    Notifications (Push and Local notifications)

    Rate (Rate the application in the platform market)

    Sumon (Sample Sumon game level)

    Vibration (Test for the device vibration capability)

    WebGL - 3D horse (A poligonal 3D horse running in place)

    WebGL - Ludei Logo (Ludei logo with falling drops of water)

    WebGL - NeHe cube (Textured 3D Cube rotating in mid-air)

    WebGL - PlayCanvas Doom3 Gangnam (Demo created using PlayCanvas. Three monsters from Doom3 dancing to the sound of Gangnam Style)

      まさかのカンナム・スタイル！

    WebGL - Striped Tunnel (An endless dizzying striped tunnel)

    WebGL - Three.js Cubemap (Three heads illuminated with a cubemap)

    WebGL - Watery texture (A texture distorted to look like rippling water)

    WebView (WebView support in Canvas+)

  その他のデモ

    CocoonJS Launcher には載っていないデモもあります。
    すべてのデモ一覧[こちら](http://cocoonjsservice.ludei.com/cocoonjslaunchersvr/demo-list/)のページで確認できます。

    [![デモ一覧](/images/post/cocoonjs-launcher/demo-list.png)](https://cocoonjsservice.ludei.com/cocoonjslaunchersvr/demo-list/)


デバッグ・ツール

設定



YOUR APP 使い方

  ZIP ファイル伝送して実行する方法

    iOS の場合

    Android の場合

  URL を指定して実行する方法

    直接 HTML ページにアクセス

  　ZIP ファイルをダウンロードして実行
  　 DEMOS の各アプリはこの方式を使っている



内蔵されいるデモアプリ






ソースコードから直接実行
自作コードや外部デモコードを動かせる


   * ファイル伝送で
   * URLを指定して

ローカルサーバを立ち上げるには http-server が便利
（CocoonJS デモアプリのコードで解説）