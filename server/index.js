import express from "express";
const app = express();
import cors from "cors";
import mysql from "mysql";

// app.use()
app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.json("hello from backend");
});

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

app.get("/products", (req, res) => {
  const q = "SELECT * FROM shoppinglist.category";
  db.query(q, (err, data) => {
    if (err) {
      console.log(err);
      return res.json(err);
    }
    return res.json(data);
  });
});

app.get("/create", (req, res) => {
  const name = req.body.name;
  const address = req.body.address;
  const email = req.body.email;

  const q = "INSERT INTO users (name, address, email) VALUES (?,?,?)";

  db.query(q, [name, address, email], (err, data) => {
    if (err) {
      console.log(err);
      return res.json(err);
    }
    return res.send("you have have registered successfully ");

    // return res.json(data);
  });
});

const port = 3000;

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
