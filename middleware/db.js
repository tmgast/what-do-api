const dotenv = require('dotenv');
const mongoose = require('mongoose');

let db = null;

dotenv.config();
async function initDB(memDB) {
  if (db !== null) {
    return db;
  }

  let uri = process.env.DB;
  if (memDB) {
    const mDB = await memDB.create();
    uri = mDB.getUri();
  }

  await mongoose.connect(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
  db = mongoose.connection;
  db.on('error', console.error.bind(console, 'MongoDb connection error:'));
  return db;
}

module.exports = { initDB };
