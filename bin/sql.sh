#!/usr/bin/env bash

#NOT READY!!!!!!!!!!!
if [ "$U" ]; then
  echo "No admin rights";
  exit 1;
elif [ ! "$U" ]; then
  apt-get update
  apt-get install sqlite

fi;