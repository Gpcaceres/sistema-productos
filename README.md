🛒 Sistema de Gestión de Productos y Categorías
Proyecto monorepo que integra:

Backend:

API REST de Categorías (Spring Boot, Java 17)

API REST de Productos (Spring Boot, Java 17)

Base de datos: MySQL 8

Frontend: Angular (Admin Store)

Docker Compose para levantar todo el sistema en contenedores.

📂 Estructura del proyecto

🚀 1. Requisitos previos
Docker y Docker Compose

Java 17 y Maven (solo si deseas compilar los microservicios localmente)

Node.js + Angular CLI (solo para desarrollo frontend)


DESCARGA LA IMAGENES DE LOS CONTENEDORES

  * docker pull germancinec/test-db

  * docker pull germancinec/categories

  * docker pull germancinec/products:latest


🐳 3. LEVANTAR EL SISTEMA CON DOCKER COMPOSE

⚙️ 3. Ejecutar contenedores manualmente (sin compose)

docker run -d --rm --name test-db \
  --network net-app \
  -p 3306:3306 \
  germancinec/test-db

docker run -d --rm --name app-categorias \
  -p 8081:8081 \
  --network net-app \
  -e DB_HOST=test-db \
  germancinec/categories

docker run -d --rm --name app-products \
  -p 8082:8081 \
  --network net-app \
  -e DB_HOST=test-db \
  -e DB_DATABASE=test \
  -e DB_USER=root \
  -e DB_PASSWORD=admin123 \
  germancinec/products:latest


CONTENEDORES PERMANENTES


* docker run -d --rm --name app-categorias -p 8081:8081 --network net-app -e DB_HOST=test-db germancinec/categories

* docker run -d --rm --name test-db --network net-app -p 3306:3306 germancinec/test-db

* docker run -d --rm --name app-products --network net-app -e DB_HOST=test-db -e DB_DATABASE=test -e DB_USER=root -e DB_PASSWORD=admin123 -p 8082:8081 germancinec/products:latest
  

EJECUTA DESDE LA RAIZ DEL PROYECTO:

 - docker compose up -d
  
Detener los servicios:

 - docker compose stop

Esto levantará:

  * test-db (MySQL)

  * app-categorias → API en http://localhost:8081/api/categories

  * app-products → API en http://localhost:8082/api/products


  
Nota: si la red net-app no existe, créala:  docker network create net-app


🌐 4. ACCESO A LOS SERVICIOS

Categorías API: http://localhost:8081/api/categories

Productos API: http://localhost:8082/api/products

Front-end (Angular): http://localhost:4200 (solo en modo desarrollo).

💻 5. Desarrollo local (sin Docker)

5.1 Backend
Para compilar y ejecutar cualquiera de las APIs:

cd back-end/categorias   # o back-end/products

mvn spring-boot:run

Las APIs quedarán disponibles en:

Categorías → http://localhost:8081/api/categories

Productos → http://localhost:8082/api/products

5.2 Frontend
Instalar dependencias y arrancar el servidor de desarrollo:

cd front-end/admin-store
npm install
ng serve -o
El frontend se servirá en http://localhost:4200 y consumirá las APIs.

COMANDO FINAL 
ruta raiz del proyecto Microservicios
up-all.cmd

SCRIPTS POSTMAN

- PRODUCTOS

  

- CATEGORIAS

  {
  
    "name": "",
    "description": "aparatos de casa"
  
  }


