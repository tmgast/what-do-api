const express = require("express");
const Categories = require("../models/categories");
const { initDB } = require("../providers/db");

const router = express.Router();
initDB();

/* GET Categories listing. */
router.get("/", async (req, res) => {
  res.send(await Categories.find());
});

module.exports = router;
