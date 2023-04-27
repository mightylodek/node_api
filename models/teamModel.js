const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const TeamSchema = new Schema({
  organizationFK: { type: String },
  organizationName: { type: String },
  name: { type: String, required: true },
  players: { type: String },
  avatar: { type: String },
});
const Team = mongoose.model("Team", TeamSchema);
export default Team;
