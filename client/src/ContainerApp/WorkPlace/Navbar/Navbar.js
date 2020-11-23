import React from 'react';
import classes from './Navbar.module.css';
import { NavLink } from 'react-router-dom';
import cssVars from './../../../vars_css/vars_css';
import { contactCardActionCreator } from '../../../redux/contactsReducer';


function Navbar(props) {

    let dialogsCount = 0;
    for (const dialog in props.navBar.newMessages) {
        if (props.navBar.newMessages[dialog].messages.length > 0) {
            dialogsCount++;
        };
    };
    let isShow = "noShowItem";
    if (dialogsCount > 0) isShow = "showItem";

    return (
        <nav className={cssVars.mainColor}>
            <div className="nav-wrapper">
                <ul id="nav-mobile" className={`${classes.body} center`}>
                    <li><NavLink to='/profile'>Profile</NavLink></li>
                    <li><NavLink to='/dialogs'>
                        {`Dialogs`}
                        <span
                            style={{ color: "#FFD073", paddingLeft: "5px", }}
                            className={`${isShow}`}
                        >
                            {dialogsCount}
                        </span>
                    </NavLink></li>
                    <li><NavLink
                        onClick={() => {
                            let action = contactCardActionCreator(false);
                            props.dispatch(action);
                        }}
                        to='/contacts'
                    >Contacts</NavLink></li>
                </ul>
            </div>
        </nav>
    );
};

export default Navbar;