'use strict'

const mongoose = require('mongoose')
const Schema = mongoose.Schema

const GameSchema = Schema({
    name: String,
    picture: String,
    description: String,
    wantIt:{
        type: Array
    },
    haveIt:{
        type: Array
    }
})

module.exports = mongoose.model('Game', GameSchema)