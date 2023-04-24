var mongoose = require("mongoose");
var Schema = mongoose.Schema;
var Match = new Schema({
  match_id: { type: Number, required: true },
  eventID: { type: Event, required: true },
  brackedID: { type: Bracket, required: true },
  Team1ID: { type: Team, required: true },
  Team2ID: { type: Team, required: true },
  team1Score: { type: Number },
  team2Score: { type: Number },
  maxScore: { type: Number },
  winByTwo: { type: Boolean },
  startTime: { type: Date },
  endTime: { type: String },
  locationID: { type: MatchLocation },
  plannedDuration: { type: String },
  winner: { type: String },
  wonBy: { type: String },
});
