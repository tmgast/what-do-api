import dotenv from "dotenv";
import * as mongoose from "mongoose";

let db: mongoose.Connection;

dotenv.config();

const getDB = () => {
  if (process.env.NODE_ENV === "test") {
    return process.env.DB_TEST;
  }
  return process.env.DB_NAME;
};

const buildConnection = () =>
  `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@${
    process.env.DB_CLUSTER
  }/${getDB()}?retryWrites=true&w=majority`;

async function initDB(memDB: string) {
  if (db !== null) {
    return db;
  }

  const uri = memDB || buildConnection();

  mongoose.connect(uri);
  db = mongoose.connection;
  db.on("error", console.error.bind(console, "MongoDb connection error:"));
  return db;
}

async function shutdownDB() {
  await db.close();
  db = <mongoose.Connection>{};
}

module.exports.initDB = initDB;
module.exports.shutdownDB = shutdownDB;
module.exports.getDBInstance = () => mongoose;
