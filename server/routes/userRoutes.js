const express = require("express");
const router = express.Router();
const Registration = require("../models/Registration");

router.get("/dashboard", async (req, res) => {
  try {
    const registrations = await Registration.find().populate("eventId");

    const now = new Date();

    const upcoming = registrations.filter(r =>
      new Date(r.eventId.dateTime) >= now
    );

    const past = registrations.filter(r =>
      new Date(r.eventId.dateTime) < now
    );

    res.json({ upcoming, past });

  } catch (err) {
    res.status(500).json({ msg: "Dashboard error" });
  }
});

module.exports = router;