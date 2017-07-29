# アレルギーコミュニティサービスのMVP版

## 事前に必要なもの

* Ruby version
2.3.3
* rbenv
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
* redis
  * macインストール
  ``` bash
  $ brew install redis
  ```
  * 自動実行
  ``` bash
  $ ln -sfv /usr/local/opt/redis/*.plist ~/Library/LaunchAgents
  $ launchctl load -w ~/Library/LaunchAgents/homebrew.mxcl.redis.plist
  ```
* その他
  * for rails-erd
  ``` bash
  $ brew install graphviz
  ```
  * ubuntu
  `bundle install`でjsonがインストールできない場合
  ``` bash
  $ sudo apt-get install libgmp3-dev
  ```
  nokogiriがインストールできない場合
  ``` bash
  $ sudo apt-get install ruby-dev libxml2 libxml2-dev zlib1g-dev
  ```

## セットアップ

```bash
$ git clone <repo>
```

## 起動

* development(手元のmac)
```bash
$ git pull
$ bundle update
$ bundle install --path vendor/bundle
$ bundle exec rails db:migrate
$ bundle exec rails test
$ bundle exec rails server
```

* production(AWS)
```bash
$ git pull
$ rbenv exec bundle update
$ rbenv exec bundle install --path vendor/bundle --without test development
$ rbenv exec bundle exec rails db:migrate RAILS_ENV=production
$ rbenv exec bundle exec rake assets:precompile RAILS_ENV=production
$ rbenv exec bundle exec rails test
$ rbenv exec bundle exec rake unicorn:stop && rbenv exec bundle exec rake unicorn:start
```

* production(heroku)
```bash
$ heroku maintenance:on
$ git push heroku master
$ heroku run rails db:migrate
$ heroku run rails test
$ heroku maintenance:off
```
