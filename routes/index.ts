import express from "express";

const router = express.Router();

/* GET home page. */
router.get('/', (req, res) => {
  res.json('{ message: "success" }');
});

module.exports = router;
