const mongoose=require('../db/connection')

const gameSchema = new mongoose.Schema({
    title: String,
    desc: String,
    users:  [{type: mongoose.Schema.Types.ObjectId, ref: 'User'}],
    characters:  [{type: mongoose.Schema.Types.ObjectId, ref: 'Character'}],
    tags: [String],
    gm:  {type: mongoose.Schema.Types.ObjectId, ref: 'User'},
    ships: [{type: mongoose.Schema.Types.ObjectId, ref: 'Ship'}]
})

module.exports = mongoose.model('Game', gameSchema)