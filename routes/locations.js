const express = require('express');
const Locations = require('../models/locations');
const { initDB } = require('../middleware/db');

const router = express.Router();

/* GET Locations listing. */
router.get('/', async (req, res, next) => {
  initDB();
  try {
    const locs = await Locations.find();
    res.send(locs);
  } catch {
    res.status(400);
    res.send({ error: 'Something broke' });
  }

  return next;
});

/* GET Location listing. */
router.get('/:id', (req, res) => {
  Locations.findById(req.params.id).then((locs) => res.json(locs));
});

router.delete('/:id', (req, res) => {
  Locations.findOneAndDelete({ _id: req.params.id }).then((loc) => res.json(loc));
});

router.delete('/:id/byName', (req, res) => {
  Locations.deleteMany({ name: req.params.id }).then((loc) => res.json(loc));
});

router.post('/', (req, res) => {
  const location = new Locations({
    _id: req.body._id || null,
    name: req.body.name,
    latitude: req.body.lat,
    longitude: req.body.lon,
    url: req.body.url,
  });

  location.save();
  res.json(location);
});

router.post('/gm', (req, res) => {
  if (!req.body.url.match('https://www.google.com/maps/place')) {
    throw new Error('Invalid URL provided');
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
  res.json(location);
});

module.exports = router;
