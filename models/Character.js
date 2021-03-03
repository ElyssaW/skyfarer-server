const mongoose=require('../db/connection')

const traitSchema = new mongoose.Schema({
    desc: String
})

const integritySchema = new mongoose.Schema({
    desc: String
})

const characterSchema = new mongoose.Schema({
    name: String,
    traits: [traitSchema],
    profession: String,
    irons: Number,
    hearts: Number,
    veils: Number,
    mirrors: Number,
    tenacity: Number,
    tenacityMax: Number,
    peril: Number,
    inDanger: Boolean,
    condition: String,
    integrities: [integritySchema],
    messages: [{type: mongoose.Schema.Types.ObjectId, ref: 'Message'}],
    gameId: {type: mongoose.Schema.Types.ObjectId, ref: 'Game'},
    userId: {type: mongoose.Schema.Types.ObjectId, ref: 'User'}
})

module.exports = mongoose.model('Character', characterSchema)