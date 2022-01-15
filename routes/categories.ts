import express from "express";
import Categories from "../models/categories";
import { initDB } from "../providers/db";

const router = express.Router();
initDB();

/* GET Categories listing. */
router.get("/", async ({ res }) => {
  res.send(await Categories.find());
});

module.exports = router;
