#!/usr/bin/env sh
set -e

APP_DIR="/var/www/html"
if [ -n "${APP_PATH:-}" ] && [ -d "/var/www/html/${APP_PATH}" ]; then
    APP_DIR="/var/www/html/${APP_PATH}"
fi

if [ -f "${APP_DIR}/app/composer.json" ]; then
    cd "${APP_DIR}/app"

    # 1) Composer deps (only if not installed)
    if [ ! -f "vendor/autoload.php" ]; then
        composer install --no-interaction --prefer-dist
    fi

    # 2) Laravel app key (only if missing)
    if [ -f "artisan" ]; then
        if [ ! -f ".env" ] && [ -f ".env.example" ]; then
            cp .env.example .env
        fi

        if [ -f ".env" ]; then
            # If APP_KEY is empty or not base64 generated, generate it once
            if ! grep -q '^APP_KEY=base64:' .env; then
                php artisan key:generate --force --no-interaction
            fi
        fi
    fi

    # 3) Node deps (only if not installed) + build (only if missing)
    if [ -f "package.json" ]; then
        if [ ! -d "node_modules" ]; then
            if [ -f "package-lock.json" ]; then
                npm ci
            else
                npm install
            fi
        fi

        if [ ! -f "public/build/manifest.json" ]; then
            npm run build
        fi
    fi
fi

exec docker-php-entrypoint "$@"

