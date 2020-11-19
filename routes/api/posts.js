const express = require("express");
const passport = require("passport");
const router = express.Router();
const Post = require("../../models/Post");
const Profile = require("../../models/Profile");
const postvalidation=require("../../validations/post_val");

// @route   GET api/posts/test
// @desc    Tests post route
// @access  Public
router.get("/test", (req, res) => res.json({ msg: "Posts Works" }));
///////////////create post//////////////
router.post(
  "/",
  passport.authenticate("jwt", { session: false }),
  async (req, res) => {
              
    const { errors, isValid } = postvalidation(req.body);

    // Check Validation
    if (!isValid) {
      console.log("hellllllllllllllllooooooooooooo");

      // If any errors, send 400 with errors object
      return res.status(400).json(errors);
    }

    const newPost = new Post({
      text: req.body.text,
      name: req.body.name,
      avatar: req.body.avatar,
      user: req.user.id,
    });

    console.log("in the create post method");
    try {
      const savedpost = await newPost.save();

      console.log(savedpost);
      res.status(200).json(savedpost);
    } catch (err) {
      res.send("got err" + err);
    }
  }
);

///////////get post/////////////////////
//problem:  unable to sort on basis of date
router.get("/", (req, res) => {
  Post.find()
    .sort({
      date: -1,
    })
    .then((post) => {
      res.send(post);
    })
    .catch((err) => {
      res.send("No post found!");
    });
});
//////////////////get post by id//////////////

router.get("/:id", (req, res) => {
  Post.findById(req.params.id)
    .then((post) => res.status(200).json(post))
    .catch((err) => res.status(404).send("No post with the id"));
});
/////////////////delete the post///////////////////////

router.delete(
  "/:id",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    Profile.findOne({
      user: req.user.id,
    })
      .then((profile) => {
        Post.findById(req.params.id).then((post) => {
          if (post.user.toString() !== req.user.id) {
            // user in the post must be same the person who logged in
            return res.status(401).send("UNauthorised user !!");
          }
          post.remove().then(() => res.send("successfully remove the post"));
        });
      })
      .catch((err) => {
        res.status(400).send("post not found");
      });
  }
);
//////////////////////likes the post////////////////////////////////
router.post(
  "/like/:id",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    Profile.findOne({ user: req.user.id }).then((profile) => {
      Post.findById(req.params.id)
        .then((post) => {
          if (
            post.likes.filter((like) => like.user.toString() === req.user.id)
              .length > 0
          ) {
            return res.status(400).json("User already liked this post");
          }

          // add user  id to array(like array)

          post.likes.unshift({ user: req.user.id });

          post.save().then((post) => res.json(post));
        })
        .catch((err) => res.status(404).json("No post found"));
    });
  }
);

/////////////////////unlike(not dislike) the post////////////////////////////////
router.post(
  "/unlike/:id",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    Profile.findOne({ user: req.user.id }).then((profile) => {
      Post.findById(req.params.id)
        .then((post) => {
          if (
            post.likes.filter((like) => like.user.toString() === req.user.id)
              .length === 0
          ) {
            return res.status(400).json("you haven't yet liked this post");
          }

          const removeIndex = post.likes
            .map((item) => item.user.toString())
            .indexOf(req.user.id); // got ur own like and dislike it

          post.likes.splice(removeIndex, 1);

          post.save().then((post) => res.json(post));
        })
        .catch((err) => res.status(404).json("No post found"));
    });
  }
);

///////////////////add comment to the post///////////////////

router.post(
  "/comment/:id",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    Post.findById(req.params.id).then((post) => {
      const newCommnet = {
        text: req.body.text,
        name: req.body.name,
        avatar: req.body.avatar,
        user: req.user.id,
      };
      /// add comment to comment array
      post.comments.unshift(newCommnet);
      ///save to db
      post
        .save()
        .then((post) => res.json(post))
        .catch((err) => res.status(400).json("No post found to add commnet"));
    });
  }
);

////////////delete the comment from the post

/////prob: here owner deleting the comment not the user who made commnets
router.delete(
  '/comment/:id/:comment_id',
  passport.authenticate('jwt', { session: false }),
  (req, res) => {
    Post.findById(req.params.id)
      .then(post => {
        // Check to see if comment exists
        if (
          post.comments.filter(
            comment => comment._id.toString() === req.params.comment_id
          ).length === 0
        ) {
          return res
            .status(404)
            .json({ commentnotexists: 'Comment does not exist' });
        }

        // Get remove index
        const removeIndex = post.comments
          .map(item => item._id.toString())
          .indexOf(req.params.comment_id);

        // Splice comment out of array
        post.comments.splice(removeIndex, 1);

        post.save().then(post => res.json(post));
      })
      .catch(err => res.status(404).json({ postnotfound: 'No post found' }));
  }
);

module.exports = router;
