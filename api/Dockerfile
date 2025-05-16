FROM php:8.2-fpm

RUN apt-get update && apt-get install -y \
    git zip unzip libzip-dev libpng-dev libonig-dev libsqlite3-dev \
  && docker-php-ext-install pdo_mysql mbstring zip pdo_sqlite

COPY --from=composer:2 /usr/bin/composer /usr/bin/composer

WORKDIR /var/www/html

COPY . .

RUN composer install --no-interaction --prefer-dist --optimize-autoloader

RUN chown -R www-data:www-data storage bootstrap/cache

EXPOSE 8000

CMD ["php", "artisan", "serve", "--host=0.0.0.0", "--port=8000"]
