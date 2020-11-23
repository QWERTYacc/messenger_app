import React from 'react';
import classes from './MessageItem.module.css';
import varsCss from '../../../../../vars_css/vars_css';

function MessageItem(props) {

    let userName;
    if (props.user.firstName !== '') {
        userName = props.user.firstName;
    } else {
        userName = props.user.email;
    };

    let senderClass;

    if (props.user.id === JSON.parse(localStorage.getItem('userData')).id) {
        senderClass = classes.fromUser;
        userName = 'You';
    };
    if (props.user.id !== JSON.parse(localStorage.getItem('userData')).id) senderClass = classes.fromInterlocutor;
    if (props.description === 'system_message') senderClass = classes.fromSystem;

    return (
        <div className={`${classes.body} ${senderClass}`}>
            <div className={`${classes.sender} ${varsCss.navTextColor}`}>{userName}</div>
            <div className={classes.messageBody}>{props.messageBody}</div>
        </div>
    );
};

export default MessageItem;