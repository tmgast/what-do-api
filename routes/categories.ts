import { Router } from "express";
import Categories from "../models/categories";
import { initDB } from "../providers/db";

const categoriesRouter = Router();
initDB();

/* GET Categories listing. */
categoriesRouter.get("/", async (req, res) => {
  res.send(await Categories.find());
});

export default categoriesRouter;
