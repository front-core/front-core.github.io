---
layout: post
title: "爆速の HTML5 クロス・プラットフォーム CocoonJS"
date: 2014-12-16
comments: true
categories: CocoonJS
written-language: "ja"
author: Shindeok Kang
author-url: https://twitter.com/heavymery
published: true
---

CocoonJS は [Ludei](https://www.ludei.com/) 社が提供する爆速の「HTML5 クロス・プラットフォーム」です。

HTML5 クロス・プラットフォームは他にも色々ありますが、CocoonJS は PhoneGap に似ています。
HTML / CSS / JS をネイティブコードに変換するのでは無く、そのまま実行環境で動かす仕組みです。

<!-- more -->

# CocoonJS vs PhoneGap

HTML / CSS / JS をそのまま使える点では同じですが、
PhoneGap がシステムの WebView を使うのに対し、CocoonJS は独自の実行環境を持っています。

システム WebView はとにかくパフォーマンスが悪く、OS や機種依存により挙動が違うなどの問題がありますが、
CocoonJS は独自の実行環境で動作するため OS や機種依存の問題を解消し、
システム WebView なんかに比べて圧倒的に早いです。

<span class="block-center">
[![CocoonJS vs PhoneGap](/images/post/about-cocoonjs/cocoonjs-vs-phonegap.png)](https://www.ludei.com/landing/cocoonjs-phonegap/)
<span style="float:right">（Comparing CocoonJS and PhoneGap  - [Ludei](https://www.ludei.com/) サイトより）</span>
</span>

# CocoonJS が素敵な理由

CocoonJS が素敵な理由をいくつか挙げてみます。
<!--（参照：[About CocoonJS](https://www.ludei.com/cocoonjs/)）-->

* 爆速の HTML5 実行環境
* 今までの WEB 開発フレームワークやライブラリーをそのまま使える
* 簡単に実機でテストやデバッグができる
* 様々のプラットフォームに簡単に配布できる
* アプリ運用に関わる便利なツールや拡張機能が備わっている


## 爆速の HTML5 実行環境

CocoonJS では現在異なる３つの実行環境を提供しており、用途に合わせて最適な実行環境を選ぶ事ができます。

* [Canvas+](http://support.ludei.com/hc/en-us/articles/202321098)
* [WebView+](http://support.ludei.com/hc/en-us/articles/201952993)
* [Apache Cordova](http://support.ludei.com/hc/en-us/articles/202321108-Apache-Cordova-Promo)

### Canvas+

<span class="block-center">
[![Canvas+](/images/post/about-cocoonjs/canvas-plus-promo.png)](http://support.ludei.com/hc/en-us/articles/202321098)
</span>

HTML5 Canvas アプリやゲームに最適な実行環境です。
Canvas 描画に特化された Canvas+ の JavaScript 実行速度は、他のブラウザーやシステム WebView に比べて 10倍は早いと言われています。

iOS 5, Android 2.3 以上であれば WebGL もサポートされるので更に爆速です！

### WebView+

<span class="block-center">
[![WebView+](/images/post/about-cocoonjs/webview-plus-promo.png)](http://support.ludei.com/hc/en-us/articles/201952993)
</span>

Chromium で作られた独自の WebView として、主に Android 向けに開発された実行環境です。
Chromium を元にしているのでシステム WebView より端然早く、機種や OS バージョン毎の差異を気にしなくて済みます。
(Android 4 以上)

iOS の場合は iOS 8 以前は iOS 用の WebView+ はサポートされてませんでしたが、
iOS 8 からは WKWebView を基盤にした WebView+ がサポートされる様になりました。

### Apache Cordova

<span class="block-center">
[![Apache Cordova](/images/post/about-cocoonjs/apache-cordova-promo.png)](http://support.ludei.com/hc/en-us/articles/202321108-Apache-Cordova-Promo)
</span>

上記の「CocoonJS vs PhoneGap」比較テーブルの一番下に「Cordova extensions」と書いている様に、
CocoonJS は Apache Cordova を正式にサポートしていて、Cordova の無数のプラグインと CocoonJS を組み合わせる事が可能です。

現在 Cordova に対応した CocoonJS 実行環境は WebView+ のみで、Canvas+ は対応予定になっています。

<!--
最近のアナウンスで CocoonJS でも Cordoba プラグインを使える様になっています。
最近 CocoonJS は Apache Cordova を正式にサポートする事を発表しました。
これにより Cordova の無数のプラグインと CocoonJS の WebView+ を組み合わせる事が可能です。
（参照：[Apache Cordova Promo](http://support.ludei.com/hc/en-us/articles/202321108-Apache-Cordova-Promo)）
-->


## 今までの WEB 開発フレームワークやライブラリーをそのまま使える

CocoonJS では HTML/CSS/JS がそのまま実行されるので、既存の WEB 開発フレームワークやライブラリーをそのまま使えます。

以下は例として一部の有名なフレームワークやライブラリーを挙げていますが、
あくまでも例なのでここに乗っていないライブラリーもほとんどそのまま使えます。（three.js など）

[![使えるライブラリーの例](/images/post/about-cocoonjs/software.png)](https://www.ludei.com/cocoonjs/#development)
<span style="float:right">（使えるライブラリーの例  - [Ludei](https://www.ludei.com/) サイトより）</span>


## 簡単に実機でテストやデバッグができる

CocoonJS 用に開発してアプリやゲームを、実際に実機でのテスト・デバッグが簡単に行える専用のアプリ「CocoonJS Launcher」が提供されています。

<span class="block-center">
[![CocoonJS Launcher](/images/post/about-cocoonjs/cocoonjs-launcher.png)](http://support.ludei.com/hc/en-us/articles/201048463-CocoonJS-launcher-user-guide)
</span>

* [CocoonJS Launcher - Android 版](https://play.google.com/store/apps/details?id=com.ideateca.cocoonjslauncher&hl=en)
* [CocoonJS Launcher - iOS 版](https://itunes.apple.com/en/app/cocoonjs-by-ludei/id519623307?mt=8)

CocoonJS Launcher を使えば自分が作成したコードを面倒な手順無しで簡単に実機確認ができます。

ソースコードをZIPファイルに圧縮して端末のファイルシステムに転送して実行、
またはローカルホストや外部サイトのURLを指定して実行する事も可能です。

<!--
CocoonJS Launcher はデバッグ用のコンソール出力やプロファイリング機能も持っています。
Android の場合は Chrome DevTool(WebView+), Eclipse(Canvas+) によるリモートデバッグも可能です。
-->


## 様々のプラットフォームに簡単に配布できる

CocoonJS Cloud と言うサービスも提供しており、
iOS, Android をはじめ様々なプラットフォーム向けに配布可能なアプリを Cloud サービスから簡単にコンパイルできます。

<span class="block-center">
[![CocoonJS Cloud](/images/post/about-cocoonjs/cocoonjs-cloud.png)](https://www.ludei.com/cocoonjs/#cross-platform)
</span>

配布した後は分析やマネタイズに必要な各種設定をダッシュボードで管理できる便利なサービスです。


## アプリ運用に関わる便利なツールや拡張機能が備わっている
  
### 拡張機能

CocoonJS には JavaScript から制御できる様々なネイティブ拡張機能が用意されています。

* アプリ内広告
* アプリ内課金
* Google プレイゲーム連携
* iOS ゲームセンター連携
* Facebook 連携
* プッシュ通知
* デバイスアクセス（カメラ、モーションセンサー ...）
* ゲームパッド対応
* マルチチャンネルのサウンド再生
* などなど（参照：[Plugins overview - Ludei Support](http://support.ludei.com/hc/en-us/articles/201821276-Plugins-overview-3-0-0-)）

### 分析サービス

<span class="block-center">[![Analytics](/images/post/about-cocoonjs/analytics.png)](https://www.ludei.com/cocoonjs/#business)</span>

CocoonJS は独自の分析サービスを提供しており、
CocoonJS Cloud サービスのダッシュボードからアクセスできます。

### ライブ・アップデート

<span class="block-center">[![CocoonJS Cloud](/images/post/about-cocoonjs/updates.png)](https://www.ludei.com/cocoonjs/#business)</span>

CocoonJS で開発したアプリのコンテンツは、アプリを再配布しなくても
CocoonJS Cloud サービスの管理画面から簡単にアップデートができます。


## まとめ

CocoonJS は日本国内ではまだあまり知られておらず、日本語ドキュメントや関連ブログ記事も少ないです。（ほぼ無い）

今回は CocoonJS の概要だけずらっと並べただけですが、使い方など詳しい内容はそれぞれ別の記事でまとめて行きます。