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
/////////////testing routes///////////////////////
router.get("/test", (req, res) => res.json({ msg: "Profile Works" }));

//////////creating the user profile//////////////

router.post(
    "/",
    passport.authenticate("jwt", { session: false }),
    async(req, res) => {
        console.log(req.user);
        const { error } = profilevalidation(req);
        const profileFields = {};

        profileFields.user = req.user.id; // note this user is attached to req , u know it is insdie of jwt token

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
            const profile = await Profile.findOneAndUpdate({ user: req.user.id }, { $set: profileFields }, { new: true });

            res.json(profile);
        } else {
            // create


            //check if handle exist

            const profile = await Profile.findOne({ handle: profileFields.handle })
            if (profile) {
                res.status(400).send("Handle already exists")
            }

            const profile_obj = new Profile(profileFields);

            try {
                const savedProfile = await profile_obj.save();
                res.send(savedProfile);

            } catch (err) {
                res.send("got err" + err)

            }
        }
    }
);

///////////getting the user profile/////////////
router.get(
    "/",
    passport.authenticate("jwt", { session: false }),
    async(req, res) => {
        const profile = await (Profile.findOne({ user: req.user.id })).populate('user', ['name', 'avatar']);
        console.log(profile);
        console.log(".............................................................................................");
        // const selprop=  await profile.populate('users',['name','avatar']);
        // console.log(selprop);
        if (!profile) {
            res.status(400).json({ error: "profile is not found" });
        }

        res.send(profile);
    }
);

module.exports = router;