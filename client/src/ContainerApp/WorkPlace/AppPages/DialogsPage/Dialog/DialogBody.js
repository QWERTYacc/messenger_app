import React from 'react';
import classes from './DialogBody.module.css';
import { socket } from '../../../WorkPlace';
import MessageItem from './MessageItem';
import { dialogIdActionCreator, dialogs } from '../../../../../redux/dialogBodyReducer';
import { Preloader } from 'react-materialize';

function createMessageList(data) {

    if (data.isLoad) {
        let messages = [];
        data.dialog.messages.map(message => {
            if (message.to === data.dialog.user1.id) {
                return messages.push(<MessageItem key={Math.random()} to={message.to} messageBody={message.messageBody} user={data.dialog.user2} creation={message.creation} description={message.description} />);
            };
            return messages.push(<MessageItem key={Math.random()} to={message.to} messageBody={message.messageBody} user={data.dialog.user1} creation={message.creation} description={message.description} />);
        });
        return messages;
    };
};

class DialogBody extends React.Component {

    render() {

        if (!this.props.dialogPage.isLoad) {
            socket.emit('uploadDialog', { dialogId: this.props.dialogPage.dialogId, getDialog: true });

            return (
                <div className={classes.preloaderContainer}>
                    <Preloader />
                </div>
            );
        };

        let userId = JSON.parse(localStorage.getItem('userData')).id;
        let newDeliveredMessagesIdArr = [];

        if (this.props.dialogPage.dialog.messages.length > 0) {
            this.props.dialogPage.dialog.messages.map(message => {
                if (message.to === userId && !message.delivered) {
                    newDeliveredMessagesIdArr.push(message._id);
                };
                return message;
            });
        };

        if (newDeliveredMessagesIdArr.length > 0) {
            socket.emit('uploadDialog', {
                dialogId: this.props.dialogPage.dialogId,
                userId: userId,
                newDeliveredMessagesIdArr
            });
        };

        return (
            <div className={classes.body} id='dialogArea'>
                <div
                    className={classes.content}
                    onScroll={(e) => { console.log(e) }}
                >
                    {createMessageList(this.props.dialogPage)}
                </div>
            </div>
        );
    };

    componentDidMount() {
        if (this.props.dialogPage.isLoad && this.props.dialogPage.dialog.messages && this.props.dialogPage.dialog.messages.length > 0) {
            let scrollMessages = document.querySelector('#dialogArea');
            scrollMessages.scrollTop = scrollMessages.scrollHeight;
        };
    };

    componentDidUpdate() {
        let scrollMessages = document.querySelector('#dialogArea');
        scrollMessages.scrollTop = scrollMessages.scrollHeight;
    };

    componentWillUnmount() {
        dialogs.currentDialog = null;
        let action = dialogIdActionCreator('');
        this.props.dispatch(action);
    };
};


export default DialogBody;