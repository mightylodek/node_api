var mongoose = require("mongoose");
var Schema = mongoose.Schema;
var MatchSchema = new Schema(
  {
    eventFK: {
      type: String,
    },
    eventName: {
      type: String,
    },
    bracketFK: {
      type: String,
    },
    bracketName: {
      type: String,
    },
    bracketRound:{
     type: String,
    },
    matchNumber: {
      type: Number,
    },
    team1FK: {
      type: String,
    },
    team1Name: {
      type: String,
    },
    team1PlayerNames: {
      type: [String],
    },
    team1PlayerIds: {
      type: [String],
    },
    team2FK: {
      type: String,
    },
    team2Name: {
      type: String,
    },
    team2PlayerNames: {
      type: [String],
    },
    team2PlayerIds: {
      type: [String],
    },
    locationFK: {
      type: String,
    },
    locationName: {
      type: String,
    },
    team1Score: {
      type: Number,
    },
    team2Score: {
      type: Number,
    },
    maxScore: {
      type: Number,
    },
    winByTwo: {
      type: Boolean,
    },
    startTime: {
      type: Date,
    },
    endTime: {
      type: String,
    },
    plannedDuration: {
      type: String,
    },
    winner: {
      type: String,
    },
    wonBy: {
      type: String,
    },
    winnerNextMatch: {
      type: Number,
    },
    winnerNextMatchPosition: {
      type: Number,
    },
    loserNextMatch: {
      type: Number,
    },
    loserNextMatchPosition: {
      type: Number,
    },
    pointDiff: {
      type: Number,
    },
    matchStatus: {
      type: String,
    }
  },
  {
    timestamps: true,
  }
);

const Match = mongoose.model("Match", MatchSchema);

module.exports = Match;
