const express = require("express");
const router = express.Router();

router.post("/register", (req, res) => {
  res.json({ msg: "register working" });
});

router.post("/login", (req, res) => {
  res.json({ msg: "login working" });
});

module.exports = router;