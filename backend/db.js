const sqlite3 = require("sqlite3");
const { open } = require("sqlite");

async function getDB() {
  return open({
    filename: './db/database.sqlite',
    driver: sqlite3.Database
  });
}

module.exports = { getDB };