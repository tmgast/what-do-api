const { initDB, getDBInstance, shutdownDB } = require("../providers/db");
const { MongoMemoryServer } = require("mongodb-memory-server-core");
const { seedLocations } = require("../seeders/locations");
const { seedCategories } = require("../seeders/categories");

let db,
  con = null;

let bSeeded = false;

beforeAll(async () => {
  if (process.platform === "android") {
    con = await initDB();
    await seedLocations(con);
    await seedCategories(con);
    return con;
  } else {
    db = await MongoMemoryServer.create();
    con = await initDB(db.getUri());

    if (!bSeeded) {
      await seedLocations(con);
      await seedCategories(con);
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
