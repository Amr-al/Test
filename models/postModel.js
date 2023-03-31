const mongoose = require("mongoose");
const postSchema = new mongoose.Schema({
  writer: { type: mongoose.Schema.Types.ObjectId, ref: "user" },
  content: String,
  image: String,
  video: String,
});
const Post = mongoose.model("post", postSchema)
module.exports = {Post}
