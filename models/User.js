const { Schema, model } = require('mongoose');

const userSchema = new Schema({
    username: {
        type: String,
        unique: true,
        required: 'Please provide a username.',
        trim: true
    },
    email: {
        type: String,
        unique: true,
        required: "Please provide an e-mail address!",
        match: [/.+@.+\..+/, 'Must be a valid e-mail address!'],
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

userSchema.virtual('friendCount').get(function () {
    return this.friends.length
});

const User = model("User", userSchema);

module.exports = User;