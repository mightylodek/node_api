const mongoose = require("mongoose");

const participantSchema = mongoose.Schema(
  {
    id: String,
    wins: Number,
    losses: Number,
    pdiff: Number,
    seed: Number,
    name: String,
  },
  { timestamps: true }
); // Add timestamps option here

const matchSchema = mongoose.Schema(
  {
    bracketName: String,
    bracketRound: String,
    matchNumber: Number,
    team1FK: String,
    team1Name: String,
    team1PlayerNames: [String],
    team1PlayerIds: [String],
    team2FK: String,
    team2Name: String,
    team2PlayerNames: [String],
    team2PlayerIds: [String],
    locationFK: String,
    locationName: String,
    team1Score: Number,
    team2Score: Number,
    maxScore: Number,
    winByTwo: Boolean,
    startTime: Date,
    endTime: String,
    plannedDuration: String,
    winner: String,
    wonBy: String,
    winnerNextMatch: Number,
    winnerNextMatchPosition: Number,
    loserNextMatch: Number,
    loserNextMatchPosition: Number,
    pointDiff: Number,
    matchStatus: String,
  },
  { timestamps: true }
); // Add timestamps option here

const tournamentSchema = new mongoose.Schema(
  {
    participants: {
      type: Map,
      of: participantSchema,
    },

    matches: {
      type: Map,
      of: matchSchema,
    },

    event: String,
    prelims: String,
    prelimsDesc: String,
    prelimMatches: Number,
    finals: String,
    finalsDesc: String,
    finalsSeeds: Number,
    eventDate: Date,
    eventDesc: String,
    eventLocation: String,
    eventContactName: String,
    eventContactPhone: String,
    eventContactEmail: String,
  },
  { timestamps: true }
); // Add timestamps option here

const Tournament = mongoose.model("Tournament", tournamentSchema);

module.exports = Tournament;
