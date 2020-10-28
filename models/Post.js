const mongoose = require("mongoose");
const { Stream } = require("stream");
const Schema = mongoose.Schema;

//create schema

const PostSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: "myusers",
  },
  text: {
    type: String,
    required: true,
  },
  name: {
    type: String,
  },
  avatar: {
    type: String,
  },
  likes: [
    {
      user: {
        type: Schema.Types.ObjectId,
        ref: "myusers",
      },
    },
  ],
  comments: [
    {
      user: {
        type: Schema.Types.ObjectId,
        ref: "myusers",
      },
      text: {
        type: String,
        required: true,
      },
      name: {
        type: String,
      },
      avatar:{
          type:String
      },
      date:{
          type:Date,
          default:Date.now
      }
    },
  ],
});

module.exports=Post=mongoose.model('myPost',PostSchema);
