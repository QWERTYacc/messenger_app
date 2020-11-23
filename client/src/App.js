import React from 'react';
import './App.css';
import { useRoutes } from './routes';
import { loginActionCreator } from './redux/authReducer';

function App(props) {

  let isAuthenticated = !!props.authState.token;

  if ((localStorage.userData !== undefined) && (isAuthenticated === false)) {
    let data = JSON.parse(localStorage.userData);
    let action = loginActionCreator(data.token, data.id);
    props.dispatch(action);
  };


  const routes = useRoutes(isAuthenticated);
  return (
    <div className="App">
      {routes}
    </div>
  );
}

export default App;