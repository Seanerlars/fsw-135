const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const issueSchema = new Schema({
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
    },
    likes: {
        type: Number,
        default: 0
    },
})

module.exports = mongoose.model('Issue', issueSchema)