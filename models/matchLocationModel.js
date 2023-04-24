const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const MatchLocationSchema = new Schema({
  matchLocation_id: { type: Number, required: true },
  name: { type: String },
  description: { type: String },
});
const MatchLocation = mongoose.model("MatchLocation", MatchLocationSchema);

export default MatchLocation;
