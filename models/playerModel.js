const mongoose = require("mongoose");

const PlayerSchema = mongoose.Schema({
  player_id: { type: String, required: true },
  fname: { type: String, required: true },
  lname: { type: String },
  email: { type: String },
  phone: { type: String },
  avatar: { type: String },
});
const Player = mongoose.model("Player", PlayerSchema);

module.exports = Player;
