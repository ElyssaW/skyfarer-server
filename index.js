const express = require('express')
const Message = require('./models/Message')
const Game = require('./models/Game')
const User = require('./models/User')
let app = express()

const http = require('http').Server(app)
const io = require('socket.io')(http, {
    cors: {
      origin: "http://localhost:3000",
      methods: ["GET", "POST"]
    }
  })

require('dotenv').config
const cors = require('cors')

app.use(express.json())

app.use(cors())

app.use(express.urlencoded({extended: false}))

app.get('/', (req, res) => {
  res.send('Hello')
})

app.use('/auth', require('./controllers/auth.js'))
app.use('/character', require('./controllers/character.js'))
app.use('/game', require('./controllers/game.js'))

// console.log('io')
// io.on('connection', (socket) => {
//     console.log('Socket connected ---------- ')
//     console.log(socket.handshake)
//     socket.on('chat message', (msg, id) => {
//         console.log('Message received')
//         console.log(msg)
//         console.log(id)
//         io.emit('chat message', msg, id)
//     })
// })

let users = {}
io.on("connection", (socket) => {
  console.log("New client connected")

  console.log('Game id')
  console.log(socket.handshake.query.gameId)
  const gameId = socket.handshake.query.gameId
  const userId = socket.handshake.headers.userid
  users[socket.handshake.headers.userid] = socket.id

  socket.join(gameId)

  socket.on('newChatMessage', (msg) => {
    console.log('Message sent')
    console.log(msg)

    Message.create({
      body: msg.body,
      userId: userId,
      gameId: gameId
    }).then(newMsg => {
      Game.findByIdAndUpdate(gameId, {
        $push: { messages: newMsg._id }
      }).then(() => {
        User.findByIdAndUpdate(userId, {
          $push: { messages: newMsg._id }
        }).then(() => {
          io.in(gameId).emit('newChatMessage', msg)
        })
      })
    }).catch(err => {
      console.log(err)
    })
  }) 

  console.log('Users: ')
  console.log(users)
  socket.on("disconnect", () => {
    console.log("Client disconnected")
    socket.leave(gameId)
    delete users[socket.handshake.headers.userid]
  })
})

http.listen(8000, () => {
    console.log('Hello from Port 8000')
})