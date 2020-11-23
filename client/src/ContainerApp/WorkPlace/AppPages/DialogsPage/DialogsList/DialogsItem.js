import React from 'react';
import classes from './DialogsItem.module.css';
import varsCss from '../../../../../vars_css/vars_css';

function DialogsItem(props) {

  let isShow = "noShowItem";
  if (props.data.newMsgs && props.data.newMsgs > 0) isShow = "showItem";

  return (
    <div className={classes.body}>
      <div className={classes.userInfo}>
        <div className={classes.userPhoto} style={{ backgroundImage: `url(${props.data.photo})` }} />
        <div className={`${classes.user_name} ${varsCss.navTextColor}`}>{props.data.name}</div>
        <div className={`${classes.user_name} ${varsCss.navTextColor}`}>{props.data.lastName}</div>
      </div>
      <div className={classes.newMsgsContainer}>
        <div className={`${isShow} ${classes.newMsgs} ${varsCss.accentTextColor}`}>{props.data.newMsgs}</div>
      </div>
    </div>
  );
}

export default DialogsItem;
