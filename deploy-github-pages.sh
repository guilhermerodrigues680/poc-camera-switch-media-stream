#!/usr/bin/env sh

#
# https://vitejs.dev/guide/static-deploy.html#github-pages
#

# abort on errors
set -e

# build
# npm run build
# https://vitejs.dev/guide/build.html#public-base-path
# https://stackoverflow.com/a/14404223
npm run build -- --base='/poc-camera-switch-media-stream/'

# navigate into the build output directory
cd dist

# place .nojekyll to bypass Jekyll processing
echo > .nojekyll

# if you are deploying to a custom domain
# echo 'www.example.com' > CNAME

git init
git checkout -B main
git add -A
git commit -m 'deploy'

# if you are deploying to https://<USERNAME>.github.io
# git push -f git@github.com:<USERNAME>/<USERNAME>.github.io.git main

# if you are deploying to https://<USERNAME>.github.io/<REPO>
# git push -f git@github.com:<USERNAME>/<REPO>.git main:gh-pages

# Deploy na branch `gh-pages` do repositório
GH_REPOSITORY_URL='git@github.com:guilhermerodrigues680/poc-camera-switch-media-stream.git'
git push -f $GH_REPOSITORY_URL main:gh-pages

cd -