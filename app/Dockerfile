FROM nginx:latest
MAINTAINER Ricardo Gândara Pinto <rpinto@gmail.com>

COPY dist/js /usr/share/nginx/html/js
COPY dist/scss /usr/share/nginx/html/scss
COPY dist/app.js /usr/share/nginx/html/app.js
COPY dist/index.html /usr/share/nginx/html/index.html
COPY docker/nginx.conf /etc/nginx

VOLUME /usr/share/nginx/html
VOLUME /etc/nginx

EXPOSE 8080