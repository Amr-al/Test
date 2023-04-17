const { Post } = require("../models/postModel");

const createPost = async (req, res) => {
    let type = "",
      content = "test";
    if (req.file) {
      for (let i = 0; i < req.file.filename.length; ++i) {
        if (req.file.filename[i] >= "0" && req.file.filename[i] <= "9") continue;
        if (req.file.filename[i] == ".") continue;
        type += req.file.filename[i];
      }
    }
    let image = "",
      video = "";
    if (type == "jpg" || type == "png" || type == "JPEG" || type == "GIF")
      image = req.file.filename;
    else if (type == "mp4") video = req.file.filename;
    else if (type != "") {
      return res.status(400).json("this type is not supported");
    }
    await Post.create({
      writer: req.body.id,
      content: content,
      image: image,
      video: video,
    });
    res.json("uploaded sucesfully");
  };
const getPost = async (req, res) => {
    if (!req.user._id) return res.status(401).json("user is not authorized");
    let temp = [req.user._id];
    let users = await User.findById(req.user._id);
    users.connections.map((item) => {
      temp.push(item._id);
    });
    let answer = [];
    let posts = await Post.find({})
      .populate("writer", "-password")
      .populate("comments");
    posts.map((item) => {
      if (temp.includes(item.writer._id)) answer.push(item);
    });
    res.json(answer);
};
const addComment = async (req, res) => {
    if (!req.user._id) return res.status(401).json("user is not authorized");
    let comment = await Comment.create({
        content: req.body.content,
        writer: req.user._id,
    });
    await Post.findOneAndUpdate(
        { id: req.body.id },
        { $push: { comments: comment._id } }
    );
    res.status(200).json("comment added");
};
module.exports = { createPost, getPost, addComment }
