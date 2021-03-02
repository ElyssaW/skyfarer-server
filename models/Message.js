const mongoose=require('../db/connection')

const rollModSchema = new mongoose.Schema({
    name: String
})

const messageSchema = new mongoose.Schema({
    content: String,
    rollBase: Number,
    rollSecond: Number,
    rollPlus: [{rollModSchema}],
    rollMinus: [{rollModSchema}],
    tenacityRoll: Number,
    perilRoll: Number,
    characterId: {type: mongoose.Schema.Types.ObjectId, ref: 'Character'},
    gameId: {type: mongoose.Schema.Types.ObjectId, ref: 'Game'},
    userId: {type: mongoose.Schema.Types.ObjectId, ref: 'User'}
})

module.exports = mongoose.model('Message', messageSchema)