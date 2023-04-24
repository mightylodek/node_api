const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const MatchLocation = new Schema({
  matchLocation_id: { type: Number, required: true },
  name: { type: String },
  description: { type: String },
});
const MatchLocation = mongoose.model("Player", PlayerSchema);

export default MatchLocation;
