const Character = require('../models/Character')
const express = require('express')
const router = express.Router()
const axios = require('axios')

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
    // name: String,
    // traits: [traitSchema],
    // profession: String,
    // irons: Number,
    // hearts: Number,
    // veils: Number,
    // mirrors: Number,
    // integrities: [integritySchema],

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