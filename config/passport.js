const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;
const mongoose = require('mongoose');
const User = require("../models/User");
const keys = require('../config/keys');

const opts = {};
opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
opts.secretOrKey = keys.secretOrKey;
//////////////////////////////////passport strategy using/////////////////////////////////////////
/////////////////////////////////////////////////////////////////
// const customField = {
//   usernameField: uname,
//   passwordField: pwd,
// };

// const verifyCallback = (username, password, done) => {
//   User.findOne({ username: username }).then((user) => {
//     if (!user) {
//       return done(null, false);
//     }
//     const isValid = validPassword(password, user.hash, sallt);
//     if (isValid) {
//       return done(null, user);
//     } else {
//       done(null, false);
//     }
//   });
// };

// const strategy = new LocalStrategy(customField,verifyCallback);

// passport.use(strategy);
/////////////////////////////////////////END/////////////////////////////////////////////
module.exports = passport => {
  passport.use(
    new JwtStrategy(opts, (jwt_payload, done) => {
      User.findById(jwt_payload.id)
        .then(user => {
          if (user) {
            return done(null, user);
          }
          return done(null, false);
        })
        .catch(err => console.log(err));
    })
  );
};
