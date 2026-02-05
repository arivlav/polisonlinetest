# polisonlinetest
Тестовое задание для Fullstack developer b2b.polis.online

## Инструкция по запуску: ##

1. клонируем проект: **git clone https://github.com/arivlav/polisonlinetest** и переходим в него
2. Разворачиваем контейнеры через docker-compose:
   * Переименуйте файл .env.example в .env и настройте его по своему усмотрению или оставьте как есть
   * Запускаем контейнеры: **docker-compose up -d** (флаг -d (detached) запускает контейнеры в фоне, позволяя закрыть терминал)
   * (Опционально) Можно проверить работу контейнеров: docker-compose ps
   * (Опционально) Остановить работу контейнеров можно: **docker-compose down**
3. устанавливаем необходимые библиотеки: composer install
настраиваем .env для соединения с базой
генерируем ключ приложения: php artisan key:generate
запускаем миграции: php artisan migrate
наполняем базу демо-данными: php artisan db:seed
тестовый логин: email test@example.com пароль 12345678 роут test.ru/api/login

