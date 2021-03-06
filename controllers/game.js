const Game = require('../models/Game')
const Character = require('../models/Character')
const User = require('../models/User')
const express = require('express')
const router = express.Router()

// Route to get all games
router.get('/all', (req, res) => {
    Game.find().then(games => {
        console.log('Showing games..')
        console.log(games)
        res.send(games)
    })
})

// Route to get one game
router.get('/game/:id', (req, res) => {
    Game.findById(req.params.id)
    .then(game => {
        console.log('Showing game ' + req.params.id)
        res.send(game)
    })
})

// Route to create new game
router.post('/new', async (req, res) => {

    console.log('Hit new game route')
    console.log(req.body)

    // Standardize tags and split into array
    let tags = req.body.tags.replace(/\s+/g, '').toLowerCase()
    tags = tags.split(',')

    // Standardize emails and split into array
    let userEmails = req.body.users.replace(/\s+/g, '').toLowerCase()
    userEmails = userEmails.split(',')

    // Find users by email, and return ID only
    User.find({
        email: {$in: userEmails}
    }, { _id: 1 }).then(foundUsers => {

        // Populate game object
        Game.create({
            title: req.body.title,
            desc: req.body.desc,
            tags: tags,
            users: foundUsers,
            gm: req.body.currentUser.id
        }).then(newGame => {
            res.send(newGame)
        }).catch(err => {
            console.log('Done fucked ' + err)
            res.send(err)
        })
    })
})

// Route to edit game
router.put('/game/edit/:id', (req, res) => {

    console.log('Hit update game route')
    console.log(req.body)

    // Standardize tags and split into array
    let tags = req.body.tags.replace(/\s+/g, '').toLowerCase()
    tags = tags.split(',')
    
    // Standardize emails and split into array
    let userEmails = req.body.users.replace(/\s+/g, '').toLowerCase()
    userEmails = userEmails.split(',')
    
    // Find users by email, and return ID only
    User.find({
        email: {$in: userEmails}
    }, { _id: 1 }).then(foundUsers => {
        Game.findByIdAndUpdate(req.params.id, {
            title: req.body.title,
            desc: req.body.desc,
            tags: tags,
            users: foundUsers,
            gm: req.body.currentUser.id
        }).then(game => {
            console.log(game)
            res.send(game)
        }).catch(err => {
            console.log(err)
            res.send(err)
        })
    })
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

module.exports = router