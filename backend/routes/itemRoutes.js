const express = require("express");
const sqlite3 = require("sqlite3").verbose();
const router = express.Router();

const db = new sqlite3.Database("./db/database.sqlite");

// Get all items
router.get("/", (req, res) => {
  db.all("SELECT * FROM products", [], (err, rows) => {
    if (err) {
      res.status(500).json({ error: err.message });
    } else {
      res.json(rows);
    }
  });
});

// Get item by ID
router.get("/:id", (req, res) => {
  const { id } = req.params;
  db.get("SELECT * FROM items WHERE id = ?", [id], (err, row) => {
    if (err) {
      res.status(500).json({ error: err.message });
    } else if (!row) {
      res.status(404).json({ error: "Item not found" });
    } else {
      res.json(row);
    }
  });
});

module.exports = router;
