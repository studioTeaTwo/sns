source 'https://rubygems.org'

gem 'rails',        '5.1.2'
gem 'puma',         '~> 3.4'
gem 'rb-readline'
gem 'active_hash'
gem 'jbuilder',     '~> 2.4'

# パスワード暗号化
gem 'bcrypt',       '~> 3.1'

# 画像
gem 'carrierwave',             '~> 0.11'
gem 'mini_magick',             '~> 4.5'
gem 'fog',                     '~> 1.38'

# ダミーデータ作成
gem 'faker',        '~> 1.6'
gem 'as-duration'

# view関連（→APIモードにしたら削除）
gem 'bootstrap-sass', '~> 3.3'
gem 'sass-rails',   '~> 5.0'
gem 'uglifier',     '~> 3.0'
gem 'coffee-rails', '~> 4.2'
gem 'jquery-rails', '~> 4.1'
gem 'will_paginate',           '~> 3.1'
gem 'bootstrap-will_paginate', '~> 0.0'
gem 'momentjs-rails',          '~> 2.9'
gem 'bootstrap3-datetimepicker-rails', '~> 4.17.47'
gem "font-awesome-rails"
gem 'chartkick'
gem 'material_design_lite-sass'

group :development, :test do
  gem 'sqlite3', '~> 1.3'
  gem 'rspec-rails', '~> 3.5'
  gem 'fuubar' 
  gem 'byebug',  '~> 9.0', platform: :mri
end

group :development do
  gem 'web-console',           '~> 3.1'
  gem 'listen',                '~> 3.0'
  gem 'spring',                '~> 1.7'
  gem 'spring-watcher-listen', '~> 2.0'
  gem 'rails-erd', require: false
end

group :test do
  gem 'guard',                    '~> 2.13'
end

group :production do
  gem 'pg', '~> 0.18'
end

# Windows環境ではtzinfo-dataというgemを含める必要があります
#gem 'tzinfo-data', platforms: [:mingw, :mswin, :x64_mingw, :jruby]
ruby "2.3.3"
