const mongoose = require("mongoose");

const registrationSchema = new mongoose.Schema({
  eventId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Event",
  },
  name: String,
  email: String,
  phone: String,
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

// prevent duplicate
registrationSchema.index({ eventId: 1, email: 1 }, { unique: true });

module.exports = mongoose.model("Registration", registrationSchema);