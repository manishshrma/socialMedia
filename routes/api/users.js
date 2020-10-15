const express = require('express');
const route = express.Router();
const gravatar = require('gravatar');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const keys = require('../../config/keys');
// const { secretOrKey } = require("../../config/keys");  // can use destructuring ot get secret kkey directly

const passport = require('passport');

// Load Input Validation
// const validateRegisterInput = require('../../validation/register');
// const validateLoginInput = require('../../validation/login');


const User = require("../../models/User"); // .-current folder  ../ out from current folder   ../../ out from next current folder

route.get("/test", (req, res) => {
  res.json({ msg: "Users works!" });
});

route.post("/register", async (req, res) => {
  const emailExist = await User.findOne({ email: req.body.email });
  if (emailExist) {
    return res.status(400).send("Email already exists");
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
    res.send(savedUser);
  } catch (err) {
    res.send("Got err" + err);
  }
});
////////////////login the user///////////////////////////////////

route.post("/login", async (req, res) => {
  const user = await User.findOne({ email: req.body.email });
  if (!user) {
    res.send("Email not found.");
  }
  const validpass = await bcrypt.compare(req.body.password, user.password);
  if (!validpass) {
    res.send("Password doesn't match");
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
  '/current',
  passport.authenticate('jwt', { session: false }),
  (req, res) => {
    res.json({
      id: req.user.id,
      name: req.user.name,
      email: req.user.email
    });
  }
);

module.exports = route;
