var mongoose = require("mongoose");
var Schema = mongoose.Schema;
var EventSchema = new Schema(
  {
    organizationFK: {
      type: String,
    },
    title: {
      type: String,
      required: true,
    },
    address: {
      type: String,
    },
    city: {
      type: String,
    },
    state: {
      type: String,
    },
    zip: {
      type: String,
    },
    date: {
      type: Date,
    },
    avatar: {
      type: String,
    },
    logo: {
      type: String,
    },
    description: {
      type: String,
    },
    contactName: {
      type: String,
    },
    contactPhone: {
      type: String,
    },
    contactEmail: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

const Event = mongoose.model("Event", EventSchema);

module.exports = Event;
