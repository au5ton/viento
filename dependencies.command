#!/bin/sh
here="`dirname \"$0\"`"
echo "Grabbing debugging environment from GitHub"
cd "$here" || exit 1

curl https://raw.githubusercontent.com/au5ton/viento/master/viento.js -o viento.js

#These files are needed for a proper development environment of viento
#If you can't run this, use `chmod u+x dependencies.command`