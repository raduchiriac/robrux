const express = require("express");
const router = express.Router();
const gigService = require("./gig.service");

const getAll = (req, res, next) => {
  gigService
    .getAll()
    .then(gigs => res.json(gigs))
    .catch(err => next(err));
};

router.get("/", getAll);

module.exports = router;
