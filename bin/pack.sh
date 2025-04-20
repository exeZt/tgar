#!/usr/bin/env bash

#create build of application
npm run build
# create exec file
esbuild "${PWD}/src/index.ts" --bundle --platform=node --outfile=bin/sbin/main.js
gcc -Wall -g "${PWD}/bin/utils/s.c" -o "${PWD}/bin/sbin/tgar"
node --experimental-sea-config sea-config.json
cp $(command -v node) "${PWD}/bin/sbin/tgar"
npx postject "${PWD}/bin/sbin/tgar" NODE_SEA_BLOB "${PWD}/bin/sbin/main.blob" \
    --sentinel-fuse NODE_SEA_FUSE_fce680ab2cc467b6e072b8b5df1996b2