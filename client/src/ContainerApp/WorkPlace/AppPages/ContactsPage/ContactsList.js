import React from 'react';
import { Preloader } from 'react-materialize';
import classes from './ContactsList.module.css';
import { socket } from '../../WorkPlace';
import ContactItem from './ContactItem';
import { NavLink } from 'react-router-dom';
import { contactCardActionCreator } from '../../../../redux/contactsReducer';
import ProfileCard from '../../Units/ProfileCard';


let createContacstList = (contactsArr, dispatch) => {

    // start sort contacts
    let emailsArr = [];
    let namesArr = [];

    contactsArr.forEach(contact => {
        if (contact.firstName !== '') {
            namesArr.push(contact.firstName);
        } else {
            emailsArr.push(contact.email);
        };
    });

    emailsArr.sort();
    namesArr.sort();

    let emailsContactArr = emailsArr.map(contact => {
        contactsArr.forEach(item => {
            if (item.email === contact) contact = item;
        });
        return contact;
    });
    let namesContactArr = namesArr.map(contact => {
        contactsArr.forEach(item => {
            if (item.firstName === contact) contact = item;
        });
        return contact;
    });

    let sortContactsArr = [].concat(emailsContactArr, namesContactArr);
    // end sort contacts

    let contacts = sortContactsArr.map(contact => {
        return (
            <NavLink
                exact to={`/contacts/contact/${contact.id}`}
                key={contact.id}
                onClick={() => {
                    let action = contactCardActionCreator(contact);
                    dispatch(action);
                }}>
                <ContactItem data={contact} />
            </NavLink>
        );
    });
    return contacts;
};

function ContactsList(props) {

    if (!props.contactsPage.isLoad) {
        socket.emit('uploadContacts', { userId: JSON.parse(localStorage.getItem('userData')).id });
        return (
            <div className={classes.preloaderContainer}>
                <Preloader />
            </div>
        );
    };

    if (props.contactsPage.contacts.length === 0) {
        return (
            <div className={classes.preloaderContainer}>
                <h5>no contacts</h5>
            </div>
        );
    };

    if (props.contactsPage.contactCard) {
        return (
            <div className={classes.preloaderContainer}>
                <ProfileCard
                    btns={[
                        {
                            btnFunc: 'redirectToDialog',
                            btnStyle: 'accentColor',
                            btnName: 'Go to dialog',

                        },
                    ]}
                    profile={props.contactsPage.contactCard}
                    dispatch={props.dispatch}
                />
            </div>
        );
    };

    return (
        <div className={classes.body}>
            <div className={classes.content}>
                {createContacstList(props.contactsPage.contacts, props.dispatch)}
            </div>
        </div>
    );
};

export default ContactsList;