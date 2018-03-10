#!/bin/sh

clear() {
    cd ../srv/public && \
    ls | grep -v -E 'robots.txt' | xargs rm -rff && \
    cd $HOME
}

HOME=`pwd`

echo $HOME

# ビルド実行

if [ $1 = dev ]; then
  echo 'Do Just in Time compilation.'
  npm run build
else
  echo 'Do Ahead of Time compilation.'
  npm run build:prod
fi
[ $? -ne 0 ] && exit 1

# ファイル配置

echo 'Move Static Files to Public folder.'
clear && \
cp -r ./dist/* ../srv/public/
[ $? -ne 0 ] && exit 1

exit 0