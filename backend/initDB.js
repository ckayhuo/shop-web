const sqlite3 = require("sqlite3").verbose();

const db = new sqlite3.Database("./db/database.sqlite");

db.serialize(() => {
  // Create table
  db.run(`
    CREATE TABLE IF NOT EXISTS items (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT NOT NULL,
      price REAL NOT NULL,
      imgUrl TEXT NOT NULL
    )
  `);

  // Insert existing data
  db.run(`
    INSERT INTO items (name, price, imgUrl)
    VALUES 
    ('Textbook', 10.99, '/images/book.jpg'),
    ('Laptop', 1299.99, '/images/laptop.jpg'),
    ('Skirt', 199.99, '/images/skirt.jpg')
  `);
});

db.close();
