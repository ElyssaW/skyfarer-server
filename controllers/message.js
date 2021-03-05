const Message = require('../models/Message')
const express = require('express')
const router = express.Router()

// Route to display current messages in a game (Caps at 40?)
// router.get('/')
// Message.find({ gameId: req.params.id}).populate({path:'gameId'})
    // Find messages in a game by ID (Cap at 40)
    // Send messages

// Route to get message backlog (All messages)
    // Find all messages in a game
    // Send messages

// Route to search messages
    // Find message by search
    // Send results

// Route to get all messages by user
    // Find message by user id
    // Send all

// Route to get all messages by character
    // Find message by character ID
    // Send all

// Route to get all messages by receiver ID
    // Find message by receiver
    // Send all

// Route to write new message
router.post('/message/new', (req, res) => {
    Message.create({
        content: req.body.content,
        rollBase: req.body.rollBase,
        rollSecond: req.body.rollSecond,
        rollPlus: req.body.rollPlus,
        rollMinus: req.body.rollMinus,
        tenacityRoll: req.body.tenacityRoll,
        perilRoll: req.body.perilRoll,
        private: req.body.private,
        characterId: req.body.characterId,
        gameId: req.body.gameId,
        userId: req.body.userId,
        endUserId: req.body.endUserId
    }).then(newMessage => {
        console.log('New message......')
        console.log(newMessage)
    })
})
    // content: String,
    // rollBase: Number,
    // rollSecond: Number,
    // rollPlus: [{rollModSchema}],
    // rollMinus: [{rollModSchema}],
    // tenacityRoll: Number,
    // perilRoll: Number,
    // private: Boolean,
    // characterId: {type: mongoose.Schema.Types.ObjectId, ref: 'Character'},
    // gameId: {type: mongoose.Schema.Types.ObjectId, ref: 'Game'},
    // userId: {type: mongoose.Schema.Types.ObjectId, ref: 'User'},
    // endUserId: {type: mongoose.Schema.Types.ObjectId, ref: 'User'},

// Route to edit message
router.put('/message/edit/:id', (req, res) => {
    Message.findByIdAndUpdate(req.params.id, {
        content: req.body.content,
        rollBase: req.body.rollBase,
        rollSecond: req.body.rollSecond,
        rollPlus: req.body.rollPlus,
        rollMinus: req.body.rollMinus,
        tenacityRoll: req.body.tenacityRoll,
        perilRoll: req.body.perilRoll,
        private: req.body.private,
        characterId: req.body.characterId,
        gameId: req.body.gameId,
        userId: req.body.userId,
        endUserId: req.body.endUserId
    }).then(updatedMessage => {
        console.log('Updated message......')
        console.log(updatedMessage)
    })
})
    // content: String,
    // rollBase: Number,
    // rollSecond: Number,
    // rollPlus: [{rollModSchema}],
    // rollMinus: [{rollModSchema}],
    // tenacityRoll: Number,
    // perilRoll: Number,
    // private: Boolean,
    // characterId: {type: mongoose.Schema.Types.ObjectId, ref: 'Character'},
    // gameId: {type: mongoose.Schema.Types.ObjectId, ref: 'Game'},
    // userId: {type: mongoose.Schema.Types.ObjectId, ref: 'User'},
    // endUserId: {type: mongoose.Schema.Types.ObjectId, ref: 'User'},

// Route to delete message
    // Find message by ID, delete
    // Delete from User
    // Delete from Character
    // Delete from Game

module.exports = router