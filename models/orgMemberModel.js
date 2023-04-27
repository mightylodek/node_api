const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const orgMemberSchema = new Schema(
  {
    organizationFK: {
      type: String,
    },
    organizationName: {
      type: String,
    },
    fname: {
      type: String,
    },
    lname: {
      type: String,
    },
    email1: {
      type: String,
    },
    email2: {
      type: String,
    },
    phone1: {
      type: String,
    },
    phone2: {
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
    memberSince: {
      type: Date,
    },
    status: {
      type: String,
    },
    avatar: {
      type: String,
    },
    socialMedia: {
      type: Array,
    },
  },
  {
    timestamps: true,
  }
);

const orgMember = mongoose.model("OrgMember", orgMemberSchema);

module.exports = orgMember;
