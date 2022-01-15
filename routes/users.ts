import express from "express";
import createError from 'http-errors';

const router = express.Router();

const users = [{
  id: '1',
  name: 'bob',
}, {
  id: '2',
  name: 'jim',
}];

/* GET users listing. */
router.get('/', (req, res) => {
  res.json(users);
});

/* GET users listing. */
router.get('/:id', (req, res, next) => {
  const user = users.find((u) => u.id === req["id"]);
  if (!user) {
    next(createError(404, 'Not Found'));
  }

  res.json(user);
});

router.post('/', (req, res) => {
  const user = {
    id: req.body.id,
    name: req.body.name,
  };

  res.json(user);
});

module.exports = router;
