const express = require('express')
const bcrypt = require('bcrypt')
const { createUserToken, createNewUserToken, requireToken } = require('../middleware/auth')
const passport = require('passport') // For authentication; must be logged in to see /auth/profile route.
const router = express.Router()

const User = require('../models/User')
const Game = require('../models/Game')

router.get('/data/guest', (req, res) => {
    Game.find({}, { _id: 1, title: 1, gm: 1 }).then(gamesData => {
        res.send(gamesData)
    })
})

router.get('/data/:id', (req, res) => {
    User.findById(req.params.id).populate('games').populate('characters').populate('messages')
    .then(currentUser => {
        Game.find({}, { _id: 1, title: 1, gm: 1 }).then(gamesData => {
            res.status(200).json({ gamesData, currentUser })
        })
    })
})

router.post('/login', (req, res) => {
    console.log(req.body)

    User.findOne( {email: req.body.email }).populate('games').populate('characters').populate('messages')
    .then(foundUser => {
        console.log(foundUser)
        return [createUserToken(req, foundUser), foundUser]})
    .then(([token, foundUser]) => {
        console.log(foundUser)
        Game.find({}, { _id: 1, title: 1, gm: 1 }).then(gamesData => {
            res.status(200).json( {token, currentUser: foundUser, gamesData} )
        })
    })
    .catch( err => {
        console.log( 'ERROR LOGGING IN:', err )
        res.status(401).json( {message: 'Invalid login' })
    })
})

router.post('/signup', (req, res) => {

    bcrypt.hash(req.body.password, 10)

    .then(hashedPassword => ({
        email: req.body.email,
        password: hashedPassword,
        name: req.body.username
    }))
    
    .then(hashedUser => {
        User.create(hashedUser) 
        .then(createdUser => {
            return createUserToken(req, createdUser)}) 
        .then(token => res.json({token})) 
        .catch(err => {
            console.log('ERROR CREATING USER', err)
            res.status(401).json({ message: 'Error creating new account' })
        })
    })
})

module.exports = router