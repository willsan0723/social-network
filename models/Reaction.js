const { Schema, model } = require('mongoose');
const dateFormat = require('../utils/dateFormat');

const Reaction = new Schema({
    reactinoId: {
        type: Schema.Types.ObjectId,
        default: () => new Types.ObjectId()
    },
    reactionBody: {
        type: String,
        required: true,
        maxlength: 280
    },
    username: {
        type: String,
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now,
        get: timestamp => dateFormat(timestamp)
    }
}
)

module.exports = Reaction;