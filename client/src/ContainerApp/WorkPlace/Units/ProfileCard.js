import React from 'react';
import classes from './ProfileCard.module.css';
import cssVars from '../../../vars_css/vars_css';
import { changeUserDataActionCreator } from '../../../redux/profileReducer';
import { logoutActionCreator } from '../../../redux/reduxStore';
import { contactCardActionCreator } from '../../../redux/contactsReducer';
import { dialogIdActionCreator } from '../../../redux/dialogBodyReducer';

function ProfileCard(props) {

    function createBtns(arr) {
        return arr.map(btn => {
            if (btn.btnFunc === 'changeBtn') btn.btnFunc = changeBtn;
            if (btn.btnFunc === 'logoutBtn') btn.btnFunc = logoutBtn;
            if (btn.btnFunc === 'redirectToDialog') btn.btnFunc = redirectToDialog;
            return btn = <button key={Math.random() * Math.random()} className={`${cssVars[btn.btnStyle]} waves-effect waves-light btn`} name="change" onClick={btn.btnFunc} >{btn.btnName}</button>;
        });
    };

    function changeBtn() {
        let action = changeUserDataActionCreator(true);
        props.dispatch(action);

    };
    function logoutBtn() {
        let action = logoutActionCreator();
        props.dispatch(action);

    };
    function redirectToDialog() {

        let contactAction = contactCardActionCreator(false);
        props.dispatch(contactAction);
        let dialogAction = dialogIdActionCreator(props.profile.dialogId);
        props.dispatch(dialogAction);
    };

    return (
        <div className={classes.body}>
            <div className={classes.userPhoto} style={{ backgroundImage: `url(${props.profile.userPhoto})` }} />
            <p className={classes.discriptionText}>{props.profile.firstName}</p>
            <p className={classes.discriptionText}>{props.profile.lastName}</p>
            <p className={classes.discriptionText}>{props.profile.email}</p>
            <p className={classes.discriptionText}>{props.profile.userSex}</p>
            <p className={classes.discriptionText}>{props.profile.userBirthday}</p>
            {createBtns(props.btns)}
        </div>
    );
};

export default ProfileCard;