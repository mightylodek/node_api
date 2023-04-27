var mongoose = require("mongoose");
var Schema = mongoose.Schema;
var BracketSchema = new Schema({
  eventFK: {
    type: String,
  },
  eventName: {
    type: String,
  },
  bracketType: {
    type: String,
  },
  name: {
    type: String,
  },
  description: {
    type: String,
  },
  matches: {
    type: Array,
  },
});

const Bracket = mongoose.model("Bracket", BracketSchema);
export default Bracket;
