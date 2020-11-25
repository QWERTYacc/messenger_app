import React from 'react';
import classes from './ProfilePage.module.css';
import { socket } from './../../WorkPlace';
import { getUserDataActionCreator, changeUserDataActionCreator } from './../../../../redux/profileReducer';
import { Button, Icon, Preloader } from 'react-materialize';
import ProfileCard from '../../Units/ProfileCard';
import ChangeProfileCard from '../../Units/ChangeProfileCard';

function ProfilePage(props) {

    let userId = JSON.parse(localStorage.getItem('userData')).id;
    let data = { id: userId }

    socket.on(`${userId}Profile`, async userData => {

        let action = getUserDataActionCreator(userData);
        props.dispatch(action);

    });

    if (props.profilePage.id === null) {
        socket.emit('profileData', data);
        return (
            <div className={classes.body}>
                <Preloader />

            </div>
        );
    };
    if (props.profilePage.changePage === true) {

        return (
            <div className={classes.container}>
                <div className={classes.body}>
                    <Button
                        className={`${classes.closeBtn} grey`}
                        floating
                        icon={<Icon>close</Icon>}
                        small
                        waves='light'
                        onClick={() => {
                            let action = changeUserDataActionCreator(false);
                            props.dispatch(action);
                        }}
                    />
                    <ChangeProfileCard profilePage={props.profilePage} dispatch={props.dispatch} />
                </div>
            </div>
        );
    };

    return (
        <div className={classes.container}>
            <div className={classes.body}>
                <ProfileCard
                    btns={[
                        {
                            btnFunc: 'changeBtn',
                            btnStyle: 'mainColor',
                            btnName: 'Change',

                        },
                        {
                            btnFunc: 'logoutBtn',
                            btnStyle: 'accentColor',
                            btnName: 'Logout',

                        },
                    ]}
                    profile={props.profilePage}
                    dispatch={props.dispatch}
                />
            </div>
        </div>
    );
};

export default ProfilePage;