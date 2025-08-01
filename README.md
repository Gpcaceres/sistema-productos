🛒 Sistema de Gestión de Productos y Categorías
Proyecto monorepo que integra:

Backend:

API REST de Categorías (Spring Boot, Java 17)

API REST de Productos (Spring Boot, Java 17)

Base de datos: MySQL 8

Frontend: Angular (Admin Store)

Docker Compose para levantar todo el sistema en contenedores.

📂 Estructura del proyecto
ruby
Copiar
Editar
sistema-productos/
│
├── back-end/
│   ├── categorias/     # Microservicio de categorías
│   └── products/       # Microservicio de productos
│
├── front-end/
│   └── admin-store/    # Aplicación Angular
│
├── docker-compose.yml  # Orquestación de contenedores
└── .gitignore
🚀 1. Requisitos previos
Docker y Docker Compose

Java 17 y Maven (solo si deseas compilar los microservicios localmente)

Node.js + Angular CLI (solo para desarrollo frontend)

🐳 2. Levantar el sistema con Docker Compose
Desde la raíz del proyecto:

bash
Copiar
Editar
docker compose up -d
Detener los servicios:

bash
Copiar
Editar
docker compose stop
Esto levantará:

test-db (MySQL)

app-categorias → API en http://localhost:8081/api/categories

app-products → API en http://localhost:8082/api/products

⚙️ 3. Ejecutar contenedores manualmente (sin compose)
bash
Copiar
Editar
docker run -d --rm --name test-db \
  --network net-app \
  -p 3306:3306 \
  germancinec/test-db
bash
Copiar
Editar
docker run -d --rm --name app-categorias \
  -p 8081:8081 \
  --network net-app \
  -e DB_HOST=test-db \
  germancinec/categories
bash
Copiar
Editar
docker run -d --rm --name app-products \
  -p 8082:8081 \
  --network net-app \
  -e DB_HOST=test-db \
  -e DB_DATABASE=test \
  -e DB_USER=root \
  -e DB_PASSWORD=admin123 \
  germancinec/products:latest
Nota: si la red net-app no existe, créala:

bash
Copiar
Editar
docker network create net-app
🌐 4. Acceso a los servicios
Categorías API: http://localhost:8081/api/categories

Productos API: http://localhost:8082/api/products

Front-end (Angular): http://localhost:4200 (solo en modo desarrollo).

💻 5. Desarrollo local (sin Docker)
5.1 Backend
Para compilar y ejecutar cualquiera de las APIs:

bash
Copiar
Editar
cd back-end/categorias   # o back-end/products
mvn spring-boot:run
Las APIs quedarán disponibles en:

Categorías → http://localhost:8081/api/categories

Productos → http://localhost:8082/api/products

5.2 Frontend
Instalar dependencias y arrancar el servidor de desarrollo:

bash
Copiar
Editar
cd front-end/admin-store
npm install
ng serve -o
El frontend se servirá en http://localhost:4200 y consumirá las APIs.

📝 Notas
Los contenedores usan --rm para eliminarse automáticamente al detenerse.

Las credenciales de la base de datos están configuradas en las variables de entorno (DB_USER, DB_PASSWORD, DB_DATABASE).

Ajusta los puertos en docker-compose.yml si necesitas evitar conflictos.

Puedes generar nuevas imágenes Docker con:

bash
Copiar
Editar
docker build -t germancinec/products back-end/products
docker build -t germancinec/categories back-end/categorias
