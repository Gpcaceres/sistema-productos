Link actualizado 

docker compose pull && docker compose up -d

Instrucciones:

Una vez ya se hayan levantado las imágenes de los contenedores esperar un minuto si arió el navegador actualice en:

http://localhost:4200/products

Despliegue público

http://34.51.78.54:4200

Instrucciones para clonar el proyecto y desplegarlo en otro servidor

Descripción:

Este proeycto esta desplegado en los sericios de Google Cloud en una VM de Debian en sistemas de Linux, para ello es necesario agregar la VM e intalar las herramientas necesarias que se detallaran a continuación:

Requisitos previos:

* Tener instalado Docker y Docker Composue

* Tener accesso a un servidor de Linux (Debian o similar)

* Tener acceso a internet para descargar las imágenes de los contenedores

* Tener instalado git en la VM

INSTALACIÓN EN VM Google Cloud:

1. CONECTAR POR SSH

   En Google Cloud, en tu VM (sistema-productos) haz clic en SSH → se abrirá una terminal en el navegador.

2. INSTALAR Docker y  Docker Compose

# Actualizar Paquetes

    sudo apt update && sudo apt upgrade -y

# Instalar dependencias en VM

    sudo apt install apt-transport-https ca-certificates curl software-properties-common -y

# Añadir GPG (firma de autenticidad) de Docker en VM

    curl -fsSL https://download.docker.com/linux/ubuntu/gpg | sudo gpg --dearmor -o /usr/share/keyrings/docker-archive-keyring.gpg

# Añadir repositoriod de Docker

    echo "deb [arch=$(dpkg --print-architecture) signed-by=/usr/share/keyrings/docker-archive-keyring.gpg] \ https://download.docker.com/linux/ubuntu $(lsb_release -cs) stable" | \ sudo tee /etc/apt/sources.list.d/docker.list > /dev/null

# Intalar Docker Compouse

    sudo apt update
    sudo apt install docker-ce docker-ce-cli containerd.io docker-compose-plugin -y

# Habilitar y arrancar Docker

    sudo systemctl enable docker
    sudo systemctl start docker

# Agrega tu usuario al grupo de Docker 

    sudo usermod -aG docker $USER

3. DESCARGA TU PROYECTO:

# Necesario tener docker-compouse.yml en GitHub

    sudo apt install git -y
    git clone https://github.com/Gpcaceres/sistema-productos.git
    cd sistema-productos

4. DAT ACCESO A LOS PUERTOS MEDIANTE CLI DE Google Cloud 

       gcloud compute firewall-rules create allow-sistema-productos \ --direction=INGRESS --priority=1000 --network=default --action=ALLOW \ --rules=tcp:4200,tcp:8080,tcp:8081,tcp:8082 \ --source-ranges=0.0.0.0/0
    
5. LEVANTAR PROYECTO:

Necesario estar dentro del proyecto donde se encuentre el compuse

        docker compose pull
        docker compose up -d



 
Aqui te dejo algunos comandos para POSTMAN 👇

-----------------------------------------------------------------------------CATEGORIAS:------------------------------------------------------------------

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
  


----------------------------------------------------------------------------PRODUCTOS:-------------------------------------------------------------------

*GET 

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

