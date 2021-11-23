const dotenv = require('dotenv');
const mongoose = require('mongoose');

let db = null;

dotenv.config();
const initDB = async function(memDB) {
  if (db !== null) {
    return db;
  }

  let uri = memDB || process.env.DB;

  await mongoose.connect(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
  db = mongoose.connection;
  db.on('error', console.error.bind(console, 'MongoDb connection error:'));
  return db;
}

module.exports.initDB = initDB;
