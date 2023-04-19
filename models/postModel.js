const mongoose = require("mongoose");
const commentSchema =new mongoose.Schema({
  content : String,
  writer:{ type: mongoose.Schema.Types.ObjectId, ref: "user" },
}) 
const postSchema = new mongoose.Schema({
  writer: { type: mongoose.Schema.Types.ObjectId, ref: "user" },
  content: String,
  image: String,
  video: String,
  love: {type:Number, default:0},
  comments: [
    {  type: mongoose.Schema.Types.ObjectId, ref: "comment" },
  ],
});
const Post = mongoose.model("post", postSchema)
const Comment = mongoose.model("comment", commentSchema)
module.exports = {Post , Comment}