Link actualizado 

docker compose pull && docker compose up -d

Para POSTMAN

-----------------------------------------------------------CATEGORIAS:-----------------------------------------------------

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
  


-------------------------------------------------------------------------------PRODUCTOS:----------------------------------------------------------------------

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

