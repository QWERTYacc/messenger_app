import React from 'react';
import { NavLink } from 'react-router-dom';
import { socket } from '../../../WorkPlace';
import { uploadDialogsActionCreator } from '../../../../../redux/dialogsListReducer';
import { dialogIdActionCreator } from '../../../../../redux/dialogBodyReducer';
import DialogsItem from './DialogsItem';
import classes from './DialogsList.module.css';
import IconAdd from '../../../../../img/icons/IconAdd';
import varsCss from '../../../../../vars_css/vars_css';
import { Preloader } from 'react-materialize';


let createDialogs = (dialogs, dialogId, dispatch) => {

    if (dialogs !== undefined) {
        if (dialogId !== '') {

            let lastMsgs = [];
            dialogs.forEach(d => {
                if (d.lastMsg) lastMsgs.push(d.lastMsg);
            });
            lastMsgs.sort((a, b) => a - b);
            lastMsgs.forEach(i => {
                dialogs.find(function (dialog, index, arr) {
                    if (dialog.lastMsg === i) {
                        arr.splice(index, 1);
                        arr.unshift(dialog);
                    };
                    return this;
                });
            });
        };
        let dialogsItems = dialogs.map(dialog => {
            return (
                <NavLink
                    exact to={`/dialogs/dialog/${dialog.dialogId}`}
                    key={dialog.dialogId}
                    onClick={() => {
                        let action = dialogIdActionCreator(dialog.dialogId);
                        dispatch(action);
                    }}>
                    <DialogsItem data={dialog} />
                </NavLink>
            );
        });
        return dialogsItems;
    };
};


function DialogsList(props) {

    if (!props.dialogsList.isLoad) {

        socket.emit('dialogList', JSON.parse(localStorage.getItem('userData')).id);

        let userId = JSON.parse(localStorage.getItem('userData')).id;
        let dialogs = 0;
        if (props.dialogsList.dialogs !== undefined) {
            dialogs = props.dialogsList.dialogs.length;
        };
        socket.emit('updateDialogsList', userId, dialogs);
        socket.on(`updateDialogsList${userId}`, data => {
            let action = uploadDialogsActionCreator(true, data);
            props.dispatch(action);
        });

        return (
            <div className={classes.preloaderContainer}>
                <Preloader />
            </div>
        );
    };
    if (props.dialogsList.dialogs.length === 0) {
        return (
            <div className={classes.preloaderContainer}>
                <h5>no dialogs</h5>
                <NavLink exact to={`/dialogs/add_new_user`}><IconAdd width="50px" fill={varsCss.accentColorFill} /></NavLink>
            </div>
        );
    };
    let dialogId = '';
    if (props.dialogsList.upDialog) dialogId = props.dialogsList.upDialog;
    return (
        <div className={classes.body}>
            <div className={classes.content}>
                {/* <Route exact path={`/dialogs`} render={() => createDialogs(props.dialogsList.dialogs, dialogId, props.dispatch)} /> */}
                {createDialogs(props.dialogsList.dialogs, dialogId, props.dispatch)}
            </div>
            <NavLink exact to={`/dialogs/add_new_user`}><IconAdd width="50px" fill={varsCss.accentColorFill} /></NavLink>
        </div >
    );
};

export default DialogsList;