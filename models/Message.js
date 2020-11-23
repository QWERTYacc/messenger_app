const { Schema, model, Types } = require('mongoose');

const schema = new Schema({
    dialogId: { type: String, required: true },
    to: { type: String, required: true },
    from: { type: String, required: true },
    messageBody: { type: String, default: '' },
    creation: { type: Number, required: true },
    description: { type: String },
    delivered: { type: Boolean, default: false },
});

module.exports = model(name = 'Message', schema);