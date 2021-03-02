require('dotenv').config()
const mongoose = require('mongoose')

console.log('Connecting...')
console.log(process.env.DB_CONNECTION_STRING)

mongoose.connect(`${process.env.DB_CONNECTION_STRING}`, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true,
    useFindAndModify: false
})
    .then((instance) =>
        console.log(`Connected to db: ${instance.connections[0].name}`)
    )
    .catch((error) => console.log('Connection failed!', error))

module.exports = mongoose