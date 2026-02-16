const mongoose = require("mongoose");

const eventSchema = new mongoose.Schema({
  name: String,
  description: String,
  location: String,
  dateTime: Date,
  availableSeats: Number,
  category: String,
});

module.exports = mongoose.model("Event", eventSchema);
