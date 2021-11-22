const faker = require('faker');
const db = require('../middleware/db');

const Location = require('../models/locations');

const locationSeeds = [];
locationSeeds.push(
  new Location({
    name: 'Osaka Castle',
    type: 'landmark',
    latitude: '34.6864842',
    longitude: '135.5240135',
    url: faker.internet.url,
  }),
);

locationSeeds.push(
  new Location({
    name: 'The Symphony Hall',
    type: 'music',
    latitude: '34.7014543',
    longitude: '135.4845376',
    url: faker.internet.url,
  }),
);

locationSeeds.push(
  new Location({
    name: 'Universal Studios Japan',
    type: 'park',
    latitude: '34.6664671',
    longitude: '135.4332258',
    url: faker.internet.url,
  }),
);

async function seed(seeds) {
  for (const location of seeds) {
    await location.save();
  }
}
seed(locationSeeds);

