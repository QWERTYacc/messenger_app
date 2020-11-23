const { Schema, model, Types } = require('mongoose');

const schema = new Schema({
    userId1: { type: String, required: true },
    userId2: { type: String, default: '' },
    messages: [{
        type: Types.ObjectId,
        ref: 'Message',
    }],
    verified: { type: Boolean, default: false },
});

module.exports = model(name = 'Dialog', schema);