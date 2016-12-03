FROM alpine:edge
MAINTAINER Ricardo Gândara Pinto <rpinto@gmail.com>

COPY docker/mongodb.conf /etc/conf.d/mongodb.conf
COPY rawdata/linkedinsample.txt /tmp/rawdata/linkedinsample.txt
COPY rawdata/neopetssample.txt /tmp/rawdata/neopetssample.txt
COPY rawdata/load-data.js /tmp/rawdata/load-data.js
COPY rawdata/node_modules /tmp/rawdata/node_modules

RUN \
    echo http://dl-cdn.alpinelinux.org/alpine/edge/testing >> /etc/apk/repositories && \
    apk update && \
    apk upgrade && \
    apk add nodejs mongodb && \
    mkdir -p /data/db
RUN \
    /usr/bin/mongod --nojournal --fork --logpath /var/log/mongod.log --config /etc/conf.d/mongodb.conf && \
    sleep 10 && \
    cd /tmp/rawdata && node --max_old_space_size=4096 --optimize_for_size --max_executable_size=4096 --stack_size=4096 load-data.js && \ 
    cd /tmp/rawdata && node --max_old_space_size=4096 --optimize_for_size --max_executable_size=4096 --stack_size=4096 load-data.js 1000001 2000000 && \
    cd /tmp/rawdata && node --max_old_space_size=4096 --optimize_for_size --max_executable_size=4096 --stack_size=4096 load-data.js 2000001 3000000 && \
    cd /tmp/rawdata && node --max_old_space_size=4096 --optimize_for_size --max_executable_size=4096 --stack_size=4096 load-data.js 3000001 4000000 && \
    cd /tmp/rawdata && node --max_old_space_size=4096 --optimize_for_size --max_executable_size=4096 --stack_size=4096 load-data.js 4000001 5000000 && \
    cd /tmp/rawdata && node --max_old_space_size=4096 --optimize_for_size --max_executable_size=4096 --stack_size=4096 load-data.js 5000001 6000000 && \
    cd /tmp/rawdata && node --max_old_space_size=4096 --optimize_for_size --max_executable_size=4096 --stack_size=4096 load-data.js 6000001 7000000 && \
    cd /tmp/rawdata && node --max_old_space_size=4096 --optimize_for_size --max_executable_size=4096 --stack_size=4096 load-data.js 7000001 8000000 && \
    cd /tmp/rawdata && node --max_old_space_size=4096 --optimize_for_size --max_executable_size=4096 --stack_size=4096 load-data.js 8000001 9000000 && \
    cd /tmp/rawdata && node --max_old_space_size=4096 --optimize_for_size --max_executable_size=4096 --stack_size=4096 load-data.js 9000001 10000000 && \
    cd /tmp/rawdata && node --max_old_space_size=4096 --optimize_for_size --max_executable_size=4096 --stack_size=4096 load-data.js 10000001 11000000 && \
    cd /tmp/rawdata && node --max_old_space_size=4096 --optimize_for_size --max_executable_size=4096 --stack_size=4096 load-data.js 11000001 12000000 && \
    cd /tmp/rawdata && node --max_old_space_size=4096 --optimize_for_size --max_executable_size=4096 --stack_size=4096 load-data.js 12000001 13000000 && \
    cd /tmp/rawdata && node --max_old_space_size=4096 --optimize_for_size --max_executable_size=4096 --stack_size=4096 load-data.js 13000001 14000000 && \
    cd /tmp/rawdata && node --max_old_space_size=4096 --optimize_for_size --max_executable_size=4096 --stack_size=4096 load-data.js 14000001 15000000 && \
    cd /tmp/rawdata && node --max_old_space_size=4096 --optimize_for_size --max_executable_size=4096 --stack_size=4096 load-data.js 15000001 16000000 && \
    cd /tmp/rawdata && node --max_old_space_size=4096 --optimize_for_size --max_executable_size=4096 --stack_size=4096 load-data.js 16000001 17000000 && \
    cd /tmp/rawdata && node --max_old_space_size=4096 --optimize_for_size --max_executable_size=4096 --stack_size=4096 load-data.js 17000001 18000000 && \
    cd /tmp/rawdata && node --max_old_space_size=4096 --optimize_for_size --max_executable_size=4096 --stack_size=4096 load-data.js 18000001 19000000 && \
    cd /tmp/rawdata && node --max_old_space_size=4096 --optimize_for_size --max_executable_size=4096 --stack_size=4096 load-data.js 19000001 20000000 && \
    cd /tmp/rawdata && node --max_old_space_size=4096 --optimize_for_size --max_executable_size=4096 --stack_size=4096 load-data.js 20000001 21000000 && \
    cd /tmp/rawdata && node --max_old_space_size=4096 --optimize_for_size --max_executable_size=4096 --stack_size=4096 load-data.js 21000001 22000000 && \
    cd /tmp/rawdata && node --max_old_space_size=4096 --optimize_for_size --max_executable_size=4096 --stack_size=4096 load-data.js 22000001 23000000 && \
    cd /tmp/rawdata && node --max_old_space_size=4096 --optimize_for_size --max_executable_size=4096 --stack_size=4096 load-data.js 23000001 24000000 && \
    cd /tmp/rawdata && node --max_old_space_size=4096 --optimize_for_size --max_executable_size=4096 --stack_size=4096 load-data.js 24000001 25000000 && \
    cd /tmp/rawdata && node --max_old_space_size=4096 --optimize_for_size --max_executable_size=4096 --stack_size=4096 load-data.js 25000001 26000000 && \
    cd /tmp/rawdata && node --max_old_space_size=4096 --optimize_for_size --max_executable_size=4096 --stack_size=4096 load-data.js 26000001 27000000 && \
    cd /tmp/rawdata && node --max_old_space_size=4096 --optimize_for_size --max_executable_size=4096 --stack_size=4096 load-data.js 27000001 27148795

EXPOSE 27017
ENTRYPOINT /usr/bin/mongod --config /etc/conf.d/mongodb.conf
