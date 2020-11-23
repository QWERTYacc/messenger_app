import React from 'react';
import { getNewUserActionCreator } from '../../../../../redux/searchNewUserReducer';
import { socket } from '../../../WorkPlace';
import SearchNewUserContainer from './SearchNewUserContainer';

function ContainerForSearchNewUser(props) {

  socket.on('newContact', data => {
    let action = getNewUserActionCreator(data, false, true);
    props.dispatch(action);
  });

  return <SearchNewUserContainer />;
}

export default ContainerForSearchNewUser;
