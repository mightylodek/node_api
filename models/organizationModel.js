const { Timestamp } = require("mongodb");
const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const OrganizationSchema = new Schema(
  {
    name: {
      type: String,
    },
    description: {
      type: String,
    },
    contact1_fname: {
      type: String,
    },
    contact1_lname: {
      type: String,
    },
    contact1_phone: {
      type: String,
    },
    contact1_email: {
      type: String,
    },
    contact1_address: {
      type: String,
    },
    contact1_city: {
      type: String,
    },
    contact1_state: {
      type: String,
    },
    contact1_zip: {
      type: String,
    },
    contact2_fname: {
      type: String,
    },
    contact2_lname: {
      type: String,
    },
    contact2_phone: {
      type: String,
    },
    contact2_email: {
      type: String,
    },
    contact2_address: {
      type: String,
    },
    contact2_city: {
      type: String,
    },
    contact2_state: {
      type: String,
    },
    contact2_zip: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

const Organization = mongoose.model("Organization", OrganizationSchema);

module.exports = Organization;
