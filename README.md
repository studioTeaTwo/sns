# アレルギーコミュニティサービスのMVP版

## 事前に必要なもの

* Ruby version
2.3.3
* bundler
* postgreSQL
  * macインストール http://qiita.com/_daisuke/items/13996621cf51f835494b
  * ubuntuインストール
  ``` bash
  $ sudo apt-get install -y postgresql
  $ sudo apt-get install aptitude
  $ sudo aptitude install libpq-dev
  $ gem install pg -v '0.18.4'
  ```

## セットアップ

```bash
$ git clone <repo>
$ bundle install --path=vendor/bundle
```

## 起動

```bash
$ bundle exec rails server
