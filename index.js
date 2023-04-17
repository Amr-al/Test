const express = require('express')
const app = express()
const cors = require('cors')
const mongoose = require("mongoose");

app.use(express.json());
app.use(cors())

mongoose.connect("mongodb://0.0.0.0:27017/Test", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
const authRoutes = require('./routes/authRoutes')
const postRoutes = require('./routes/postRoutes')
const chatRoutes = require('./routes/chatRoutes')

app.use('/auth', authRoutes)
app.use('/post',postRoutes)
app.use('/chat',chatRoutes)
app.listen(5000, console.log('server is running on port 5000'))
