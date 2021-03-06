const Character = require('../models/Character')
const express = require('express')
const User = require('../models/User')
const Game = require('../models/Game')
const router = express.Router()

// Route to view character
router.get('/view/:id', (req, res) => {
    console.log('Route hit')
    Character.findById(req.params.id)
    .then(foundChar => {
        console.log(foundChar)
        res.send(foundChar)
    })
})

// Route to view several characters
    // Find characters by id in [array]
    // Send characters

// Route to create character
router.post('/new', (req, res) => {
    console.log('New character route hit')
    console.log(req.body)

    Character.create({
        name: req.body.name,
        traits: req.body.traits,
        profession: req.body.profession,
        irons: req.body.irons,
        hearts: req.body.hearts,
        veils: req.body.veils,
        mirrors: req.body.mirrors,
        integrities: req.body.integrities,
        publicNotes: req.body.publicNotes,
        privateNotes: req.body.privateNotes,
        userId: req.body.userId,
        gameId: [req.body.gameId]
    }).then(newCharacter => {
        Game.findByIdAndUpdate(req.body.gameId, {
            $push: { characters: newCharacter.id }
        }).then(game => {
            User.findByIdAndUpdate(req.body.userId, {
                $push: { characters: newCharacter.id }
            }).populate('games').populate('characters')
            .then((updatedUser) => {
                console.log('New character created')
                console.log(newCharacter)
                res.status(201).json({ newCharacter: newCharacter, updatedUser: updatedUser })
            })
        })
    }).catch(err => {
        console.log('Error creating character: ' + err)
        res.send(err)
    })
})

// Route to update character
    // name: String,
    // traits: [traitSchema],
    // profession: String,
    // irons: Number,
    // tenacity: Number,
    // maxTenacity: Number,
    // peril: Number,
    // hearts: Number,
    // veils: Number,
    // mirrors: Number,
    // condition: String,
    // inDanger: Boolean
    // integrities: [integritySchema],
    // messageId
    // gameId

// Route to delete character
    // Find by ID
    // Delete

module.exports = router