const { Schema, model } = require('mongoose');

const User = new Schema({
    username: {
        type: String,
        unique: true,
        required: 'Please provide a username.',
        trim: true
    },
    email: {
        type: String,
        unique: true,
        match: [/.+@.+\..+/, 'Must match an email address!'],
        trim: true
    },
    thoughts: [
        {
            type: Schema.Types.ObjectId,
            ref: 'Thought'
        }
    ],
    friends: [
        {
            type: Schema.Types.ObjectId,
            ref: 'User'
        }
    ]
},
    {
        toJSON: {
            virtuals: true,
            getters: true
        },
        id: false
    }
)

User.virtual('friendCount').get(function () {
    return this.friends.length
});

module.exports = User;