FROM alpine:latest
MAINTAINER Ricardo Gândara Pinto <rpinto@gmail.com>

RUN \
    apk update && \
    apk upgrade && \
    apk add redis  

EXPOSE 6379
ENTRYPOINT redis-server --protected-mode no
