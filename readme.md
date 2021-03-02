- npm i socket.io

- create index.js, index.html

- const http = require('http').Server(app)
- const io = require('socket.io')(http)

- `io.on('connection', socket => {`
    `console.log('Socket connected')`
    `}` 

- Create client-side script in html

- `let socket = io()`

- `socket.on('trigger event', (func params) => { function })`