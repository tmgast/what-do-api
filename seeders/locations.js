const dotenv = require("dotenv");

dotenv.config();
if (process.env.ENV !== "dev") {
  throw new Error("Incorrect environment! Seeders should only be used in DEV");
}

const Location = require("../models/locations");

// seed new data
async function seed() {
  await Location.collection.insertMany(locationSeeds);
}

const locationSeeds = [];
locationSeeds.push(
  new Location({
    id: "d216bba6-a181-474a-ad26-2fc6f6e5f609",
    name: "The Symphony Hall",
    category: "music",
    latitude: "34.7014543",
    longitude: "135.4845376",
    url: "https://www.google.com/maps/place/The+Symphony+Hall/@34.7014543,135.4845376,17z/data=!3m1!5s0x6000e68a9b325373:0xd37aa5395c66",
  })
);

locationSeeds.push(
  new Location({
    _id: "e788b107-2e5e-44fe-99f5-f9d343e6a994",
    name: "Universal Studios Japan",
    category: "park",
    latitude: "34.6664671",
    longitude: "135.4332258",
    url: "https://www.google.com/maps/place/Universal+Studios+Japan/@34.6664671,135.4332258,15.65z/data=!4m5!3m4!1s0x6000e0d083d5e25d:0x3605fe25303252aa!8m2!3d34.66",
  })
);

locationSeeds.push(
  new Location({
    id: null,
    name: "Osaka Castle",
    category: "landmark",
    latitude: "34.6864842",
    longitude: "135.5240135",
    url: "https://www.google.com/maps/place/Osaka+Castle/@34.6864842,135.5240135,14z/data=!4m5!3m4!1s0x6000e0cd5c283afd:0xf01d07d5ca11e",
  })
);

module.exports.seed = seed;
