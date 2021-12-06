const { initDB, getDBInstance } = require("../providers/db");
const { MongoMemoryServer } = require("mongodb-memory-server");
const { seed } = require("../seeders/locations");

let db,
  con = null;
let seeded = false;

beforeAll(async () => {
  if (process.platform === "android" || process.platform === "linux") {
    con = await initDB();
    if(!seeded){
      await seed(con);
        seeded = true;
    }
    return con;
  } else {
    db = await MongoMemoryServer.create();
    con = await initDB(db.getUri());
    await seed(con);
    return con;
  }
});

afterAll(async () => {
  if (process.platform !== "android") {
    console.log("safe delete");
  }
  await getDBInstance().connection.dropDatabase();
  await getDBInstance().connection.close();
});
