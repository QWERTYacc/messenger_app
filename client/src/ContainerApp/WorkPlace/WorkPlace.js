import React from 'react';
import classes from './WorkPlace.module.css';
import NavbarContainer from './Navbar/NavbarContainer';
import AppPagesContainer from './AppPages/AppPagesContainer';
import io from 'socket.io-client';
import { dialogs, uploadDialogActionCreator } from '../../redux/dialogBodyReducer';
import { newMessagesActionCreator } from '../../redux/navigationReducer';
import { checkNewMessagesOnDialogListActionCreator, reloadDialogsActionCreator } from '../../redux/dialogsListReducer';
import { reloadContactsActionCreator } from '../../redux/contactsReducer';
import { redirectNewUserActionCreator } from '../../redux/searchNewUserReducer';
import { baseUrl } from '../../App';

export let socket = io.connect(baseUrl(process.env.NODE_ENV));


function WorkPlace(props) {

  const userId = JSON.parse(localStorage.getItem('userData')).id;

  socket.on('getDialog', data => {

    let action = uploadDialogActionCreator(data);
    props.dispatch(action);
  });

  socket.on(`newMessageTo${userId}`, data => {

    let action = uploadDialogActionCreator(data);
    props.dispatch(action);

    let newMsgs = [];
    if (data.dialogId !== dialogs.currentDialog) {
      data.messages.map(m => {
        if (!m.delivered && m.to === userId) {
          newMsgs.push(m);
        };
        return m;
      });
    };
    let newMsgsData = {
      dialogId: data.dialogId,
      messages: newMsgs,
      lastMsg: data.messages[(data.messages.length - 1)].creation,
    };

    let action1 = newMessagesActionCreator(newMsgsData);
    props.dispatch(action1);
    let action2 = checkNewMessagesOnDialogListActionCreator(newMsgsData.dialogId, newMsgsData.messages, newMsgsData.lastMsg);
    props.dispatch(action2);
  });


  socket.on(`addNewContact${userId}`, data => {

    let actionContacts = reloadContactsActionCreator();
    props.dispatch(actionContacts);

    socket.emit('updateDialogsList', JSON.parse(localStorage.getItem('userData')).id);

    if (data.initiator === userId) {
      let actionSearchNewUser = redirectNewUserActionCreator(data.newContact.dialogId);
      props.dispatch(actionSearchNewUser);
    };

    if (data.initiator !== userId) {
      // socket.emit('uploadDialog', { dialogId: data.newContact.dialogId, contactId: userId });
      let action = reloadDialogsActionCreator('reload');
      props.dispatch(action);
    };
  });



  return (
    <div className={classes.body}>
      <NavbarContainer />
      <AppPagesContainer />
    </div>
  );
};

export default WorkPlace;
