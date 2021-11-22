const express = require('express');
const Locations = require('../models/locations');

const router = express.Router();

/* GET Locations listing. */
router.get('/', (req, res) => Locations.find().then((locs) => res.json(locs)));

/* GET Location listing. */
router.get('/:id', (req, res) => {
  Locations.findById(req.params.id).then((locs) => res.json(locs));
});

router.post('/', (req, res) => {
  const location = new Locations({
    name: req.body.name,
    latitude: req.body.lat,
    longitude: req.body.lon,
    url: req.body.url,
  });

  location.save();
  res.json(location);
});

router.post('/gm', (req, res) => {
  const regex = /https:\/\/www.google.com\/maps\/place\/(.*?),.*?\/@(.*?),(.*?),.*/m;
  const data = regex.exec(req.body.url);
  const location = new Locations({
    name: data[1],
    latitude: data[2],
    longitude: data[3],
    url: req.body.url,
  });

  location.save();
  res.json(location);
});

module.exports = router;
