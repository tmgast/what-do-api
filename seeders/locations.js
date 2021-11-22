const faker = require('faker');
const { getConnection } = require('../middleware/db');
const dotenv = require('dotenv');

dotenv.config();
if(process.env.ENV !== 'dev'){
  throw new Error('Incorrect environment! Seeders should only be used in DEV');
}

const Location = require('../models/locations');

// Empty Location Collection
async function purge(){
  await Location.deleteMany({});
}

// seed new data
async function seed(seeds) {
  Location.collection.insertMany(locationSeeds)
    .then(function(){
      getConnection().close();
    });
}


const locationSeeds = [];
locationSeeds.push(
  new Location({
    name: 'Osaka Castle',
    type: 'landmark',
    latitude: '34.6864842',
    longitude: '135.5240135',
    url: "https://www.google.com/maps/place/Osaka+Castle/@34.6864842,135.5240135,14z/data=!4m5!3m4!1s0x6000e0cd5c283afd:0xf01d07d5ca11e"
  }),
);

locationSeeds.push(
  new Location({
    name: 'The Symphony Hall',
    type: 'music',
    latitude: '34.7014543',
    longitude: '135.4845376',
    url: "https://www.google.com/maps/place/The+Symphony+Hall/@34.7014543,135.4845376,17z/data=!3m1!5s0x6000e68a9b325373:0xd37aa5395c66",
  }),
);

locationSeeds.push(
  new Location({
    name: 'Universal Studios Japan',
    type: 'park',
    latitude: '34.6664671',
    longitude: '135.4332258',
    url: "https://www.google.com/maps/place/Universal+Studios+Japan/@34.6664671,135.4332258,15.65z/data=!4m5!3m4!1s0x6000e0d083d5e25d:0x3605fe25303252aa!8m2!3d34.66",
  }),
);

purge();
seed(locationSeeds);
