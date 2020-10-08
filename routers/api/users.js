const route = require("express").Router();
const User = require("../../model/user"); // .-current folder  ../ out from current folder   ../../ out from next current folder
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const gravatar = require("gravatar");
const { secretKey } = require("../../config/keys");

///// test the  app/////
route.get("/test", (req, res) => {
  res.json({ msg: "Users works!" });
});

////////register the user/////////////

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
    secretKey,
    { expiresIn: 3600 },
    (err, token) => {
      res.json({ success: true, token: "Bearer" + token });
    }
  );
});

module.exports = route;

// var ex={};
// var x="abc"
// ex={x};
// console.log(ex);
