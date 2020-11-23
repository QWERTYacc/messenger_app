import { connect } from 'react-redux';
import App from './App';


let mapStateToProps = (state) => {
  return {
    authState: state.authPage,
  };
};

let mapDispatchToProps = (dispatch) => {
  return {
    dispatch: (action) => {
      dispatch(action);
    },
  };
};

const AppContainer = connect(mapStateToProps, mapDispatchToProps)(App);

export default AppContainer;