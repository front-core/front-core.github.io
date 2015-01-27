---
layout: post
title: "異なるバージョンの jQuery を共存させて使用する方法"
date: 2015-01-26
comments: true
categories: [JavaScript, jQuery]
author: Toru Enokido
---

最近は Bower を使って外部リソース管理をすることがほとんどですが、
数年前に作ったサイトの改修などを行うと、ある特定のバージョンに依存した jQuery プラグインを使用していたり、
モジュールごとに違うバージョンの jQuery を読み込んでいたりして jQuery のバージョンが衝突して意図しない挙動やバグが生まれてしまう事がしばしばあります。

今回はこの jQuery バージョン競合問題に焦点を当てて、その解決方法をご紹介したいと思います。

<!-- more -->

次のようなマークアップを考えてみます。
```html
<!doctype html>
<html>
<head>
    <script src="jquery-1.3.2.min.js" ></script>
    <script src="jquery-1.9.0.min.js" ></script>
</head>
<body>
    <script src="jquery-1.7.2.min.js" ></script>
</body>
</html>
```


`<head>` 内で jQuery のバージョン `1.3.2` と `1.9.0` が読み込まれ、
さらに `<body>` 内で `1.7.2` が読み込まれています。<br><br>
`alert` でバージョン情報を確認してみます。

```html
<!doctype html>
<html>
<head>
    <script src="jquery-1.3.2.min.js" ></script>
    <script type="text/javascript">
        alert($().jquery); // ---[1]
    </script>

    <script src="jquery-1.9.0.min.js" ></script>
    <script type="text/javascript">
        alert($().jquery); // ---[2]
    </script>

    <script type="text/javascript">
        $(function(){
            alert($().jquery); // ---[4]
        });
    </script>
</head>
<body>
    <script src="jquery-1.7.2.min.js" ></script>
    <script type="text/javascript">
        alert($().jquery); // ---[3]
    </script>
</body>
</html>
```

* [1] // 1.3.2
* [2] // 1.9.0
* [3] // 1.7.2
* [4] // 1.7.2

[1]〜[3]ではjsを読み込んだ直後に `alert` しているので、直前に読み込んだバージョンが確認でき、
[4]ではドキュメントが読み込まれたあとに実行されるため、1番最後に読み込まれた `1.7.2` が出力されます。

===

つぎに変数に jQuery オブジェクトを代入してみます。
```html
<!doctype html>
<html>
<head>
    <script src="jquery-1.3.2.min.js" ></script>
    <script src="jquery-1.9.0.min.js" ></script>

    <script type="text/javascript">
        var $j190 = $.noConflict();
    </script>

    <script type="text/javascript">
        $(function(){
            alert($().jquery); // ---[1]
            alert($j190().jquery); // ---[2]
        });
    </script>
</head>
<body>
    <script src="jquery-1.7.2.min.js" ></script>
</body>
</html>
```
* [1] // 1.7.2
* [2] // 1.9.0

`jQuery.noConflict()` は $関数を jQuery としてではなく、他のライブラリで定義された $関数 として動作させるための関数です。<br><br>
8行目の `$j190 = $.noConflict();` とすることで jQuery の $関数 を `$j190` へ変更しています。<br><br>
そのため[1]では最後に読み込まれた `1.7.2` が出力され、<br>[2]では `1.9.0` が出力されます。

===

また `jQuery.noConflict()` は `jQuery.noConflict(true)` として呼び出すとグローバル空間からjQueryオブジェクトごと削除することができます。
```html
<!doctype html>
<html>
<head>
    <script src="jquery-1.3.2.min.js" ></script>
    <script src="jquery-1.9.0.min.js" ></script>
    <script src="jquery-1.7.2.min.js" ></script>
    <script type="text/javascript">
        alert($().jquery); // ---[1]
 
        $.noConflict(true);
        alert($().jquery); // ---[2]
 
        $.noConflict(true);
        alert($().jquery); // ---[3]
    </script>
</head>
</html>
```
* [1] // 1.7.2
* [2] // 1.9.0
* [3] // 1.3.2

グローバル空間から jQuery オブジェクトが削除され $関数 の参照が( `1.7.2` → `1.9.0` → `1.3.2` )変化していく様子がわかります。

===

このように `jQuery.noConflict()` を呼び出し、
$関数 を別の名前で定義することで異なるバージョンの jQuery を共存させることができます。
```html
<!doctype html>
<html>
<head>
    <script src="jquery-1.3.2.min.js" ></script>
    <script type="text/javascript">
        var $j132 = $.noConflict();
    </script>

    <script src="jquery-1.9.0.min.js" ></script>
    <script type="text/javascript">
        var $j190 = $.noConflict();
        $j190.someword = "hoge";
    </script>

    <script type="text/javascript">
        $(function(){
            var $j172 = $.noConflict();
            alert($j190.someword); // ---[1]
        });
    </script>
</head>
<body>
    <script src="jquery-1.7.2.min.js" ></script>
</body>
</html>
```
* [1] // hoge



上記の例では

* `$j132` は `1.3.2 の jQuery オブジェクト`
* `$j190` は `1.9.0 の jQuery オブジェクト`
* `$j171` および `$` は `1.7.2 の jQuery オブジェクト`

がそれぞれ入っています。


こうすることで `1.9.0` を使いたい場合は
`$` を `$j190` と記述することで `1.9.0` として動かすことができます。
<br>
<br>
しかしながら、自分で書いたスクリプトのほかにも jQuery に依存するようなライブラリを使用している場合
`$` を `$j190` と全置換するのは手間もかかりますし、
置換による思わぬバグを引き起こしてしまう可能性も拭いきれません。<br>

そういったときは即時関数で囲って
**使いたいバージョンの jQuery オブジェクトを
引数として渡す**ことで、いつもどおり `$` が使用できるようになります。
```html
(function($) {
    //いつもどおり$が使える
})($j190);
```

```
<!doctype html>
<html>
<head>
    <script src="jquery-1.9.0.min.js" ></script>
    <script src="jquery-1.7.2.min.js" ></script>
    <script type="text/javascript">
        $j172 = $.noConflict(true);
        (function ($) {
            alert($().jquery); // ---[1]
        })(jQuery);
 
        (function ($) {
            alert($().jquery); // ---[2]
        })($j172);
    </script>
</head>
</html>
```
* [1] // 1.9.0
* [2] // 1.7.2

jQueryの読み込みの順番は `1.9.0` → `1.7.2` となっていますが<br>
 `$j172 = $.noConflict(true);` という記述で `1.7.2` はグローバグ空間から削除されています。

そのため[1]では引数で渡している `jQuery` に `1.9.0` が<br>
[2]では `$j172` を引数で渡しているため `1.7.2` と出力されます。

=== 

また即時関数の外でもそれぞれのバージョンで定義した関数などを呼び出したい時があります。
そんなときは連想配列に保存しておくことで無名関数の外でも呼び出すことができます。
```html
<!doctype html>
<html>
<head>
    <script src="jquery-1.9.0.min.js" ></script>
    <script src="jquery-1.7.2.min.js" ></script>
    <script type="text/javascript">
        $j172 = $.noConflict(true);
 
        (function ($) {
            a172 = {
                func : function(){
                    return $().jquery;
                }
            }
        })($j172);
 
        (function ($) {
            a190 = {
                func : function(){
                    return $().jquery;
                }
            }
        })(jQuery);
 
        alert(a172.func()); // ---[1]
        alert(a190.func()); // ---[2]
    </script>
</head>
</html>
```
* [1] // 1.7.2
* [2] // 1.9.0


## まとめ

* さまざまなバージョンのjQueryが読み込まれているページでも実行順序を正しく理解すること。
* 自分で定義する処理は即時関数で囲っておき適切なjQueryオブジェクトを渡すこと。

こうしたことをルールに則って開発するだけでも
意図しない衝突を格段に減らすことができると思います。