const dotenv = require("dotenv");

dotenv.config();
if (process.env.ENV !== "dev") {
  throw new Error("Incorrect environment! Seeders should only be used in DEV");
}

const Category = require("../models/categories");

// seed new data
async function seed() {
  await Category.collection.insertMany(categorySeeds);
}

const categorySeeds = [];
categorySeeds.push(
  new Category({
    name: "landmark",
    icon: "temple_buddhist",
  })
);

categorySeeds.push(
  new Category({
    name: "music",
    icon: "theater_comedy",
  })
);

categorySeeds.push(
  new Category({
    name: "park",
    icon: "attractions",
  })
);

categorySeeds.push(
  new Category({
    name: "station",
    icon: "subway",
  })
);

module.exports.seedCategories = seed;
