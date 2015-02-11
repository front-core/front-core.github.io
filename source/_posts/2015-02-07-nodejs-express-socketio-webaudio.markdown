---
layout: post
title: "リアルタイム通信して各デバイス上で音声を再生する(Node.js + Socket.IO + Web Audio API)"
date: 2015-02-07 21:22:59 +0900
comments: true
categories: [nodejs, express, socketio, webaudio, heroku]
author: Naoki Otsu
---

双方向(リアルタイム)通信して、各デバイス上で音声を再生するサンプルを作り、Herokuにデプロイしました。
実現するための方法を解説していきます。  

<!-- more -->

※ドラム音源を再生した[サンプル](https://github.com/front-core/web-audio-api-drums-sample)に、リアルタイム通信機能を追加したものとなります。
  
<span style="display: block; background-color: #efefef; padding: 20px;">
**サンプル(Heroku)**  
[https://nodejs-socketio-webaudio.herokuapp.com/](https://nodejs-socketio-webaudio.herokuapp.com/)  
<br>
![リアルタイム通信して音声再生サンプル](/images/post/nodejs-express-socketio-webaudio/qr.png)  
※ドラムを叩いて複数デバイスでリアルタイム通信して音声を再生。  
<br>
**ソースコード**  
[https://github.com/front-core/nodejs-socketio-webaudio-sample](https://github.com/front-core/nodejs-socketio-webaudio-sample)  
</span>

<br>

# 使用した技術
今回のサンプルは、下記を使って実現しました。

* [Node.js](http://nodejs.org/)([express](http://expressjs.com/))
* [Socket.IO](http://socket.io/)
* [Web Audio API](https://dvcs.w3.org/hg/audio/raw-file/tip/webaudio/specification.html)
* [Heroku](https://www.heroku.com/)  
<br>

## Node.js(express)
JavaScriptでサーバサイドのプログラムを実行出来るプラットフォームです。  
非同期I/Oを扱う事が出来るのがメリットで、1台のサーバで数万〜数十万の接続も可能となります。

また今回、Node.jsで最も利用されているフレームワークexpressを利用しました。  
expressは、URLのルーティング機能などWebサイトを構築する基本機能が備わっています。

## Socket.IO
Node.js上で動作し、リアルタイム通信機能を提供しているフレームワークです。  
ブラウザの対応状況をチェックして、最適な通信方法を選択してくれます。  
スマートフォンもiOS,Androidに対応しています。  

Socket.IOが対応している通信方式は次の6つとなります。  

* WebSocket
* Ajaxポーリング
* Ajaxマルチパートストリーミング
* IFrame
* JSONPポーリング
* Flashのソケット通信

## Web Audio API
音声を再生、処理する為のJavaScript APIです。  
音声の再生、ボリューム調整などに加えて、合成やフィルターなど複雑なエフェクトが可能となります。  

## Heroku
アプリケーションを稼働させるためのプラットフォームです。  
Node.js,Java,Ruby,PHP,Pythonなど様々な言語をサポートしていて、  
基本的な機能を使っている限り無料でWebサイトを公開する事ができます。  
<br>
  
  
# ソースの解説

### web.js(Node.js + Socket.IO)[サーバ側]
1. **HTTPサーバを作りルーティング、Socket.IOを設定** [[ソース]](https://github.com/front-core/nodejs-socketio-webaudio-sample/blob/master/web.js)  
web.jsでは、Node.js(express)でHTTPサーバを作り、  
静的ファイルの保管場所(css,js,音声ファイルなど誰でも閲覧可能なPublicな場所)を指定して、ルートにアクセスがあったらindex.htmlを表示するルーティングを設定しています。  
またSocket.IOでは、クライアントから"from_client"がくるのを監視し、接続があったら"from_server"を返信する設定をしています。  
  
  
### index.html(Web Audio API + Socke.IO)[クライアント側]
1. **Socket.IOの読み込みと接続** [[ソース]](https://github.com/front-core/nodejs-socketio-webaudio-sample/blob/master/index.html#L115-L121)  
index.htmlでは、まずSocket.IOを使えるようにsocket.io.jsを読み込みます。  
自動で生成されるファイルなので準備する必要はありません。  
指定したURLで、Socket.IOに接続させます。  
<br>
  
  
2. **スプラッシュ画像を押して再生したい音声データをセット** [[ソース]](https://github.com/front-core/nodejs-socketio-webaudio-sample/blob/master/index.html#L230-L244)  
iPhone/Androidでは、最初の音声ロードだけはユーザーアクション(クリックなど)が必要な制約がある為、
最初にスプラッシュ画像を準備し、タップされた時に音声データを再生可能な状態にセットします。  
※PCでは、この制約はありません。  
<br>
  
  
3. **ボタンが押された時にサーバ側に通知** [[ソース]](https://github.com/front-core/nodejs-socketio-webaudio-sample/blob/master/index.html#L195-L196)  
ボタンが押されたらサーバに"from_client"を送信し、押したボタンidを送ります。  
※どのボタンを押したかを全クライアントに通知させる為。  
<br>
  
  
4. **サーバ側からの返答をチェックし、音声を再生** [[ソース]](https://github.com/front-core/nodejs-socketio-webaudio-sample/blob/master/index.html#L246-L261)  
サーバに"from_client"を送信すると、"from_server"を返答してもらうようにサーバ側で設定しているので、
"from_server"がくるのを監視し、返信があったら受け取ったボタンidの音声を再生します。  
<br>
  
  
# Herokuにデプロイ
Node.jsで作ったアプリケーションを、Herokuにデプロイする際は、こちらが参考になりました。  

* [Getting Started with Node.js on Heroku](https://devcenter.heroku.com/articles/getting-started-with-nodejs#introduction)
* [Node.js + Express を Heroku で動かすまでの手順まとめ](http://tacamy.hatenablog.com/entry/2013/02/16/235127)

またHeroku上でNode.jsを実行する際は、package.jsonに下記の記述をします。  
※もしくはProcfileを準備。
```
"scripts": {
	"start": "node web.js"
},
```
<br>

# ハマったところ  

##モバイル端末で音がならなかった
PC上では音がなったが、なぜかiPhone上で音声再生ができなくハマりました..  
### 解決方法
使っていたNode.js,Socket.IOのバージョンが古く対応してなかったようです。
package.json記載のバージョンを下記にしたところ問題なく再生する事ができました。
```
"socket.io":"1.3.3"
"node": "0.11.11"
```
<br>

## Herokuをよく理解していなかった
HerokuでWebアプリを公開出来る事は知っていましたが、実際に試したりしていなかったので、その使い方でハマりました..

### 解決方法
サイトを参考にサンプルサイトを公開していく事でだいぶ理解出来ました。  

参考になった記事  
 - [初心者でも15分で公開できるHerokuのはじめかた](http://developers.mobage.jp/blog/how-to-use-for-beginners-heroku)  
 - [Node.jsをHerokuにデプロイ](http://qiita.com/yoh-nak/items/80e51197410c7f956ccd)  
 - [Heroku入門 | ドットインストール](http://dotinstall.com/lessons/basic_heroku)  
<br>

# 課題
## 各デバイス間での音の完全な一致が難しい
ローカルで試している時はほぼ一致させる事が出来ても、Web公開した環境だと少し遅れて再生されてしまっていました。  
完全な一致が難しいまでも、出来るだけ一致する状態にしたいのですが、打ち手がよくわかっていません。  
<br>

# まとめ
リアルタイム通信して各デバイス上で音声を再生する方法を解説していきました。  
オンラインゲームや音楽アプリ、チャットなど様々な用途が考えられそうです。  
  
非常に少ないコードで実現出来た反面、各デバイス間で音を完全に一致させる事が難しい事もわかりました。  
その辺りの課題が解決したら、また紹介していきたいと思います。  



