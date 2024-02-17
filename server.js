// Import builtin NodeJS modules to instantiate the service
const https = require('https');
const fs = require('fs');

const express = require('express');
const app = express();
const mongoose = require('mongoose');
const uri =
  'mongodb+srv://apiappuser:ga887fQeFZ3F4z@node-api.ii8gnyv.mongodb.net/node-api?retryWrites=true&w=majority';
const Player = require('./models/playerModel.js');
const Organization = require('./models/organizationModel.js');
const Match = require('./models/matchModel.js');
const Team = require('./models/teamModel.js');
const Event = require('./models/eventModel.js');
const OrgMember = require('./models/orgMemberModel.js');
const KingsCupPlayer = require('./models/kingsCupPlayerModel');
const cors = require('cors');

app.use(
  cors({
    origin: '*',
  })
);

/**
 * const corsOptions = {
 *  origin: "http://localhost:19006",
 *  optionsSuccessStatus: 200, // some legacy browsers (IE11, various SmartTVs) choke on 204
 *};
 *
 *app.use(cors(corsOptions));
 */

app.use(express.json());

app.use(function (req, res, next) {
  const allowedOrigins = [
    'http://127.0.0.1:3000',
    'http://localhost:3000',
    'http://127.0.0.1:19006',
    'http://localhost:19006',
  ];
  var datetime = new Date();
  console.log(datetime);
  const origin = req.headers.origin;
  console.log(datetime, 'Origin: ', origin);
  //if (allowedOrigins.includes(origin)) {
  //     res.setHeader('Access-Control-Allow-Origin', origin);
  //}

  //res.setHeader("Access-Control-Allow-Origin", "http://localhost:19006");
  res.setHeader(
    'Access-Control-Allow-Methods',
    'GET, POST, OPTIONS, PUT, PATCH, DELETE'
  );
  res.setHeader(
    'Access-Control-Allow-Headers',
    'X-Requested-With,content-type'
  );
  res.setHeader('Access-Control-Allow-Credentials', true);
  next();
});

//connect to the database
mongoose
  .connect(uri)
  .then(() => {
    console.log('Connected to mongo db');
  })
  .catch((error) => {
    console.log('Error: ', error);
  });

//routes

app.get('/', (req, res) => {
  res.send('Hello NODE API');
});

app.get('/blog', (req, res) => {
  res.send('Hello blog, how you doing');
});

//Organization
// Create New
app.post('/orgs', async (req, res) => {
  try {
    const organization = await Organization.create(req.body);
    res.status(200).json(organization);
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ message: error.message });
  }
});

//List all orgs
app.get('/orgs', async (req, res) => {
  try {
    const Organizations = await Organization.find({});
    res.status(200).json(Organizations);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

//List all orgs' id and name only
app.get('/orgs/ids', async (req, res) => {
  try {
    const Organizations = await Organization.find({}, [
      'name',
      'description',
      '_id',
    ]);
    res.status(200).json(Organizations);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

//List one org
app.get('/orgs/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const organizations = await Organization.findById(id);
    res.status(200).json(organizations);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

//Update organization PUT
app.put('/orgs/:id', async (req, res) => {
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
app.patch('/orgs/:id', async (req, res) => {
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
app.delete('/orgs/:id', async (req, res) => {
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
app.post('/matches', async (req, res) => {
  try {
    const match = await Match.create(req.body);
    res.status(200).json(match);
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ message: error.message });
  }
});

//List all match
app.get('/matches', async (req, res) => {
  try {
    const Matches = await Match.find({});
    res.status(200).json(Matches);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

//List one match
app.get('/matches/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const match = await Match.findById(id);
    res.status(200).json(match);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

//Update match PUT
app.put('/matches/:id', async (req, res) => {
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
app.patch('/matches/:id', async (req, res) => {
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
app.delete('/matches/:id', async (req, res) => {
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

//Delete all matches that meet the filter criteria
//TODO
app.delete('/matches/', async (req, res) => {
  try {
    const match = await Match.deleteMany(req.body).then((result) => {
      return result;
    });
    if (!match) {
      return res.status(404).json({
        message: `Cannot find any match with ID ${JSON.stringify(req.body)}`,
      });
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
app.post('/orgmembers', async (req, res) => {
  try {
    const orgMember = await OrgMember.create(req.body);
    res.status(200).json(orgMember);
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ message: error.message });
  }
});

//List all OrgMember
app.get('/orgmembers', async (req, res) => {
  try {
    const orgMembers = await OrgMember.find({});
    res.status(200).json(orgMembers);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

//List one OrgMember
app.get('/orgmembers/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const orgMember = await OrgMember.findById(id);
    res.status(200).json(orgMember);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

//Update OrgMember PUT
app.put('/orgmembers/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const orgMember = await OrgMember.findByIdAndUpdate(id, req.body);
    if (!orgMember) {
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
app.patch('/orgmembers/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const orgMember = await OrgMember.findByIdAndUpdate(id, req.body);
    if (!orgMember) {
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
app.delete('/orgmembers/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const orgMember = await OrgMember.findByIdAndDelete(id);
    if (!orgMember) {
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
app.post('/teams', async (req, res) => {
  try {
    const team = await Team.create(req.body);
    res.status(200).json(team);
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ message: error.message });
  }
});

//List all Team
app.get('/teams', async (req, res) => {
  try {
    const teams = await Team.find({});
    res.status(200).json(teams);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

//List one Team
app.get('/teams/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const team = await Team.findById(id);
    res.status(200).json(team);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

//Update Team PUT
app.put('/teams/:id', async (req, res) => {
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
app.patch('/teams/:id', async (req, res) => {
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
app.delete('/teams/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const team = await Team.findByIdAndDelete(id);
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

/**
 * End Team Section
 */

/**
 * Event Section
 */
// Create New Event
app.post('/events', async (req, res) => {
  try {
    const event = await Event.create(req.body);
    res.status(200).json(event);
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ message: error.message });
  }
});

//List all Events
app.get('/events', async (req, res) => {
  try {
    const events = await Event.find({});
    res.status(200).json(events);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

//List one Event
app.get('/events/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const event = await Event.findById(id);
    res.status(200).json(event);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

//Update Event PUT
app.put('/events/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const event = await Event.findByIdAndUpdate(id, req.body);
    if (!team) {
      return res
        .status(404)
        .json({ message: `Cannot find any Event with ID ${id}` });
    }
    res.status(200).json(req.body);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

//Update Event PATCH
app.patch('/events/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const event = await Event.findByIdAndUpdate(id, req.body);
    if (!event) {
      return res
        .status(404)
        .json({ message: `Cannot find any Event with ID ${id}` });
    }
    res.status(200).json(req.body);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

//Delete one Event
app.delete('/events/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const event = await Event.findByIdAndDelete(id);
    if (!event) {
      return res
        .status(404)
        .json({ message: `Cannot find any Event with ID ${id}` });
    }
    res.status(200).json(req.body);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

/**
 * End Event Section
 */

//Kings Cup Player
// Create New
app.post('/kcplayer', async (req, res) => {
  try {
    const kingsCupPlayer = await KingsCupPlayer.create(req.body);
    res.status(200).json(kingsCupPlayer);
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ message: error.message });
  }
});

//List all
app.get('/kcplayer', async (req, res) => {
  try {
    const KingsCupPlayers = await KingsCupPlayer.find({});
    res.status(200).json(KingsCupPlayers);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

//List one player
app.get('/kcplayer/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const KingsCupPlayers = await KingsCupPlayer.findOne({ id: id });
    res.status(200).json(KingsCupPlayers);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// PUT route to update player's wins, losses, pdiff, seed, and name by id
app.put('/kcplayer/:id', async (req, res) => {
  const { playerId } = req.params;
  const { wins, losses, pdiff, seed, name } = req.body;

  try {
    const player = await KingsCupPlayer.findOne({ id: playerId });

    if (!player) {
      return res.status(404).json({ error: 'Player not found' });
    }

    if (wins !== undefined) {
      player.wins = wins;
    }
    if (losses !== undefined) {
      player.losses = losses;
    }
    if (pdiff !== undefined) {
      player.pdiff = pdiff;
    }
    if (seed !== undefined) {
      player.seed = seed;
    }
    if (name !== undefined) {
      player.name = name;
    }

    const updatedPlayer = await player.save();

    return res.json(updatedPlayer);
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: 'An error occurred' });
  }
});

//Update Kings Cup Player PATCH
app.patch('/kcplayer/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const kingsCupPlayer = await KingsCupPlayer.findOneAndUpdate(id, req.body);
    if (!kingsCupPlayer) {
      return res
        .status(404)
        .json({ message: `Cannot find any Players with ID ${id}` });
    }
    res.status(200).json(req.body);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

//Delete one Kings Cup player
app.delete('/kcplayer/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const kingsCupPlayer = await KingsCupPlayer.findByIdAndDelete(id);
    if (!kingsCupPlayer) {
      return res
        .status(404)
        .json({ message: `Cannot find any Player with ID ${id}` });
    }
    res.status(200).json(req.body);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// GET route to find the maximum value of the id field
app.get('/kcplayer/max-id', async (req, res) => {
  try {
    const maxIdPlayer = await KingsCupPlayer.findOne({}, { id: 1 }).sort({
      id: -1,
    });

    if (!maxIdPlayer) {
      return res.json({ id: 'p00' });
    }

    return res.json(maxIdPlayer);
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: 'An error occurred' });
  }
});

//Player
app.post('/player', async (req, res) => {
  try {
    const player = await Player.create(req.body);
    res.status(200).json(player);
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ message: error.message });
  }
});

app.listen(30303, () => {
  console.log('Node API app is running on port 30303 ');
});

https
  .createServer(
    // Provide the private and public key to the server by reading each
    // file's content with the readFileSync() method.
    {
      key: fs.readFileSync('../../tourneyrun.key'),
      cert: fs.readFileSync('../../tourneyrun.crt'),
    },
    app
  )
  .listen(30443, () => {
    console.log('https serever is runing at port 30443');
  });
