const express = require('express')
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
  users[socket.handshake.headers.userid] = socket.id

  socket.on('newChatMessage', (msg) => {
    console.log('Message sent')
    console.log(msg)
    io.emit('newChatMessage', msg)
  }) 

  console.log('Users: ')
  console.log(users)
  socket.on("disconnect", () => {
    console.log("Client disconnected")
  })
})

http.listen(8000, () => {
    console.log('Hello from Port 8000')
})