FROM php:8.1.18-fpm-buster

RUN apt-get update -y && apt-get install -y --no-install-recommends \
    git \
    zlib1g-dev \
    libxml2-dev \
    libzip-dev \
    && docker-php-ext-install \
    zip \
    intl \
    pdo pdo_pgsql

RUN curl -sS https://getcomposer.org/installer | php && mv composer.phar /usr/local/bin/composer
COPY . /var/www/symfony

WORKDIR /var/www/symfony
