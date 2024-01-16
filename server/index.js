import express from "express";
const app = express();
import cors from "cors";
import mysql from "mysql";
import bodyParser from "body-parser";

app.use(cors());
app.use(express.json());
app.use(bodyParser.json());

// app.get("/", (req, res) => {
//   res.json("hello from backend");
// });

// mysql db
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

//routes
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

app.post("/submitOrder", (req, res) => {
  const { name, address, email, categoriesData } = req.body;

  const q =
    "INSERT INTO shoppinglist.users (name, address, email,categoriesData) VALUES (?,?,?,?)";

  db.query(q, [name, address, email, categoriesData], (err, data) => {
    if (err) {
      console.log(err);
      return res.json(err);
    }
    res.status(200).send("Order submitted successfully");
  });
});

const port = 3000;

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
