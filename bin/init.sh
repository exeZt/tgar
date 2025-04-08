#!/usr/bin/env bash

ENV_FILE="$PWD"+"/.env"

if [ "$U" ]; then
  echo "No admin rights";
  exit 1;
elif [ ! "$U" ]; then
  ln -s **which/npm** /usr/local/sbin/
  if [ ! -f "$ENV_FILE" ]; then
    echo "ENV file not exits";
    exit 1;
  fi;
  # install nvm
  curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.40.2/install.sh | bash;
  curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.40.2/install.sh | zsh;
  nvm install 23;

  # Initialize .nvm
  # shellcheck disable=SC1090
  source ~/.nvm/nvm.sh;

  command -v nvm | grep $STATUS || grep $?
  if [ $? == 0 ] || [ $STATUS == 0 ]; then
    echo "status 0, everything is OK";
  fi;

  npm i -g pm2

  # run application
  pm2 start ecosystem.config.js --only app --max-memory-restart 150M
fi;
