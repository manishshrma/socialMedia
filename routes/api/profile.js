const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const passport = require("passport");

// @route   GET api/profile/test
// @desc    Tests profile route
// @access  Public
const User = require("../../models/User");
const Profile = require("../../models/Profile");

const profilevalidation = require("../../validations/profile_val");
const experiencevalidation = require("../../validations/experience_val");
const educationvalidatiom = require("../../validations/education_val");


const { session } = require("passport");
/////////////testing routes///////////////////////
router.get("/test", (req, res) => res.json({ msg: "Profile Works" }));

//////////creating the user profile//////////////

router.post(
  "/",
  passport.authenticate("jwt", { session: false }),
  async (req, res) => {
    console.log("printing 1: user data"); // testing purpose
    console.log(req.user);
    const { errors, isValid } = profilevalidation(req.body);

    if (!isValid) {
      return res.status(400).json(errors);
    }
    const profileFields = {};

    profileFields.user = req.user.id; // note this user is attached to req , u know it is insdie of jwt token

    if (req.body.company) {
      console.log(req.body.company);
    }

    if (req.body.handle) profileFields.handle = req.body.handle;
    if (req.body.company) profileFields.company = req.body.company;
    if (req.body.website) profileFields.website = req.body.website;
    if (req.body.location) profileFields.location = req.body.location;
    if (req.body.status) profileFields.status = req.body.status;
    if (typeof req.body.skills !== "undefined")
      profileFields.skills = req.body.skills.split(",");
    if (req.body.bio) profileFields.bio = req.body.bio;
    if (req.body.githubusername)
      profileFields.githubusername = req.body.githubusername;

    profileFields.social = {};

    if (req.body.youtube) profileFields.social.youtube = req.body.youtube;
    if (req.body.twitter) profileFields.social.twitter = req.body.twitter;
    if (req.body.facebook) profileFields.social.facebook = req.body.facebook;
    if (req.body.instagram) profileFields.social.instagram = req.body.instagram;
    if (req.body.linkedin) profileFields.social.linkedin = req.body.linkedin;

    const profile = await Profile.findOne({ user: req.user.id });

    console.log("my profile is here......");
    console.log(profile);
    ///   Watch Mosh for findandupdate query
    if (profile) {
      // update
      const profile = await Profile.findOneAndUpdate(
        { user: req.user.id },
        { $set: profileFields },
        { new: true }
      );

      res.json(profile);
    } else {
      // create

      //check if handle exist

      const profile = await Profile.findOne({ handle: profileFields.handle });
      if (profile) {
        errors.handle = "Handle already exist";
        res.status(400).send(errors);
      }

      const profile_obj = new Profile(profileFields);
      console.log("printing 2: save profile"); // testing purpose
      // console.log("//////////////////////////////////aaaaa///////////////");

      try {
        const savedProfile = await profile_obj.save();
// console.log("/////////////////////////////////////////////////");
        console.log(savedProfile);
        res.send(savedProfile);
      } catch (errors) {
        res.status(400).send("got err" + errors);
      }
    }
  }
);
//////get all profiles//////////
router.get("/all", (req, res) => {
  Profile.find()
    .populate("user", ["name", "avatar"])
    .then((profile) => {
      if (!profile) {
        res.send("no profile has been created yet");
      } else {
        res.status(200).json(profile);
      }
    })
    .catch((err) => res.send(err));
});

///////////getting the user profile/////////////
/// this code is not working when using asyn await why?
router.get(
  "/",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    const errors = {};
    Profile.findOne({ user: req.user.id })
      .populate("user", ["name", "avatar"])
      .then((profile) => {
        if (!profile) {
          errors.noprofile = "There is no profile for this user";
          return res.status(404).json(errors);
        }
        res.send(profile);
      });
  }
);

//////////get profile through handle(it is public )//////////////
router.get("/handle/:handle", (req, res) => {
  const errors = {};
  Profile.findOne({
    handle: req.params.handle,
  })
    .populate("user", ["name", "avatar"])
    .then((profile) => {
      if (!profile) {
        errors.noprofile = "There is no profile for this user";
        res.status(404).json(errors);
      } else {
        res.status(200).json(profile);
      }
    })
    .catch((err) => res.send(err));
});

//////////get profile through userid(it is public )//////////////

router.get("/user/:user_id", (req, res) => {
  Profile.findOne({
    user: req.params.user_id,
  })
    .populate("user", ["name", "avatar"])
    .then((profile) => {
      if (!profile) {
        res.send("no profile for this user id");
      } else {
        res.status(200).json(profile);
      }
    })
    .catch((err) => res.send(err));
});
////////////add experince to user profile//////////////
router.post(
  "/experience",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    console.log(req.user);
  const {isValid,errors}=experiencevalidation(req.body);

  if(!isValid)
  {
    console.log("insdie");
    res.status(400).json(errors);
  }
    const result = Profile.findOne({
      user: req.user.id,
    })
      .populate("user", ["name", "avatar"])
      .then((profile) => {
        const newExp = {
          title: req.body.title,
          company: req.body.company,
          from: req.body.from,
          to: req.body.to,
          current: req.body.current,
          description: req.body.description,
        };

        console.log(newExp);
        // add to an array
        profile.experience.unshift(newExp);

        profile.save().then((profile) => res.json(profile));
      }).catch((err)=>{

        res.status(400).json(err);
      });
  }
);

///////////add education to user profile//////////////
router.post(
  "/education",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    console.log(req.user);
    const {errors,isValid}=educationvalidatiom(req.body);

    if(!isValid)
    {
      res.status(400).json(errors);
    }

    const result = Profile.findOne({
      user: req.user.id,
    })
      .populate("user", ["name", "avatar"])
      .then((profile) => {
        const newEdu = {
          school: req.body.school,
          degree: req.body.degree,
          fieldofstudy: req.body.fieldofstudy,
          from: req.body.from,
          to: req.body.to,
          description: req.body.description,
        };

        console.log(newEdu);
        // add to an array
        profile.education.unshift(newEdu);

        profile.save().then((profile) => res.json(profile));
      });
  }
);

////////////delete experience//////////////
router.delete(
  "/experience/:exp_id",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    Profile.findOne({ user: req.user.id })
      .then((profile) => {
        const removeindex = profile.experince
          .map((item) => item.id)
          .indexOf(req.params.exp_id);
        /////splice out of array
        profile.experince.splice(removeindex, 1);
        //sAVE
        profile.save().then((profile) => res.json(profile));
      })
      .catch((err) => res.status(404).json(err));
  }
);

////////delete education//////////////////
router.delete(
  "/education/:edu_id",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    Profile.findOne({ user: req.user.id })
      .then((profile) => {
        const removeindex = profile.education
          .map((item) => item.id)
          .indexOf(req.params.edu_id);
        /////splice out of array
        profile.education.splice(removeindex, 1);
        //sAVE
        profile.save().then((profile) => res.json(profile));
      })
      .catch((err) => res.status(404).json(err));
  }
);
///delete user and its profile////////////
router.delete(
  "/",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    Profile.findOneAndRemove({ user: req.user.id }).then(() => {
      User.findOneAndRemove({
        _id: req.user.id,
      }).then(() => res.json("User deleted successfully!"));
    });
  }
);

module.exports = router;
