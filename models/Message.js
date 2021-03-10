const mongoose=require('../db/connection')

const rollModSchema = new mongoose.Schema({
    desc: String
})

const rollSchema = new mongoose.Schema({
    roll: Number,
    type: String,
    secondRoll: Boolean,
    plus: [{rollModSchema}],
    minus: [{rollModSchema}],
})

const messageSchema = new mongoose.Schema({
    body: String,
    rolls: [{rollSchema}],
    gmOnly: Boolean,
    ooc: Boolean,
    characterId: {type: mongoose.Schema.Types.ObjectId, ref: 'Character'},
    characterName: String,
    gameId: {type: mongoose.Schema.Types.ObjectId, ref: 'Game'},
    userId: {type: mongoose.Schema.Types.ObjectId, ref: 'User'},
    username: String,
    endUserId: {type: mongoose.Schema.Types.ObjectId, ref: 'User'},
})

module.exports = mongoose.model('Message', messageSchema)