import { Router } from "express";

const indexRouter = Router();

/* GET home page. */
indexRouter.get('/', (req, res) => {
  res.json('{ message: "success" }');
});

export default indexRouter;
