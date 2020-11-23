import React from 'react';
import classes from './SearchNewUser.module.css';
import varsCss from '../../../../../vars_css/vars_css';
import { Button, Card, CardTitle, Preloader, TextInput } from 'react-materialize';
import { getNewUserActionCreator, redirectNewUserActionCreator, updateEmailActionCreator } from '../../../../../redux/searchNewUserReducer';
import { socket } from '../../../WorkPlace';
import { Redirect } from 'react-router-dom';
import { dialogIdActionCreator } from '../../../../../redux/dialogBodyReducer';

let changeInputs = function (dispatch, value, changed, isLoad) {
  let action = updateEmailActionCreator(value, changed, isLoad);
  dispatch(action);
};

class SearchNewUser extends React.Component {

  render() {

    if (this.props.searchNewUser.redirect) {
      let action = dialogIdActionCreator(this.props.searchNewUser.redirect);
      this.props.dispatch(action);
      return <Redirect to={`/dialogs/dialog/${this.props.searchNewUser.redirect}`} />
    };

    let showItem = (data) => {
      if (data === '') {
        return (
          <div className='noShowItem'>{data}</div>
        );
      } else {
        return (
          <div className='displayBlock'>{data}</div>
        );
      };
    };

    let buttonFnc = (isContact) => {
      if (isContact) {
        return (
          <Button
            small
            key="goToDialog"
            style={{ marginTop: 0, marginLeft: '30px' }}
            className={varsCss.accentColor}
            onClick={() => {
              let action = redirectNewUserActionCreator(this.props.searchNewUser.newContact.dialogId);
              this.props.dispatch(action);
            }}
          >Go to dialog</Button>
        );
      };
      return (
        <Button
          small
          key="save"
          style={{ marginTop: 0, marginLeft: '30px' }}
          className={varsCss.accentColor}
          onClick={() => {
            socket.emit('addNewContact', {
              userId: JSON.parse(localStorage.getItem('userData')).id,
              newContactId: this.props.searchNewUser.newContact.id
            });
            changeInputs(this.props.dispatch, '', false, 'loading');
          }}
        >Save</Button>
      );
    };

    let searchResult;

    let visibleClass = 'noShowItem';
    let disabledInput = false;
    if (this.props.searchNewUser.isLoad === 'loading') {
      visibleClass = 'displayBlock';
      disabledInput = true;
      searchResult = <Preloader />;
    };
    if (this.props.searchNewUser.isLoad === true && this.props.searchNewUser.newContact.email === '') {
      visibleClass = 'displayBlock';
      searchResult = <Card
        actions={[
          <Button
            small
            key="close"
            style={{ marginTop: 0 }}
            className={varsCss.mainColor}
            onClick={() => changeInputs(this.props.dispatch, '', false, false)}>Close</Button>
        ]}
      >
        User is not found
    </Card>;
    };
    if (this.props.searchNewUser.isLoad && this.props.searchNewUser.newContact.email !== '') {
      visibleClass = 'displayBlock';
      searchResult = <Card
        style={{
          maxWidth: '300px',
        }}
        actions={[
          <Button
            small
            key="close"
            style={{ marginTop: 0 }}
            className={varsCss.mainColor}
            onClick={() => changeInputs(this.props.dispatch, '', false, false)}
          >Close</Button>,
          buttonFnc(this.props.searchNewUser.newContact.isContact),
        ]}
        header={<CardTitle style={{ width: '100%' }} image={this.props.searchNewUser.newContact.userPhoto} />}
      >
        {showItem(this.props.searchNewUser.newContact.firstName)}
        {showItem(this.props.searchNewUser.newContact.lastName)}
        {this.props.searchNewUser.newContact.email}
      </Card>;
    };

    return (
      <div className={classes.body}>
        <div className={classes.container}>
          <h5 className={varsCss.navTextColor} style={{ marginBottom: "30px" }}>To search for a user enter his (her) e-mail</h5>
          <TextInput
            id='searchNewUserEmailInput'
            label='Email'
            name='email'
            value={this.props.searchNewUser.newContact.email}
            disabled={disabledInput}
            onChange={(e) => {
              let changed = true;
              if (e.target.value === '') changed = false;
              changeInputs(this.props.dispatch, e.target.value, changed, false);
            }}
          />
          <Button
            id='searchBtn'
            className='blue'
            disabled={!this.props.searchNewUser.changed}
            onClick={() => {
              socket.emit('findUser', { userId: JSON.parse(localStorage.getItem('userData')).id, contactEmail: this.props.searchNewUser.newContact.email });
              changeInputs(this.props.dispatch, '', false);
              let action = getNewUserActionCreator({ email: '' }, false, 'loading');
              this.props.dispatch(action);
            }}
          >Search</Button>
          <div className={`${classes.searchResult} ${visibleClass}`}>
            {searchResult}
          </div>
        </div>
      </div>
    );

  };

  componentWillUnmount() {
    let action = redirectNewUserActionCreator(false);
    this.props.dispatch(action);
  };
};

export default SearchNewUser;
