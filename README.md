# polisonlinetest
Тестовое задание для Fullstack developer b2b.polis.online

## Инструкция по запуску: ##

1. клонируем проект: **git clone https://github.com/arivlav/polisonlinetest** и переходим в него
2. Разворачиваем контейнеры через docker-compose:
   * (опционально) Переименуйте файл .env.example в .env и его по своему усмотрению или оставьте как есть
   * (опционально) То же самое сделайте с файлом app/.env.example (если нужно поправьте в нем APP_NAME) 
   В случае невыполнения первых 2-х пунктов они создадутся автоматически
   * Запускаем контейнеры: **docker-compose up -d** (флаг -d (detached) запускает контейнеры в фоне, позволяя закрыть терминал)
   * (Опционально) Можно проверить работу контейнеров: **docker-compose ps**
   * (Опционально) Остановить работу контейнеров можно: **docker-compose down**
3. Не забываем добавить в hosts такое же значение как для APP_SERVER_URL в .env:
   
   В .env:
   
   APP_SERVER_URL=**polisonlinetes.loc**
   
   Н-р, для linux

         nano /etc/hosts
   В самом файле добавляем строку: 127.0.0.1         polisonlinetes.loc   
4. Переходим http://polisonlinetes.loc (или тот, который указали в .env APP_SERVER_URL)

