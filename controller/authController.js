const bcrypt = require("bcryptjs");
const User = require("../models/userModel");

const signUp = async (req, res) => {
  const name = req.body.name;
  const email = req.body.email;
  const password = req.body.password;
  if (!name || !email || !password) {
    res.status(400).json("data is missing");
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

module.exports = {
  signUp,
};
