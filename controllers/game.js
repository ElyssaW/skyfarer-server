const Game = require('../models/Game')
const express = require('express')
const router = express.Router()

// Route to get all games
router.get('/game/all', (req, res) => {
    Game.find().then(games => {
        console.log('Showing games..')
        console.log(games)
        res.send(games)
    })
})

// Route to search games
    // Find by selectors
    // Send all

// Route to get one game
router.get('/game/:id', (req, res) => {
    Game.findById(req.params.id)
    .then(game => {
        console.log('Showing game ' + req.params.id)
        res.send(game)
    })
})

// Route to create new game
router.post('/game/new', (req, res) => {

})
    // name: String,
    // users:  [{type: mongoose.Schema.Types.ObjectId, ref: 'User'}],
    // characters:  [{type: mongoose.Schema.Types.ObjectId, ref: 'Character'}],
    // tags: [String],
    // gm:  {type: mongoose.Schema.Types.ObjectId, ref: 'User'},
    // ships: [{type: mongoose.Schema.Types.ObjectId, ref: 'Ship'}]

// Route to edit game
router.put('/game/edit/:id', (req, res) => {

})
    // name: String,
    // users:  [{type: mongoose.Schema.Types.ObjectId, ref: 'User'}],
    // characters:  [{type: mongoose.Schema.Types.ObjectId, ref: 'Character'}],
    // tags: [String],
    // gm:  {type: mongoose.Schema.Types.ObjectId, ref: 'User'},
    // ships: [{type: mongoose.Schema.Types.ObjectId, ref: 'Ship'}]

// Route to delete game
router.delete('/game/delete/:id', (req, res) => {
    Game.findByIdAndDelete(req.params.id)
})
    // Find by ID
    // Delete