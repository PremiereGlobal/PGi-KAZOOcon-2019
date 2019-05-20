FROM richarvey/nginx-php-fpm
COPY ./api/ /var/www/html/api
ADD ./config/nginx-site.conf /etc/nginx/sites-available/default.conf
RUN chmod 777 /var/www/html/api/data
