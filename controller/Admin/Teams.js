const Team = require("../../model/team");

const fetchallTeams = async (req, res) => {
    try {
      const teams = await Team.find({ user: req.user.id });      
      res.json(teams);
    } catch (error) {
      console.error(error.message);
      res.status(500).send("Some Internal server Error occured");
    }
  }

  const addTeam = async (req, res) => {
    try {
      try {
        const { name, role} = req.body;     
        const team = new Team({     
          name,
          role,
          user: req.user.id,
        });
        const savedTeam = await team.save();  
        res.json(savedTeam);
      } catch (error) {
        console.error(error.message);
        res.status(500).send("Some Internal server Error occured");
      }
    } catch (error) {
      console.error(error.message);
      res.status(500).send("Some Internal server Error occured");
    }
  }
  
  const updateTeam = async (req, res) => {
    try {
      const { name, role } = req.body;
          const newTeam = {};
          if(name){newTeam.name = name};  
          if(role){newTeam.role = role};  
  
          let team= await Team.findById(req.params._id);   
          if(!team){return res.status(404).send("Not Found")}   
  
          
          team = await Team.findByIdAndUpdate(req.params._id, {$set: newTeam}, {new:true})   
          res.json({team});
        
    } catch (error) {
      console.error(error.message);
      res.status(500).send("Some Internal server Error occured");
    }
  }
  
  const deleteTeam = async (req, res) => {
    try {
      const { name, role } = req.body;
  
          let team = await Team.findById(req.params._id);   
          if(!team){return res.status(404).send("Not Found")}   

  
          team= await Team.findByIdAndDelete(req.params._id)   
          res.json({"Success": "The event has been deleted", team: team});
        
    } catch (error) {
      console.error(error.message);
      res.status(500).send("Some Internal server Error occured");
    }
  }
  
  
  exports.addTeam = addTeam;
  exports.updateTeam = updateTeam;
  exports.deleteTeam = deleteTeam;
  exports.fetchallTeams = fetchallTeams;
  