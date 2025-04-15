#!/usr/bin/env bash
echo "${PWD}"
{
  tsc;
  npm run --prefix "${PWD}/public-build/" build;
  mkdir "${PWD}/dist/public" && cp -a "${PWD}/public-build/dist/." "${PWD}/dist/public/";
} || {
    tsc;
    npm run --prefix "${PWD}/public-build/" build;
    cp -a "${PWD}/public-build/dist/." "${PWD}/dist/public/";
}