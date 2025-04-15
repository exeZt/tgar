#!/usr/bin/env bash

mkdir -r ~/.tg-autoresolver/dist
cp -a "${PWD}/dist/." ~/.tg-autoresolver/dist
cp "${PWD}/bin/start.sh" /usr/bin/tg-autoresolver.sh