const Game = require('../models/Game')

// Route to get all games
    // Find all
    // Send all

// Route to get one game
    // Find by ID
    // Send one

// Route to search games
    // Find by selectors
    // Send all

// Route to create new game
    // name: String,
    // users:  [{type: mongoose.Schema.Types.ObjectId, ref: 'User'}],
    // characters:  [{type: mongoose.Schema.Types.ObjectId, ref: 'Character'}],
    // tags: [String],
    // gm:  {type: mongoose.Schema.Types.ObjectId, ref: 'User'},
    // ships: [{type: mongoose.Schema.Types.ObjectId, ref: 'Ship'}]

// Route to edit game
    // name: String,
    // users:  [{type: mongoose.Schema.Types.ObjectId, ref: 'User'}],
    // characters:  [{type: mongoose.Schema.Types.ObjectId, ref: 'Character'}],
    // tags: [String],
    // gm:  {type: mongoose.Schema.Types.ObjectId, ref: 'User'},
    // ships: [{type: mongoose.Schema.Types.ObjectId, ref: 'Ship'}]

// Route to delete game
    // Find by ID
    // Delete