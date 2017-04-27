#!/bin/bash
# enable production mode on your angular project
# edit .gitignore and remove "/dist"
# create repo on github and fetch the github repo link
ng build --prod --base-href="https://tesfaykidane.github.io/ridersapp/"
git add .
git commit -m "form update"
git push
git subtree push --prefix dist origin gh-pages
