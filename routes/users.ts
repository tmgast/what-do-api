import { Router } from "express";
import createError from 'http-errors';

const usersRouter = Router();

const users = [{
  id: '1',
  name: 'bob',
}, {
  id: '2',
  name: 'jim',
}];

/* GET users listing. */
usersRouter.get('/', (req, res) => {
  res.json(users);
});

/* GET users listing. */
usersRouter.get('/:id', (req, res, next) => {
  const user = users.find((u) => u.id === req["id"]);
  if (!user) {
    next(createError(404, 'Not Found'));
  }

  res.json(user);
});

usersRouter.post('/', (req, res) => {
  const user = {
    id: req.body.id,
    name: req.body.name,
  };

  res.json(user);
});

export default usersRouter;
