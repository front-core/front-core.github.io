---
layout: post
title: "PIXI と GSAP で 2D フル WebGL"
# title: "時代は フル WebGL"
date: 2015-03-20
comments: true
categories: [WebGL]
written-language: "ja"
author: Shindeok Kang
author-url: https://twitter.com/heavymery
published: true
---

最強の 2D WebGL レンダラー [PIXI](http://www.pixijs.com/)  と
最強のトゥイーンライブラリ [GSAP](https://greensock.com/gsap) を使って
2D フル WebGL サイトを作る方法を紹介します。

<span class="block-center">
![PIXI with GSAP](/images/post/pixi-with-gsap/demo-title.png =320x)
</span>

<!-- more -->

# PIXI と GSAP について

### PIXI (Pixi.js) の素敵なところ

* WebGL フル対応だから爆速！
* 2D 専用の WebGL はこれしか無い！
* WebGL 未対応ブラウザーでは自動的に Canvas 2D API にフォールバック
* 様々な WebGL フィルターが使える
* ブレンドモードが充実
* アトラスフォーマットの Sprite シートをサポート

### GSAP (GreenSock Animation Platform) の素敵なところ

* 高機能（トゥイーンアニメーションに良くある、かゆい所がほぼない）
* 爆速！
* どんなレンダリング系ライブラリとも一緒に使える

### リソース

* [Pixi.js API ドキュメント](http://www.goodboydigital.com/pixijs/docs/)
* [Pixi.js フォーラム](http://www.html5gamedevs.com/forum/15-pixijs/)
* [HTML5 GSAP API ドキュメント](https://greensock.com/docs/#/HTML5/GSAP/)
* [HTML5 GSAP フォーラム](https://greensock.com/forums/)

### PIXI + GSAP 使用事例

既に PIXI と GSAP を使った素敵な使用事例が沢山あります。

* [Kick with Chrome](https://kickwithchrome.withgoogle.com/)
* [RUNpixieRUN](http://www.goodboydigital.com/runpixierun/)
* [Big Mac :: McDonalds.co.uk](http://www.mcdonalds.co.uk/ukhome/promotions/bigmac.html)
* [US Open Sessions - Motion Demo](http://www.shanemielke.com/archives/usopen-sessions/)
* [Alfred | Toronto's 24/7 Dry Cleaning, Shoe Care and More](http://alfredservice.com/)
* [McDonald's 40th Anniversary](http://40together.razorfishawards.com/)
* [Soleil Noir • Dream on](http://www.soleilnoir.net/dreamon/)


# 2D フル WebGL 作り方

こんな感じのデモを作ります。

<span class="block-center">
![PIXI with GSAP](/images/post/pixi-with-gsap/demo.png)
</span>

実際に動くデモは「[こちら](http://front-core.org/pixi-with-gsap/)」、
ソースコードは「[こちら](https://github.com/front-core/pixi-with-gsap)」から確認できます。

## 1. ページ設定

フル WebGL なので最低限の DOM とスタイルのみ記載します。

```html index.html https://github.com/front-core/pixi-with-gsap/blob/master/index.html source
<!DOCTYPE html>
<html>
  <head>
    <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no, minimal-ui">

    <style>
      /* 不要な余白などスタイルをリセット */
      body {
        padding: 0;
        margin: 0;
        overflow: hidden;
      }

      /* メイン表示領域を画面いっぱいにする */
      .container {
        position: absolute;
        width: 100%;
        height: 100%;
        overflow: hidden;
      }
    </style>
  </head>

  <body>
    <!-- Canvas が追加される場所 -->
    <div id="canvas-container" class="container"></div>

    <!-- PIXI -->
    <script src="scripts/vendor/pixi.dev.js"></script>

    <!-- GSAP -->
    <script src="scripts/vendor/gsap/TweenMax.js"></script>
    <script src="scripts/vendor/gsap/TimelineMax.js"></script>

    <!-- メインスクリプト -->
    <script src="scripts/main.js"></script>
  </body>
</html>
```

## 2. Canvans と PixiJS レンダラーを初期化

まず Canvas 要素を生成して `canvas-container` の中に配置します。

```js main.js https://github.com/front-core/pixi-with-gsap/blob/master/scripts/main.js#L12-L13 source
var canvas = document.createElement('canvas');
document.getElementById('canvas-container').appendChild(canvas);
```

生成した Canvas を引数に PixiJS レンダラーを初期化します。フルスクリーンにしたいので
サイズに `window` の `innerWidth/Height` を指定、デバイスピクセル比を `resolution` に指定します。

```js main.js https://github.com/front-core/pixi-with-gsap/blob/master/scripts/main.js#L16 source
var renderer = PIXI.autoDetectRenderer(window.innerWidth, window.innerHeight, {
  view: canvas,
  resolution: window.devicePixelRatio
});
```

その後ステージを生成します。ステージに追加された要素が画面に表示されます。

```js main.js https://github.com/front-core/pixi-with-gsap/blob/master/scripts/main.js#L34 source
var stage = new PIXI.Stage(0x263332);
```

デバイスピクセル比が 2 以上の場合、Canvas のサイズがその倍に大きくなるので、Transform で縮小します。

```js main.js https://github.com/front-core/pixi-with-gsap/blob/master/scripts/main.js#L26-L30 source
var canvasScale = 1 / window.devicePixelRatio;
canvas.style.transform = 'scale3d(' + canvasScale + ',' + canvasScale + ',' + canvasScale + ')';
canvas.style.transformOrigin = '0 0';
```

実際に画面上の描画はレンダラーの `render` メソッドで行われるので、
毎アニメーションフレームごとに `render` が実行される様に設定します。

```js main.js https://github.com/front-core/pixi-with-gsap/blob/master/scripts/main.js#L37-L41 source
var renderPerFrame = function() {
  window.requestAnimFrame(renderPerFrame);
  renderer.render(stage);
};

renderPerFrame();
```

ブラウザがリサイズされた時はレンダラーの `resize` メソッドで再度フィットさせます。

```js main.js https://github.com/front-core/pixi-with-gsap/blob/master/scripts/main.js#L286-L292 source
window.addEventListener('resize', function() {
  renderer.resize(window.innerWidth, window.innerHeight);
}, fales);
```

## 3. 表示要素を生成（画像リソース系）

PIXI はデバイスのピクセル比ごとの画像ファイルを扱う事ができます。
ここではデバイスのピクセル比から最適な画像ファイルを決定するコードを記載します。

```js main.js https://github.com/front-core/pixi-with-gsap/blob/master/scripts/main.js#L56-L65 source
var suffix = '';
if(window.devicePixelRatio > 2) {
  suffix = '@3x';
} else if(window.devicePixelRatio > 1) {
  suffix = '@2x';
}

var titleImageUrl = 'images/title' + suffix + '.png';
```

画像などの外部リソースは `AssetLoader` を使って読み込みます。

```js main.js https://github.com/front-core/pixi-with-gsap/blob/master/scripts/main.js#L67-L73 source
var assetLoader = new PIXI.AssetLoader([
  titleImageUrl
]);
assetLoader.load();
```

リソースの読み込みが完了したら、そのリソースで表示要素を生成できます。
ここではタイトルの画像「PIXI with GSAP」を左上に表示するコードを記載します。

```js main.js https://github.com/front-core/pixi-with-gsap/blob/master/scripts/main.js#L75-L122 source
assetLoader.on('onComplete', function() {
  // 画像リソースからテクスチャー生成
  var titleTexture = PIXI.Texture.fromImage(titleImageUrl);

  // テクスチャーのデバイスピクセル比対応
  titleTexture.baseTexture.resolution = window.devicePixelRatio;

  // 表示要素を生成
  title = new PIXI.Sprite(titleTexture);

  // タイトルを左上に配置
  title.x = 20;
  title.y = 20;

  // ステージに配置して表示
  stage.addChild(title);
});
```

## 4. 表示要素を生成（グラフィック系）

PIXI では複雑な WebGL の描画処理も簡単です。
ここでは簡単な矩形を描画するコードを記載します。

```js main.js https://github.com/front-core/pixi-with-gsap/blob/master/scripts/main.js#L180-L202 source
var rectangle = new PIXI.Graphics();
rectangle.beginFill(0x1abc9c);
rectangle.drawRect(-5, 0, 5, 100);
rectangle.alpha = 0;

stage.addChild(rectangle);
```

矩形を表示するだけじゃ面白く無いんで、アニメーションさせたいと思います。
ここで GSAP です！
ここでは GSAP の `TimelineMax` と `TweenMax` を使って、
矩形をランダムな位置から落ちながら消えるアニメーションのコードを記載します。

```js main.js https://github.com/front-core/pixi-with-gsap/blob/master/scripts/main.js#L130-L178 source
var animateDropTween = function(element) {
  var fromX = getRandomInt(5, window.innerWidth - 10);
  var fromY = getRandomInt(0, window.innerHeight / 4);
  var distY = getRandomArbitrary(100, window.innerHeight);

  var duration = getRandomArbitrary(0.5, 1);
  var delay = getRandomArbitrary(0.3, 0.9);

  var timeline = new TimelineLite({
    delay: delay,
    paused: true,
    onComplete: function() {
      animateDropTween(element)
    }
  });

  timeline.add(
    TweenMax.fromTo(element, duration, {
      alpha: 0,
      x: fromX,
      y: fromY
    }, {
      alpha: 1,
      y: fromY + distY / 2,
      ease: Linear.easeNone,
    })
  );

  timeline.add(
    TweenMax.to(element, duration, {
      alpha: 0,
      y: fromY + distY,
      ease: Linear.easeNone,
    })
  );

  timeline.play();
};

```


## 5. フルスクリーン API 対応

動くのは現在 Chrome と FireFox だけなんですが、
フルフラッシュサイトに良くあるフルスクリーン切り替えボタンを右上に表示しました。
（参考：[Can I use... Full Screen API](http://caniuse.com/#feat=fullscreen)）

```js main.js https://github.com/front-core/pixi-with-gsap/blob/master/scripts/main.js#L204-L259 source
// フルスクリーンモードを解除する
var exitFullScreen = function() {
  if (document.cancelFullScreen) {
    document.cancelFullScreen();
  } else if (document.mozCancelFullScreen) {
    document.mozCancelFullScreen();
  } else if (document.webkitCancelFullScreen) {
    document.webkitCancelFullScreen();
  }
};

// フルスクリーンモード切り替えボタンの状態を更新
var updateScreenModeButton = function() {
  screenModeFullButton.visible = !isFullScreen();
  screenModeNormalButton.visible = isFullScreen();
};
```

# まとめ

今回は PIXI + GSAP のブラウザ向けの使い方を紹介しましたが、
CocoonJS の様に WebGL 対応クロスプラットフォームを使えばハイブリッドアプリも作る事ができます。

次回は CocoonJS 用 PIXI + GSAP の使い方を紹介します。
