require('dotenv').config()
const passport = require('passport')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
const Strategy = require('passport-jwt').Strategy
const ExtractJwt = require('passport-jwt').ExtractJwt 
const User = require('../models/User')

const options = {
    secretOrKey: process.env.JWT_SECRET,
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken() 
}

const findUser = (jwt_payload, done) => { 
    User.findById(jwt_payload.id)
    .then(foundUser => done(null, foundUser))
    .catch(err => done(err))
}

const strategy = new Strategy(options, findUser)

passport.use(strategy)

passport.initialize()

const createUserToken = (req, user) => {
    console.log(req.body.password)
    const validPassword = req.body.password ?
        bcrypt.compareSync(req.body.password, user.password) : false 

    if (!user || !validPassword) {
        const err = new Error('The provided email OR password is incorrect.') 
        err.statusCode = 422
        throw err
    } else { 
        const payload = {
            id: user._id,
            email: user.email,
            name:user.name
        }
        return jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: 10800 })
    }
}

const createNewUserToken = (req, user) => {
    if (!user) {
        const err = new Error('No user is logged in to refersh their token.')
        err.statusCode = 422
        throw err
    } else {
        const payload = {
            id: user._id,
            email: user.email,
            name:user.name
        }
        return jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: 10800 })
    }
}

const requireToken = passport.authenticate('jwt', { session: false })

module.exports = { createUserToken, createNewUserToken, requireToken }