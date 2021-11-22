const express = require('express');
const createError = require('http-errors');
const { getConnection } = require('../middleware/db');
const Locations = require('../models/locations');

const router = express.Router();

/* GET Locations listing. */
router.get('/', (req, res) => Locations.find().then((locs) => res.json(locs)));

/* GET Location listing. */
router.get('/:id', (req, res, next) => {
  const location = Locations.find((l) => l.id === req.id);
  if (!location) {
    next(createError(404, 'Not Found'));
  }

  getConnection().close();
  res.json(location);
});

router.post('/', (req, res) => {
  const location = {
    id: req.body.id,
    name: req.body.name,
  };

  res.json(location);
});

module.exports = router;
