var express = require('express');
var router = express.Router();
var createError = require('http-errors');

const users = [{
  id: "1",
  name: "bob",
  id: "2",
  name: "jim"
}];

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.json(users);
});

/* GET users listing. */
router.get('/:id', function(req, res, next) {
  const user = users.find(user => user.id === id);
  if(!user){
    next(createError(404, "Not Found"));
  }

  res.json(user);
});

module.exports = router;
