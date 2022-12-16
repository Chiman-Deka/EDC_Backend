const express = require("express");
const Authentication = require('../Middlewares/Authentication');
const {addTeam, updateTeam, deleteTeam, fetchallTeams } = require("../controller/Admin/Teams");
const {fetchallTeamsPublic} = require("../controller/Public/Team_public");
const userRouter = express.Router();
exports.userRouter = userRouter;

userRouter.route("/fetchallTeams").get(Authentication, fetchallTeams);
userRouter.route("/addTeam").post(Authentication, addTeam);
userRouter.route("/updateTeam/:_id").put(Authentication, updateTeam);
userRouter.route("/deleteTeam/:_id").delete(Authentication, deleteTeam);

userRouter.route("/pteams").get(fetchallTeamsPublic ); 

module.exports = userRouter;