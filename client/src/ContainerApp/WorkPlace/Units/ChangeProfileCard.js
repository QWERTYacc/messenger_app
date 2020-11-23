import React from 'react';
import classes from './ProfileCard.module.css';
import { Select, TextInput, DatePicker, Button } from 'react-materialize';
import { socket } from '../WorkPlace';
import { updateDataActionCreator, reloadActionCreator } from '../../../redux/profileReducer';

function ChangeProfileCard(props) {

    function changeInputs(e) {
        let action;
        if (e.target.name === 'sex') {
            action = updateDataActionCreator(e.target.name, e.target.selectedOptions[0].value, true);
        } else {
            action = updateDataActionCreator(e.target.name, e.target.value, true);
        };

        props.dispatch(action);

    };

    return (
        <div className={classes.body}>
            {/* <div className={classes.userPhoto} style={{ backgroundImage: `url(${props.profilePage.photo})` }} /> */}
            <TextInput
                id='profileNameInput'
                label='First Name'
                name='firstName'
                value={props.profilePage.firstName}
                onChange={(e) => { changeInputs(e) }}
            />
            <TextInput
                id='profileLastNameInput'
                label='Last Name'
                name='lastName'
                email={true}
                value={props.profilePage.lastName}
                onChange={(e) => { changeInputs(e) }}
            />
            <TextInput
                id='profileEmailInput'
                label='Email'
                name='email'
                value={props.profilePage.email}
                onChange={(e) => { changeInputs(e) }}
            />
            <Select
                id="profileSelect"
                label="Sex"
                name='userSex'
                multiple={false}
                onChange={(e) => { changeInputs(e) }}
                defaultValue={props.profilePage.userSex}
            >
                <option disabled={true} value="">Check your sex</option>
                <option value="man">man</option>
                <option value="woman">woman</option>
            </Select>
            <DatePicker
                id="profileDatePicker"
                value={props.profilePage.userBirthday}
                readOnly={true}
                label='Birthday'
                name='userBirthday'
                onChange={() => {
                    let d = document.querySelector('td.is-selected button');
                    let m = d.dataset.month;
                    m = Number(m) + 1;
                    if (m < 10) m = '0' + m;
                    let day = d.dataset.day;
                    if (day < 10) day = '0' + Number(day);
                    let newDate = `${d.dataset.year}-${m}-${day}`;
                    let e = { target: {} };
                    e.target.name = 'userBirthday';
                    e.target.value = newDate;
                    changeInputs(e);
                }}
                options={{
                    format: 'yyyy-mm-dd',
                    yearRange: 99,
                }}
            />
            <Button
                id='saveBtn'
                className='blue'
                disabled={!props.profilePage.changed}
                onClick={() => {
                    let changedData = {
                        id: props.profilePage.id,
                        firstName: props.profilePage.firstName,
                        lastName: props.profilePage.lastName,
                        email: props.profilePage.email,
                        userBirthday: props.profilePage.userBirthday,
                        userSex: props.profilePage.userSex,
                        changed: true
                    };
                    socket.emit('profileData', changedData);
                    let action = reloadActionCreator(null);
                    props.dispatch(action);
                }}
            >Save</Button>
        </div>
    );
};

export default ChangeProfileCard;