

# NOC-APP (aplicacion de monitoreo)

-Monitorear un API
-Crear los procesos de monitoreo
-Enviar correos

. Grabar los LOGS en:

-FileSystem
-MongoDB
-PostgresSQL


# dev
1. Clonar el archivo .env.template a .env
2. Configurar las variables de entorno
```
PORT=3000

MAILER_EMAIL=
MAILER_SECRET_KEY=
MAILER_SERVICE=gmail

PROD=false
```
3. Ejecutar el comando ```npm install```
4. Levantar las bases de datos con el comando ```docker compose up -d```
5. Abrir Docker Desktop 
6. Ejecutar el comando ```npx prisma migrate dev```
7. Ejecutar ```npm run dev```


## Obtener Gmail Key
[Google AppPasswords](https://myaccount.google.com/u/0/apppasswords)

