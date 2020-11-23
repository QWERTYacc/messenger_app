import React from 'react';
import classes from './Dialog.module.css';
import DialogBodyContainer from './DialogBodyContainer';
import TextAreaContainer from './TextAreaContainer';

function Dialog() {
    return (
        <div className={classes.body}>
            <TextAreaContainer />
            <DialogBodyContainer />
        </div>
    );
};

export default Dialog;