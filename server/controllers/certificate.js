const express = require("express");
const router = express.Router();
const Account = require("../models/user"); // Assuming Mongoose models are used

// Route to fetch recipient names
router.get("/recipients", async (req, res) => {
  try {
    const accounts = await Account.find({}, { name: 1 });
    res.json(accounts);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to fetch data" });
  }
});

module.exports = router;
