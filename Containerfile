FROM docker.io/library/alpine
LABEL maintainer=oliver.boettcher@pixelpark.com

RUN apk update && apk add php7-apache2 php7-curl && \ln -sfv /dev/stdout /var/log/apache2/access.log && \ln -sfv /dev/stderr /var/log/apache2/error.log

ADD build /var/www/localhost/htdocs/

RUN find /var/www/localhost/htdocs/ -type d -exec chmod 0755 {} \; && find /var/www/localhost/htdocs/ -type f -exec chmod 0644 {} \; && chown -R apache: /var/www/localhost/htdocs/

EXPOSE 80
CMD ["httpd", "-DFOREGROUND"]
