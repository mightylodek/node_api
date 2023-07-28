const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const registrantSchema = new Schema({
  eventName: {
    type: String,
    required: true,
  },
  id: {
    type: String,
    required: true,
    unique: true,
  },
  name: {
    type: String,
    required: true,
  },
  wins: {
    type: Number,
    default: 0,
  },
  losses: {
    type: Number,
    default: 0,
  },
  pdiff: {
    type: Number,
    default: 0,
  },
  seed: {
    type: Number,
    default: 0,
  },
});

const Registrant = mongoose.model("Registrant", registrantSchema);
module.exports = Registrant;
