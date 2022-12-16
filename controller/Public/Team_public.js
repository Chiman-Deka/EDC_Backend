const Team = require("../../model/team");


const fetchallTeamsPublic = async (req, res) => {
    try {
        const pteams = await Team.find({});
        res.json(pteams);
    } catch (error) {
      console.error(error.message);
      res.status(500).send("Some Internal server Error occured");
    }
}



exports.fetchallTeamsPublic= fetchallTeamsPublic;