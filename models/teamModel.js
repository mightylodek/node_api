const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const TeamSchema = new Schema({
  team_id: { type: Number, required: true },
  name: { type: String, required: true },
  player1: { type: String },
  player2: { type: String },
  player3: { type: String },
  player4: { type: String },
  avatar: { type: String },
});
const Team = mongoose.model("Team", TeamSchema);
export default Team;
