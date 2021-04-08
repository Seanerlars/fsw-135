const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const commentSchema = new Schema({
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    issue: { 
        type: Schema.Types.ObjectId,
        ref: 'Issue',
        required: true
    },
    comment: { 
        type: Schema.Types.ObjectId,
        required: true
    },
    date: { 
        type: Date,
        default: Date.now
    }
})

module.exports = mongoose.model('Coment', commentSchema)