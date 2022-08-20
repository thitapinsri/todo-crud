const Database = require('better-sqlite3');

const db = new Database('todos.sqlite')

db.exec(
    "CREATE TABLE IF NOT EXISTS todos (id INTEGER PRIMARY KEY, title TEXT, date DATE, status TEXT, remark TEXT)"
);

module.exports = db;