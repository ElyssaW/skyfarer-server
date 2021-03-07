const Character = require('../models/Character')
const express = require('express')
const User = require('../models/User')
const Game = require('../models/Game')
const router = express.Router()

// Route to view character
router.get('/view/:id', (req, res) => {
    console.log('Route hit')
    console.log(req.params)
    console.log(req.body)
    Character.findById(req.params.id)
    .then(foundChar => {
        console.log(foundChar)
        res.status(200).json(foundChar)
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
router.put('/edit/:id', (req, res) => {
    console.log('Updating character')
    console.log(req.body)

    Character.findByIdAndUpdate(req.params.id, {
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
        gameId: [req.body.gameId]
    }).then(updatedCharacter => {
        console.log('Character updated')
        console.log(updatedCharacter)
        res.send(201).json(updatedCharacter)
    })
})

// Route to delete character
router.delete('/delete/:id', (req, res) => {
    console.log('Deleting character')
    console.log(req.params.id)
    Character.findById(req.params.id)
    .then(foundCharacter => {

        Game.findByIdAndUpdate(foundCharacter.gameId, {
            '$pull': { characters: foundCharacter.id }
        }).then(() => {

            User.findByIdAndUpdate(foundCharacter.userId, {
                '$pull': { characters: foundCharacter.id }
            }).then(() => {

                Character.findByIdAndDelete(foundCharacter._id)
                .then(() => {
                    res.status(200).json('Deleted successfully')
                })
            })
        })
    })
})

module.exports = router