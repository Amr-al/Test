const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  password: { type: String, required: true },
  pic : String,
 connections: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "user",
    },
  ],
  sentRequests: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "user",
    },
  ],
  recievedRequests: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "user",
    },
  ]
});
module.exports = mongoose.model("user", userSchema);
