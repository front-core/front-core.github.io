---
layout: post
title: "リアルタイム通信して複数デバイス上で音声を再生する(Node.js + Socket.IO + Web Audio API)"
date: 2015-02-07 21:22:59 +0900
written-language: "ja"
comments: true
categories: [nodejs, express, socketio, webaudio, heroku]
author: Naoki Otsu
author-url: https://twitter.com/melo15
---

双方向(リアルタイム)通信して、複数デバイス上で音声を再生するサンプルを作り、Herokuにデプロイしました。
実現するための方法を解説していきます。  

<!-- more -->

※ドラム音源を再生する[サンプル](https://github.com/front-core/web-audio-api-drums-sample)に、リアルタイム通信機能を追加したものです。
  
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

# 対応ブラウザ
IE11以下,Android(Android Browser)を除くモダンブラウザ。  
ただしAndroidでも、Chrome for Android40以降は対応。  
※全端末で検証した訳ではない為、動作の保証はありません。   
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
ブラウザの対応状況をチェックして、最適な通信方法を選択してくれるのが特徴です。  
スマートフォンもiOS,Androidに対応しています。  

Socket.IOが対応している通信方式は次の6つとなります。  

* WebSocket
* Ajaxポーリング
* Ajaxマルチパートストリーミング
* IFrame
* JSONPポーリング
* Flashのソケット通信

上記のように、広い通信方式に対応しているので、  
基本的に、主要ブラウザを含めIE5.5といった古いブラウザでも利用可能となります。   
また通信方式を特定して接続させることも可能です。 
  
特にWebSocketは、サーバーとの接続が軽減されより高速な動作が可能となります。 
以下がWebSocketに対応しているブラウザです。  
IE9以前、Android4.3以前を除く、多くの現行ブラウザがWebSocketに対応しています。(2015/2/7現在)  
<table width="100%" style="text-align: center; margin-bottom: 15px;">
	<tr>
		<td style="background-color:#efefef; text-align:center;" colspan="5">PC</td>
	</tr>
	<tr>
		<td style="padding:5px; text-align: center;">Chrome16+</td>
		<td style="padding:5px; text-align: center;">Firefox11+</td>
		<td style="padding:5px; text-align: center;">Safari7+</td>
		<td style="padding:5px; text-align: center;">Opera12.1+</td>
		<td style="padding:5px; text-align: center;">IE10+</td>
	</tr>
</table>
<table width="100%" style="text-align: center; margin-bottom: 15px;">
	<tr>
		<td style="background-color:#efefef; text-align:center;" colspan="3">スマートフォン</td>
	</tr>
	<tr>
		<td style="padding:5px; text-align: center;">iOS Safari6.1+</td>
		<td style="padding:5px; text-align: center;">Android Browser4.4+</td>
		<td style="padding:5px; text-align: center;">Chrome for Android40+</td>
	</tr>
</table> 

## Web Audio API
音声を再生、処理する為のJavaScript APIです。  
音声の再生、ボリューム調整などに加えて、合成やフィルターなど複雑なエフェクトが可能となります。  

以下がWebAudioAPIに対応しているブラウザです。  
IE、Android Browserを除く、多くのブラウザがWebAudioAPIに対応しています。(2015/2/7現在)   
<table width="100%" style="text-align: center; margin-bottom: 15px;">
	<tr>
		<td style="background-color:#efefef; text-align:center;" colspan="5">PC</td>
	</tr>
	<tr>
		<td style="padding:5px; text-align: center;">Chrome10+</td>
		<td style="padding:5px; text-align: center;">Firefox25+</td>
		<td style="padding:5px; text-align: center;">Safari6+</td>
		<td style="padding:5px; text-align: center;">Opera15+</td>
		<td style="padding:5px; text-align: center;">IE 未サポート (<a href="https://status.modern.ie/webaudioapi">開発中</a>)</td>
	</tr>
</table>
<table width="100%" style="text-align: center; margin-bottom: 15px;">
	<tr>
		<td style="background-color:#efefef; text-align:center;" colspan="3">スマートフォン</td>
	</tr>
	<tr>
		<td style="padding:5px; text-align: center;">iOS Safari6.1+</td>
		<td style="padding:5px; text-align: center;">Android Broser 未サポート</td>
		<td style="padding:5px; text-align: center;">Chrome for Android40+</td>
	</tr>
</table>

## Heroku
アプリケーションを稼働させるためのプラットフォームです。  
Node.js,Java,Ruby,PHP,Pythonなど様々な言語をサポートしていて、  
基本的な機能を使っている限り無料でWebサイトを公開する事ができます。  
<br>
  
  
# ソースの解説

### web.js(Node.js + Socket.IO)[サーバ側]

**HTTPサーバを作りルーティング、Socket.IOを設定**  
web.jsでは、Node.js(express)でHTTPサーバを作り、静的ファイルの保管場所(css,js,音声ファイルなど誰でも閲覧可能なPublicな場所)を指定して、ルートにアクセスがあったらindex.htmlを表示するルーティングを設定しています。  
またSocket.IOでは、クライアントから"from_client"がくるのを監視し、接続があったら"from_server"を返答する設定をしています。 
```js web.js https://github.com/front-core/nodejs-socketio-webaudio-sample/blob/master/web.js source 
// express + socket.io
var express = require('express');
	app = express(),
	server = require('http').createServer(app),
	path = require('path'),
	io = require('socket.io').listen(server);

server.listen(process.env.PORT || 8000);

// 静的ファイルの場所を指定する(この配下で、CSS,JS,IMG,音声ファイルなどの静的ファイルが使用可能に)
// 通常 '/public' などに静的ファイルを置くが /socket.io/socket.io.js が404になってしまった為 '/' に変更
app.use(express.static(path.join(__dirname, '/')));

// ルートにアクセスがあったらindex.htmlを表示する
app.get('/', function (req, res) {
  res.sendFile(__dirname + '/index.html');
});

// Herokuは下記を入れないとSocket.ioが動かない情報がWebにあったが、なくても動くよう(WebSocketに対応されたからか)
// io.configure(function () { 
//   io.set("transports", ["xhr-polling"]); 
//   io.set("polling duration", 10); 
// });

// io.set('log level', 1); // デフォルトは自動で出るデバック情報を出さない(ローカルでデバックする際に使用)

// クライアント(index.html)からの接続を監視
io.sockets.on("connection", function (socket) {
	// クライアントから "from_client" が送られてきたら
	socket.on("from_client", function (id) {
		// console.log(id);
		
		// 接続しているソケットのみにidを送信する
		// socket.emit("from_server", id);
		
		// 接続しているソケット以外全てにidを送信する
		//socket.broadcast.emit("from_server", id);
		
		// 接続しているソケット含めて全部にidを送信する(送ってきたクライアント含めて全てのクライアントに送信)
		io.sockets.emit("from_server", id);
	});
});
``` 
  
### index.html(Web Audio API + Socke.IO)[クライアント側]
**Socket.IOの読み込みと接続**  
index.htmlでは、まずSocket.IOを使えるようにsocket.io.jsを読み込みます。  
自動で生成されるファイルなので準備する必要はありません。  
指定したURLで、Socket.IOに接続させます。  
```html index.html https://github.com/front-core/nodejs-socketio-webaudio-sample/blob/master/index.html#L135-L141 source
<script src="/socket.io/socket.io.js"></script>
<script>
;(function (window, undefined) {
	
	// socket.ioに接続する
	// var socketio = io.connect('http://localhost:8000'); // localで試す時
	var socketio = io.connect('https://nodejs-socketio-webaudio.herokuapp.com/'); // Herokuで試す時
```
<br>
  
  
**スプラッシュ画像を押して再生したい音声データをセット**  
iPhone/Androidでは、最初の音声ロードだけはユーザーアクション(クリックなど)が必要な制約がある為、
最初にスプラッシュ画像を準備し、タップされた時に音声データを再生可能な状態にセットします。  
※PCでは、この制約はありません。  
```html index.html https://github.com/front-core/nodejs-socketio-webaudio-sample/blob/master/index.html#L250-L263 source
// スプラッシュ画像を押した時に音声データをロード
// iPhone/Androidで最初の音声ロードだけはユーザーアクションが必要な制約がある為(PCにはこの制約はなさそう)
splashImage.addEventListener(eventNames.start, function(){
	// 音声データをセット
	drumObj.kick.set();
	drumObj.cymbal.set();
	drumObj.hat.set();
	drumObj.snare.set();
	
	// スプラッシュ画像をフェードアウト
	this.className = 'fade-out';
	this.addEventListener("webkitAnimationEnd", function(){ this.className = "none"; });
	this.addEventListener("animationend", function(){ this.className = "none"; });
});
```
<br>
  
  
**ボタンが押された時にサーバ側に通知**  
ボタンが押されたらサーバに"from_client"を送信し、押したボタンidを送ります。  
※どのボタンが押されたかを全クライアントに通知させる為。  
```html index.html https://github.com/front-core/nodejs-socketio-webaudio-sample/blob/master/index.html#L215-L216 source
// クライアントからサーバーにボタンidを送る
socketio.emit("from_client", this.id);
```
<br>
  
  
**サーバ側からの返答をチェックし、音声を再生**  
サーバに"from_client"を送信すると、"from_server"を返答してもらうようにサーバ側で設定しているので、
"from_server"がくるのを監視し、返答があったら受け取ったボタンidの音声を再生します。  
```html index.html https://github.com/front-core/nodejs-socketio-webaudio-sample/blob/master/index.html#L265-L279 source
// サーバーから "from_server" が送られてくるのを監視
socketio.on("from_server", function(id){
	// サーバーから返されたid(buttonのid名)から音声を再生
	// start()だけを複数回実行出来ない仕様のようなので、毎回createBufferSource()してから再生
	drumObj[id].source = drumObj[id].context.createBufferSource();
	drumObj[id].source.buffer = drumObj[id].buffer;
	drumObj[id].source.connect(drumObj[id].context.destination);
	drumObj[id].source.start(0);
	
	// ポップアップを表示
	result.className = "popup";
	result.innerHTML = id + '!';
	result.addEventListener("webkitAnimationEnd", function(){
		result.className = "";
	});
});
```
<br>
  
  
# Herokuにデプロイ
Node.jsで作ったアプリケーションを、Herokuにデプロイする際は、こちらが参考になりました。  

* [Getting Started with Node.js on Heroku](https://devcenter.heroku.com/articles/getting-started-with-nodejs#introduction)
* [Node.js + Express を Heroku で動かすまでの手順まとめ](http://tacamy.hatenablog.com/entry/2013/02/16/235127)

またHeroku上でNode.jsを実行する際は、package.jsonに下記の記述をします。  
※もしくはProcfileを準備。
```js package.json https://github.com/front-core/nodejs-socketio-webaudio-sample/blob/master/package.json#L12-L14 source
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
```js package.json https://github.com/front-core/nodejs-socketio-webaudio-sample/blob/master/package.json#L6-L10 source
"socket.io":"1.3.3"
"node": "0.11.11"
```
<br>

## Herokuをよく理解していなかった
HerokuでWebアプリを公開出来る事は知っていましたが、実際に試したりしていなかったので、その使い方でハマりました..

### 解決方法
サイトを参考にサンプルサイトを公開していく事でだいぶ理解出来ました。  

参考になった記事
  
* [初心者でも15分で公開できるHerokuのはじめかた](http://developers.mobage.jp/blog/how-to-use-for-beginners-heroku)  
* [Node.jsをHerokuにデプロイ](http://qiita.com/yoh-nak/items/80e51197410c7f956ccd)  
* [Heroku入門 | ドットインストール](http://dotinstall.com/lessons/basic_heroku)  

<br>

# 課題
## 複数デバイス間での音の完全な一致が難しい
ローカルで試している時はほぼ一致させる事が出来ても、Web公開した環境だと少し遅れて再生されてしまっていました。  
完全な一致が難しいまでも、出来るだけ一致する状態にしたいのですが、打ち手がよくわかっていません。  
<br>

# まとめ
リアルタイム通信して複数デバイス上で音声を再生する方法を解説していきました。  
オンラインゲームや音楽アプリ、チャットなど様々な用途が考えられます。  
  
非常に少ないコードで実現出来た反面、複数デバイス間で音を完全に一致させる事など、課題もまだまだあります。  
その辺りの課題が解決したら、また紹介させて頂きます。  



