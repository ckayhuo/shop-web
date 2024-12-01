const sqlite3 = require("sqlite3").verbose();

const db = new sqlite3.Database("./db/database.sqlite");

db.serialize(() => {
  // Create product table
  db.run(
    `CREATE TABLE IF NOT EXISTS products (
          id INTEGER PRIMARY KEY AUTOINCREMENT,
          name TEXT NOT NULL,
          price REAL NOT NULL,
          imgUrl TEXT NOT NULL,
          quantity INTEGER NOT NULL,
          sellerId INTEGER NOT NULL,
          FOREIGN KEY (sellerId) REFERENCES users(id)
       )`,
    (err) => {
      if (err) console.error("Error creating products table:", err.message);
    })


  db.run(
    `CREATE TABLE IF NOT EXISTS items (       
          id INTEGER PRIMARY KEY AUTOINCREMENT,   
          name TEXT NOT NULL,
          price REAL NOT NULL,
          imgUrl TEXT NOT NULL
       )`,
    (err) => {
      if (err) console.error("Error creating products table:", err.message);
    })

  // Insert existing product data
  db.run(`
    INSERT INTO items (name, price, imgUrl)
    VALUES 
    ("Textbook", 10.99, "/images/book.jpg"),
    ("Laptop", 1299.99, "/images/laptop.jpg"),
    ("Skirt", 199.99, "/images/skirt.jpg")
  `);


  // Create user table
  db.run(`
    CREATE TABLE IF NOT EXISTS users (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      email TEXT NOT NULL,
      password TEXT NOT NULL,
      role TEXT CHECK(role IN ('buyer', 'seller')) NOT NULL
    )
  `);


});

db.close();