---
layout: post
title: "爆速の HTML5 クロス・プラットフォーム CocoonJS"
date: 2014-12-01 00:48:53 +0900
updated: 2014-12-02 00:48:53 +0900
comments: true
categories: CocoonJS
written-language: "ja"
author: Shindeok Kang
author-url: https://twitter.com/heavymery
published: true
---

CocoonJS は [Ludei](https://www.ludei.com/) 社が提供する爆速の「HTML5 クロス・プラットフォーム」です。

>Ludei - We love HTML5

<!-- more -->

他にも HTML5 クロス・プラットフォームは色々ありますが、CocoonJS は PhoneGap に似ています。
HTML/CSS/JS をネイティブコードに変換するのでは無く、そのまま実行環境で動作する仕組みです。


## CocoonJS vs PhoneGap

HTML/CSS/JS をそのまま使える点では同じですが、
PhoneGap がシステムの WebView を使うのみ対し、
CocoonJS は独自の実行環境を持っています。

システム WebView はとくかくパフォーマンスが遅い、OS や機種依存により挙動が違うなどの問題があります。

CocoonJS は独自の実行環境で動作するため OS や機種依存の問題を解消し、
システム WebView に比べ圧倒的に早いです。

<!--
|                       | PhoneGap | CocoonJS |
| --------------------- | :------: | :------: |
| Accelerated Web Apps  | No       | Yes      |
| Accelerated Web Games | No       | Yes      |
| WebGL support         | No       | Yes      |
| Real Debugging        | No       | Yes      |
| Cloud Compiler        | Yes      | Yes      |
| Cordova extensions    | Yes      | Yes      |
-->

![CocoonJS vs PhoneGap](/images/post/about-cocoonjs/cocoonjs-vs-phonegap.png)
（参照：[CocoonJS vs PhoneGap](https://www.ludei.com/landing/cocoonjs-phonegap/)）

テーブルの一番下に「Cordova extensions」と書いてますが、
最近のアナウンスで CocoonJS でも Cordoba プラグインを使える様になりました。
（詳細は「Apache Cordova サポート」を参照）


## CocoonJS が素敵な理由

* 爆速の HTML5 実行環境
  Canvas+, WebView+ の独自の実行環境で動作、JavaScript VM と WebGL もサポートするので早い！
* 今までの WEB 開発ツールやライブラリーをそのまま使える
  （HTML5 に準拠しているので）
* 簡単に実機でテストやデバッグができる（CocoonJS Launcher）
* 様々のプラットフォームに簡単に配布できる（Cloud Compiler）
* アプリ運用に関わる便利なツールや拡張機能が備わっている
  * 拡張機能（CocoonJS Plugins）
  * 分析サービス（Analytics Service)
  * ライブ・アップデート（Cloud Service）


### 拡張機能

CocoonJS は 独自のネイティブ拡張機能を持っています。

* アプリ内広告
* アプリ内課金
* Google プレイゲーム連携
* iOS ゲームセンター連携
* Facebook 連携
* プッシュ通知
* デバイスアクセス（カメラ、モーションセンサー ...）
* ゲームパッド対応
* などなど

（参照：[Plugins overview](http://support.ludei.com/hc/en-us/articles/201821276-Plugins-overview-3-0-0-)）



## ２つの CocoonJS プラットフォーム

* Canvas+
* WebView+

### Canvas+

HTML5 Canvas アプリやゲームに最適な実行環境です。
iOS 5, Android 2.3 以上からは WebGL もサポートされるので更に爆速！

### WebView+

Chromium で作られた独自の WebView として、
主に Android 向けに開発された実行環境です。(Android 4 以上)
Chromium を元にしているのでシステム WebView より端然早く、
機種や OS バージョン毎の差異を気にしなくて済みます。

iOS の場合
iOS 8 以前は iOS 用の WebView+ はサポートされてませんでしたが、
iOS 8 からは WKWebView を基盤にした WebView+ がサポートされる様になりました。


## Apache Cordova サポート

最近 CocoonJS は Apache Cordova を正式にサポートする事を発表しました。
これにより Cordova の無数のプラグインと CocoonJS の WebView+ を組み合わせる事が可能です。
（参照：[Apache Cordova Promo](http://support.ludei.com/hc/en-us/articles/202321108-Apache-Cordova-Promo)）

現在 Cordova に対応した CocoonJS プラットフォームは WebView+ のみで、Canvas+ は対応予定になっています。


## CocoonJS Launcher App

実機でのテストやデバッグが簡単に行える専用のアプリ

Safari, Eclipse によるリモートデバッグが可能？

URLを指定して実行可能。

ソースコードをZIPファイルに圧縮して直接端末のファイルシステムから実行する事も可能。


## CocoonJS Cloud