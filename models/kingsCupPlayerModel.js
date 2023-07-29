const mongoose = require("mongoose");

const KingsCupPlayerSchema = mongoose.Schema({
  id: String,
  wins: Number,
  losses: Number,
  pdiff: Number,
  seed: Number,
  name: String,
  eventName: String,
});

const KingsCupPlayer = mongoose.model("KingsCupPlayer", KingsCupPlayerSchema);

module.exports = KingsCupPlayer;
