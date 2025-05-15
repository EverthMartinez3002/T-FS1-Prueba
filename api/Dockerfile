FROM php:8.2-fpm

# Instalación de extensiones necesarias
RUN apt-get update && apt-get install -y \
    git zip unzip libzip-dev libpng-dev libonig-dev \
  && docker-php-ext-install pdo_mysql mbstring zip

# Copiamos Composer desde la imagen oficial
COPY --from=composer:2 /usr/bin/composer /usr/bin/composer

WORKDIR /var/www/html

# Copiamos TODO el código de la API (incluye artisan, config, etc.)
COPY . .

# Instalamos dependencias según composer.json y composer.lock
RUN composer install --no-interaction --prefer-dist --optimize-autoloader

# Ajuste de permisos
RUN chown -R www-data:www-data storage bootstrap/cache

EXPOSE 8000

CMD ["php", "artisan", "serve", "--host=0.0.0.0", "--port=8000"]
