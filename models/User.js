const { Schema, model, Types } = require('mongoose');

const schema = new Schema({
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    firstName: { type: String, default: '' },
    lastName: { type: String, default: '' },
    userPhoto: { type: String, default: 'https://dreamski.ru/images/nofoto/nophoto.jpg' },
    userSex: { type: String, default: '' },
    userBirthday: { type: Date, default: null },
    dialogs: [{
        type: Types.ObjectId,
        ref: 'Dialog',
    }],
    contacts: [],
});

module.exports = model(name = 'User', schema);