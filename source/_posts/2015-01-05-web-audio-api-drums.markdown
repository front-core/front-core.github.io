---
layout: post
title: "ブラウザで楽器も作れる！Web Audio API でドラムを作成"
date: 2015-1-5
comments: true
categories: WebAudio
written-language: "ja"
author: Keita Sakamoto
author-url: https://github.com/motio
published: true
---

今回は､ Web Audio API を紹介させて頂きます｡  
機能を簡潔に確認するため、 シンプルなドラムを実際に作ってみました。 

<!-- more -->

# Web Audio API とは

Web Audio API とは､ 音声ファイルを単に再生するだけでなく、 処理・合成することができる、 Webアプリケーション向けの高度なJavaScript API です。  
今回は､ オーディオファイルを再生するまでの紹介ですが､ JavaScript を使用して様々な音を作ることができます。

# デモ

完成デモは[こちら](https://web-audio-api-drums-sample.herokuapp.com/)です｡ぜひスマートフォンでご確認ください｡  

## QRコード
<span class="block-center">
![QRコード](/images/post/web-audio-api-drums/qr-go-to-site.gif =150x)
</span>
## 画面キャプチャ
<span class="block-center">
![ドラムサンプル](/images/post/web-audio-api-drums/capture-site.png =320x)
</span>

# コード

html5rocksのチュートリアルを見ながら実装しています｡  
より詳しい解説はこちらをご参照ください｡

* [Web Audio API の基礎](http://www.html5rocks.com/ja/tutorials/webaudio/intro/)

下記リンクも参考にさせて頂きました｡

* [WebAudioAPIで遊べるようになった](http://qiita.com/fnobi/items/2f08a67800dec1d61f21)
* [Mobile Safari, Chrome for Android での Web Audio API 覚え書き](http://qiita.com/sou/items/5688d4e7d3a37b4e2ff1)

```js index.html https://github.com/front-core/web-audio-api-drums-sample/blob/master/index.html#L69-L160 link

;(function (window, undefined) {
	var isTouchDevice = 'ontouchend' in document;
	var eventNames = {
		start: isTouchDevice ? 'touchstart' : 'mousedown',
		move:  isTouchDevice ? 'touchmove'  : 'mousemove',
		end:   isTouchDevice ? 'touchend'   : 'mouseup',
		click: 'click'
	};
	function AudioBufferLoader(ele, url) {
		// WebKitのブラウザではプリフィックスをつける
		window.AudioContext = window.AudioContext || window.webkitAudioContext;
		try {
			// AudioContextはすべての音声の再生を管理しています
			// インスタンス化してメソッドを使用します
			this.context = new AudioContext;
		}
		catch(e) {
			// Web Audio API 非対応のブラウザではalertを出します
			alert('Web Audio API is not supported in this browser');
		}
		this.ele = document.getElementById(ele);
		// 引数からオーディオファイルのurlを受け取ります
		this.url = url;
		this.buffer = null;
	}
	AudioBufferLoader.prototype = {
		loadBuffer: function(url) {
			var _this = this;
			var request = new XMLHttpRequest();
			request.open('get', url, true);
			// arraybuffer は  XMLHttpRequest Level 2 の仕様です｡音声などのバイナリデータを処理します
			request.responseType = 'arraybuffer';
			request.onload = function() {
				_this.context.decodeAudioData(
					request.response,
					function(buffer) {
						if (! buffer) {
							alert('error decodeing file data: ' + url);
							return;
						}
						_this.buffer = buffer;
						_this.events();
					},
					function(error) {
						console.error('decodeAudioData error', error);
					}
				);
			};
			request.onerror = function() {
				alert('AudioBufferLoader: XHR error');
			};
			request.send();
		},
		events: function() {
			var _this = this;
			var context = _this.context;
			_this.ele.addEventListener(eventNames.start, function() {
				this.className = '';
				// source は再生の度に生成する必要があります
				var source = context.createBufferSource();
				source.buffer = _this.buffer;
				source.connect(context.destination);
				// noteOn は古い書き方なので､start を使う
				// ここで音が鳴ります
				source.start(0);
				this.className = 'tap';
			});
			_this.ele.addEventListener(eventNames.end, function() {
				this.className = '';
			});
		},
		load: function() {
			var _this = this;
			_this.loadBuffer(_this.url);
		}
	};

	// 音声ファイルをロード
	var kick = new AudioBufferLoader('kick', 'sound/kick.m4a');
	kick.load();

	var cymbal = new AudioBufferLoader('cymbal', 'sound/cymbal.m4a');
	cymbal.load();

	var hat = new AudioBufferLoader('hat', 'sound/hat.m4a');
	hat.load();

	var snare = new AudioBufferLoader('snare', 'sound/snare.m4a');
	snare.load();
}(this));
```

# おわり

やっぱり音が鳴ると楽しいですね。

chrome版のAngry Birds は､ Web Audio API を使用しているそうです｡  
[Angry Birds for Chrome](http://chrome.angrybirds.com/)

今回はドラムを作ってみましたが、 他の楽器も今後制作予定ですので、 また当ブログで実装方法を紹介できたらと思います。



