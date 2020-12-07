const { Schema, model } = require('mongoose');
const dateFormat = require('../utils/dateFormat');
const Reaction = require("./Reaction")

const thoughtSchema = new Schema({
    thoughtText: {
        type: String,
        required: "Please provide text for your post!",
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
        required: "Please provide a username for this post!"
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

thoughtSchema.virtual('reactionCount').get(function () {
    return this.reaction.length
});

const Thought = model('Thought', thoughtSchema);

module.exports = Thought;