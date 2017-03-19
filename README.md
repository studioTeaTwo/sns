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
  ```
* imagemagick
  * macインストール
  ``` bash
  $ brew install imagemagick
  ```
  * ubuntuインストール
  ``` bash
  $ sudo apt-get update
  $ sudo apt-get install imagemagick --fix-missing
  ```

## セットアップ

```bash
$ git clone <repo>
$ bundle install --path=vendor/bundle
```

## 起動

* development(手元のmac)
```bash
$ rails db:migrate
$ rails test
$ bundle exec rails server
```

* production(AWS)
```bash
$ rails db:migrate
$ rails test
$ bundle exec rake unicorn:start
```
