import React from 'react';
import classes from './AuthPage.module.css';
import cssVars from '../../vars_css/vars_css';
import M from "materialize-css";
import * as axios from 'axios';
import { registrationActionCreator, loginActionCreator } from '../../redux/authReducer';


function AuthPage(props) {

  let btnArr = document.querySelectorAll('button');
  let inputArr = document.querySelectorAll('input');

  let changeState = (e) => {
    let email = document.querySelector('#email_inline').value;
    let pass = document.querySelector('#password').value;
    if (e.target.name === 'email') {
      email = e.target.value;
    };
    if (e.target.name === 'password') {
      pass = e.target.value;
    };

    let action = registrationActionCreator(email, pass);
    props.dispatch(action);
  };

  let getAuthData = (token, id) => {
    localStorage.setItem('userData', JSON.stringify({ token, id }));
    let action = loginActionCreator(token, id);
    props.dispatch(action);
  };

  let postAuthData = (e) => {

    btnArr.forEach(btn => btn.disabled = true);
    inputArr.forEach(input => input.disabled = true);

    if (e.target.name === "register") {
      axios({
        method: 'post',
        url: '/api/auth/register',
        data: props.authState
      })
        .then(response => {
          M.toast({ html: `${response.data.message}` });
          setTimeout(() => {
            window.location.reload();
          }, 1500)
        })
        .catch(function (error) {
          error = JSON.parse(error.request.response);
          M.toast({ html: `${error.message}` });
          setTimeout(() => {
            window.location.reload();
          }, 1500)

        });
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

  if (props.authState.email !== "" || props.authState.password !== "") {
    return (
      <div className={classes.body}>
        <div className={classes.container}>
          <h3 className={cssVars.mainTextColor}>Log In</h3>
          <div className="input-field">
            <input type="email" name="email" id="email_inline" onChange={changeState} className="validate" />
            <label htmlFor="email_inline">Email</label>
          </div>
          <div className="input-field">
            <input id="password" type="password" className="validate" name="password" onChange={changeState} />
            <label htmlFor="password">Password</label>
          </div>

          <div className={classes.bntsSet}>
            <button className={`${cssVars.mainColor} waves-effect waves-light btn`} name="login" onClick={postAuthData}>Login</button>
            <button className={`${cssVars.accentColor} waves-effect waves-light btn`} name="register" onClick={postAuthData}>Registration</button>
          </div>
        </div>
      </div>
    );
  } else {
    return (
      <div className={classes.body}>
        <div className={classes.container}>
          <h3 className={cssVars.mainTextColor}>Log In</h3>
          <div className="input-field">
            <input type="email" name="email" id="email_inline" onChange={changeState} className="validate" />
            <label htmlFor="email_inline">Email</label>
          </div>
          <div className="input-field">
            <input id="password" type="password" className="validate" name="password" onChange={changeState} />
            <label htmlFor="password">Password</label>
          </div>

          <div className={classes.bntsSet}>
            <button className={`${cssVars.mainColor} waves-effect waves-light btn disabled`} name="login" onClick={postAuthData}>Login</button>
            <button className={`${cssVars.accentColor} waves-effect waves-light btn disabled`} name="register" onClick={postAuthData}>Registration</button>
          </div>
        </div>
      </div>
    );
  };
};

export default AuthPage;
