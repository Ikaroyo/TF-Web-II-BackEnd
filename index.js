const express = require("express");
const translate = require("node-google-translate-skidz");
const cors = require("cors");
const app = express();
app.use(cors()); // CORS

// Endpoint para la traducción
app.get("/translate", (req, res) => {
  const { text } = req.query;

  translate({
    text: text,
    source: "en", // Idioma de origen (inglés)
    target: "es", // Idioma de destino (español)
  })
    .then((translatedText) => {
      res.json({ translatedText: translatedText.translation });
    })
    .catch((error) => {
      console.error("Error de traducción:", error);
      res.status(500).json({ error: "Error de traducción" });
    });
});
const mysql = require("mysql");
const discountJson = require("./src/discount.json");

app.get("/getDiscount", (req, res) => {
  res.json(discountJson);
});

app.get("/checkout", async (req, res) => {
  try {
    const data = JSON.parse(decodeURIComponent(req.query.data));
    await storeOrder(data);
    res.send({ message: "Pedido procesado" });
  } catch (error) {
    console.error("Error en el proceso de compra:", error);
    res.status(500).json({ error: "Error en el proceso de compra" });
  }
});

async function storeOrder(data) {
  const connection = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "store",
  });

  const order = processDataToCreateOrder(data);
  const items = processDataToFillDB(data, order.id);

  await connect(connection);
  await insertOrder(connection, order);
  await insertItems(connection, items);

  connection.end();
}

function connect(connection) {
  return new Promise((resolve, reject) => {
    connection.connect((err) => {
      if (err) {
        reject(err);
      } else {
        console.log("Conexión exitosa a la base de datos");
        resolve();
      }
    });
  });
}

function insertOrder(connection, order) {
  return new Promise((resolve, reject) => {
    connection.query(
      "INSERT INTO orders (total, shipping) VALUES (?, ?)",
      [order.total, order.shipping],
      (err, result) => {
        if (err) {
          reject(err);
        } else {
          order.id = result.insertId;
          console.log("Pedido insertado correctamente en la base de datos");
          resolve();
        }
      }
    );
  });
}

function insertItems(connection, items) {
  return new Promise((resolve, reject) => {
    connection.query(
      "INSERT INTO items (order_id, id, name, price, quantity) VALUES ?",
      [items],
      (err, result) => {
        if (err) {
          reject(err);
        } else {
          console.log("Items insertados correctamente en la base de datos");
          resolve();
        }
      }
    );
  });
}

function processDataToCreateOrder(data) {
  let total = 0;
  let shipping = 0;

  data.forEach((item) => {
    total += item.price * item.quantity;
    if (item.id === -100) {
      shipping = item.price;
    }
  });

  return { total, shipping };
}

function processDataToFillDB(data, order_id) {
  const items = [];
  data.forEach((item) => {
    if (item.id !== -100) {
      items.push([
        order_id,
        item.id,
        item.name,
        parseFloat(item.price),
        item.quantity,
      ]);
    } else {
      items.push([order_id, item.id, item.name, item.price, item.quantity]);
    }
  });
  return items;
}

app.get("/suscribe", async (req, res) => {
  const email = req.query.email;

  try {
    if (!email) {
      throw new Error("Email es requerido");
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      throw new Error("Formato de correo no válido");
    }

    const connection = mysql.createConnection({
      host: "localhost",
      user: "root",
      password: "",
      database: "store",
    });

    await connect(connection);
    const existingEmailResult = await query(
      connection,
      "SELECT * FROM suscribe WHERE email = ?",
      [email]
    );

    if (existingEmailResult.length > 0) {
      return res.status(400).json({ error: "El correo ya está suscrito" });
    }

    await query(connection, "INSERT INTO suscribe (email) VALUES (?)", [email]);
    console.log("Correo insertado correctamente en la base de datos");
    connection.end();
    return res.status(200).json({ message: "Gracias por suscribirte" });
  } catch (error) {
    console.error("Error al suscribirse:", error);
    return res.status(500).json({ error: "Error al suscribirse" });
  }
});

function query(connection, sql, values) {
  return new Promise((resolve, reject) => {
    connection.query(sql, values, (err, result) => {
      if (err) {
        reject(err);
      } else {
        resolve(result);
      }
    });
  });
}

// Iniciar el servidor en el puerto deseado (por ejemplo, puerto 3000)
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor escuchando en el puerto ${PORT}`);
});
