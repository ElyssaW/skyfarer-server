const User = require('../models/User')
const Game = require('../models/Game')
const Character = require('../models/Character')

// User.create({
//     username: 'Test User',
//     password: 'password',
// }, (err, createdUser) => {
//     if (err) console.log('Error adding test user', err)
//     else console.log('Success!', createdUser)
// })

// Game.create({
//     name: 'My First Game',
//     users:  ['603cb8b53de8906928150d5e'],
//     gm:  ['603cb8b53de8906928150d5e']
// }, (err, createdUser) => {
//     if (err) console.log('Error adding test user', err)
//     else console.log('Success!', createdUser)
// })

Character.create({
    name: 'My Character',
    traits: ['Bulky', 'Stoic'],
    profession: 'Mechanic',
    irons: 2,
    hearts: 1,
    veils: -1,
    mirrors: 0,
    tenacity: 2,
    tenacityMax: 6,
    peril: 0,
    inDanger: false,
    integrities: ['Loves puppies', 'Hates birds', 'Will never turn down a drink', 'Will always keep their workspace clean'],
    gameId: '603cb9c4266ec07ba40487e2',
    userId: '603cb8b53de8906928150d5e'
}, (err, createdUser) => {
    if (err) console.log('Error adding test user', err)
    else console.log('Success!', createdUser)
})