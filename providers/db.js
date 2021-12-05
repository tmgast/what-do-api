const dotenv = require("dotenv");
const mongoose = require("mongoose");

let db = null;

dotenv.config();
const initDB = async function (memDB) {
  if (db !== null) {
    return db;
  }

  const uri = memDB || process.env.DB;

  mongoose.connect(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
  db = mongoose.connection;
  db.on("error", console.error.bind(console, "MongoDb connection error:"));
  return db;
};

const shutdownDB = async function () {
  await db.close();
  db = null;
};

module.exports.initDB = initDB;
module.exports.shutdownDB = shutdownDB;
module.exports.getDBInstance = () => mongoose;
