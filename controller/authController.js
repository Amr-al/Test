const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const User = require("../models/userModel");
const Joi = require("joi");

const signUp = async (req, res) => {
  const name = req.body.name;
  const email = req.body.email;
  const password = req.body.password;
  const schema = Joi.object({
    name: Joi.string().required().max(50),
    email: Joi.string().email({
      minDomainSegments: 2,
      tlds: { allow: ["com", "net"] },
    }).required(),
    password: Joi.string().min(3).max(20).required(),
    password2:Joi.ref('password')
  });
  const error = schema.validate(req.body)
  console.log(error.error);
  if (error.error) {
    res.status(400).json(error);
    return;
  }
 
  let data = await User.find({ email: email });
  if (data.length) {
    res.status(401).json("user already exist");
    return;
  }
  if (req.body.password !== req.body.password2) {
    res.status(400).json("Passwords must be equal");
    return;
  }
  bcrypt.hash(req.body.password, 10).then(async (hashed) => {
    try {
      let user = await User.create({
        name: name,
        email: email,
        password: hashed,
      });
    } catch {
      return res.status(400).json("Please enter all required fields");
    }
    res.status(200).json("signup sucessfully");
  });
};

const sendRequest = async (req, res) => {
  const friendData = await User.findById(req.body.id);
  const myData = await User.findById(req.user._id);
  if (!friendData || !myData || req.id == req.user._id)
    return res.status(400).json("Invalid user");
  let sendTome = false,
    iSentToHim = false,
    alreadyFriend = false;
  myData.recievedRequests.map((item) => {
    if (item._id == req.body.id) sendTome = true;
  });
  myData.sentRequests.map((item) => {
    if (item._id == req.body.id) iSentToHim = true;
  });
  myData.connections.map((item) => {
    if (item._id == req.body.id) alreadyFriend = true;
  });
  if (sendTome)
    return res
      .status(400)
      .json("User has already sent connection request to you");
  if (iSentToHim)
    return res.status(400).json("Connection request is already sent");
  if (alreadyFriend)
    return res.status(400).json("User is already connected with you");
  myData.sentRequests.push(friendData._id);
  friendData.recievedRequests.push(myData._id);
  await myData.save();
  await friendData.save();
  res.status(200).json(myData);
};

const acceptRequest = async (req, res) => {
  console.log(req.body.id, req.user._id);
  const friendData = await User.findById(req.body.id);
  const myData = await User.findById(req.user._id);
  if (!friendData || !myData || req.id == req.user._id)
    return res.status(400).json("Invalid user");
  let sendTome = false;
  myData.recievedRequests.map((item) => {
    if (item._id == req.body.id) sendTome = true;
  });
  if (!sendTome) {
    return res.status(400).json("you don't recieve request");
  }
  let result = await User.findByIdAndUpdate(req.body.id, {
    $pull: { sentRequests: req.user._id },
    $push: { connections: req.user._id },
  });
  await User.findByIdAndUpdate(req.user._id, {
    $pull: { recievedRequests: req.body.id },
    $push: { connections: req.body.id },
  });

  res.status(200).json(result);
};

const cancelRequest = async (req, res) => {
  const friendData = await User.findById(req.body.id);
  const myData = await User.findById(req.user._id);
  if (!friendData || !myData || req.id == req.user._id)
    return res.status(400).json("Invalid user");
  let sent = false;
  myData.sentRequests.map((item) => {
    if (item._id == req.body.id) sent = true;
  });
  if (!sent)
    return res
      .status(400)
      .json("You have not sent connection request to cancel");

  let result = await User.findByIdAndUpdate(req.user._id, {
    $pull: { sentRequests: req.body.id },
  });
  await User.findByIdAndUpdate(req.body.id, {
    $pull: { recievedRequests: req.user._id },
  });

  res.status(200).json(result);
};

const signIn = async (req, res) => {
  const data = await User.findOne({ email: req.body.email });
  if (!data) {
    return res.status(203).json("Email is not exist");
  }
  bcrypt.compare(req.body.password, data.password).then((same) => {
    if (!same) {
      return res.status(400).json("Password is not correct");
    }
    const token = jwt.sign(data.toJSON(), "HS256", {
      expiresIn: "24h",
    });
    res.status(200).json({ token: token });
  });
};

const unFriend = async (req, res) => {
  const friendData = await User.findById(req.body.id);
  const myData = await User.findById(req.user._id);
  if (!friendData || !myData || req.id == req.user._id)
    return res.status(400).json("Invalid user");

  let tmm = false;
  myData.connections.map((item) => {
    if (item._id == req.body.id) tmm = true;
  });
  if (!tmm) res.status(400).json("You have not this connection");
  let result = await User.findByIdAndUpdate(req.user._id, {
    $pull: { connections: req.body.id },
  });
  await User.findByIdAndUpdate(req.body.id, {
    $pull: { connections: req.user._id },
  });

  res.status(200).json(result);
};

const getFriends = async (req, res) => {
  let temp = await User.find({});
  let result = [];
  temp.map((item) => {
    if (item._id != req.user._id) result.push(item);
  });
  res.json(result);
};

const search = async (req,res) =>{
  const users  = await User.find({})
  let result = []
  users.forEach(user => {
    if(user.name.includes(req.query['name']) )
      result.push(user)
  });
  res.json(result)
}
module.exports = {
  signUp,
  signIn,
  sendRequest,
  acceptRequest,
  cancelRequest,
  unFriend,
  getFriends,
  search
};
