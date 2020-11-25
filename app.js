const express = require('express');
const config = require('config');
const path = require('path');
const mongoose = require('mongoose');
mongoose.set('useNewUrlParser', true);
mongoose.set('useFindAndModify', false);
mongoose.set('useCreateIndex', true);
mongoose.set('useUnifiedTopology', true);
const User = require('./models/User');
const Dialog = require('./models/Dialog');
const Message = require('./models/Message');

const app = express();

app.use(express.json({ extended: true }));
app.use('/api/auth', require('./routes/auth.routes'));

if (process.env.NODE_ENV === 'production') {
    app.use('/', express.static(path.join(__dirname, 'client', 'build')));

    app.get('*', function (req, res) {
        res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
    });
};

async function assemblingDialog(dialogId, dialog) {
    const user1 = await User.findById(dialog.userId1);
    let user1Data = {
        id: user1._id,
        firstName: user1.firstName,
        lastName: user1.lastName,
        email: user1.email,
        userPhoto: user1.userPhoto,
    };
    const user2 = await User.findById(dialog.userId2);
    let user2Data = {
        id: user2._id,
        firstName: user2.firstName,
        lastName: user2.lastName,
        email: user2.email,
        userPhoto: user2.userPhoto,
    };
    let messagesArr = [];
    for (const msgId of dialog.messages) {
        let msg = await Message.findById(msgId, (err) => {
            if (err) console.log(err.message);
        });
        messagesArr.push(msg);
    };

    let dialogData = {
        dialogId,
        user1: user1Data,
        user2: user2Data,
        messages: messagesArr,
    };
    return dialogData;
};

const PORT = config.get('port') || 5000;
// const PORT = process.env.PORT || 80;
async function start() {
    try {
        await mongoose.connect(config.get('mongoUri'), {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useCreateIndex: true,
        });
    } catch (err) {
        console.log('Server Error', err.message)
        process.exit(1);
    }
};

start();

const server = app.listen(PORT, () => console.log(`App started on port ${PORT}`));

const io = require('socket.io').listen(server);

let users = {};

io.sockets.on('connection', socket => {
    console.log('successful socket connection');

    socket.on('disconnect', async data => {

        for (const userId in users) {
            if (users[userId] === socket.id) {
                delete users[userId];
            };
        };
        console.log('disconnection');
    });


    socket.on('isOnline', async data => {

        users[data.userId] = socket.id;

        let user = await User.findById(data.userId);

        if (data.isDialogsLoad === true) {
            for (const dialogId of user.dialogs) {

                let dialog = await Dialog.findById(dialogId);
                lastMsgIndex = dialog.messages.length - 1;
                if (dialog.messages.length > 0) {
                    let m = await Message.findById(dialog.messages[lastMsgIndex]);
                    if (!m.delivered && m.from !== data.userId) {
                        let dialogData = await assemblingDialog(dialogId, dialog).then(
                            function (result) {
                                return result;
                            },
                            function (error) {
                                console.log(error);
                            }
                        );
                        io.sockets.emit(`newMessageTo${data.userId}`, dialogData);
                    };
                };
            };
        };
    });


    socket.on('profileData', async data => {

        if (data.changed) {
            let userChange = await User.findById(data.id, (err, user) => {
                if (err) console.log(err.message);
                for (const key in data) {
                    if (user[key] !== data[key] || user[key] !== '_id' || user[key] !== 'changed') {
                        user[key] = data[key];
                    };
                };
                user.save();
            });
            await userChange.save();
        };

        let user = await User.findById(data.id);
        let userProfile = {};
        userProfile.id = user._id;
        userProfile.firstName = user.firstName;
        userProfile.lastName = user.lastName;
        userProfile.userPhoto = user.userPhoto;
        userProfile.email = user.email;
        userProfile.userSex = user.userSex;
        userProfile.userBirthday = user.userBirthday;

        io.sockets.emit(`${data.id}Profile`, userProfile);

    });


    socket.on(`updateDialogsList`, async (userId, dialogsCount) => {

        const user = await User.findById(userId);
        const dialogs = [];

        for await (let dialogId of user.dialogs) {
            const dialog = await Dialog.findById(dialogId);
            const dialogData = { dialogId: dialog._id };

            if (dialog.userId1 !== userId) dialogData.interlocutorId = dialog.userId1;
            if (dialog.userId2 !== userId) dialogData.interlocutorId = dialog.userId2;
            const interlocutor = await User.findById(dialogData.interlocutorId);

            if (interlocutor.firstName !== '') {
                dialogData.name = interlocutor.firstName;
                dialogData.lastName = interlocutor.lastName;
            } else {
                dialogData.name = interlocutor.email;
            };
            dialogData.photo = interlocutor.userPhoto;

            dialogs.push(dialogData);
        };

        if (dialogsCount !== dialogs.length || dialogs.length === 0) {
            io.sockets.emit(`updateDialogsList${userId}`, dialogs);
        };
    });



    socket.on(`uploadDialog`, async (data) => {

        let dialog;

        if (data.getDialog || data.contactId) {
            dialog = await Dialog.findById(data.dialogId, (err) => {
                if (err) console.log(err.message);
            });
        };

        // save new message
        if (data.messageBody) {

            let dialogId = data.dialogId;
            let to = data.interlocutor;
            let from = data.user;
            let messageBody = data.messageBody;
            let creation = data.creation;
            let message = new Message({ dialogId, to, from, messageBody, creation, });
            await message.save();
            dialog = await Dialog.findByIdAndUpdate(
                data.dialogId,
                { $push: { messages: message._id } },
                { returnOriginal: false },
            );
        };

        // mark read messages
        if (data.newDeliveredMessagesIdArr) {
            for (const msgId of data.newDeliveredMessagesIdArr) {
                await Message.findByIdAndUpdate(
                    msgId,
                    { $set: { delivered: true } },
                    { returnOriginal: false },
                );
            };
            dialog = await Dialog.findById(data.dialogId, (err) => {
                if (err) console.log(err.message);
            });
        };

        // start assembling the dialog to send to the client

        let dialogData = await assemblingDialog(data.dialogId, dialog).then(
            function (result) {
                return result;
            },
            function (error) {
                console.log(error);
            }
        );
        // end assembling the dialog to send to the client


        if (data.contactId) {
            io.sockets.emit(`newMessageTo${data.contactId}`, dialogData);
        };
        if (data.getDialog) {
            socket.emit(`getDialog`, dialogData);
        };
        if (data.messageBody || data.newDeliveredMessagesIdArr) {
            io.sockets.emit(`newMessageTo${dialogData.user1.id}`, dialogData);
            io.sockets.emit(`newMessageTo${dialogData.user2.id}`, dialogData);
        };

    });



    socket.on(`findUser`, async (data) => {

        let searchUser = await User.findOne({ email: data.contactEmail });
        let user = await User.findById(data.userId);

        let sendData;
        if (searchUser === null) {
            sendData = searchUser
        } else {
            sendData = {
                firstName: searchUser.firstName,
                lastName: searchUser.lastName,
                userPhoto: searchUser.userPhoto,
                email: searchUser.email,
                id: searchUser._id,
                isContact: false,
            };
            for (const contact of user.contacts) {
                if (contact.contactId == searchUser._id) {
                    sendData.isContact = true;
                    sendData.dialogId = contact.dialogId;
                };
            };
        };

        socket.emit('newContact', sendData);

    });




    socket.on(`addNewContact`, async (data) => {

        let newDialog = new Dialog({ userId1: data.userId, userId2: data.newContactId });
        await newDialog.save();

        let dialogId = newDialog._id;
        let to = data.newContactId;
        let from = data.userId;
        let messageBody = 'New dialog created';
        let creation = Date.now();
        let description = "system_message";
        let message = new Message({ dialogId, to, from, messageBody, creation, description, });
        await message.save();
        await Dialog.findByIdAndUpdate(
            newDialog._id,
            { $push: { messages: message._id } },
            { returnOriginal: false },
        );

        let addNewContact = async (userId, contactId, dialogId) => {
            let user = await User.findByIdAndUpdate(
                userId,
                {
                    $push: {
                        dialogs: dialogId,
                        contacts: {
                            contactId: contactId,
                            dialogId: dialogId
                        },
                    }
                },
                { returnOriginal: false },
            );

            let newContact = await user.contacts.find(contact => contact.contactId === contactId);

            io.sockets.emit(`addNewContact${userId}`, { initiator: data.userId, newContact });
        };

        addNewContact(data.userId, data.newContactId, newDialog._id);
        addNewContact(data.newContactId, data.userId, newDialog._id);
    });



    socket.on(`uploadContacts`, async (data) => {

        let user = await User.findById(data.userId);
        let contactsArr = [];

        for (const contactId of user.contacts) {
            let contact = await User.findById(contactId.contactId);

            let contactData = {
                firstName: contact.firstName,
                lastName: contact.lastName,
                userPhoto: contact.userPhoto,
                userSex: contact.userSex,
                userBirthday: contact.userBirthday,
                id: contact._id,
                email: contact.email,
                dialogId: contactId.dialogId
            };
            contactsArr.push(contactData);
        };

        socket.emit('uploadContacts', { contactsArr });
    });
});