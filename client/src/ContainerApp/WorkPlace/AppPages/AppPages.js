import React from 'react';
import classes from './AppPages.module.css';
import { Route } from 'react-router-dom';
import ProfilePageContainer from './ProfilePage/ProfilePageContainer';
import DialogsPage from './DialogsPage/DialogsPage';
import ContactsPage from './ContactsPage/ContactsPage';
import { Redirect } from 'react-router-dom';
import { socket } from '../WorkPlace';


function AppPages(props) {

  const userId = JSON.parse(localStorage.getItem('userData')).id;
  socket.emit('isOnline', { userId: userId, isDialogsLoad: props.isDialogsLoad });

  let redirectFnc = function (redirect) {
    if (redirect !== '' && redirect !== undefined) {
      return <Redirect to={`/dialogs/dialog/${redirect}`} />;
    };
    return null;
  };

  return (
    <div className={classes.body}>
      <Route path='/profile' render={() => <ProfilePageContainer />} />
      <Route path='/dialogs' render={() => <DialogsPage dispatch={props.dispatch} />} />
      <Route path='/contacts' render={() => <ContactsPage dispatch={props.dispatch} />} />
      {redirectFnc(props.dialogId)}
    </div>
  );
};

export default AppPages;