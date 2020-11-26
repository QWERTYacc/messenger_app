import React from 'react';
import classes from './AuthPage.module.css';
import cssVars from '../../vars_css/vars_css';
import M from "materialize-css";
import * as axios from 'axios';
import { changeInputValueActionCreator, loginActionCreator, registrationActionCreator } from '../../redux/authReducer';
import { Button, Preloader, TextInput } from 'react-materialize';


function AuthPage(props) {

  let changeState = (e) => {
    let email = document.querySelector('#email_inline').value;
    let pass = document.querySelector('#password').value;
    if (e.target.name === 'email') {
      email = e.target.value;
    };
    if (e.target.name === 'password') {
      pass = e.target.value;
    };

    let action = changeInputValueActionCreator(email, pass);
    props.dispatch(action);
  };

  let getAuthData = (token, id) => {
    localStorage.setItem('userData', JSON.stringify({ token, id }));
    let action = loginActionCreator(token, id);
    props.dispatch(action);
  };

  let postAuthData = (e) => {

    if (e.target.name === "register") {
      axios({
        method: 'post',
        url: '/api/auth/register',
        data: props.authState
      })
        .then(response => {
          let action = registrationActionCreator(false, response.data.userEmail);
          props.dispatch(action);
        })
        .catch(function (error) {
          error = JSON.parse(error.request.response);
          M.toast({ html: `${error.message}` });
          setTimeout(() => {
            window.location.reload();
          }, 1500)

        });
      let action = registrationActionCreator(true);
      props.dispatch(action);
    };
    if (e.target.name === "login") {
      axios({
        method: 'post',
        url: '/api/auth/login',
        data: props.authState
      })
        .then(response => {
          getAuthData(response.data.token, response.data.userId);
        })
        .catch(function (error) {
          console.log(error.request);
          error = JSON.parse(error.request.response);
          M.toast({ html: `${error.message}`, completeCallback: function () { window.location.reload() } });
        });
    };
  };

  let disabledBtn = true;
  if (props.authState.email !== "" || props.authState.password !== "") disabledBtn = false;

  if (props.authState.isLoad) {
    return (
      <div className={classes.body}>
        <Preloader />
      </div>
    );
  };

  let showItem = (isShow) => {
    if (isShow) return 'displayBlock';
    return 'noShowItem'
  };

  return (
    <div className={classes.body}>
      <div className={classes.container}>
        <h3 className={cssVars.mainTextColor}>Log In</h3>
        <h5 className={showItem(props.authState.newUser)}>New user<br />"{`${props.authState.newUser}`}"<br />created.<br />You can login</h5>
        <TextInput
          email
          id="email_inline"
          label="Email"
          name="email"
          onChange={changeState}
          validate
        />
        <TextInput
          password
          id="password"
          label="Password"
          name="password"
          onChange={changeState}
        />

        <div className={classes.bntsSet}>
          <Button
            className={`${cssVars.mainColor}`}
            name="login"
            small
            style={{
              // marginRight: '5px'
            }}
            waves="light"
            disabled={disabledBtn}
            onClick={postAuthData}
          >Login</Button>
          <Button
            className={`${cssVars.accentColor} ${showItem(!props.authState.newUser)}`}
            name="register"
            small
            style={{
              // marginRight: '5px'
            }}
            waves="light"
            disabled={disabledBtn}
            onClick={postAuthData}
          >Registration</Button>
        </div>
      </div>
    </div>
  );
};

export default AuthPage;
