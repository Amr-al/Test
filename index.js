const express = require('express')
const app = express()
const cors = require('cors')
const mongoose = require("mongoose");

app.use(express.json());
app.use(cors())

mongoose.connect("mongodb+srv://social:rFqI6RtGGXx5On6x@cluster0.7bm6sj4.mongodb.net/test", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
const authRoutes = require('./routes/authRoutes')
const postRoutes = require('./routes/postRoutes')
const chatRoutes = require('./routes/chatRoutes')
const messageRoutes = require('./routes/messageRoutes')

app.use('/auth', authRoutes)
app.use('/post',postRoutes)
app.use('/chat',chatRoutes)
app.use('/message',messageRoutes)
app.listen(5000, console.log('server is running on port 5000'))
