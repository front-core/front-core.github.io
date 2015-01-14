---
layout: post
title: "ブラウザで楽器も作れる！Web Audio APIでドラムを作成"
date: 2015-1-5
comments: true
categories: WebAudioAPI
written-language: "ja"
author: Keita Sakamoto
author-url: https://github.com/motio
published: true
---

Web Audio API は､ 音声を処理・合成するためのWebアプリケーション向けのハイレベルなJavaScript APIです。

Web Audio APIについて
===================

Web Audio API についてはこちらが勉強になりました。

<http://www.html5rocks.com/ja/tutorials/webaudio/intro/>  
<http://qiita.com/fnobi/items/2f08a67800dec1d61f21>  
<http://qiita.com/sou/items/5688d4e7d3a37b4e2ff1>

<!-- more -->

今回は､ シンプルなドラムを作って実際に試してみました。  
ぜひスマートフォンで見てください｡

完成デモは[こちら](http://front-core.org/web-audio-api-drums-sample/index.html)｡

気になった点
===================

上記のリンクの記事を参考に作成してみて､ 印象に残った箇所をいくつか挙げます｡

## jQuery Ajaxが利用できない

jQueryの $.ajax, $.get関数などはresponseTypeプロパティ 'arraybuffer' に対応していないため､ 利用することができないとのこと(現時点では)｡

そのため､ 以下のように記述します｡  
```javascript
var request = new XMLHttpRequest();
request.open('get', url, true);
request.responseType = 'arraybuffer';
```

## sourceは毎回生成する

再生の度に生成する必要があります｡ 
```javascript
var source = context.createBufferSource();
```

## noteOnではなく､startを使う

noteOnは古い書き方のようです｡ start()を使います｡
```javascript
source.start(0);
```

おわり
===================

やっぱり音が鳴ると楽しいですね。

chrome版のAngry Birdsは､ Web Audio APIを使用しているそうです｡

[Angry Birds for Chrome](http://chrome.angrybirds.com/)

Web Audio API の情報は結構ありますので､ さらに研究していきたいと思います。


