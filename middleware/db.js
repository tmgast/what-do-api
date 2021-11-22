const dotenv = require('dotenv');
const mongoose = require('mongoose');

let db = null;

dotenv.config();
function initDB() {
  if (db !== null) {
    return db;
  }

  mongoose.connect(process.env.DB, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    keepAlive: true,
    keepAliveInitialDelay: 20000,
  });
  db = mongoose.connection;
  db.on('error', console.error.bind(console, 'MongoDb connection error:'));
  return db;
}

function getConnection() {
  return db;
}

function close() {
  db.close();
}

module.exports = { initDB, getConnection, close };
