const express = require('express')
let app = express()

const http = require('http').Server(app)
const io = require('socket.io')(http)

app.get('/', (req, res) => {
    res.render('demo.ejs')
})

io.on('connection', (socket) => {
    console.log('Socket connected')
    console.log(socket.handshake)
    socket.on('chat message', (msg, id) => {
        console.log('Message received')
        console.log(msg)
        console.log(id)
        io.emit('chat message', msg, id)
    })
})

http.listen(3000, () => {
    console.log('Hello from Port 3000')
})