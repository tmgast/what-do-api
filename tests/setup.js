const { initDB, getDBInstance } = require("../providers/db");
const { MongoMemoryServer } = require("mongodb-memory-server");

beforeAll(async () => {
  if (process.platform === "android" || process.platform === "linux") {
    return await initDB();
  } else {
    db = await MongoMemoryServer.create();
    return await initDB(db.getUri());
  }
});

afterAll(async () => {
  if (process.platform !== "android") {
    console.log("safe delete");
  }
  await getDBInstance().connection.dropDatabase();
  await getDBInstance().connection.close();
});
