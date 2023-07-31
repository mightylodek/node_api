const https = require("https");
const fs = require("fs");

const express = require("express");
const app = express();
const mongoose = require("mongoose");
const cors = require("cors");
const uri =
  "mongodb+srv://apiappuser:ga887fQeFZ3F4z@node-api.ii8gnyv.mongodb.net/node-api?retryWrites=true&w=majority";

const Tournament = require("./models/tournamentModel");
const port = 30304;

app.use(
  cors({
    origin: "*",
  })
);

// Connect to MongoDB
mongoose.connect(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

mongoose.connection.on("connected", () => {
  console.log("Connected to MongoDB!");
});

// Middleware
app.use(express.json());

app.use(function (req, res, next) {
  const allowedOrigins = [
    "http://127.0.0.1:3000",
    "http://localhost:3000",
    "http://127.0.0.1:19006",
    "http://localhost:19006",
  ];
  const origin = req.headers.origin;
  console.log("Origin: ", origin);

  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, OPTIONS, PUT, PATCH, DELETE"
  );
  res.setHeader(
    "Access-Control-Allow-Headers",
    "X-Requested-With,content-type"
  );
  res.setHeader("Access-Control-Allow-Credentials", true);
  next();
});

// CRUD Operations

// Create a new tournament
app.post("/tournaments", async (req, res) => {
  try {
    const newTournament = await Tournament.create(req.body);
    res.status(201).json(newTournament);
  } catch (error) {
    res.status(500).json({ error: "Failed to create the tournament" });
  }
});

// Read all tournaments
app.get("/tournaments", async (req, res) => {
  try {
    const tournaments = await Tournament.find();
    res.json(tournaments);
  } catch (error) {
    res.status(500).json({ error: "Failed to retrieve tournaments" });
  }
});

// Read a specific tournament by ID
app.get("/tournaments/:id", async (req, res) => {
  try {
    const tournament = await Tournament.findById(req.params.id);
    if (tournament) {
      res.json(tournament);
    } else {
      res.status(404).json({ error: "Tournament not found" });
    }
  } catch (error) {
    res.status(500).json({ error: "Failed to retrieve the tournament" });
  }
});

// Update a specific tournament by ID
app.put("/tournaments/:id", async (req, res) => {
  try {
    const updatedTournament = await Tournament.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    if (updatedTournament) {
      res.json(updatedTournament);
    } else {
      res.status(404).json({ error: "Tournament not found" });
    }
  } catch (error) {
    res.status(500).json({ error: "Failed to update the tournament" });
  }
});

// Delete a specific tournament by ID
app.delete("/tournaments/:id", async (req, res) => {
  try {
    const deletedTournament = await Tournament.findByIdAndDelete(req.params.id);
    if (deletedTournament) {
      res.json({ message: "Tournament deleted successfully" });
    } else {
      res.status(404).json({ error: "Tournament not found" });
    }
  } catch (error) {
    res.status(500).json({ error: "Failed to delete the tournament" });
  }
});

// CRUD Operations for Matches

// Create a new match for a specific tournament
app.post("/tournaments/:tournamentId/matches", async (req, res) => {
  try {
    const tournamentId = req.params.tournamentId;
    const tournament = await Tournament.findById(tournamentId);

    if (!tournament) {
      return res.status(404).json({ error: "Tournament not found" });
    }

    const newMatchData = req.body;
    tournament.matches.set(newMatchData.matchNumber, newMatchData);
    await tournament.save();

    res.status(201).json(newMatchData);
  } catch (error) {
    res.status(500).json({ error: "Failed to create the match" });
  }
});

// Update a specific match for a specific tournament
app.put("/tournaments/:tournamentId/matches/:matchNumber", async (req, res) => {
  try {
    const tournamentId = req.params.tournamentId;
    const tournament = await Tournament.findById(tournamentId);

    if (!tournament) {
      return res.status(404).json({ error: "Tournament not found" });
    }

    const matchNumber = req.params.matchNumber;
    const updatedMatchData = req.body;
    tournament.matches.set(matchNumber, updatedMatchData);
    await tournament.save();

    res.json(updatedMatchData);
  } catch (error) {
    res.status(500).json({ error: "Failed to update the match" });
  }
});

// Delete a specific match for a specific tournament
app.delete(
  "/tournaments/:tournamentId/matches/:matchNumber",
  async (req, res) => {
    try {
      const tournamentId = req.params.tournamentId;
      const tournament = await Tournament.findById(tournamentId);

      if (!tournament) {
        return res.status(404).json({ error: "Tournament not found" });
      }

      const matchNumber = req.params.matchNumber;
      tournament.matches.delete(matchNumber);
      await tournament.save();

      res.json({ message: "Match deleted successfully" });
    } catch (error) {
      res.status(500).json({ error: "Failed to delete the match" });
    }
  }
);

// CRUD Operations for Participants

// Create a new participant for a specific tournament
app.post("/tournaments/:tournamentId/participants", async (req, res) => {
  try {
    const tournamentId = req.params.tournamentId;
    const tournament = await Tournament.findById(tournamentId);

    if (!tournament) {
      return res.status(404).json({ error: "Tournament not found" });
    }

    const newParticipantData = req.body;
    tournament.participants.set(newParticipantData.id, newParticipantData);
    await tournament.save();

    res.status(201).json(newParticipantData);
  } catch (error) {
    res
      .status(500)
      .json({
        error: "Failed to create the participant",
        response: `${error}`,
      });
  }
});

// Update a specific participant for a specific tournament
app.put(
  "/tournaments/:tournamentId/participants/:participantId",
  async (req, res) => {
    try {
      const tournamentId = req.params.tournamentId;
      const tournament = await Tournament.findById(tournamentId);

      if (!tournament) {
        return res.status(404).json({ error: "Tournament not found" });
      }

      const participantId = req.params.participantId;
      const updatedParticipantData = req.body;
      tournament.participants.set(participantId, updatedParticipantData);
      await tournament.save();

      res.json(updatedParticipantData);
    } catch (error) {
      res.status(500).json({ error: "Failed to update the participant" });
    }
  }
);

// Delete a specific participant for a specific tournament
app.delete(
  "/tournaments/:tournamentId/participants/:participantId",
  async (req, res) => {
    try {
      const tournamentId = req.params.tournamentId;
      const tournament = await Tournament.findById(tournamentId);

      if (!tournament) {
        return res.status(404).json({ error: "Tournament not found" });
      }

      const participantId = req.params.participantId;
      tournament.participants.delete(participantId);
      await tournament.save();

      res.json({ message: "Participant deleted successfully" });
    } catch (error) {
      res.status(500).json({ error: "Failed to delete the participant" });
    }
  }
);

// Start the server
https
  .createServer(
    {
      key: fs.readFileSync("../../tourneyrun.key"),
      cert: fs.readFileSync("../../tourneyrun.crt"),
    },
    app
  )
  .listen(port, () => {
    console.log(`Server running on ${port}`);
  });
