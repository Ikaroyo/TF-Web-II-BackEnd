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
