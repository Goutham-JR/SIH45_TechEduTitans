const express = require("express");
const router = express.Router();

const {
  create,
  uploadtrailer,
  uploadweeks,
  uploadquiz,
  requestfile,
} = require("../controllers/courseController");

router.post("/create", create);
router.post("/uploadtrailer", uploadtrailer);
router.post("/uploadweeks", uploadweeks);
router.post("/uploadquiz", uploadquiz);
router.get("/media/:id", requestfile);

module.exports = router;
