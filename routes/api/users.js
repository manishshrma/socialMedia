const express = require("express");
const route = express.Router();
const gravatar = require("gravatar");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const keys = require("../../config/keys");
// const { secretOrKey } = require("../../config/keys");  // can use destructuring ot get secret kkey directly

const passport = require("passport");

const registervalidation = require("../../validations/register_vali");
const loginvalidation = require("../../validations/login_val");

// Load Input Validation
// const validateRegisterInput = require('../../validation/register');
// const validateLoginInput = require('../../validation/login');

const User = require("../../models/User"); // .-current folder  ../ out from current folder   ../../ out from next current folder

route.get("/test", (req, res) => {
  res.json({ msg: "Users works!" });
});
////////////////////register/////////////////////////
route.post("/register", async (req, res) => {

  const {errors,isValid} = registervalidation(req.body);

  if (!isValid) {
    // errors.error.details[0].x=errors.error.details[0].context.key;
    // res.status(400).json(errors.error.details[0]);
    res.status(400).json(errors)
  }
  const emailExist = await User.findOne({ email: req.body.email });
  if (emailExist) {
    errors.email="email already exists"

    return res.status(400).json(errors);
  }
  //// now hash the password////////////////// 
  const salt = await bcrypt.genSalt();
  const hashpassword = await bcrypt.hash(req.body.password, salt);
  const avatar = gravatar.url(req.body.email, {
    s: "200",
    r: "pg",
    d: "mm",
  }); 
  const user = new User({
    name: req.body.name,
    email: req.body.email,
    password: hashpassword,
    avatar: avatar,
  });
  try {
    const savedUser = await user.save();
  } catch (err) {
    res.status(400).json(err);
  }
});
////////////////login the user///////////////////////////////////

route.post("/login", async (req, res) => {
  const { isValid, errors } = loginvalidation(req.body);

  console.log("aa...........................");
  if (!isValid) {
   
    res.status(400).json(errors)
  }
  const user = await User.findOne({ email: req.body.email });
  if (!user) {

    errors.email="Email not found!!";
    res.status(400).json(errors);
  }
  const validpass = await bcrypt.compare(req.body.password, user.password);
  if (!validpass) {
    errors.password="password doesn't match!!"
    res.status(400).json(errors);
  }
  const payload = { id: user.id, name: user.name, avatar: user.avatar };
  const token = jwt.sign(
    payload,
    keys.secretOrKey,
    { expiresIn: 604800 },
    (err, token) => {
      console.log(`this is token that goes to client : ${token}`);

      res.json({ success: true, token: "Bearer " + token });
    }
  );
});

route.get(
  "/current",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    res.json({
      id: req.user.id,
      name: req.user.name,
      email: req.user.email,
    });
  }
);

module.exports = route;
