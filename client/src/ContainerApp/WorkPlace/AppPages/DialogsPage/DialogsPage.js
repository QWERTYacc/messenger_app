import React from 'react';
import { Route } from 'react-router-dom';
import classes from './DialogsPage.module.css';
import DialogsListContainer from './DialogsList/DialogsListContainer';
import ContainerForSearchNewUser from './DialogsList/ContainerForSearchNewUser';
import Dialog from './Dialog/Dialog';

function DialogsPage(props) {
    return (
        <div className={classes.body}>
            <Route exact path='/dialogs' render={() => <DialogsListContainer />} />
            <Route path='/dialogs/dialog' render={() => <Dialog />} />
            <Route path='/dialogs/add_new_user' render={() => <ContainerForSearchNewUser dispatch={props.dispatch} />} />
        </div>
    );
};

export default DialogsPage;