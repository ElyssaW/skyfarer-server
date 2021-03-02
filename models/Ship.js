const mongoose=require('../db/connection')

const traitSchema = new mongoose.Schema({
    name: String
})

const shipSchema = new mongoose.Schema({
    name: String,
    class: String,
    traits: [{traitSchema}],
    characters:  [{type: mongoose.Schema.Types.ObjectId, ref: 'Character'}],
    captainId:  {type: mongoose.Schema.Types.ObjectId, ref: 'Character'},
    gameId:  {type: mongoose.Schema.Types.ObjectId, ref: 'Game'}
})

module.exports = mongoose.model('Ship', shipSchema)