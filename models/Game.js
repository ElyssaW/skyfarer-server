const mongoose=require('../db/connection')

const gameSchema = new mongoose.Schema({
    title: String,
    desc: String,
    users:  [{type: mongoose.Schema.Types.ObjectId, ref: 'User'}],
    messages:  [{type: mongoose.Schema.Types.ObjectId, ref: 'Message'}],
    tags: [String],
    gm:  {type: mongoose.Schema.Types.ObjectId, ref: 'User'},
    ships: [{type: mongoose.Schema.Types.ObjectId, ref: 'Ship'}],
    pendingRequests: [{type: mongoose.Schema.Types.ObjectId, ref: 'User'}]
})

module.exports = mongoose.model('Game', gameSchema)