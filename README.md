# アレルギーコミュニティサービスのMVP版

## 事前に必要なもの

* Ruby version
2.3.3
* bundler
* postgreSQL
[macインストール](http://qiita.com/_daisuke/items/13996621cf51f835494b)

## セットアップ

```bash
$ git clone <repo>
$ gem install pg -v '0.18.4'
$ bundle install --path=vendor/bundle
```

## 起動

```bash
$ bundle exec rails server
