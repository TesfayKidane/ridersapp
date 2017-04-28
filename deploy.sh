#!/bin/bash
# enable production mode on your angular project
# edit .gitignore and remove "/dist"
# create repo on github and fetch the github repo link
ng build --prod --base-href="https://tesfaykidane.github.io/ridersapp/"
# or try
# ng build
# ng build --prod --aot false
# ng build
# ng build --prod --aot false --base-href="https://tesfaykidane.github.io/ridersapp/
git add .
git commit -m "commit for deploy"
git push
git subtree push --prefix dist origin gh-pages
