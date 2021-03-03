const mongoose=require('../db/connection')

const userSchema = new mongoose.Schema({
    name: String,
    email: {
        type: String,
        unique: true
    },
    password: String,
    games: [{type: mongoose.Schema.Types.ObjectId, ref: 'Game'}],
    characters: [{type: mongoose.Schema.Types.ObjectId, ref: 'Character'}],
    messages: [{type: mongoose.Schema.Types.ObjectId, ref: 'Message'}]
})

module.exports = mongoose.model('User', userSchema)