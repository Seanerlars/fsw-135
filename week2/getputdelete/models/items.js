const mongoose = require("mongoose")
const Schema = mongoose.Schema

const itemsSchema = new Schema({
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
    },
    active_ind: {
        type: Boolean,
        required: true,
        default: 1
    },
    active_ind: {
        type: Date,
        required: true,
        default: Date.now
    },
    insert_id: {
        type: String,
        required: true
    }
})

module.exports = mongoose.model('Item', itemsSchema)