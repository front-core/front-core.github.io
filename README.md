# front-core.org

チーム Frontcore のメインWEBサイトです。

[Octopress](http://octopress.org/) と言うブログ基盤WEBサイトのフレームワークを使っています。


## Setup

まず [Ruby](https://www.ruby-lang.org/) および [Bundler](http://bundler.io/) がインストールされている必要があります。

### Install Ruby (by rbenv)

Ruby は rbenv でインストールすることを推奨します。

1. Install rbenv (https://github.com/sstephenson/rbenv#installation)
2. Install ruby-build (https://github.com/sstephenson/ruby-build#readme)
3. Install ruby

```sh
$ rbenv install -l # インストールできる Ruby のバージョン確認
$ rbenv install <ruby version> # バージョンを指定してインストール
$ rbenv rehash # Ruby 関連のインストール後は必ず理リハッシュ！
```

### Install Bundler

Bundler は Gem のバージョン管理ツールです。

```sh
$ gem install bundler
$ rbenv rehash
```

### Install Octopress dependencies

front-core.org の基盤である Octopress 関連のツールをインストールします。

まずは本リポジトリをクローンします。

```sh
$ git clone git@github.com:front-core/front-core.github.io.git
$ cd front-core.github.io.git
```
Bundle より 必要な Gem モジュールを一括でインストールします。

```sh
bundle install
```

## Contribution

ブランチモデルとイシュー、プルリクエストの運用ルールについて説明します。

### Branching model

* `master` - 本番ブランチ(ここにプッシュされた物が http://front-core.github.io/ で見える)
* `source` - メインの開発ブランチ
 * `post/<タイトル>` - 新しいブログ記事を追加したり、編集する（例：`post/hello-world`）
 * `page/<タイトル>` - 新しいページを追加したり、編集する（例：`post/about-us`）
 * `develop/<トピック名>` - 何かサイト全般の開発を行なう時（例：`develop/awesome-new-theme`テーマ開発など）
 
### Issue

サイトのバグや改善点はもちろん、掲載して欲しい内容のリクエストがあればイシューを作成してください。

### Pull Request

新しいブログ記事やページの作成・開発を行った際には、直接`source`ブランチにマージせず、必ずプルリクエストを作成してください。

また作成・開発途中の場合でも、「WIP: <タイトル>」のようにプルリクエストを作成して、常に皆んなが進捗状況を把握できるようにしてください。（WIP は Work in progress の略語です）

特に翻訳のブログ記事などの場合は、ブランチ作成と同時に WIP のプルリクエストを作成して、お互い同じ内容の記事を書いてしまうような事を防ぎます。


## Deploy

新しいブログ記事やページ・開発した機能が `source` ブランチにマージされた段階でデプロイします。

デプロイは `source` ブランチを最新の状態にしてから下記コマンド実行すると完了です。

```sh
$ rake generate
$ rake deploy
```
生成されたデプロイ用ファイルが `master` ブランチに自動プッシュされ、http://front-core.github.io/ に公開されます。


## Document

ドキュメントは [Wiki](https://github.com/front-core/front-core.github.io/wiki) にまとめます。

主なドキュメントはこちら

* ~~新しいブログ記事を作る~~（作成中）
* ~~新しいページを作る~~（作成中）
* ...more...


## License

![Creative Commons (CC)](http://i.creativecommons.org/l/by/3.0/88x31.png)

Except where otherwise noted, content on this site is licensed under a [Creative Commons Attribution 3.0 Unported License](http://creativecommons.org/licenses/by/3.0/). 

Copyright 2014 Frontcore


