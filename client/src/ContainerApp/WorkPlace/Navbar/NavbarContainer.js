import { connect } from 'react-redux';
import Navbar from './Navbar';


let mapStateToProps = (state) => {
    return {
        navBar: state.navBar,
    };
};

let mapDispatchToProps = (dispatch) => {
    return {
        dispatch: (action) => {
            dispatch(action);
        },
    };
};

const NavbarContainer = connect(mapStateToProps, mapDispatchToProps)(Navbar);

export default NavbarContainer;