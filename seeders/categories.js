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
    colorClass: "cyan darken-1",
  })
);

categorySeeds.push(
  new Category({
    name: "music",
    icon: "theater_comedy",
    colorClass: "light-green darken-1",
  })
);

categorySeeds.push(
  new Category({
    name: "park",
    icon: "attractions",
    colorClass: "green darken-2",
  })
);

categorySeeds.push(
  new Category({
    name: "station",
    icon: "subway",
    colorClass: "indigo darken-2",
  })
);

module.exports.seedCategories = seed;
