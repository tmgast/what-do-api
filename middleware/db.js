const dotenv = require('dotenv');
const mongoose = require('mongoose');

dotenv.config();
mongoose.connect(process.env.DB, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  keepAlive: true,
  keepAliveInitialDelay: 20000,
});
const db = mongoose.connection;

db.on('error', console.error.bind(console, 'MongoDb connection error:'));

function getConnection() {
  return db;
}

function close() {
  db.close();
}

module.exports = { getConnection, close };
