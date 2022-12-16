const User = require("../../model/user");
// const { validationResult } = require("express-validator");
const bcrypt = require("bcryptjs");
var jwt = require("jsonwebtoken");
var JWT_SECRET = "Harryisagoodb&oy";

const signup = async (req, res) =>{
  try {
    // check whether the user with this email exits already
    let user = await User.findOne({ email: req.body.email });
    console.log(user);
    if (user) {
      return res
        .status(400)
        .json({ error: "Sorry a user with this email already exists" });
    }
    const salt = await bcrypt.genSalt(10);
    const secPass = await bcrypt.hash(req.body.password, salt);
    // Create a new user
    user = await User.create({
      name: req.body.name,
      password: secPass,
      email: req.body.email,
    });
    const data = {
      user: {
        id: user.id,
      },
    };
    const authtoken = jwt.sign(data, JWT_SECRET);
    // console.log(authtoken)
    // res.json(user)
    res.json(authtoken);
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Some Internal server Error occured");
  }
}

const login = async (req, res) => {
  let success = false;
    // const errors = validationResult(req); 
    //     if (!errors.isEmpty()) {
    //       return res.status(400).json({ errors: errors.array() }); 
    //     }
        const { email, password } = req.body;
        try {
          let user = await User.findOne({ email });
          if (!user) {
            success = false;
            return res.status(400).json({ 
                error: "Please try to log in with correct credentials" });
          }
          const passwordCompare = await bcrypt.compare(password, user.password); // comparing password already present in the database and the password user entered....it returns true or false
          if (!passwordCompare) {
            success = false;
            return res
              .status(400)
              .json({ success, error: "Please try to log in with correct credential" });
          }
          const data = {
            // if the password is true we are passing this data
            user: {
              id: user.id,
            },
          };
          const authtoken = jwt.sign(data, JWT_SECRET);
          success = true;
          res.json({success, authtoken});
        } catch (error) {
          console.error(error.message);
          res.status(500).send("Some Internal server Error occured");
        }
}

const getUser = async (req, res) => {
    try {
        const user = await User.findOne().select("-password");
        res.send(user)
    } catch (error) {
      console.error(error.message);
      res.status(500).send("Some Internal server Error occured");
    }
}

exports.getUser = getUser;
exports.login = login;
exports.signup = signup;
