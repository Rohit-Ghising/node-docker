const express = require("express");
const portfolioData = require("../data/portfolioData");

const router = express.Router();

router.get("/", (_req, res) => {
  res.json(portfolioData);
});

module.exports = router;
