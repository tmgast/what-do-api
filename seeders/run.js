const { initDB, getDBInstance, shutdownDB } = require("../providers/db");
const { seedLocations } = require("../seeders/locations");
const { seedCategories } = require("../seeders/categories");

async function runSeeders() {
  const con = await initDB();

  await seedCategories(con);
  await seedLocations(con);

  await shutdownDB();
}

runSeeders();
