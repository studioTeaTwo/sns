#!/bin/sh

HOME=`pwd`

echo $HOME

clear() {
    cd ./srv/public && \
    ls | grep -v -E 'robots.txt' | xargs rm -r && \
    cd $HOME
}

cd ./cli

echo 'Do Ahead of Time compilation.'
npm run build:prod
[ $? -ne 0 ] && exit 1

cd $HOME

echo 'Move Static Files to Public folder.'
clear && \
cp -r ./cli/dist/* ./srv/public/
[ $? -ne 0 ] && exit 1

exit 0