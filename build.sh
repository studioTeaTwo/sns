#!/bin/sh

clear() {
    cd ./srv/public/ && \
    ls | grep -v -E 'robots.txt' | xargs rm -r && \
    cd ../../
}

cd ./cli

echo 'Do Ahead of Time compilation.'
ng build --prod
[ $? -ne 0 ] && exit 1

cd ..

echo 'Move Static Files to Public folder.'
clear && \
cp -r ./cli/dist/ ./srv/public/
[ $? -ne 0 ] && exit 1

exit 0