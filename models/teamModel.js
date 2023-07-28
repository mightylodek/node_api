const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const TeamSchema = new Schema({
  organizationFK: { type: String },
  organizationName: { type: String },
  name: { type: String, required: true },
  player1: { type: String },
  player2: { type: String },
  avatar: { type: String },
  eventWins: { type: Number },
  eventLosses: { type: Number },
  eventPointDifferencial: { type: Number }
});
const Team = mongoose.model("Team", TeamSchema);
module.exports = Team;
