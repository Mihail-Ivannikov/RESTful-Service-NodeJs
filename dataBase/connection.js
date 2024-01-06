"use strict";
const mysql = require("mysql2");

const dbConfig = {
  host: "localhost",
  user: "root",
  database: "dblabs",
  password: "0931060568",
};

const db = mysql.createConnection(dbConfig);

db.connect((err) => {
  if (err) {
    console.error("Error connecting to MySQL:", err);
    throw err;
  }
  console.log("Connected to MySQL database");
});

module.exports = db;
