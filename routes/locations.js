var express = require('express');
var router = express.Router();
var createError = require('http-errors');

const locations = [{
  id: "1",
  name: "bob",
  id: "2",
  name: "jim"
}];

/* GET Locations listing. */
router.get('/', function(req, res, next) {
  res.json(locations);
});

/* GET Location listing. */
router.get('/:id', function(req, res, next) {
  const locations = locations.find(location => location.id === id);
  if(!location){
    next(createError(404, "Not Found"));
  }

  res.json(location);
});

router.post('/', function(req, res, next) {
  const location = {
    id: req.body.id,
    name: req.body.name
  };

  res.json(location);
});

module.exports = router;

