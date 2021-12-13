const { initDB, getDBInstance, shutdownDB } = require("../providers/db");
const { MongoMemoryServer } = require("mongodb-memory-server");
const { seed } = require("../seeders/locations");

let db,
  con = null;

beforeAll(async () => {
  if (process.platform === "android") {
    con = await initDB();
    await seed(con);
    return con;
  } else {
    db = await MongoMemoryServer.create();
    con = await initDB(db.getUri());
    await seed(con);
    return con;
  }
});

afterAll(async () => {
  if (process.env.NODE_ENV === "test") {
    await getDBInstance().connection.dropDatabase();
  }
  await shutdownDB();
});
