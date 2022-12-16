const express = require("express");
const Authentication = require('../Middlewares/Authentication');
const {addNotification, updateNotification, deleteNotification, fetchallNotification } = require("../controller/Admin/Notification")
const  { fetchallNotificationPublic }= require("../controller/Public/Notification_public");
const userRouter = express.Router();
exports.userRouter = userRouter;

userRouter.route("/fetchallNotification").get(Authentication, fetchallNotification);
userRouter.route("/addNotification").post(Authentication, addNotification);
userRouter.route("/deleteNotification/:_id").delete(Authentication, deleteNotification);
userRouter.route("/updateNotification/:_id").put(Authentication, updateNotification);
 
userRouter.route("/pnotification").get(fetchallNotificationPublic ); 


module.exports = userRouter;