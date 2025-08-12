# SISTEMA-PRODUCTOS

## Despliegue local 🚀

Instrucciones:

Descarga y clona el repositorio de GitHub

    git clone https://github.com/Gpcaceres/sistema-productos.git

Para levantar el proyecto localmente, ejecuta los siguientes comandos:

    docker compose pull && docker compose up -d


Una vez que las imágenes de los contenedores se hayan descargado y levantado, espera un minuto y, si no se abre automáticamente, accede a la siguiente URL en tu navegador:

http://localhost:4200/products

---

## Despliegue público 🌐

El proyecto está desplegado en la siguiente dirección:

http://34.51.78.54:4200

### Instrucciones para clonar y desplegar en otro servidor

Descripción:
Este proyecto está desplegado en una máquina virtual (VM) de Debian en Google Cloud. Para replicar este despliegue, es necesario configurar una VM e instalar las herramientas necesarias que se detallan a continuación.

Requisitos previos:
* Tener instalado Docker y Docker Compose.
* Tener acceso a un servidor con un sistema operativo Linux (Debian o similar).
* Tener acceso a internet para descargar las imágenes de los contenedores.
* Tener instalado Git en la VM.

---

### INSTALACIÓN EN VM de Google Cloud

#### 1. Conectarse por SSH
En Google Cloud, desde tu VM llamada `sistema-productos`, haz clic en el botón SSH. Esto abrirá una terminal en tu navegador.

#### 2. Instalar Docker y Docker Compose
Actualizar paquetes

    sudo apt update && sudo apt upgrade -y

Instalar dependencias en la VM

    sudo apt install apt-transport-https ca-certificates curl software-properties-common -y

Añadir GPG de Docker (firma de autenticidad)

    curl -fsSL https://download.docker.com/linux/ubuntu/gpg | sudo gpg --dearmor -o /usr/share/keyrings/docker-archive-keyring.gpg

Añadir el repositorio de Docker

    echo "deb [arch=$(dpkg --print-architecture) signed-by=/usr/share/keyrings/docker-archive-keyring.gpg] https://download.docker.com/linux/ubuntu $(lsb_release -cs) stable" | sudo tee /etc/apt/sources.list.d/docker.list > /dev/null

Instalar Docker y Docker Compose

    sudo apt update
    sudo apt install docker-ce docker-ce-cli containerd.io docker-compose-plugin -y

Habilitar y arrancar Docker

    sudo systemctl enable docker
    sudo systemctl start docker

Agregar tu usuario al grupo de Docker

    sudo usermod -aG docker $USER

#### 3. Descargar el proyecto
Asegúrate de tener el archivo `docker-compose.yml` en GitHub.

    sudo apt install git -y
    git clone https://github.com/Gpcaceres/sistema-productos.git
    cd sistema-productos

#### 4. Dar acceso a los puertos mediante la CLI de Google Cloud

    gcloud compute firewall-rules create allow-sistema-productos --direction=INGRESS --priority=1000 --network=default --action=ALLOW --rules=tcp:4200,tcp:8080,tcp:8081,tcp:8082 --source-ranges=0.0.0.0/0

#### 5. Levantar el proyecto
Asegúrate de estar dentro de la carpeta del proyecto donde se encuentra el archivo `docker-compose.yml`.

    docker compose pull
    docker compose up -d

---

## Comandos para POSTMAN 👇

### CATEGORÍAS
* GET
localhost:8081/api/categories

* POST
localhost:8081/api/categories

        {
        "name": "Hola ya vale 2",
        "description": "aparatos de OFICINA"
        }

* PUT
localhost:8081/api/categories/1

        {
          "name": "Hola ya vale 3",
          "description": "aparatos de COMETOLOGIA"
        }

* DELETE
localhost:8081/api/categories/1

---

### PRODUCTOS
* GET
localhost:8082/api/products

* POST
localhost:8082/api/products

        {
          "name": "Producto Y",
          "price": 100.0,
          "description": "asdf",
          "category": 1
        }

* PUT
localhost:8082/api/products/3

        {
          "name": "producto_actualizado",
          "description": "mentas",
          "price": 6,
          "category": 1
        }

* DELETE
localhost:8082/api/products/2
