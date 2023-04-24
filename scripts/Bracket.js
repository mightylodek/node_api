var mongoose = require("mongoose");
var Schema = mongoose.Schema;
var BracketSchema = new Schema({
  bracket_id: { type: Number, required: true },
  playType: { type: String },
  name: { type: String },
  description: { type: String },
});

const Bracket = mongoose.model("Bracket", BracketSchema);
export default Bracket;
