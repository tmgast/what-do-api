const express = require('express');
const createError = require('http-errors');
const LocationsModel = require('../models/locations');

const router = express.Router();

const locations = [{
  id: '1',
  name: 'bob',
}, {
  id: '2',
  name: 'jim',
}];

/* GET Locations listing. */
router.get('/', (req, res) => {
  const query = LocationsModel.find();
  const results = query.exec();
  res.json(results);
});

/* GET Location listing. */
router.get('/:id', (req, res, next) => {
  const location = locations.find((l) => l.id === req.id);
  if (!location) {
    next(createError(404, 'Not Found'));
  }

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
