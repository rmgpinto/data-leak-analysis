#!/bin/sh

./wait-for-it.sh database:27017
./wait-for-it.sh cache:6379
node index.js