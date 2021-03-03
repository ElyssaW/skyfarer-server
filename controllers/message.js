const Message = require('../models/Message')

// Route to display current messages in a game (Caps at 40?)
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
