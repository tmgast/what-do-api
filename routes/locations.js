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
  const location = {
    id: req.body.id,
    name: req.body.name,
  };

  res.json(location);
});

module.exports = router;
