import React from 'react';
import classes from './TextArea.module.css';
import { Textarea, Button, Icon } from 'react-materialize';
import varsCss from '../../../../../vars_css/vars_css';
import { changeNewMessageActionCreator } from '../../../../../redux/textAreaReducer';
import { socket } from '../../../WorkPlace';


function TextArea(props) {

    let user = JSON.parse(localStorage.getItem('userData')).id;
    let interlocutor;

    if (props.dialog && props.dialog.user1) {
        if (props.dialog.user1.id !== user) {
            interlocutor = props.dialog.user1.id
        } else {
            interlocutor = props.dialog.user2.id
        };
    };

    let sendBtn = true;
    if (props.textArea.newMessage !== '') sendBtn = false;

    return (
        <div className={`${classes.body} ${varsCss.mainColor}`}>
            <Textarea
                className={`white`}
                value={props.textArea.newMessage}
                onChange={(e) => {
                    let action = changeNewMessageActionCreator(e.target.value);
                    props.dispatch(action);
                }}
            />
            <Button
                className={varsCss.accentColor}
                node="button"
                type="submit"
                waves="light"
                disabled={sendBtn}
                onClick={() => {
                    socket.emit('uploadDialog', {
                        dialogId: props.dialog.dialogId,
                        user,
                        interlocutor,
                        messageBody: props.textArea.newMessage,
                        creation: Date.now(),
                    });
                    let action = changeNewMessageActionCreator('');
                    props.dispatch(action);
                }}
            ><Icon>send</Icon>
            </Button>
        </div >
    );
};

export default TextArea;