const express = require('express');
const Locations = require('../models/locations');
const { initDB } = require('../providers/db');

const router = express.Router();
initDB();

/* GET Locations listing. */
router.get('/', async (req, res) => {
  res.send(await Locations.find());
});

/* GET Location listing */
router
  .route('/:id')
  .get(async (req, res) => {
    Locations.findById(req.params.id).then((locs) => res.json(locs));
  })

  /* PUT Location listing */
  .put(async (req, res) => {
    Locations.findOneAndUpdate(req.params.id, req.body, { returnOriginal: false })
      .then((locs) => {
        res.json(locs);
      });
  })

  /* DELETE Location by id */
  .delete((req, res) => {
    Locations.findOneAndDelete({ _id: req.params.id }).then((loc) => res.json(loc));
  });

/* DELETE Location by name */
router.delete('/byName/:name', (req, res) => {
  Locations.deleteMany({ name: decodeURIComponent(req.params.name) }).then((loc) => res.json(loc));
});

/* POST new Location */
router.post('/', async (req, res) => {
  const loc = {
    name: req.body.name,
    latitude: req.body.lat,
    longitude: req.body.lon,
    url: req.body.url,
  };

  if (req.body.id) {
    loc.id = req.body.id;
  }

  const location = new Locations(loc);

  location.save();
  res.json(location);
});

/* POST new Location parsing Google Maps URL */
router.post('/gm', (req, res) => {
  if (!req.body.url.match('https://www.google.com/maps/place')) {
    return res.status(500).json({ message: 'Invalid URL' });
  }

  const regex = /https:\/\/www.google.com\/maps\/place\/(.*?),.*?\/@(.*?),(.*?),.*/m;
  const data = regex.exec(req.body.url);
  const location = new Locations({
    name: data[1],
    latitude: data[2],
    longitude: data[3],
    url: req.body.url,
  });

  location.save();
  return res.json(location);
});

module.exports = router;
