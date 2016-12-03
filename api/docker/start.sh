#!/bin/sh

sh /www/wait-for-it.sh database:27017
sh /www/wait-for-it.sh cache:6379
node index.js