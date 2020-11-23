import { connect } from 'react-redux';
import AuthPage from './AuthPage';


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

const AuthPageContainer = connect(mapStateToProps, mapDispatchToProps)(AuthPage);


export default AuthPageContainer;