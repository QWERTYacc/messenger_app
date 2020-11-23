import React from 'react';
import varsCss from '../../../../vars_css/vars_css';
import classes from './ContactItem.module.css';

function ContactItem(props) {

  let isShow = "noShowItem";
  let userFirstName;
  let userLastName;

  if (props.data.firstName === '') {
    userFirstName = props.data.email;
    userLastName = '';
  } else {
    userFirstName = props.data.firstName;
    userLastName = props.data.lastName;
  };

  return (
    <div className={classes.body}>
      <div className={classes.userInfo}>
        <div className={classes.userPhoto} style={{ backgroundImage: `url(${props.data.userPhoto})` }} />
        <div className={`${classes.user_name} ${varsCss.navTextColor}`}>{userFirstName}</div>
        <div className={`${classes.user_name} ${varsCss.navTextColor}`}>{userLastName}</div>
      </div>
      <div className={classes.newMsgsContainer}>
        <div className={`${isShow} ${classes.newMsgs} ${varsCss.accentTextColor}`}>{props.data.newMsgs}</div>
      </div>
    </div>
  );
}

export default ContactItem;
