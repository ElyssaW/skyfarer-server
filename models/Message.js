const mongoose=require('../db/connection')

const messageSchema = new mongoose.Schema({
    body: String,
    rolls: [
        {
            roll: Number,
            bonus: Number,
            stat: String,
            secondRoll: Boolean,
            plus: [{desc: String}],
            minus: [{desc: String}]
        }
    ],
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