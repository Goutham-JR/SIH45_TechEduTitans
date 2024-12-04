const express = require("express");
const { saveAddress, getAddress } = require("../controllers/addressController");
const router = express.Router();


router.get("/", getAddress);

router.post("/", saveAddress);

module.exports = router;
