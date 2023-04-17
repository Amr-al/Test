const Chat = require("../models/chatModel");
const User = require("../models/userModel");

exports.createChat = async (req, res) => {
  if (!req.user._id) return res.status(401).json("un authorized");
  let users = [req.user._id, req.body.id];
  try {
    const createdChat = await Chat.create({
      chatName: "new Chat",
      users: users,
    });
    const FullChat = await Chat.findOne({ _id: createdChat._id }).populate(
      "users",
      "-password"
    );
    res.status(200).json(FullChat);
  } catch (error) {
    res.status(400).json(error);
  }
};

exports.allChats = async (req, res) => {
  if (!req.user._id) return res.status(401).json("un authorized");
  let id = req.user._id;
  let chat = await Chat.find({
    users: { $elemMatch: { $eq: id } },
  }).populate("latestMessage");
  res.status(200).json(chat);
};

exports.getChat = async (req, res) => {
    if (!req.user._id) return res.status(401).json("un authorized");
    let chat = await Chat.findById(req.body.id)
      .populate("latestMessage");
    if (chat && chat.users.includes(req.user._id)) {
      res.status(200).json(chat);
    } else {
      res.status(400).json("no such chat");
    }
  };
  

