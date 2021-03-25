const mongoose = require("mongoose")
const Schema = mongoose.Schema

const inventory = new Schema({
    name: {
        type: String,
        required: true
    },
    type: {
        type: String,
        required: true
    },
    year_made: {
        type: Number,
        required: true,
        min: 0
    }
})

module.exports = mongoose.inventory('inventory', inventory)