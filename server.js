const express = require("express");
const app = express();
const mongoose = require("mongoose");
const uri =
  "mongodb+srv://apiappuser:ga887fQeFZ3F4z@node-api.ii8gnyv.mongodb.net/node-api?retryWrites=true&w=majority";
const Player = require("./models/playerModel.js");
const Organization = require("./models/organizationModel.js");
const Match = require("./models/matchModel.js");
const Team = require("./models/teamModel.js");

app.use(express.json());

//connect to the database
mongoose
  .connect(uri)
  .then(() => {
    console.log("Connected to mongo db");
  })
  .catch((error) => {
    console.log("Error: ", error);
  });

//routes

app.get("/", (req, res) => {
  res.send("Hello NODE API");
});

app.get("/blog", (req, res) => {
  res.send("Hello blog, how you doing");
});

//Organization
// Create New
app.post("/orgs", async (req, res) => {
  try {
    const organization = await Organization.create(req.body);
    res.status(200).json(organization);
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ message: error.message });
  }
});

//List all orgs
app.get("/orgs", async (req, res) => {
  try {
    const Organizations = await Organization.find({});
    res.status(200).json(Organizations);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

//List one org
app.get("/orgs/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const organizations = await Organization.findById(id);
    res.status(200).json(organizations);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

//Update organization PUT
app.put("/orgs/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const organization = await Organization.findByIdAndUpdate(id, req.body);
    if (!organization) {
      return res
        .status(404)
        .json({ message: `Cannot find any organization with ID ${id}` });
    }
    res.status(200).json(req.body);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

//Update organization PATCH
app.patch("/orgs/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const organization = await Organization.findByIdAndUpdate(id, req.body);
    if (!organization) {
      return res
        .status(404)
        .json({ message: `Cannot find any organization with ID ${id}` });
    }
    res.status(200).json(req.body);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

//Delete one org
app.delete("/orgs/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const organization = await Organization.findByIdAndDelete(id);
    if (!organization) {
      return res
        .status(404)
        .json({ message: `Cannot find any organization with ID ${id}` });
    }
    res.status(200).json(req.body);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

/**
 * Match Section
 */
// Create New
app.post("/matches", async (req, res) => {
  try {
    const match = await Match.create(req.body);
    res.status(200).json(match);
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ message: error.message });
  }
});

//List all match
app.get("/matches", async (req, res) => {
  try {
    const Matches = await Match.find({});
    res.status(200).json(Matches);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

//List one match
app.get("/matches/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const match = await Match.findById(id);
    res.status(200).json(match);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

//Update match PUT
app.put("/matches/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const match = await Match.findByIdAndUpdate(id, req.body);
    if (!match) {
      return res
        .status(404)
        .json({ message: `Cannot find any match with ID ${id}` });
    }
    res.status(200).json(req.body);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

//Update match PATCH
app.patch("/matches/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const match = await Match.findByIdAndUpdate(id, req.body);
    if (!match) {
      return res
        .status(404)
        .json({ message: `Cannot find any match with ID ${id}` });
    }
    res.status(200).json(req.body);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

//Delete one match
app.delete("/matches/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const match = await Match.findByIdAndDelete(id);
    if (!match) {
      return res
        .status(404)
        .json({ message: `Cannot find any match with ID ${id}` });
    }
    res.status(200).json(req.body);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

/**
 * End Match Section
 */

/**
 * OrgMember Section
 */
// Create New OrgMember
app.post("/orgmembers", async (req, res) => {
  try {
    const OrgMember = await orgMember.create(req.body);
    res.status(200).json(OrgMember);
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ message: error.message });
  }
});

//List all OrgMember
app.get("/orgmembers", async (req, res) => {
  try {
    const OrgMembers = await orgMember.find({});
    res.status(200).json(OrgMembers);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

//List one OrgMember
app.get("/orgmembers/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const OrgMember = await orgMember.findById(id);
    res.status(200).json(OrgMember);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

//Update OrgMember PUT
app.put("/orgmembers/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const OrgMember = await orgMember.findByIdAndUpdate(id, req.body);
    if (!OrgMember) {
      return res
        .status(404)
        .json({ message: `Cannot find any orgMember with ID ${id}` });
    }
    res.status(200).json(req.body);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

//Update OrgMember PATCH
app.patch("/orgmembers/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const OrgMember = await orgMember.findByIdAndUpdate(id, req.body);
    if (!match) {
      return res
        .status(404)
        .json({ message: `Cannot find any orgMember with ID ${id}` });
    }
    res.status(200).json(req.body);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

//Delete one OrgMember
app.delete("/orgmembers/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const OrgMember = await orgMember.findByIdAndDelete(id);
    if (!OrgMember) {
      return res
        .status(404)
        .json({ message: `Cannot find any OrgMember with ID ${id}` });
    }
    res.status(200).json(req.body);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

/**
 * End OrgMember Section
 */

/**
 * Team Section
 */
// Create New
app.post("/teams", async (req, res) => {
  try {
    const team = await Team.create(req.body);
    res.status(200).json(team);
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ message: error.message });
  }
});

//List all Team
app.get("/teams", async (req, res) => {
  try {
    const teams = await Team.find({});
    res.status(200).json(teams);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

//List one Team
app.get("/teams/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const team = await Team.findById(id);
    res.status(200).json(team);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

//Update Team PUT
app.put("/teams/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const team = await Team.findByIdAndUpdate(id, req.body);
    if (!team) {
      return res
        .status(404)
        .json({ message: `Cannot find any Team with ID ${id}` });
    }
    res.status(200).json(req.body);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

//Update Team PATCH
app.patch("/teams/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const team = await Team.findByIdAndUpdate(id, req.body);
    if (!team) {
      return res
        .status(404)
        .json({ message: `Cannot find any Team with ID ${id}` });
    }
    res.status(200).json(req.body);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

//Delete one Team
app.delete("/teams/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const team = await Team.findByIdAndDelete(id);
    if (!match) {
      return res
        .status(404)
        .json({ message: `Cannot find any Team with ID ${id}` });
    }
    res.status(200).json(req.body);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

/**
 * End Team Section
 */

//Player
app.post("/player", async (req, res) => {
  try {
    const player = await Player.create(req.body);
    res.status(200).json(player);
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ message: error.message });
  }
});

app.listen(3000, () => {
  console.log("Node API app is running on port 3000 ");
});
