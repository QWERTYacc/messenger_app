import React from 'react';
import { Route } from 'react-router-dom';
import { getContactsActionCreator } from '../../../../redux/contactsReducer';
import { socket } from '../../WorkPlace';
import ContactsListContainer from './ContactsListContainer';
import classes from './ContactsPage.module.css';

function ContactsPage(props) {

    socket.on('uploadContacts', data => {
        let action = getContactsActionCreator(data.contactsArr);
        props.dispatch(action);
    });

    return (
        <div className={classes.body}>
            <Route path='/contacts' render={() => <ContactsListContainer />} />
        </div>);
};

export default ContactsPage;