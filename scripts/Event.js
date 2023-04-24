var mongoose = require("mongoose");
var Schema = mongoose.Schema;
var Event = new Schema({
  event_id: { type: Number, required: true },
  title: { type: String, required: true },
  address: { type: String },
  city: { type: String },
  state: { type: String },
  zip: { type: String },
  date: { type: Date },
  avatar: { type: String },
  logo: { type: String },
  description: { type: String },
});
