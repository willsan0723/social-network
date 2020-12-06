const { Schema, model } = require('mongoose');
const dateFormat = require('../utils/dateFormat');
const Reaction = require("./Reaction")

const Thought = new Schema({
    thoughtText: {
        type: String,
        required: true,
        minlength: 1,
        maxlength: 280
    },
    createdAt: {
        type: Date,
        default: Date.now,
        get: timestamp => dateFormat(timestamp)
    },
    username: {
        type: String,
        required: true
    },
    reaction: [Reaction]
},
    {
        toJSON: {
            virtuals: true,
            getters: true
        },
        id: false
    }
)

Thought.virtual('reactionCount').get(function () {
    return this.reaction.length
});

module.exports = Thought;