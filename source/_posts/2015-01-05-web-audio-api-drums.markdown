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

Web Audio API は､ 音声ファイルを単に再生するだけでなく、 処理・合成することができる、 Webアプリケーション向けの高度なJavaScript API です。  
JavaScriptを使用して様々な音を作ることができます。

<!-- more -->

# Web Audio API について

Web Audio API についてはこちらが勉強になりました。

<http://www.html5rocks.com/ja/tutorials/webaudio/intro/>  
<http://qiita.com/fnobi/items/2f08a67800dec1d61f21>  
<http://qiita.com/sou/items/5688d4e7d3a37b4e2ff1>

今回は､ Web Audio API の機能を簡潔に確認するため、 シンプルなドラムを実際に作ってみました。  
ぜひスマートフォンで見てください｡

完成デモは[こちら](http://front-core.org/web-audio-api-drums-sample/index.html)｡

## QRコード
<span class="block-center">
![QRコード](/images/post/web-audio-api-drums/qr-go-to-site.gif =150x)
</span>
## 画面キャプチャ
<span class="block-center">
![ドラムサンプル](/images/post/web-audio-api-drums/capture-site.png =320x)
</span>

# 気になった点

上記のリンクの記事を参考に作成してみて､ 気になった点をいくつか挙げます｡

## jQuery Ajax が利用できない

jQuery の $.ajax, $.get関数などはresponseType プロパティ `arraybuffer` に対応していないため､ 利用することができません(現時点では)｡

そのため､ 以下のように記述します｡  
```javascript
var request = new XMLHttpRequest();
request.open('get', url, true);
request.responseType = 'arraybuffer';
```

responseType プロパティ arraybuffer は、 バイナリデータを扱うためのものです。  
詳細は[こちら](http://www.html5rocks.com/ja/tutorials/file/xhr2/)をご確認ください。

## source は毎回生成する

再生の度に生成する必要があります｡ 
```javascript
var source = context.createBufferSource();
```

## noteOn ではなく､start を使う

noteOn は古い書き方のようです｡ start() を使います｡
```javascript
source.start(0);
```

# おわり

やっぱり音が鳴ると楽しいですね。

chrome版のAngry Birds は､ Web Audio API を使用しているそうです｡

[Angry Birds for Chrome](http://chrome.angrybirds.com/)

今回はドラムを作ってみましたが、 他の楽器も今後制作予定ですので、 また当ブログで実装方法を紹介できたらと思います。


