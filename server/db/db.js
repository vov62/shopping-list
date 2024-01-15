const mysql = require("mysql");

const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "djavivovgen62",
  database: "shoppinglist",
});

db.connect((error) => {
  if (error) throw error;
  console.log("DB connected");
});

module.exports = db;
