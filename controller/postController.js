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

  module.exports = {createPost}