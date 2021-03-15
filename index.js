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
let playerCharacters = {}
io.on("connection", (socket) => {
  console.log("New client connected")

  const gameId = socket.handshake.query.gameId
  const userId = socket.handshake.headers.userid
  const username = socket.handshake.headers.username
  users[socket.handshake.headers.userid] = {
    socketId: socket.id,
    username: username,
    userId: userId,
    gameId: gameId,
    playingAs: null
  }

  socket.join(gameId)

  socket.on('updateGameState', (gameState) => {
    console.log('Updating game state...')
    console.log(gameState)
    
    io.in(gameId).emit('updateGameState', gameState)
  })

  socket.on('setNewPlayingAs', (playingAs, user) => {
    users[user._id].playingAs = playingAs._id
    io.in(gameId).emit('updateUsers', users)

    playerCharacters[playingAs._id] = playingAs
    io.in(gameId).emit('updatePlayerCharacters', playerCharacters)
  })

  socket.on('updateSingleCharacter', (characterUpdate) => {
    console.log('Updating character...')
    console.log(characterUpdate)

    console.log(characterUpdate._id)
    Character.findByIdAndUpdate(characterUpdate._id, characterUpdate).then(() => {
      io.in(gameId).emit('updateSingleCharacter', characterUpdate)
    })
  })

  socket.on('updateMessage', (messageUpdate) => {
    console.log('Updating message...')
    console.log(messageUpdate)

    Message.findByIdAndUpdate(messageUpdate._id, messageUpdate).then(() => {
      Message.find({ gameId: messageUpdate.gameId }).then((updatedMessages) => {
        io.in(gameId).emit('updateMessages', updatedMessages)
      })
    })
  })

  socket.on('newChatMessage', (msg) => {
    console.log('Message sent')
    console.log(msg)

    let character = msg.character

    console.log("Showing character before update")
    console.log(character)

    let hasSecond = msg.rolls && msg.rolls.includes('x2') ? true : false
    let plus = msg.plus
    let minus = msg.minus

    let rolls = msg.rolls ? msg.rolls.map(command => {
      if (command != '!gm' && command != '!ooc' &&
          command != 'x2' && command != '-trait' &&
          command != '+trait'
      ) {

        let stat = command.replace(/!/g, '')
        let bonus
        let roll
        let secondRoll

        if (
          stat.includes('veil') || stat.includes('mirror') ||
          stat.includes('heart') || stat.includes('iron')
        ) {

          roll = Math.floor(Math.random() * (10 - 1) + 1)
          if (msg.rolls.includes('x2')) {
            hasSecond = true
            secondRoll = Math.floor(Math.random() * (10 - 1) + 1)
            roll = roll >= secondRoll ? roll : secondRoll
          }

          if (stat.includes('veil')) {
            bonus = character.veils
          } else if (stat.includes('mirror')) {
            bonus = character.mirrors
          } else if (stat.includes('heart')) {
            bonus = character.hearts
          } else if (stat.includes('iron')) {
            bonus = character.irons
          }

          bonus += plus
          bonus -= minus

          if (character.peril > roll + bonus + plus - minus) {
            character.inDanger = true
          }
        }
  
        if (stat.includes('peril') || stat.includes('tenacity')) {
          if (stat.includes('peril3') || stat.includes('tenacity3')) {
            roll = Math.floor(Math.random() * (3 - 1) + 1)
          } else if (stat.includes('peril6') || stat.includes('tenacity6')) {
            roll = Math.floor(Math.random() * (6 - 1) + 1)
          } else {
            roll = 1
          }
  
          if (stat.includes('peril')) {
            character.peril = character.peril + roll
          } else if (stat.includes('tenacity')) {
            character.tenacity = character.tenacity + roll < character.tenacityMax ? character.tenacity + roll : character.tenacityMax
          }

          stat = stat.replace(/!|1|3|6/g, '')
        }
  
        return {
          roll: roll,
          bonus: bonus || bonus === 0 ? bonus : null,
          stat: stat,
          hasSecond: hasSecond,
          secondRoll: secondRoll,
          plus: plus,
          minus: minus
        }
      }
    }) : null

    console.log("Showing character after update")
    console.log(character)

    Message.create({
      body: msg.body,
      rolls: rolls,
      gmOnly: msg.rolls && msg.rolls.includes('!gm') ? true : false,
      ooc: msg.rolls && msg.rolls.includes('!ooc') ? true : false,
      characterId: character ? character._id : null,
      characterName: character ? character.name : null,
      userId: userId.trim(),
      username: username,
      gameId: gameId.trim()
    }).then(newMsg => {

      character.messages.push(newMsg._id)
      Character.findByIdAndUpdate(character._id, character)

      .then(() => {

        User.findByIdAndUpdate(userId, {
          $push: { messages: newMsg._id }

        }).then(() => {

          Game.findByIdAndUpdate(gameId, {
            $push: { messages: newMsg._id }

          }).then(() => {
            console.log('Showing before socket emit')
            console.log(newMsg)
            console.log(character)

            io.in(gameId).emit('newChatMessage', newMsg, character)
          })
        })
      })
    }).catch(err => {
      console.log(err)
    })
  }) 

  // Route to edit message
  app.put('/message/edit/:id', requireToken, (req, res) => {
    console.log('Editing message')
    console.log(req.body)
    let editedMsg = req.body

    Message.findByIdAndUpdate(req.params.id, editedMsg)
    .then(updatedMsg => {
      Message.find({ gameId: updatedMsg.gameId })
      .then(updatedMessages => {
        io.in(gameId).emit('updateMessages', updatedMessages)
        res.status(200).json({ updatedMessages })
      })
    })
  })

  // Route to delete message
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

      Game.findByIdAndUpdate(foundMessage.gameId, {
          '$pull': { messages: foundMessage._id }
      }).then(() => {
        User.findByIdAndUpdate(foundMessage.userId, {
          '$pull': { messages: foundMessage._id }
        }).then(() => {
          Message.findByIdAndDelete(foundMessage._id)
          .then(() => {
            Message.find({ gameId: foundMessage.gameId})
            .then(updatedMessages => {
              io.in(gameId).emit('updateMessages', updatedMessages)
              res.status(200).json('Deleted successfully')
            })
          })
        })
      })
    })
  })

  io.in(gameId).emit('userConnected', users)

  socket.on("disconnect", () => {
    console.log("Client disconnected")
    socket.leave(gameId)
    delete users[userId]

    io.in(gameId).emit('userDisconnected', users)
  })
})

http.listen(8000, () => {
    console.log('Hello from Port 8000')
})