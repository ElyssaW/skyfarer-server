const express = require('express')
const bcrypt = require('bcrypt')
const { createUserToken, createNewUserToken, requireToken } = require('../middleware/auth')
const passport = require('passport') // For authentication; must be logged in to see /auth/profile route.
const router = express.Router()

const User = require('../models/User')
const Game = require('../models/Game')

router.get('/data/:id', (req, res) => {
    Game.find().then(gamesData => {
        User.findById(req.params.id).populate('games').populate('characters')
        .then(currentUser => {
            res.status(200).json({ gamesData, currentUser })
        })
    })
})

router.post('/login', (req, res) => {
    console.log(req.body.email)
    User.findOne( {email: req.body.email })
    .then(foundUser => {
        console.log(foundUser)
        return createUserToken (req, foundUser)})
    .then(token => res.status(201).json( {token} ))
    .catch( err => {
        console.log( 'ERROR LOGGING IN:', err )
        res.status(401).json( {message: 'Invalid login' })
    })
})

router.post('/signup', (req, res) => {
    console.log('Creating new user')
    console.log(req.body)
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