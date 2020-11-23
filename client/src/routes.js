import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import AuthPageContainer from './ContainerApp/AuthPage/AuthPageContainer';
import WorkPlaceContainer from './ContainerApp/WorkPlace/WorkPlaceContainer';


export const useRoutes = (isAuthenticated) => {
    if (isAuthenticated) {
        return (
            <Switch>
                <Route path='/profile' render={() => <WorkPlaceContainer />} />
                <Route path='/dialogs' render={() => <WorkPlaceContainer />} />
                <Route path='/contacts' render={() => <WorkPlaceContainer />} />
                <Redirect to='/dialogs' />
            </Switch>
        );
    };
    return (
        <Switch>
            <Route exact path='/' render={() => <AuthPageContainer />} />
            <Redirect to='/' />
        </Switch>
    );
};