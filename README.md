# api_presupuestos
Back-End 
Sirve para comunicar con la base de datos POSTGRESQL
Para que funcione en su localhost seria:

1) descargas todas as carpetas usando el git clone. Tener ya instalado el servidor PostgreSQL en la puerta default 5432
2) Inciar el servior PostgreSQL y crear una base de datos con el nombre "presupuestos"
3) npm i
4) En el archivo /config/config.js actualizar la contraseña para acceder al servidor PostgreSQL
5) ./node_modules/.bin/sequelize db:migrate
6) npm run dev
