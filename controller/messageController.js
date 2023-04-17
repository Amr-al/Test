const Message = require("../models/messageModel");

exports.sendMessage = async (req, res) => {
  if (!req.user._id) return res.status(401).json("not authorized");
  const { sender, content, chatId } = req.body;
  let resualt = await Message.create({
    sender: sender,
    content: content,
    chat: chatId,
  });
  res.json(resualt);
};
