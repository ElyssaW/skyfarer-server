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

let interval;
io.on("connection", (socket) => {
  console.log("New client connected");
  if (interval) {
    clearInterval(interval);
  }
  interval = setInterval(() => getApiAndEmit(socket), 1000);
  socket.on("disconnect", () => {
    console.log("Client disconnected");
    clearInterval(interval);
  });
});

const getApiAndEmit = socket => {
  const response = new Date();
  // Emitting a new message. Will be consumed by the client
  socket.emit("FromAPI", response);
};

http.listen(8000, () => {
    console.log('Hello from Port 8000')
})