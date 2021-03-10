const express = require('express')
const { requireToken } = require('./middleware/auth')
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
const Character = require('./models/Character')

app.use(express.json())

app.use(cors())

app.use(express.urlencoded({extended: false}))

app.get('/', (req, res) => {
  res.send('Hello')
})

app.use('/auth', require('./controllers/auth.js'))
app.use('/character', require('./controllers/character.js'))
app.use('/game', require('./controllers/game.js'))

let users = {}
io.on("connection", (socket) => {
  console.log("New client connected")

  const gameId = socket.handshake.query.gameId
  const userId = socket.handshake.headers.userid
  const username = socket.handshake.headers.username
  users[socket.handshake.headers.userid] = socket.id

  socket.join(gameId)

  socket.on('newChatMessage', (msg) => {
    console.log('Message sent')
    console.log(msg)

    let rolls = msg.rolls ? msg.rolls.map(command => {
      return {
        roll: Math.random() * (10 - 1) + 1,
        type: command,
        secondRoll: false,
        plus: null,
        minus: null
      }
    }) : null

    Message.create({
      body: msg.body,
      rolls: rolls,
      gmOnly: msg.commands && msg.commands.includes('!gm') ? true : false,
      ooc: msg.commands && msg.commands.includes('!ooc') ? true : false,
      characterId: null,
      characterName: null,
      userId: userId,
      username: username,
      gameId: gameId
    }).then(newMsg => {
      Game.findByIdAndUpdate(gameId, {
        $push: { messages: newMsg._id }
      }).then(() => {
        User.findByIdAndUpdate(userId, {
          $push: { messages: newMsg._id }
        }).then(() => {

          io.in(gameId).emit('newChatMessage', newMsg)

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

// Route to delete character
app.delete('/message/delete/:id', requireToken, (req, res) => {
  console.log('Deleting message')
  console.log(req.params.id)
  Message.findById(req.params.id)
  .then(foundMessage => {

      if (foundMessage.characterId) {
        Character.findByIdAndUpdate(foundMessage.characterId, {
          '$pull': { messages: foundMessage._id }
        })
      }

      User.findByIdAndUpdate(foundMessage.userId, {
          '$pull': { messages: foundMessage._id }
      }).then(() => {

          Message.findByIdAndDelete(foundMessage._id)
          .then(() => {
              res.status(200).json('Deleted successfully')
          })
      })
  })
})

http.listen(8000, () => {
    console.log('Hello from Port 8000')
})