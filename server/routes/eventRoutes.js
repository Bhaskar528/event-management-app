const express = require("express");
const router = express.Router();
const Event = require("../models/Event");
const Registration = require("../models/Registration");

// 🔹 GET EVENTS
router.get("/", async (req, res) => {
  try {
    const { search, category, location } = req.query;

    let query = {};

    if (search) query.name = { $regex: search, $options: "i" };
    if (category) query.category = category;
    if (location) query.location = { $regex: location, $options: "i" };

    const events = await Event.find(query).sort({ dateTime: 1 });

    res.json({ events });
  } catch (err) {
    res.status(500).json({ msg: "Server error" });
  }
});

// 🔹 REGISTER EVENT
router.post("/:id/register", async (req, res) => {
  try {
    const { name, email, phone } = req.body;

    if (!name || !email || !phone) {
      return res.status(400).json({ msg: "All fields required" });
    }

    // duplicate check
    const exists = await Registration.findOne({
      eventId: req.params.id,
      email,
    });

    if (exists) {
      return res.status(400).json({ msg: "Already registered" });
    }

    const event = await Event.findById(req.params.id);

    if (!event) return res.status(404).json({ msg: "Event not found" });

    if (event.availableSeats <= 0) {
      return res.status(400).json({ msg: "Event full" });
    }

    const reg = await Registration.create({
      eventId: event._id,
      name,
      email,
      phone,
    });

    event.availableSeats -= 1;
    await event.save();

    res.json({ msg: "Registered", reg });

  } catch (err) {
    res.status(500).json({ msg: "Registration error" });
  }
});

// 🔹 CANCEL REGISTRATION
router.delete("/:id/cancel", async (req, res) => {
  try {
    const { email } = req.body;

    const reg = await Registration.findOne({
      eventId: req.params.id,
      email,
    });

    if (!reg) return res.status(404).json({ msg: "Not found" });

    await reg.deleteOne();

    const event = await Event.findById(req.params.id);
    event.availableSeats += 1;
    await event.save();

    res.json({ msg: "Cancelled" });

  } catch (err) {
    res.status(500).json({ msg: "Cancel error" });
  }
});

module.exports = router;