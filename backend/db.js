const sqlite3 = require("sqlite3");
const { open } = require("sqlite");

let db;

async function getDB() {
  if (!db) {
    db = await open({
      filename: './db/database.sqlite',
      driver: sqlite3.Database
    });
  }
  return db;
}

module.exports = { getDB };