### Documentación del Código

#### Descripción
Este código es una aplicación Node.js que utiliza Express para crear un servidor web. La aplicación proporciona varios endpoints para realizar operaciones como traducción de texto, obtención de descuentos, procesamiento de pedidos y suscripción por correo electrónico.

#### Endpoints
1. **/translate**: Permite traducir un texto de inglés a español utilizando el servicio de Google Translate.
2. **/getDiscount**: Devuelve un archivo JSON que contiene información sobre los descuentos disponibles.
3. **/checkout**: Procesa un pedido recibido, almacenando la información en una base de datos MySQL.
4. **/suscribe**: Permite a los usuarios suscribirse ingresando su dirección de correo electrónico.

#### Requerimientos
- Node.js
- Express
- node-google-translate-skidz
- cors
- mysql

#### Estructura de la Base de Datos
##### Nombre Base de Datos: **store**

1. **Tabla "orders"**:
   | Columna   | Tipo    | Descripción                 |
   |-----------|---------|-----------------------------|
   | id        | INT     | Identificador único del pedido |
   | total     | DECIMAL | Total del pedido            |
   | shipping  | DECIMAL | Costo de envío del pedido   |

   ```sql
   CREATE TABLE orders (
     id INT AUTO_INCREMENT PRIMARY KEY,
     total DECIMAL(10, 2),
     shipping DECIMAL(10, 2)
   );

2. **Tabla "items"**:
   | Columna    | Tipo    | Descripción                          |
   |------------|---------|--------------------------------------|
   | id         | INT     | Identificador único del ítem         |
   | order_id   | INT     | Identificador del pedido asociado    |
   | name       | VARCHAR | Nombre del ítem                      |
   | price      | DECIMAL | Precio del ítem                      |
   | quantity   | INT     | Cantidad del ítem                    |

   ```sql
   CREATE TABLE items (
     id INT PRIMARY KEY,
     order_id INT,
     name VARCHAR(255),
     price DECIMAL(10, 2),
     quantity INT,
     FOREIGN KEY (order_id) REFERENCES orders(id)
   );


3. **Tabla "suscribe"**:
   | Columna   | Tipo    | Descripción                        |
   |-----------|---------|------------------------------------|
   | id        | INT     | Identificador único de la suscripción |
   | email     | VARCHAR | Dirección de correo electrónico del suscriptor |

   ```sql
   CREATE TABLE suscribe (
     id INT AUTO_INCREMENT PRIMARY KEY,
     email VARCHAR(255) UNIQUE
   );

### Configuración de la Base de Datos

#### Si desea modificar el archivo index.js del server puede hacerlo, de lo contrario deberás crear una base de datos local con los siguientes datos:

  host: "localhost",
  user: "root",
  password: "",
  database: "store"

  y las tablas antes mencionadas
  

## Enlace al Frontend
[Enlace al Frontend](https://ikaroyo.github.io/TF-Web-II-FrontEnd/)

## Enlace al Backend
[Enlace al Backend](https://tf-web-ii-backend.onrender.com/)
