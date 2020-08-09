const mongoose = require('mongoose');
const { config } = require('../config')

mongoose.connect(
    config.db.url, {
        useNewUrlParser: true,
        useUnifiedTopology: true,

    })
    .then(()=> console.log ('Connected to database!'))
    .catch (()=> console.log ('Error in database conection'))
