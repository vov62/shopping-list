const ShoppingRouter = require("express").Router();
import db from "../db/db";

router.get("/products", (req, res) => {
  const q = "SELECT * FROM shoppinglist.category";
  db.query(q, (err, data) => {
    if (err) {
      console.log(err);
      return res.json(err);
    }
    return res.json(data);
  });
});

router.post("/submitOrder", (req, res) => {
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

module.exports = ShoppingRouter;
