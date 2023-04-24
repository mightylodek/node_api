const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const PlayerSchema = new Schema({
  player_id: { type: Number, required: true },
  fname: { type: String, required: true },
  lname: { type: String },
  email: { type: String },
  phone: { type: String },
  avatar: { type: String },
});
const Player = mongoose.model("Player", PlayerSchema);

export default Player;
