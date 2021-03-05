const User = require('../models/User')
const Game = require('../models/Game')
const Character = require('../models/Character')
const Ship = require('../models/Ship')
const Message = require('../models/Message')

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

// Character.create({
//     name: 'My Character',
//     traits: [{ desc: 'Bulky' }, { desc: 'Stoic' }],
//     profession: 'Mechanic',
//     irons: 2,
//     hearts: 1,
//     veils: -1,
//     mirrors: 0,
//     tenacity: 2,
//     tenacityMax: 6,
//     peril: 0,
//     inDanger: false,
//     integrities: [ {desc: 'Loves puppies' }, { desc: 'Hates birds' }, { desc: 'Will never turn down a drink' }, { desc: 'Will always keep their workspace clean' }],
//     gameId: '603cb9c4266ec07ba40487e2',
//     userId: '603cb8b53de8906928150d5e'
// }, (err, createdUser) => {
//     if (err) console.log('Error adding test user', err)
//     else console.log('Success!', createdUser)
// })

// Ship.create({
//     name: "Ulyssean",
//     class: 'Steamer',
//     traits: [{ desc: 'Rickety' }, { desc: 'Mythic' }],
//     characters:  ['603da6d11a318371b02f75f3'],
//     captainId:  '603da6d11a318371b02f75f3',
//     gameId:  '603cb9c4266ec07ba40487e2'
// }, (err, createdUser) => {
//     if (err) console.log('Error adding test user', err)
//     else console.log('Success!', createdUser)
// })

Message.create({
    content: 'I fix the ship',
    rollBase: 6,
    rollSecond: 7,
    rollPlus: [{ desc: 'Bulky' }],
    rollMinus: [{ desc: 'Drunk '}],
    tenacityRoll: null,
    perilRoll: null,
    characterId: '603da6d11a318371b02f75f3',
    gameId: '603cb9c4266ec07ba40487e2',
    userId: '603cb8b53de8906928150d5e'
}, (err, createdUser) => {
        if (err) console.log('Error adding test user', err)
        else console.log('Success!', createdUser)
    })

Message.create({
    content: 'I fix the ship again',
    rollBase: 6,
    rollSecond: 7,
    rollPlus: [{ desc: 'Bulky' }],
    rollMinus: [{ desc: 'Drunk '}],
    tenacityRoll: null,
    perilRoll: null,
    characterId: '603da6d11a318371b02f75f3',
    gameId: '603cb9c4266ec07ba40487e2',
    userId: '603cb8b53de8906928150d5e'
}, (err, createdUser) => {
        if (err) console.log('Error adding test user', err)
        else console.log('Success!', createdUser)
    })

Message.create({
    content: 'I fix the ship a third time',
    rollBase: 6,
    rollSecond: 7,
    rollPlus: [{ desc: 'Bulky' }],
    rollMinus: [{ desc: 'Drunk '}],
    tenacityRoll: null,
    perilRoll: null,
    characterId: '603da6d11a318371b02f75f3',
    gameId: '603cb9c4266ec07ba40487e2',
    userId: '603cb8b53de8906928150d5e'
}, (err, createdUser) => {
        if (err) console.log('Error adding test user', err)
        else console.log('Success!', createdUser)
    })

// Message.find({ characterId: '603da6d11a318371b02f75f3' }).then(returnedMsg => {
//     console.log(returnedMsg)
// })