#!/usr/bin/env bash

ENV_FILE="${PWD}/.env";
DATABASE_FILE="${PWD}/dist/data/app";

if [ "$U" ]; then
  echo "No admin rights";
  exit 1;
elif [ ! "$U" ]; then
  if [ ! -f "$ENV_FILE" ]; then
    echo "ENV file not exits";
    exit 1;
  fi;

  # install nvm
  curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.40.2/install.sh | bash;
  curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.40.2/install.sh | zsh;
  nvm install 23;

  command -v nvm | grep $STATUS || grep $?
  if [ $? == 0 ] || [ $STATUS == 0 ]; then
    echo "successfully installed nvm";
      # Initialize .nvm
      # shellcheck disable=SC2155
      export NVM_DIR="$([ -z "${XDG_CONFIG_HOME-}" ] && printf %s "${HOME}/.nvm" || printf %s "${XDG_CONFIG_HOME}/nvm")"
      [ -s "$NVM_DIR/nvm.sh" ] && \. "$NVM_DIR/nvm.sh"

      # if ! dataFile ? create
      if [ ! "$DATABASE_FILE" ]; then
        "some string" > "$DATABASE_FILE";
        cat "$DATABASE_FILE";
      fi;

      ln -s **which/npm** /usr/local/sbin/
      # installing default deps
      npm i;
      npm i -g pm2;
      npm i -g typescript;
      npm i -g @types/node;

      # run application via pm2
      pm2 start ecosystem.config.js --only app --max-memory-restart 150M
  fi;
fi;
