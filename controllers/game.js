const Game = require('../models/Game')
const User = require('../models/User')
const { requireToken } = require('../middleware/auth')
const express = require('express')
const Message = require('../models/Message')
const router = express.Router()

// Route to get all games
router.get('/all', (req, res) => {
    Game.find({}, { _id: 1, name: 1, gm: 1 }).then(gamesData => {
        console.log('Showing games..')
        console.log(games)
        res.send(gamesData)
    })
})

// Route to get one game
router.get('/view/:id', requireToken, (req, res) => {
    console.log('Specific game route hit')
    Game.findById(req.params.id).populate('messages').populate('users')
    .then(game => {
        console.log('Showing game ' + req.params.id)

        if (game.messages.length > 30) {
            game.messages = game.messages.slice(game.messages.length-30)
        }
        
        res.send(game)
    })
})

// Route to get one game's chat historys
router.get('/history/:id', requireToken, (req, res) => {
    console.log('Specific game history route hit')
    Game.findById(req.params.id).populate('messages').populate('users')
    .then(game => {
        console.log('Showing game ' + req.params.id)
        res.send(game)
    })
})

// Route to create new game
router.post('/new', requireToken, (req, res) => {

    console.log('Hit new game route')
    console.log(req.body)

    // Standardize tags and split into array
    let tags = req.body.tags.split(',')
    tags = tags.map(tag => {
        if (tag && tag.trim() != '') {
            return tag.trim().toLowerCase()
        }
    })

    // Standardize emails and split into array
    let userEmails = req.body.users.replace(/\s+/g, '').toLowerCase()
    userEmails = userEmails.split(',')
    // Include current user's email in the database call, so that they are included in
    // all following operations
    userEmails.push(req.body.currentUser.email)

    // Find users by email
    User.find({
        email: {$in: userEmails}
    }).then(foundUsers => {

        let userIds = foundUsers.map(user => {
            if (user) {
                return user._id
            }
        })

        // Populate game object
        Game.create({
            title: req.body.title,
            desc: req.body.desc,
            tags: tags,
            users: userIds,
            gm: req.body.currentUser._id
        }).then(newGame => {

            // If game is successfully created, add its ID to all users
            User.updateMany({email: {$in: userEmails}}, {
                $push: { games: newGame._id }
            }).then(() => {
                res.status(201).json({newGame})
            })
        }).catch(err => {
            console.log('Done fucked ' + err)
            res.send(err)
        })
    })
})

router.put('/addUser/:id', (req, res) => {
    console.log('Adding user to game...')
    console.log(req.params.id)

    const user = req.body.user

    Game.findByIdAndUpdate(req.params.id, {
        $push: { users: user._id }
    }).then(() => {
        User.findByIdAndUpdate(user._id, {
            $push: { games: req.params.id }
        }).then(() => {
            console.log('User added!')
            res.status(200).send('User added!')
        })
    })
})

// Route to delete game
router.delete('/delete/:id', requireToken, (req, res) => {
    console.log('Delete route for game')
    Game.findById(req.params.id).populate('users')
    .then(foundGame => {
        User.update(
            { games: foundGame._id },
            { $pull: { 
                games: foundGame._id,  
                characters: { $in: foundGame.characters },
                messages: { $in: foundGame.messages }
            }},
            { multi: true }
        ).then(() => {
            Message.deleteMany({ gameId: foundGame._id })
            .then(() => {
                Game.findByIdAndDelete(foundGame._id)
                .then(() => {
                    console.log('Successfully deleted game')
                })
            })
        })
    })
})
    // Find by ID
    // Delete

module.exports = router