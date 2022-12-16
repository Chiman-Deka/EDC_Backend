const express = require("express");
const Authentication = require('../Middlewares/Authentication');
const {addEvent, updateEvent, deleteEvent, fetchallEvents } = require("../controller/Admin/Events");
const {fetchallEventsPublic} = require("../controller/Public/Events_public");
const userRouter = express.Router();
exports.userRouter = userRouter;

userRouter.route("/fetchallEvents").get(Authentication, fetchallEvents);
userRouter.route("/addEvent").post(Authentication, addEvent);
userRouter.route("/updateEvent/:_id").put(Authentication, updateEvent);
userRouter.route("/deleteEvent/:_id").delete(Authentication, deleteEvent);

userRouter.route("/pnotes").get(fetchallEventsPublic ); 

module.exports = userRouter;