const Message = require("../models/messageModel");
const Chat = require("../models/chatModel");
exports.allMessages = async (req, res) => {
  if (!req.user._id) return res.status(401).json("not authorized");
  let chatId = req.body.chatId;
  let messages = await Message.find({ chat: chatId }).populate("sender");

  res.json(messages);
};
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

exports.updateLast = async (req, res) => {
  if (!req.user._id) return res.status(401).json("not authorized");
  const { messageId, chatId } = req.body;
  await Chat.findByIdAndUpdate(chatId, { latestMessage: messageId });
  res.json("200");
};