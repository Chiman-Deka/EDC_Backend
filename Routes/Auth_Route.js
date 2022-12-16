const express = require("express");
const Authentication = require('../Middlewares/Authentication');
const {login, getUser, signup} = require("../controller/Admin/User");
const userRouter = express.Router();
exports.userRouter = userRouter;


// ----------------------------------- ADMIN ----------------------------------------------------------
userRouter.route("/signup").post( signup); 
userRouter.route("/login").post( login); 
userRouter.route("/getUser").get(getUser);


module.exports = userRouter;