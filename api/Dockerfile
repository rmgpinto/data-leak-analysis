FROM alpine:latest
MAINTAINER Ricardo Gândara Pinto <rpinto@gmail.com>

COPY index.js /www/index.js
COPY docker/wait-for-it.sh /www/wait-for-it.sh
COPY docker/start.sh /www/start.sh
COPY repositories /www/repositories
COPY services /www/services
COPY package.json /www/package.json

RUN \
    apk update && \
    apk upgrade && \
    apk add nodejs && \
    cd /www && \
    npm install

EXPOSE 8081
ENTRYPOINT cd /www && start.sh
