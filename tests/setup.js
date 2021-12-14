const { initDB, getDBInstance, shutdownDB } = require("../providers/db");
const { MongoMemoryServer } = require("mongodb-memory-server-core");
const { seed } = require("../seeders/locations");

let db,
  con = null;

let bSeeded = false;

beforeAll(async () => {
  if (process.platform === "android") {
    con = await initDB();
    await seed(con);
    return con;
  } else {
    db = await MongoMemoryServer.create();
    con = await initDB(db.getUri());

    if (!bSeeded) {
      await seed(con);
      bSeeded = true;
    }
    return con;
  }
});

afterAll(async () => {
  if (process.env.NODE_ENV === "test") {
    await getDBInstance().connection.dropDatabase();
  }
  await shutdownDB();
});
