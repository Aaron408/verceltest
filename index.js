const express = require("express");
const app = express();
const mysql = require("mysql2");

require("dotenv").config({ path: "./.env" });

const puerto = process.env.PORT || 3000;

const db = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,
  charset: "utf8mb4",
});

// Conectar a la base de datos
db.connect((err) => {
  if (err) {
    console.error("Error al conectar a la base de datos:", err);
  } else {
    console.log("Conexión exitosa a la base de datos!");
  }
});

app.get("/datos", (req, res) => {
  const query = `
      SELECT * FROM prueba;
    `;
  db.query(query, (err, result) => {
    if (err) {
      res.status(500).json({ error: "Consulta no procesada" });
    } else {
      res.status(200).json(result);
    }
  });
});

app.listen(puerto, () => {
  console.log(`Servidor corriendo en el puerto ${puerto}`);
});
